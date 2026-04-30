---
pubDatetime: 2026-05-01
title: "Supabase PostgREST vs Direct TCP: Vercel Serverless에서 직접 재본 성능 차이"
tags:
  - "supabase"
  - "vercel"
  - "nextjs"
  - "postgresql"
  - "drizzle"
description: "Vercel Serverless 환경에서 Supabase PostgREST와 Direct TCP, Drizzle 싱글턴 연결의 응답 시간을 Sentry와 진단 API로 비교한 기록"
ogImage: "../../assets/images/supabase.jpg"
---

Supabase와 Vercel 조합으로 운영 중인 서비스에서 API 응답 시간이 비정상적으로 느린 문제가 있었다. 홈페이지 진입 시 클라이언트가 API 9개를 호출하는데, 각 API 응답이 4초에서 12초까지 걸렸고 전체 페이지 로드 시간은 5.5초까지 늘어났다.

처음에는 DB 쿼리나 인덱스 문제를 의심했다. 하지만 `EXPLAIN ANALYZE` 결과 쿼리 자체는 대부분 10ms 안팎이었다. 병목은 DB가 아니라 Vercel Function과 Supabase Postgres 사이의 어딘가에 있었다.

이 글은 그 병목을 Sentry trace와 진단용 API로 좁혀가며, Supabase PostgREST를 Direct TCP 연결로 바꿨을 때 실제로 어느 정도 차이가 났는지 정리한 기록이다.

## 환경

| 항목          | 값                                                                              |
| ------------- | ------------------------------------------------------------------------------- |
| 프레임워크    | Next.js App Router                                                              |
| 호스팅        | Vercel Serverless Function                                                      |
| 데이터베이스  | Supabase Free Plan                                                              |
| Vercel 리전   | `icn1`                                                                          |
| Supabase 리전 | `ap-northeast-2`                                                                |
| 측정일        | 2026-04-06                                                                      |
| DB 규모       | `stocks` 5,768건, `insider_transactions` 146,551건, `insider_filings` 191,750건 |

중요한 조건이 하나 있다. 측정 시점 중 일부는 KST 새벽 2시에서 5시 사이로 트래픽이 거의 없는 시간이었다. Supabase Free Plan의 PostgREST 또는 Supavisor 레이어가 idle 상태에서 깨어나는 worst case에 가깝다.

## Sentry에서 본 첫 번째 단서

홈페이지(`/`) pageload trace를 보면 총 70개 span 중 API 호출 9개가 전체 시간의 99%를 차지했다.

| 엔드포인트                              | Duration |
| --------------------------------------- | -------: |
| `/api/stocks/AAPL/insider-transactions` |  5,065ms |
| `/api/stocks/TSLA/insider-transactions` |  5,034ms |
| `/api/stocks/NVDA/insider-transactions` |  5,022ms |
| `/api/stocks/PLTR/insider-transactions` |  5,021ms |
| `/api/stocks/AAPL`                      |  4,240ms |
| `/api/investors`                        |  4,148ms |
| `/api/stocks/TSLA`                      |  4,144ms |
| `/api/stocks/NVDA`                      |  4,123ms |
| `/api/stocks/PLTR`                      |  4,122ms |

정적 리소스는 문제가 아니었다. JS는 255ms, 이미지는 캐시로 0ms였고 페이지 navigation span도 72ms에서 78ms 수준이었다. 병목은 순수하게 API 응답 시간에 있었다.

서버 trace를 더 보면 Next.js route handler 내부 코드에서 시간을 쓰는 것도 아니었다.

```text
executing api route /api/stocks/[ticker]/insider-transactions  (12.8s)
└─ GET supabase.co/rest/v1/insider_transactions                (12.8s)
   server code overhead                                        (about 0ms)
```

시간의 대부분은 `supabase.co/rest/v1/...` 호출에서 사라지고 있었다.

## Cold와 Warm의 차이

같은 API라도 시간대에 따라 차이가 컸다.

| 시점 (KST) | 엔드포인트                                  | Duration | 상태 |
| ---------- | ------------------------------------------- | -------: | ---- |
| 05:20      | `/api/stocks/[ticker]/insider-transactions` | 12,863ms | Cold |
| 05:20      | `/api/stocks/[ticker]`                      |  6,495ms | Cold |
| 06:45      | `/api/stocks/[ticker]/insider-transactions` |  2,664ms | Warm |
| 06:45      | `/api/stocks/[ticker]`                      |  1,200ms | Warm |

Warm 상태에서도 충분히 느렸지만, cold 상태에서는 실서비스에서 받아들이기 어려운 수준까지 튀었다.

## DB 쿼리 자체는 빨랐다

Supabase MCP를 통해 같은 쿼리를 `EXPLAIN ANALYZE`로 실행했다.

| 쿼리                                        | Planning | Execution |     합계 |
| ------------------------------------------- | -------: | --------: | -------: |
| `stocks WHERE ticker = 'AAPL'`              |    7.6ms |    0.14ms |   약 8ms |
| `insider_transactions JOIN insider_filings` |     31ms |     7.8ms |  약 39ms |
| `data_sync`                                 |    0.3ms |     0.1ms | 약 0.4ms |

인덱스도 정상적으로 사용되고 있었다. 즉, Postgres가 느린 상황은 아니었다.

| 쿼리                   | Sentry 기준 서버 to Supabase | DB 실제 실행 |
| ---------------------- | ---------------------------: | -----------: |
| `stocks`               |            1,100ms - 6,400ms |       0.14ms |
| `insider_transactions` |           2,600ms - 12,800ms |        7.8ms |

수백 배 차이가 났다. 이 정도면 쿼리 튜닝으로 해결할 문제가 아니다. DB 앞단의 레이어를 의심해야 한다.

## 진단용 API로 구간을 나눠 재기

`/api/debug/latency` 엔드포인트를 만들어 Vercel Function 내부에서 구간별 시간을 쟀다.

- `performance.now()`로 서버 내부 구간 측정
- `curl -w '%{time_total}'`로 전체 왕복 시간 측정
- `Date.now()`를 모듈 레벨에 기록해 Function cold start 여부 판별
- 같은 쿼리를 순차 실행해 cold connection과 warm connection 차이 비교

먼저 Vercel Function 자체 오버헤드를 분리했다.

| 호출    | curl total | server total | Vercel 오버헤드 |
| ------- | ---------: | -----------: | --------------: |
| #1 cold |    3,964ms |      3,702ms |           262ms |
| #2 warm |      859ms |        745ms |           114ms |
| #3 warm |    1,324ms |        987ms |           337ms |

이 측정에서 Vercel 오버헤드는 약 0.1초에서 0.3초 사이였다. 무시할 수 있는 값은 아니지만, 앞에서 본 4초에서 12초 수준의 API 응답 지연을 설명할 정도는 아니었다.

PostgREST를 통해 같은 쿼리를 실행하면 다음과 같았다.

| 측정 항목                   | #1 cold | #2 warming | #3 warm |
| --------------------------- | ------: | ---------: | ------: |
| 첫 번째 쿼리                | 1,520ms |      334ms |    82ms |
| 두 번째 쿼리                |   707ms |      272ms |    92ms |
| `insider_transactions` JOIN | 1,165ms |      242ms |   300ms |
| `data_sync`                 |   309ms |      102ms |    56ms |
| 합계                        | 3,702ms |      950ms |   531ms |

호출이 반복되면서 빨라지는 패턴이 명확했다. PostgREST 또는 Supavisor의 connection pool이 warm-up되는 흐름으로 보였다.

## Supabase Client 싱글턴은 해결책이 아니었다

처음에는 매 요청마다 `createClient()`를 호출하는 것이 문제일 수 있다고 봤다. 그래서 모듈 레벨 싱글턴으로 바꿨다.

```ts
// Before: 매번 새 인스턴스 생성
export function createServerClient() {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

// After: Function instance 안에서 재사용
let client: SupabaseClient | null = null;

export function createServerClient() {
  if (!client) {
    client = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
  }

  return client;
}
```

결과는 거의 차이가 없었다. `client_create_ms`가 1ms에서 0ms로 줄었을 뿐이다.

이유는 단순하다. Supabase JS Client는 서버에서 Postgres connection을 직접 들고 있는 클라이언트가 아니다. HTTP 요청을 만들고 PostgREST로 보내는 클라이언트에 가깝다. 실제 비용은 `createClient()`가 아니라 쿼리 실행 시점의 HTTP to PostgREST to Supavisor 구간에서 발생한다.

## PostgREST와 Direct TCP 비교

다음으로 두 개의 독립된 엔드포인트를 만들었다.

| 엔드포인트                | 경로                                                 | 클라이언트              |
| ------------------------- | ---------------------------------------------------- | ----------------------- |
| `/api/debug/latency/rest` | Vercel to HTTP to PostgREST to Supavisor to Postgres | `@supabase/supabase-js` |
| `/api/debug/latency/tcp`  | Vercel to TCP to Supavisor to Postgres               | `postgres`              |

두 요청은 `curl`로 동시에 발사했다. 네트워크와 서버 상태를 최대한 같은 조건으로 맞추기 위해서다.

```bash
curl https://example.com/api/debug/latency/rest &
curl https://example.com/api/debug/latency/tcp &
wait
```

실행한 쿼리는 세 가지다.

| 쿼리         | 목적                                                              |
| ------------ | ----------------------------------------------------------------- |
| `query_1`    | `SELECT ticker FROM stocks LIMIT 1`, connection 수립 비용 포함    |
| `query_2`    | 같은 쿼리 재실행, connection 재사용 상태 확인                     |
| `insider_tx` | `insider_transactions JOIN insider_filings WHERE ticker = 'AAPL'` |

### 1차 측정

둘 다 Vercel cold start 상태였다.

| 구간            |    REST |     TCP |
| --------------- | ------: | ------: |
| Vercel 오버헤드 |   997ms | 1,088ms |
| `query_1`       |   857ms |   330ms |
| `query_2`       |   250ms |     2ms |
| `insider_tx`    |   982ms |    22ms |
| server total    | 2,088ms |   359ms |
| curl total      | 3,086ms | 1,447ms |

### 2차 측정

역시 둘 다 Vercel cold start 상태였다.

| 구간            |    REST |   TCP |
| --------------- | ------: | ----: |
| Vercel 오버헤드 |   721ms | 923ms |
| `query_1`       |   375ms |  37ms |
| `query_2`       |   137ms |   3ms |
| `insider_tx`    |   285ms |   4ms |
| server total    |   802ms |  48ms |
| curl total      | 1,523ms | 971ms |

### 3차 측정

둘 다 Vercel warm 상태였다.

| 구간            |    REST |   TCP |
| --------------- | ------: | ----: |
| Vercel 오버헤드 |   304ms | 360ms |
| `query_1`       | 1,802ms |  36ms |
| `query_2`       |   397ms |   3ms |
| `insider_tx`    | 1,101ms |   3ms |
| server total    | 3,300ms |  44ms |
| curl total      | 3,604ms | 404ms |

흥미로운 점은 Vercel이 warm이어도 REST는 3.3초까지 튀었다는 것이다. 즉, Vercel cold start만으로 설명할 수 없는 지연이 PostgREST 경로에 있었다.

### 4차 측정

REST는 warm, TCP는 cold start 상태였다.

| 구간            |    REST |   TCP |
| --------------- | ------: | ----: |
| Vercel 오버헤드 |   310ms | 121ms |
| `query_1`       |   334ms | 118ms |
| `query_2`       |   309ms |   3ms |
| `insider_tx`    |   381ms |  18ms |
| server total    | 1,024ms | 143ms |
| curl total      | 1,334ms | 264ms |

## Direct TCP는 5배에서 75배 빨랐다

네 번의 측정을 합치면 다음과 같다.

| 측정 항목         |       REST 범위 |        TCP 범위 | TCP 개선 배율 |
| ----------------- | --------------: | --------------: | ------------: |
| Vercel 오버헤드   |   304ms - 997ms | 121ms - 1,088ms |        비슷함 |
| `query_1` cold    | 334ms - 1,802ms |    36ms - 330ms |    5배 - 50배 |
| `query_2` warm    |   137ms - 397ms |       2ms - 3ms |  50배 - 130배 |
| `insider_tx` JOIN | 285ms - 1,101ms |      3ms - 22ms |  13배 - 367배 |
| server total      | 802ms - 3,300ms |    44ms - 359ms |    5배 - 75배 |

요청 경로를 단순화하면 이렇게 볼 수 있다.

```text
REST: Vercel -> HTTP -> PostgREST -> Supavisor -> Postgres
TCP:  Vercel -> TCP  -> Supavisor -> Postgres
```

두 방식 모두 Supavisor를 거친다. 그런데 PostgREST를 포함한 REST 경로를 제외하는 것만으로 server total이 802ms에서 3,300ms 사이에서 44ms에서 359ms 사이로 줄었다.

이 측정에서는 병목이 Postgres 실행 시간이 아니라 PostgREST 경로에 있었다고 보는 것이 가장 자연스럽다.

## Drizzle 싱글턴으로 한 번 더 재측정

위 TCP 라우트는 의도적으로 매 요청마다 `postgres()` 클라이언트를 만들고, 요청이 끝나면 `sql.end()`로 닫았다. 측정의 독립성을 위해서였다.

하지만 실제 프로덕션에서는 이 패턴을 쓰지 않는다. Vercel Function instance는 수 초에서 수 분 동안 살아 있을 수 있고, 그동안 모듈 레벨 변수를 재사용할 수 있다. 따라서 DB 클라이언트도 모듈 레벨 싱글턴으로 두는 것이 일반적이다.

Drizzle ORM 도입을 결정한 뒤 세 번째 엔드포인트를 추가했다.

| 엔드포인트                   | 클라이언트 패턴               | 커넥션 라이프사이클                          |
| ---------------------------- | ----------------------------- | -------------------------------------------- |
| `/api/debug/latency/rest`    | `@supabase/supabase-js`       | HTTP 기반, fetch 단위                        |
| `/api/debug/latency/tcp`     | `postgres.js`                 | 요청마다 생성 후 `sql.end()`                 |
| `/api/debug/latency/drizzle` | `drizzle-orm` + `postgres.js` | 모듈 싱글턴, Function instance 안에서 재사용 |

세 엔드포인트 모두 같은 Supabase Transaction Pooler URL을 사용했다.

```text
aws-1-ap-northeast-2.pooler.supabase.com:6543
```

TCP 라우트도 Transaction Pooler로 통일했고 `prepare: false` 옵션을 추가했다. Transaction Pooler 환경에서는 prepared statement가 connection 단위로 안정적으로 유지된다고 가정하기 어렵기 때문이다.

```bash
for run in 1 2 3 4; do
  curl https://example.com/api/debug/latency/drizzle &
  curl https://example.com/api/debug/latency/tcp &
  curl https://example.com/api/debug/latency/rest &
  wait
  sleep 3
done
```

### Drizzle 비교 결과

| Round | 상태                              | REST total | TCP total | Drizzle total |
| ----- | --------------------------------- | ---------: | --------: | ------------: |
| 1     | rest cold, tcp warm, drizzle warm |    2,679ms |     228ms |          31ms |
| 2     | 전부 cold                         |      768ms |     102ms |         123ms |
| 3     | rest cold, tcp cold, drizzle warm |    1,774ms |      42ms |          30ms |
| 4     | 전부 warm                         |      685ms |      58ms |          29ms |

쿼리별로 보면 차이가 더 선명하다.

| 쿼리              |            REST |          TCP |      Drizzle |
| ----------------- | --------------: | -----------: | -----------: |
| `query_1`         | 224ms - 1,005ms | 30ms - 115ms |  9ms - 316ms |
| `query_2`         |   144ms - 341ms |    3ms - 5ms |   8ms - 10ms |
| `insider_tx` JOIN | 302ms - 2,278ms |  3ms - 107ms | 10ms - 115ms |

Warm 상태 기준으로는 Drizzle이 29ms에서 31ms까지 내려갔다. 요청마다 connection을 새로 만드는 raw TCP 라우트보다 오히려 빨랐다.

다만 이 결과를 "Drizzle이라서 빠르다"거나 "싱글턴만 적용하면 성능이 개선된다"로 읽으면 안 된다. 이 비교는 클라이언트가 다르고 connection lifecycle도 다르다. 여기서 확인한 것은 raw TCP 라우트처럼 매 요청마다 connection을 열고 닫는 패턴에는 connection 수립 비용이 반복해서 들어간다는 점이다.

```text
TCP 라우트의 한 invocation:
  postgres() 생성 -> connection 수립 -> query_1 -> query_2 -> insider_tx -> sql.end()
                    ^ 매 invocation마다 반복

Drizzle 라우트의 한 invocation:
  getDb() -> 캐시된 connection 반환 -> query_1 -> query_2 -> insider_tx
             ^ Function instance가 살아 있는 동안 재사용
```

TCP 라우트의 `query_1`에는 신규 connection 수립과 TLS handshake 비용이 포함된다. 같은 invocation 안의 `query_2`와 `insider_tx`가 3ms 수준으로 빠른 이유는 이미 열린 `sql` 객체를 재사용하기 때문이다.

반대로 다음 invocation에서는 `sql.end()`로 connection을 닫아버렸기 때문에 다시 connection 수립 비용을 낸다.

Drizzle 라우트는 `getDb()`가 모듈 레벨 싱글턴이다. Function instance가 살아 있는 동안 connection을 유지하므로 warm 상태에서는 각 쿼리가 9ms에서 11ms 범위에 머문다. 이 값은 Supabase Transaction Pooler를 거쳐 Postgres에 다녀오는 실제 왕복 시간에 가깝다.

따라서 이 절의 의미는 "싱글턴이 PostgREST 병목을 해결했다"가 아니다. PostgREST 병목은 Direct TCP로 우회하면서 해결했고, 싱글턴은 Direct TCP를 프로덕션에서 사용할 때 불필요한 connection 수립 비용을 반복하지 않기 위한 연결 관리 방식에 가깝다.

## 레이어별 비용을 다시 정리하면

이번 측정에서 비용은 대략 이렇게 나뉜다.

| 레이어                         |              비용 | 측정 근거                                |
| ------------------------------ | ----------------: | ---------------------------------------- |
| Postgres 쿼리 실행             |         10ms 미만 | `EXPLAIN ANALYZE`                        |
| Supavisor Transaction Pooler   |   5ms - 10ms 수준 | Drizzle warm 쿼리 9ms - 11ms에서 추정    |
| Postgres connection 수립 + TLS |      40ms - 100ms | TCP cold `query_1`과 warm `query_2` 차이 |
| PostgREST를 포함한 REST 경로   | 수백 ms - 수천 ms | REST와 TCP의 차이                        |
| Vercel Function cold start     |   100ms - 1,000ms | `module_loaded_at` 기반 측정             |

물론 이 값은 Supabase Free Plan, 리전, 시간대, 프로젝트 idle 여부에 따라 달라질 수 있다. 하지만 적어도 이 환경에서는 PostgREST 경로가 압도적인 병목이었다.

## 변경 후 개선 지표

이 측정에서 핵심 지표는 API 서버 안에서 DB 조회에 걸린 시간이다. 브라우저에서 본 전체 pageload는 네트워크, Vercel cold start, 클라이언트 렌더링, 병렬 API 호출 구조의 영향을 함께 받는다. 반면 DB access path의 병목을 비교하려면 server total을 보는 편이 더 정확하다.

| 지표                         | 변경 전: PostgREST | 변경 후: Direct TCP | 변경 후: Drizzle 싱글턴 |
| ---------------------------- | -----------------: | ------------------: | ----------------------: |
| 진단 API server total        |    685ms - 2,679ms |        42ms - 228ms |            29ms - 123ms |
| warm 상태 server total       |         685ms 이상 |             수십 ms |             29ms - 31ms |
| 단순 warm 쿼리               |      137ms - 397ms |           2ms - 3ms |              8ms - 10ms |
| JOIN 쿼리                    |    302ms - 2,278ms |         3ms - 107ms |            10ms - 115ms |
| 같은 round 기준 개선 폭      |                  - |       약 7배 - 42배 |           약 6배 - 86배 |
| warm 상태의 대표 응답 시간대 |       수백 ms 이상 |             수십 ms |               30ms 안팎 |

같은 round끼리 비교하면 PostgREST에서 Direct TCP로 바꿨을 때 DB access path의 server total은 약 7배에서 42배 줄었다. Drizzle 싱글턴 라우트까지 포함하면 전체 round 기준 약 6배에서 86배 차이가 났고, warm 상태만 놓고 보면 30ms 안팎까지 내려갔다.

Drizzle 싱글턴은 여기서 추가로 "항상 더 빠른 ORM"을 증명한 것이 아니라, 프로덕션에 가까운 connection 재사용 패턴에서는 매 요청마다 connection을 여닫는 비용을 피할 수 있음을 보여준다.

따라서 이 변경의 성공 기준은 다음처럼 잡을 수 있다.

- 서버 내부 DB 조회 시간이 초 단위에서 수십 ms 단위로 내려갈 것
- warm Function instance에서 반복 호출 시 30ms 안팎의 server total을 유지할 것
- DB 쿼리 실행 시간이 아니라 PostgREST 경로가 병목이라는 가설을 실제 측정으로 확인할 것
- ORM 도입으로 타입 안전성과 마이그레이션 관리 이점을 얻되, 성능 주장은 Direct TCP 전환과 분리해서 볼 것

## 결론: 핵심은 Direct TCP, 싱글턴은 연결 관리다

이번 서비스의 warm 상태 측정 결과를 기준으로 보면 성능은 다음 순서였다.

```text
REST(PostgREST)                  685ms - 2,679ms
TCP(connection per request)       42ms - 228ms
Drizzle(singleton connection)     29ms - 31ms
```

PostgREST에서 Direct TCP로 바꾸는 것만으로 server total 기준 5배에서 75배 개선이 있었다. 이 글의 핵심 개선은 여기에 있다.

모듈 레벨 싱글턴은 별도의 큰 성능 개선 포인트라기보다, Serverless 환경에서 Direct TCP를 쓸 때 매 요청마다 connection을 새로 만들지 않기 위한 기본적인 연결 관리 방식이다. 이번 측정에서도 Drizzle 싱글턴 라우트가 빠르게 나온 이유는 ORM 자체의 성능 때문이라기보다, warm Function instance에서 이미 열린 connection을 재사용했기 때문이다.

그래서 이 서비스에서는 Supabase JS Client 기반의 PostgREST 호출을 API 서버 내부에서 제거하고, Drizzle ORM과 Supabase Transaction Pooler를 직접 사용하는 방향으로 정리했다.

이 서비스의 프로덕션 기준으로는 다음 구성이 가장 적합했다.

- Vercel Serverless Function에서는 DB 클라이언트를 모듈 레벨 싱글턴으로 둔다.
- Supabase Transaction Pooler URL을 사용한다.
- `postgres.js` 사용 시 `prepare: false`를 설정한다.
- Serverless 환경에서는 connection 수를 보수적으로 잡는다. 작은 서비스라면 `max: 1`부터 시작해도 충분하다.
- Supabase JS Client는 브라우저 인증, RLS 기반 클라이언트 접근, Storage 등 Supabase 플랫폼 기능이 필요한 곳에 집중해서 사용한다.

Supabase PostgREST는 빠르게 API를 만들 수 있는 좋은 기본값이다. 특히 CRUD 중심의 초기 제품에서는 생산성이 높다. 다만 Vercel Serverless에서 서버 API의 tail latency가 중요하고, 쿼리 자체가 이미 충분히 빠른 상황이라면 PostgREST를 계속 쓰는 것이 병목일 수 있다.

이럴 때는 추측으로 ORM을 바꾸거나 인덱스를 추가하기 전에, 먼저 같은 쿼리를 PostgREST와 Direct TCP로 나눠 재보는 편이 낫다. 측정해보면 어디를 고쳐야 하는지가 생각보다 빨리 드러난다.

---
title: "싱글톤 패턴 이해하기"
description: "싱글톤 패턴의 의도, 구현 방법, 그리고 남용을 피하기 위한 주의 사항을 정리했다."
pubDatetime: 2025-10-17
tags:
  - design-pattern
  - architecture
  - oop
---

## 싱글톤 패턴이란?

싱글톤(Singleton) 패턴은 GoF(Gang of Four)가 정리한 23가지 디자인 패턴 가운데 **생성(Creational)** 카테고리에 속한다. 의도는 클래스 인스턴스를 단 한 번만 만들고, 그 인스턴스를 전역적으로 노출하는 것이다. 필요할 때까지 생성을 미루는 `lazy initialization`도 함께 구현할 수 있어 리소스 낭비를 줄인다.

GoF는 "네 명의 갱"이라는 뜻으로, 1994년 《Design Patterns: Elements of Reusable Object-Oriented Software》를 함께 집필한 다음 네 저자를 가리킨다.

- Erich Gamma (에릭 감마)
- Richard Helm (리처드 헬름)
- Ralph Johnson (랄프 존슨)
- John Vlissides (존 블리시디스)

이 책에서 소개된 23가지 패턴은 이후 소프트웨어 공학의 표준 참고서가 되었고, 생성·구조·행위 세 가지 카테고리로 분류된다.

- **생성 패턴(Creational)**: 싱글톤, 팩토리, 빌더 등 객체 생성 과정을 다룬다.
- **구조 패턴(Structural)**: 어댑터, 데코레이터, 프록시 등 클래스와 객체 구성을 다룬다.
- **행위 패턴(Behavioral)**: 옵저버, 전략, 커맨드 등 객체 간 상호작용을 다룬다.

주요 특징은 다음과 같다.

- 인스턴스를 하나만 생성해 애플리케이션 전반에 공유한다.
- 정적 메서드나 프로퍼티를 통해 전역 접근점을 제공한다.
- 최초 접근 시점까지 생성을 지연(`lazy`)시켜 초기화 비용을 조절한다.

대표적으로 설정 값, DB 커넥션 풀, 로거(Logger), API 클라이언트처럼 공용 리소스를 다루는 서비스에 활용된다. 다만 전역 상태를 남발하면 의존성이 코드 곳곳에 숨고 테스트가 어려워져 최근에는 싱글톤을 안티패턴으로 분류하기도 한다. 대신 의존성 주입(Dependency Injection)이나 명시적인 팩토리 패턴을 선호하는 프로젝트도 많으므로 문제 성격에 맞춰 선택해야 한다.

## 언제 사용할까?

- **비용이 큰 리소스 관리**: DB 연결, 파일 핸들러처럼 생성 비용이 크고 재사용이 필요한 경우.
- **전역 상태 제공**: 애플리케이션 전체에서 동일한 설정 값을 공유해야 할 때.
- **외부 시스템과의 연결**: API 클라이언트, 메시지 브로커 등 연결 수를 제한하고 싶은 경우.

하지만 전역 접근은 곧 전역 상태를 의미하므로 남용하면 의존성 추적이 어렵고 테스트가 힘들어질 수 있다.

## 기본 구현 예시 (JavaScript)

```js
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = null;
    this.isConnected = false;
    Database.instance = this;
  }

  connect() {
    if (!this.isConnected) {
      this.connection = "DB Connection Established";
      this.isConnected = true;
      console.log("데이터베이스 연결됨");
    }
    return this.connection;
  }

  query(sql) {
    if (!this.isConnected) {
      throw new Error("데이터베이스가 연결되지 않았습니다");
    }
    console.log(`쿼리 실행: ${sql}`);
    return `${sql} 결과`;
  }
}

// 사용 예제
const db1 = new Database();
db1.connect();

const db2 = new Database();
db2.connect();

console.log(db1 === db2); // true - 같은 인스턴스!
```

생성자 내부에서 이미 만들어둔 인스턴스를 반환하도록 처리해 `new Database()`로 여러 번 호출하더라도 동일한 객체를 돌려받는다. 실제 환경에서는 연결 정보, 커넥션 풀 등을 여기에 초기화해 공용 DB 접속 로직을 통일한다. 서버리스나 워커 기반 환경처럼 실행 컨텍스트가 자주 새로 생기면 인스턴스가 다시 만들어질 수 있다는 점은 여전히 주의해야 한다.

## 프런트엔드 예시 (Redux)

프런트엔드 애플리케이션에서는 전역 상태 관리 라이브러리인 Redux 스토어가 대표적인 싱글톤 구현이다. 스토어를 한 번 생성한 뒤 애플리케이션 전역에서 동일한 인스턴스를 재사용한다.

```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import todoSlice from "./features/todoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
```

```tsx
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

`store.ts`에서 스토어를 한 번만 구성해 내보내고, `Provider` 컴포넌트로 React 트리 전체에 주입한다. 모든 컴포넌트는 동일한 스토어 인스턴스를 바라보므로 전역 상태를 일관되게 관리할 수 있다.

## 장점

- **메모리 절약**: 인스턴스가 하나만 생성되므로 무거운 리소스를 다루는 객체에서 메모리 낭비를 줄일 수 있다.
- **전역 접근점 제공**: 애플리케이션 어디에서든 동일한 인스턴스를 재사용해 상태나 설정을 공유하기 쉽다.
- **지연 초기화 가능**: 필요할 때까지 생성을 미루면 초기 로딩 시간을 줄이고, 리소스를 늦게 사용할 수 있다.
- **일관성 보장**: 하나의 인스턴스만 존재하므로 상태를 통제하기 쉬워 데이터 일관성을 유지하는 데 도움이 된다.

## 단점

- **테스트하기 어려움**: 전역 상태가 공유되면서 테스트 간 상호 의존성이 생기고, 목 객체로 대체하기 까다롭다.
- **의존성 숨김**: 클래스 내부에서 싱글톤을 직접 호출하면 외부에서 의존성을 파악하기 어려워 결합도가 높아진다.
- **SRP 위반 가능성**: 인스턴스 생성 관리와 비즈니스 로직을 한 클래스가 모두 담당하면서 단일 책임 원칙을 해칠 수 있다.
- **동시성 이슈**: 멀티스레드 환경에서 적절한 동기화를 하지 않으면 여러 인스턴스가 생길 위험이 있다. Node.js에서도 워커 스레드 등 병렬 실행 시 주의해야 한다.
- **전역 상태 부작용**: 어디서든 접근 가능한 만큼 의도치 않은 상태 변경이 일어나기 쉬워 디버깅과 유지보수가 어려워질 수 있다.
- **확장성 제한**: 나중에 여러 인스턴스가 필요한 요구 사항이 생기면 아키텍처를 큰 폭으로 수정해야 한다.

## 현대적 대안 예시

싱글톤이 가진 제약을 줄이려면 의존성을 명시적으로 주입하거나, 상태 범위를 좁혀 관리하는 도구를 활용한다.

### 1. NestJS DI 컨테이너 활용

NestJS는 모듈 단위로 프로바이더를 등록하고, 컨테이너가 라이프사이클을 관리한다. 기본 스코프는 싱글톤이지만, 요청(Request) 또는 트랜지언트(Transient) 스코프로 바꿀 수 있어 테스트나 확장에 유연하다.

```ts
// logger.service.ts
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST }) // 요청마다 새로운 인스턴스
export class RequestLogger {
  log(message: string) {
    console.log(`[request] ${message}`);
  }
}

// users.controller.ts
import { Controller, Get } from "@nestjs/common";
import { RequestLogger } from "./logger.service";

@Controller("users")
export class UsersController {
  constructor(private readonly logger: RequestLogger) {}

  @Get()
  findAll() {
    this.logger.log("사용자 목록 조회");
    return [];
  }
}
```

테스트에서는 DI 컨테이너에 목 프로바이더를 등록해 전역 상태에 의존하지 않고 독립적으로 검증할 수 있다.

### 2. React Query로 상태 범위 한정

React Query는 `QueryClient`를 생성해 `QueryClientProvider`로 감싸고, 해당 Provider 범위 안에서만 캐시와 상태가 공유되게 한다. 앱의 특정 영역만 별도 Provider로 분리하면 상태가 서로 영향을 주지 않는다.

```tsx
// query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });

// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { createQueryClient } from "./query-client";

const queryClient = createQueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

하위 컴포넌트는 `useQuery` 훅으로 데이터를 불러오되, Provider가 감싸는 범위 안에서만 동일한 캐시를 바라본다. 전역 싱글톤 대신 “명시적인 컨텍스트”를 사용해 상태를 가둔 셈이다.

---
pubDatetime: 2024-06-06 21:42:00
title: "Zod를 사용한 nextjs 환경변수 검증"
featured: true
description: "Zod를 사용하여 nextjs에서 환경변수를 검증하는 방법"
tags: ["nextjs", "javascript", "react", "zod"]
ogImage: ../../assets/images/zod.png
---

## Zod

> TypeScript-first schema validation with static type inference

현대 웹 개발에서는 데이터의 무결성과 타입 안전성을 보장하는 것이 매우 중요합니다.
TypeScript-first 스키마 유효성 검사 라이브러리인 Zod는 이러한 필요성을 충족시키며, 중복된 타입 선언을 제거하는 것을 목표로 합니다.

## Zod의 주요 장점

- Zero Dependencies: 프로젝트 의존성을 단순화합니다.
- 크로스 플랫폼: Node.js와 최신 브라우저에서 모두 작동합니다.
- Tiny: 최소화하고 압축했을 때 8kb에 불과합니다.
- Immutable: `.optional()`과 같은 메서드는 새로운 인스턴스를 반환하여 불변성을 유지합니다.
- Concise, chainable interface: 깨끗하고 가독성 높은 코드 스타일을 제공합니다.
- Functional approach: 검증이 아닌 파싱에 중점을 둡니다.
- JavaScript 호환성: TypeScript 없이도 순수 JavaScript에서 사용할 수 있습니다.

## 환경 변수 유효성 검사

개발 중 환경 변수를 자주 사용하게 됩니다. Next.js 프로젝트에서 이러한 변수는 일반적으로 `process.env`를 통해 접급합니다.
하지만 TypeScript는 환경 변수의 타입을 단언할 수 없기 때문에 타입 관련 오류가 발생할 수 있습니다.

다음과 같은 `.env` 파일이 있다고 가정해봅시다:

```text
SUPER_SECRET=supersecret
NEXT_PUBLIC_SECRET_KEY=CRp3cM19$YMZ
```

Next.js 애플리케이션에서 이러한 변수를 사용할 때:

```ts
const onClick = () => {
  run(process.env.NEXT_PUBLIC_SECRET_KEY);
};
```

만약 `run` 함수가 문자열 타입의 매개변수만 받도록 정의되어 있다면, TypeScript는 다음과 같은 타입 오류를 발생시킵니다: `Argument of type 'string | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'.`

이 문제를 해결하기 위해 Zod를 사용하여 환경 변수를 정의하고 유효성을 검사할 수 있습니다.

```ts
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SECRET_KEY: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
});
```

이 코드는 `NEXT_PUBLIC_SECRET_KEY`가 존재하고 문자열 타입임을 보장합니다. 만약 이 변수가 없거나 잘못된 타입이면, 오류가 발생합니다.

## 서버사이드 환경 변수 처리

서버사이드 환경 변수인 `SUPER_SECRET`을 사용할 때 추가적인 문제가 발생할 수 있습니다. 클라이언트 사이드에서 서버사이드 변수를 접근하려고 하면 오류가 발생할 수 있습니다.

```ts
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SECRET_KEY: z.string(),
  SUPER_SECRET: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  SUPER_SECRET: process.env.SUPER_SECRET,
});
```

`SUPER_SECRET`이 정의되지 않으면 다음과 같은 오류가 발생합니다:

```json
ZodError: [
    {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["SUPER_SECRET"],
        "message": "Required"
    }
]
```

이 문제를 해결하기 위해 `@t3-oss/env-nextjs` 라이브러리를 사용할 수 있습니다:

```bash
pnpm add @t3-oss/env-nextjs
```

`env.ts` 파일을 다음과 같이 수정합니다:

```ts
import { createEnv } from "t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPER_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_SECRET_KEY: z.string(),
  },
  runtimeEnv: {
    SUPER_SECRET: process.env.SUPER_SECRET,
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  },
});
```

여기서 서버사이드 변수는 `server` 필드에, 클라이언트 사이드 변수는 `client` 필드에 정의합니다. `runtimeEnv` 객체는 모든 환경 변수를 통합하여 타입 안전성을 보장하고, 정의되지 않은 변수 관련 오류를 제거합니다.

## 결론

Zod와 `@t3-oss/env-nextjs` 라이브러리를 활용하면 Next.js 애플리케이션에서 환경 변수의 타입 안전성을 보장할 수 있습니다. 이러한 접근 방식은 코드의 신뢰성과 유지보수성을 향상시키며, TypeScript 프로젝트에서 환경 변수를 안정적으로 처리할 수 있는 견고한 기반을 제공합니다.

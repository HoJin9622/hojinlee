---
pubDatetime: 2026-08-22
title: "TypeScript Exhaustive Check로 유니온 타입 누락 방지하기"
tags:
  - "typescript"
description: "TypeScript에서 유니온 타입이 확장될 때 분기 처리 누락을 컴파일 타임에 잡아내는 Exhaustive Check 패턴과 assertNever 유틸리티 구현 방법"
---

유니온(Union) 타입을 기반으로 분기 로직(`switch` 또는 `if-else`)을 작성할 때, 새로운 유니온 멤버가 추가되면 기존 분기문에서 이를 누락하더라도 TypeScript 컴파일러가 에러를 감지하지 못하고 조용히 넘어가는 경우가 있습니다.

Exhaustive Check(완전성 검사)는 이러한 누락을 컴파일 타임에 강제하여 런타임 버그를 사전에 차단하는 패턴입니다.

## 문제 상황: 유니온 타입 확장에 따른 분기 누락

결제 수단을 나타내는 `PaymentMethod` 유니온 타입과 각 수단별 처리 함수가 있습니다.

```typescript
type PaymentMethod = "CARD" | "KAKAOPAY";

function processPayment(method: PaymentMethod) {
  switch (method) {
    case "CARD":
      console.log("카드 결제 진행");
      break;
    case "KAKAOPAY":
      console.log("카카오페이 결제 진행");
      break;
  }
}
```

서비스가 확장되어 새로운 결제 수단 `'NAVERPAY'`가 유니온에 추가되었습니다.

```typescript
type PaymentMethod = "CARD" | "KAKAOPAY" | "NAVERPAY";
```

이 상태에서 `processPayment` 함수를 수정하지 않고 빌드하더라도 TypeScript 컴파일러는 아무런 에러나 경고를 발생시키지 않습니다.

결과적으로 런타임에 `'NAVERPAY'`가 인자로 들어오면 어떤 `case`에도 걸리지 않고 함수가 종료되는 **Silent Failure**가 발생합니다.

## Exhaustive Check의 원리

TypeScript의 타입 좁히기(Narrowing)는 조건문을 거치면서 후보 타입을 줄여나갑니다. 정의된 모든 유니온 케이스를 정상적으로 처리하고 나면, 마지막 `default`나 `else` 블록에 도달했을 때의 타입은 논리적으로 존재할 수 없는 상태인 **`never`**가 됩니다.

`never` 타입은 오직 `never` 자신만을 할당받을 수 있습니다.

만약 처리되지 않은 유니온 케이스가 남아있다면, 마지막 지점에서의 타입은 `never`가 아니라 **누락된 해당 타입**(`'NAVERPAY'`)이 됩니다. 이때 이 값을 `never` 타입 변수나 매개변수에 전달하려고 하면 컴파일 에러가 발생합니다.

## 구현 방법

### 1. assertNever 헬퍼 함수

가장 널리 쓰이는 패턴은 `never` 타입을 인자로 받는 헬퍼 함수를 정의하는 것입니다.

```typescript
export function assertNever(value: never): never {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
}
```

### 2. switch 문에서의 활용

`default` 블록에 `assertNever`를 배치합니다.

```typescript
type PaymentMethod = "CARD" | "KAKAOPAY" | "NAVERPAY";

function processPayment(method: PaymentMethod) {
  switch (method) {
    case "CARD":
      console.log("카드 결제 진행");
      break;
    case "KAKAOPAY":
      console.log("카카오페이 결제 진행");
      break;
    default:
      // ❌ Compile Error!
      // Argument of type 'string' (또는 '"NAVERPAY"') is not assignable to parameter of type 'never'.
      return assertNever(method);
  }
}
```

새로운 타입 `'NAVERPAY'`가 추가되었지만 `case`에 정의되지 않았기 때문에, `default` 블록의 `method` 타입이 `never`가 아닌 `'NAVERPAY'`로 평가되어 컴파일 에러가 발생합니다.

모든 케이스를 처리하면 `method`가 `never`로 완전히 좁혀져 컴파일 에러가 사라집니다.

```typescript
function processPayment(method: PaymentMethod) {
  switch (method) {
    case "CARD":
      console.log("카드 결제 진행");
      break;
    case "KAKAOPAY":
      console.log("카카오페이 결제 진행");
      break;
    case "NAVERPAY":
      console.log("네이버페이 결제 진행");
      break;
    default:
      return assertNever(method); // 컴파일 통과
  }
}
```

### 3. if-else 문에서의 활용

Discriminated Union(판별된 유니온) 기반의 `if-else` 체인에서도 동일하게 동작합니다.

```typescript
type Action =
  | { type: "INCREMENT"; amount: number }
  | { type: "DECREMENT"; amount: number }
  | { type: "RESET" };

function reducer(state: number, action: Action): number {
  if (action.type === "INCREMENT") {
    return state + action.amount;
  } else if (action.type === "DECREMENT") {
    return state - action.amount;
  } else if (action.type === "RESET") {
    return 0;
  } else {
    return assertNever(action);
  }
}
```

## Record 타입을 활용한 대안

단순히 유니온 키에 따라 정적 값이나 핸들러를 반환하는 구조라면, `switch` 대신 `Record<K, T>` 객체 매핑을 사용하는 것도 방법입니다.

```typescript
type PaymentMethod = "CARD" | "KAKAOPAY" | "NAVERPAY";

const paymentHandlers: Record<PaymentMethod, () => void> = {
  CARD: () => console.log("카드 결제"),
  KAKAOPAY: () => console.log("카카오페이 결제"),
  NAVERPAY: () => console.log("네이버페이 결제"), // 누락 시 Record 타입에 의해 컴파일 에러
};

function processPayment(method: PaymentMethod) {
  paymentHandlers[method]();
}
```

- **Record 객체 매핑**: 키 누락 시 즉시 컴파일 에러를 발생시키며 코드가 간결합니다.
- **switch + assertNever**: 각 분기마다 실행 흐름이 복잡하거나 타입별 페이로드(속성)가 서로 다를 때 적합합니다.

## 주의할 점

- **런타임 방어**: TypeScript 컴파일 단계를 우회하는 외부 API 응답이나 `any` 타입 캐스팅 등으로 인해 런타임에 정의되지 않은 값이 유입될 수 있습니다. `assertNever` 내부에서 `throw new Error`를 던지도록 작성하면 예기치 않은 런타임 값도 즉시 감지할 수 있습니다.
- **`noImplicitReturns` 옵션과의 차이**: `tsconfig.json`의 `noImplicitReturns`는 반환값이 있는 함수의 일부 경로에서 `return`이 누락된 것만 검사할 뿐, 반환값이 `void`인 함수나 `default`에서 기본값을 반환하는 구조는 검사하지 못합니다. 완전한 타입 안전성을 위해서는 `assertNever`를 통한 Exhaustive Check가 필요합니다.

## 참고 문서

- [TypeScript Handbook: Exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)

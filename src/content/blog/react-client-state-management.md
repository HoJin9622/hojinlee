---
pubDatetime: 2026-08-31
title: "React 클라이언트 상태 관리 가이드 — URL, Context, Zustand, Jotai 선택 기준과 코드 예제"
tags:
  - "react"
  - "state-management"
  - "zustand"
  - "jotai"
  - "frontend"
description: "URL, Context API, Zustand, Jotai의 핵심 개념과 실전 코드 예제를 통해 각 상태 관리 방식의 선택 기준과 트레이드오프를 알아봅니다."
---

새로운 기능을 개발할 때 "이 상태는 어디에 두고 관리해야 할까?"라는 고민을 자주 마주합니다.

단순히 인기 있는 라이브러리를 고르기보다, **상태의 성격과 생명주기(Lifecycle)에 맞는 적절한 기준**을 세우는 것이 중요합니다.

이 글에서는 프론트엔드 클라이언트 상태 관리의 4가지 주요 방식인 **URL, React Context API, Zustand, Jotai**를 실전 코드 예제와 함께 비교해 봅니다.

---

## 1. 상태를 분류하는 4가지 기준

도구를 선택하기 전, 관리하려는 상태가 어떤 특징을 가지는지 다음 4가지 질문으로 분류해 볼 수 있습니다.

1. **공유 범위 (Scope):** 앱 전체에서 접근해야 하는가, 아니면 특정 페이지나 컴포넌트 서브트리에서만 필요한가?
2. **영속성 및 공유성 (Shareability & Persistence):** 새로고침 시 유지되어야 하는가? URL 링크를 통해 타인과 동일한 화면을 공유해야 하는가?
3. **업데이트 빈도 (Update Frequency):** 1초에 수십 번씩 빠르게 변경되는가(타이핑, 드래그), 아니면 거의 변하지 않는가(테마, 언어)?
4. **렌더링 최적화 필요성 (Render Optimization):** 상태 변경 시 불필요한 하위 컴포넌트 렌더링이 성능 병목을 일으킬 수 있는가?

---

## 2. 4가지 상태 관리 방식과 코드 예제

### ① URL (Query Params / Path)

> **"사용자가 새로고침하거나 링크를 공유했을 때 동일한 화면을 복원해야 하는가?"**

브라우저 주소창을 단일 진실 원천(Single Source of Truth)으로 사용하는 방식입니다.

#### 💡 기본 코드 예제: 카테고리 필터

버튼 클릭 시 URL 쿼리 파라미터(`?category=...`)를 직접 변경하고 조회합니다. 사용자가 이 링크를 복사해 공유하거나 페이지를 새로고침해도 선택된 카테고리가 그대로 유지됩니다.

```tsx
import { useSearchParams } from "react-router-dom";

const CATEGORIES = ["all", "electronics", "clothing", "books"] as const;

export const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "all";

  const handleSelect = (category: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (category === "all") {
        next.delete("category");
      } else {
        next.set("category", category);
      }
      return next;
    });
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          style={{
            fontWeight: currentCategory === category ? "bold" : "normal",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
```

- **선택 근거:** 링크 공유성, 브라우저 히스토리(`뒤로 가기`), SSR/SEO 지원
- **적합한 사례:** 검색 키워드, 필터 조건, 정렬 기준, 페이지네이션 번호, 활성 탭

---

### ② React Context API

> **"외부 의존성 없이 특정 컴포넌트 트리에 저빈도 설정값을 주입해야 하는가?"**

React에 내장된 의존성 주입(Dependency Injection) 메커니즘으로 Props Drilling을 해결합니다.

#### 💡 기본 코드 예제: 테마 Provider와 Custom Hook

Context 값이 바뀌면 이를 구독(`useContext`)하는 모든 컴포넌트가 리렌더링되므로, **테마나 언어 설정처럼 변경 빈도가 매우 낮은 정적 데이터**에 가장 적합합니다.

```tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook을 통한 안전한 접근
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

- **선택 근거:** 외부 의존성 없음 (Zero Dependency), 서브트리 스코프 격리
- **적합한 사례:** 다크모드 테마(`Theme`), 다국어(`Locale`), 디자인 시스템의 Compound Component 내부 상태(`<Tabs>`, `<Accordion>` 등)

---

### ③ Zustand (중앙 집중형 / Flux 모델)

> **"전역 상태를 중앙에서 관리하고, React 외부에서도 접근하며, 선택적 렌더링 최적화가 필요한가?"**

간결한 보일러플레이트와 Hook 기반 인터페이스를 제공하는 스토어 중심 전역 상태 관리 라이브러리입니다.

#### 💡 기본 코드 예제: 장바구니 스토어와 Selector 최적화

Zustand는 Provider로 감쌀 필요가 없으며, **Selector를 통해 컴포넌트가 구독할 상태 조각을 지정**하여 불필요한 리렌더링을 방지합니다.

```tsx
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  clearCart: () => void;
}

// 1. 전역 스토어 정의 (액션 함수를 스토어 내부에 응집)
export const useCartStore = create<CartStore>(set => ({
  items: [],
  addItem: item => set(state => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));

// 2. 장바구니 개수 배지 (items.length만 구독 -> 다른 속성이 바뀌어도 리렌더링 X)
export const CartBadge = () => {
  const itemCount = useCartStore(state => state.items.length);
  return <span>장바구니 담긴 수: {itemCount}</span>;
};

// 3. 장바구니 비우기 버튼 (액션만 구독 -> items가 추가/삭제되어도 이 컴포넌트는 리렌더링 X)
export const ClearCartButton = () => {
  const clearCart = useCartStore(state => state.clearCart);
  return <button onClick={clearCart}>비우기</button>;
};
```

- **선택 근거:** Selector 기반 세밀한 리렌더링 제어, Provider 불필요, React 외부(Axios 인터셉터, WebSocket) 접근 가능
- **적합한 사례:** 장바구니, 전역 오디오/비디오 플레이어, 전역 모달/토스트 시스템, 인증 세션 상태

---

### ④ Jotai (원자형 / Atomic 모델)

> **"상태를 작은 단위(Atom)로 분할하고, 파생 상태(Derived)와 비동기 처리를 유연하게 결합해야 하는가?"**

상향식(Bottom-up) 원자 단위 상태 관리 라이브러리로, 상태 간의 의존성 그래프와 파생 상태를 선언적으로 다룹니다.

#### 💡 기본 코드 예제: 수량/단가 원자와 파생(Derived) 원자

Jotai는 상태를 `atom` 단위로 쪼갭니다. 파생 원자는 의존하는 원자가 변경될 때만 자동으로 다시 계산되며, **해당 원자를 직접 구독하는 컴포넌트만 정밀하게 리렌더링**됩니다.

```tsx
import { atom, useAtom, useAtomValue } from "jotai";

// 1. 기본 원자 (Primitive Atoms)
export const priceAtom = atom<number>(10000);
export const quantityAtom = atom<number>(1);

// 2. 파생 원자 (Derived Atom: price와 quantity에 의존하여 자동 계산)
export const totalPriceAtom = atom(get => get(priceAtom) * get(quantityAtom));

// 3. 수량 조절 컴포넌트 (quantityAtom만 구독)
export const QuantitySelector = () => {
  const [quantity, setQuantity] = useAtom(quantityAtom);
  return (
    <div>
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(q => q + 1)}>+</button>
    </div>
  );
};

// 4. 총 결제 금액 컴포넌트 (totalPriceAtom만 구독 -> 단가나 수량이 바뀔 때만 리렌더링)
export const OrderSummary = () => {
  const totalPrice = useAtomValue(totalPriceAtom);
  return <h3>총 결제 금액: {totalPrice.toLocaleString()}원</h3>;
};
```

- **선택 근거:** Selector 작성 없이도 원자 단위의 정밀한(Fine-grained) 리렌더링 최적화, 선언적인 파생 상태(Derived Atom), Suspense/비동기 친화성
- **적합한 사례:** 화이트보드/캔버스(각 도형 요소가 개별 atom), 수식 스프레드시트, 필드 간 상호 의존성이 복잡한 폼

---

## 3. 실무 선택 요약 (Decision Matrix)

| 구분              | URL                             | React Context               | Zustand                        | Jotai                         |
| :---------------- | :------------------------------ | :-------------------------- | :----------------------------- | :---------------------------- |
| **주요 패러다임** | Web 표준 (Location)             | React Dependency Injection  | 중앙 집중형 (Flux / Store)     | 분산 원자형 (Atomic)          |
| **상태 범위**     | 전역 (브라우저 주소창)          | Provider 하위 컴포넌트 트리 | 전역 (React 내/외부 모두)      | 전역 / Atom 단위              |
| **공유 / 영속성** | 새로고침 / 링크 공유 가능       | 메모리 (새로고침 시 소멸)   | 메모리 (Persist 미들웨어 가능) | 메모리 (Storage 연동 가능)    |
| **변경 빈도**     | 낮음 ~ 중간 (브라우저 I/O 고려) | 매우 낮음 (정적 설정)       | 높음 (Selector 최적화)         | 매우 높음 (Atom 단위 최적화)  |
| **주요 강점**     | SEO, 히스토리, 링크 공유        | 외부 의존성 없음            | 직관적인 구조, React 외부 접근 | 정밀한 렌더링 제어, 파생 상태 |

_(※ 서버 데이터 캐싱 및 동기화는 TanStack Query나 SWR 같은 서버 상태 라이브러리에 위임하는 것을 권장합니다.)_

---

## 4. 마치며: 상태 관리 실무 가이드 (Rule of Thumb)

1. **화면 조회 조건 / 공유가 필요한 뷰 상태:** 👉 **URL State** (검색, 필터, 탭, 페이지)
2. **테마, 로케일, 컴포넌트 서브트리 격리:** 👉 **Context API** (정적 환경 설정)
3. **일반적인 전역 클라이언트 상태:** 👉 **Zustand** (장바구니, 전역 UI, 외부 통신 연계)
4. **세밀한 인터랙션, 파생 상태가 많은 복잡한 UI:** 👉 **Jotai** (캔버스, 스프레드시트, 복잡한 폼)

모든 상태를 하나의 도구로 해결하려 하기보다, 각 도구의 장단점에 맞춰 **적재적소에 조합**하는 것이 유지보수하기 쉬운 프론트엔드 아키텍처를 만드는 핵심입니다.

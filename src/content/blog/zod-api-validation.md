---
pubDatetime: 2024-06-08 02:21:00
title: "Zod와 Sentry를 이용한 API 응답 유효성 검사"
featured: true
description: "Zod를 사용하여 API Response 값을 검증하고 Sentry에 올리기"
tags: ["javascript", "react", "sentry", "zod"]
ogImage: ../../assets/images/zod.png
draft: true
---

## Zod와 Sentry를 이용한 API 응답 유효성 검사

프론트엔드 개발을 하다 보면, 서버의 API 응답 구조가 변경되었음에도 불구하고 백엔드 개발자가 이를 알리지 않으면 알아차리기 어려울 때가 있습니다. 특히, 필요로 하는 필드가 사라질 때 자바스크립트는 객체의 존재하지 않는 필드에 접근해도 오류를 발생시키지 않기 때문에 문제가 발생할 수 있습니다. 이러한 문제를 해결하기 위해 Zod와 Sentry를 사용하여 신속하게 감지할 수 있는 구조를 구축하는 방법을 알아보겠습니다.

## 프로젝트 설정

우선 간단한 Next.js 프로젝트를 생성합니다.

```bash
pnpm create next-app zod-example
```

이 예제에서는 pages 라우터를 사용하였으며, React 프로젝트에도 동일하게 적용할 수 있습니다. 다음은 간단한 fetch 함수를 작성한 예시입니다.

```ts
export const getBooks = async () => {
  const res = await fetch("/api/books");
  const books = await res.json();

  return books;
};
```

해당 API는 책 목록을 반환합니다.

```ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(books);
}

const books = [
  {
    name: "Dune",
    author: "Frank Herbert",
    year: "1965",
  },
  {
    name: "Ender's Game",
    author: "Orson Scott Card",
    year: "1985",
  },
  // ... 기타 책 데이터
];
```

`/pages/api/books` 경로에서 책 목록을 반환하도록 설정하였습니다. 이제 해당 책 목록을 보여주는 컴포넌트를 작성해보겠습니다.

```tsx
import { useState, useEffect } from "react";
import { getBooks } from "./path-to-your-fetch-function"; // 적절한 경로로 수정

export default function BookList() {
  const [books, setBooks] = useState<Books>([]);

  useEffect(() => {
    (async () => {
      const books = await getBooks();
      setBooks(books);
    })();
  }, []);

  return books.map(book => (
    <div key={book.name}>
      <div>이름: {book.name}</div>
      <div>저자: {book.author}</div>
      <div>출간일: {book.year}</div>
    </div>
  ));
}
```

책 목록을 가져와 간단하게 보여주는 컴포넌트를 작성했습니다. 이제, 백엔드 개발자가 `author` 필드명을 `writer`로 변경했다고 가정해봅시다.

```ts
const books = [
  {
    name: "Dune",
    writer: "Frank Herbert",
    year: "1965",
  },
  // ... 기타 책 데이터
];
```

이와 같이 `writer`로 변경되더라도 프론트엔드에서는 오류가 발생하지 않습니다.

```ts
console.log(book.author); // undefined
```

## API 응답 유효성 검사

필드가 존재하지 않는 경우 `undefined`를 반환하며 오류는 발생하지 않습니다. 이제 Zod를 사용하여 이러한 상황을 방지해보겠습니다.

```bash
pnpm add zod
```

먼저 Zod를 설치하고 `getBooks` 함수를 다음과 같이 변경합니다.

```ts
import { z } from "zod";

export const Book = z.object({
  name: z.string(),
  author: z.string(),
  year: z.string(),
});
export type Book = z.infer<typeof Book>;

export const Books = z.array(Book);
export type Books = z.infer<typeof Books>;

export const getBooks = async (): Promise<Books> => {
  const res = await fetch("/api/books");
  const books = await res.json();

  return Books.parse(books);
};
```

이제 Zod는 `author` 필드가 존재하지 않으면 오류를 발생시킵니다. 이렇게 하면 백엔드의 변경 사항을 개발 중 쉽게 감지할 수 있습니다. 하지만, 프로덕션 환경에서는 오류 화면이 사용자에게 노출되면 곤란합니다.

## 프로덕션 환경 설정

이제 `safeParse`와 Sentry를 결합하여 프로덕션 환경에서 오류를 발생시키지 않으면서도 문제를 감지할 수 있도록 설정해보겠습니다.

```bash
npx @sentry/wizard@latest -i nextjs
```

Sentry를 설치한 후 `getBooks` 함수를 다음과 같이 변경합니다.

```ts
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export type Book = z.infer<typeof Book>;
export const Book = z.object({
  name: z.string(),
  author: z.string(),
  year: z.string(),
});

export type Books = z.infer<typeof Books>;
export const Books = z.array(Book);

export const getBooks = async (): Promise<Books> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/books`);
  const books = await res.json();

  const { error } = Books.safeParse(books);

  if (error) {
    Sentry.captureException(error);
  }

  return books;
};
```

`safeParse`를 사용하면 사용자에게 오류가 노출되지 않으며, 오류가 발생한 경우 `Sentry.captureException(result.error)`를 통해 Sentry에 알림을 보낼 수 있습니다. 이를 통해 프로덕션 환경에서도 안전하게 오류를 감지하고 대응할 수 있습니다.

## 결론

Zod와 Sentry를 활용하여 API 응답의 유효성을 검사하고, 백엔드 변경 사항을 신속하게 감지할 수 있는 방법을 살펴보았습니다. 이러한 접근 방식은 개발 중 문제를 빠르게 파악하고, 프로덕션 환경에서도 안전하게 문제를 모니터링할 수 있도록 도와줍니다. 이를 통해 프론트엔드 애플리케이션의 안정성과 신뢰성을 높일 수 있습니다.

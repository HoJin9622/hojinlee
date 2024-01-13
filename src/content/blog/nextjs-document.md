---
title: "Next.js _document.js"
description: "Next.js _document.js"
pubDatetime: 2020-12-15
tags:
  - "nextjs"
coverImage: "/images/nextjs.png"
---

# \_document.js

[next.js document 문서](https://nextjs.org/docs/advanced-features/custom-document)

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

\_document.js 의 기본 구조이다.

\_document.js 는 함수형태로 작성이 되지않고 위와같이 작성해야한다.

\_document.js는 pages 폴더 하위에 생성을 한다.

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

Head 태그를 열고 안에 tailwind css의 CND link 코드를 붙여넣는다.

그러면 사이트의 페이지소스 보기를하면 head 태그안에 붙여넣은 link가 있는 것을 확인할 수 있다.

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

언어 코드를 집어넣을 수도 있다.

`<!DOCTYPE html><html lang="ko"><head>...` 페이지 소스보기를 클릭하면 다음과 같이 적용된 것을 확인할 수 있다.

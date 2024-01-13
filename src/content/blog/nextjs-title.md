---
title: "Next.js Title 변경"
description: "Next.js Title 변경"
pubDatetime: 2020-12-15
tags:
  - "nextjs"
coverImage: "/images/nextjs.png"
---

# Title 변경

```js
import Head from "next/head";
```

Head를 import 해준다.

```js
<Head>
  <title>Article List</title>
</Head>
```

컴포넌트 내부에 Head 태그로 감싼 title 태그를 정의 후 원하는 타이틀을 넣는다.

해당 페이지의 title을 재정의 해주게 된다.

# Title 전역으로 설정

```js
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create Next App Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

\_app.js 파일의 head > title 을 변경해준다.

그러면 페이지에 title 설정이 되어있지않는 모든 페이지들은 Create Next App Demo 라는 타이틀을 보게된다.

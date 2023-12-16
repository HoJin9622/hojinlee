---
title: 'Next.js Pages와 Routing'
subtitle: 'Next.js Pages와 Routing'
date: '2020-12-15'
category: 'nextjs'
coverImage: '/images/nextjs.png'
---

# Pages 폴더

next.js 에서는 `import React from 'react'`를 쓰지않아도 정상동작한다.

pages폴더에 second.js 파일을 만들고

```js
import React from 'react';

function Second(props) {
  return <div>This is Second Page</div>;
}

export default Second;
```

위 코드를 입력한 후 웹사이트의 /second 페이지로 가면 `This is SecondPage`라고 나타나게 된다.

pages 폴더안에 component 파일이 있으면 그 파일명이 그대로 사이트의 주소가 된다.

pages 폴더안에 articles라는 폴더를 새로 만들고 readme.js 를 작성한다

```js
function ReadMe(props) {
  return (
    <div>
      <h1>Read Me</h1>
    </div>
  );
}

export default ReadMe;
```

그 후 /articles/readme 페이지로 가보면 작성한 화면을 볼 수 있다.

이젠 articles 폴더 내부에 index.js 파일을 작성한다.

```js
function Page(props) {
  return (
    <div>
      <h1>Article List</h1>
    </div>
  );
}

export default Page;
```

그 후 /articles 페이지로 가보면 작성한 화면을 볼 수 있다.

# \_app.js

모든 페이지들을 감싸는 영역

```js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <p>텍스트 출력</p>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

위와 같이 작성하게되면 모든 페이지에서 "텍스트 출력"이라는 글을 확인할 수 있다.

# Link

```js
import Link from 'next/link';

function Page(props) {
  return (
    <div>
      <h1>Article List</h1>

      <ul>
        <li>
          <Link href="/articles/readme">
            <a>README</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Page;
```

next/link에서 Link를 import하여 a 태그를 Link 태그로 감싸주고 href를 설정해주면 SPA처럼 동작하게 된다.

# Route

```js
import { Button } from 'antd';
import axios from 'axios';
import Router from 'next/router';

function GetDouble(props) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="text-6xl">{props.value}</div>

      <div className="mt-4">
        <Button onClick={() => Router.back()}>돌아가기</Button>
      </div>
    </div>
  );
}

GetDouble.getInitialProps = async function (context) {
  const value = context.query.value;
  const response = await axios.get(
    'http://localhost:1234' + '/api/double?value=' + value,
  );
  return {
    value: response.data.value,
  };
};

export default GetDouble;
```

next/js에서 Router를 import 한다.

그 후 `Router.back()` 함수를 실행하면 뒤로가게 된다.

Router를 사용하여 스크립트 상에서 페이지 이동이 가능하게 된다.

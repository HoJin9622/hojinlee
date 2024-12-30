---
title: "Next.js Data Fetching & Dynamic Route"
description: "Next.js Data Fetching & Dynamic Route"
pubDatetime: 2020-12-15
tags:
  - nextjs
ogImage: "../../assets/images/nextjs.png"
---

## Data Fetching

cra로 프로젝트를 만들어 데이터를 가져오는 방식

useEffect를 사용하고 axios를 이용하여 get을 한 후 데이터를 가져와 사이트의 페이지소스보기를 확인하면

불러온 데이터가 표시되지 않는 것을 볼 수 있다.

이러한 부분 때문에 그 데이터가 검색엔진에 노출되어야 한다, 서버사이드로 동작해야한다면 다른 방식으로 구현해야한다.

## getInitialProps

```js
import Link from "next/link";
import axios from "axios";

function GetUuid(props) {
  return (
    <div className="v-full flex h-screen flex-col items-center justify-center">
      {props.uuid}
      <div className="mt-4">
        <Link href="/">
          <a>돌아가기</a>
        </Link>
      </div>
    </div>
  );
}

// getInitialProps
GetUuid.getInitialProps = async function () {
  // 반드시 async function 으로 작성
  const response = await axios.get("http://localhost:1234" + "/api/uuid");
  return {
    uuid: response.data.uuid,
  };
};

export default GetUuid;
```

GetUuid 컴포넌트에 getInitialProps를 추가해준다.

getInitialProps 함수는 반드시 async-await 으로 작성해주어야 한다.

그 후 return 한 객체를 props로 사용할 수 있다.

getInitialProps는 프론트단에서 render 되기전에 동작하게 된다.(새로고침 할때)

홈페이지에서 getInitialProps가 있는 페이지로 갈 경우 프론트에서 동작함.(즉슨 양쪽에서 동작)

getInitialProps는 pages 폴더 밑에서만 동작한다.(사용자가 생성한 component 폴더에서는 불가)

### queryString

```js
import { Button } from "antd";
import axios from "axios";

function GetDouble(props) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="text-6xl">{props.value}</div>

      <div className="mt-4">
        <Button>돌아가기</Button>
      </div>
    </div>
  );
}

GetDouble.getInitialProps = async function (context) {
  const value = context.query.value;
  const response = await axios.get(
    "http://localhost:1234" + "/api/double?value=" + value
  );
  return {
    value: response.data.value,
  };
};

export default GetDouble;
```

get 주소는 숫자 하나를 보내면 두배로 반환해주는 api 이다.

주소에 query string이 있으면(ex: localhost:1234/get-dobule?value=100)

함수에 첫번째 인자로 context를 쓴 후 context.query 에서 데이터를 가져온다.

`{ value: '100' }` context.query의 console.log 내용이며 value는 querystring에 정의해준대로이다.

## Dynamic Route

기존 작성하였던 파일을 get-double이라는 폴더를 만들고 get-double.js 파일의 이름을 `[value]`로 변경하고 get-double 폴더로 옮긴다.

그 후 `localhost:1234/get-double/30` 으로 접속을하면 두배가 된 60의 값을 볼 수 있다.

\[value]가 아닌 \[number]라고 작성하면 `context.query.number` 로 값을 불러오면 된다.

### Dynamic Route에 대한 Link

```js
<Link href="/get-double/[value]" as="/get-double/11">
  <a>Get Double of 11</a>
</Link>
<Link href="/get-double/[value]" as="/get-double/33">
  <a>Get Double of 33</a>
</Link>
```

as를 사용하여야서 이동하여야 한다.

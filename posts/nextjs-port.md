---
title: 'Next.js 실행 포트 변경 방법'
subtitle: 'Next.js 실행 포트 변경 방법'
date: '2020-12-15'
category: 'NextJS'
coverImage: '/images/nextjs.png'
---

# 직접 지정

```json
{
  "name": "cna-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 1234",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.5.3",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  }
}
```

package.json 파일의 scripts에 -p 옵션을 주고 원하는 포트를 입력한다.

# 환경변수 사용

```json
{
  "name": "cna-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p ${PORT}",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.5.3",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  }
}
```

`PORT=2345 npm run dev` 실행 시 2345포트에서 실행된다.

맥, 리눅스 계열에서만 사용가능하며, 윈도우에서는 불가능하다.

# cross-env 사용

`npm i -D cross-env`

cross-env를 사용하면 맥, 리눅스, 윈도우에 관계없이 사용가능하다.

unix 표현식을 사용해도 윈도우 표현식으로 바꿔서 실행한다.

```json
{
  "name": "cna-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "cross-env next dev -p ${PORT}",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.5.3",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  },
  "devDependencies": {
    "cross-env": "^7.0.2"
  }
}
```

위와 같이 바꿔주면 맥, 윈도우, 리눅스 상관없이 실행이 가능하다.

만약 환경변수 PORT를 지정하지 않고 실행하면 에러가 발생한다.

```json
{
  "name": "cna-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "cross-env next dev -p ${PORT-3000}",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.5.3",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  },
  "devDependencies": {
    "cross-env": "^7.0.2"
  }
}
```

뒤에 `-3000`을 붙여주게되면 PORT를 지정하지 않으면 3000번 포트로 실행되게 된다.

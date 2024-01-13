---
pubDatetime: 2021-12-22
title: "Typescript 변수 뒤의 느낌표(!) 사용"
tags:
  - "typescript"
description: "Typescript 변수 뒤의 느낌표(!) 사용"
ogImage: "../assets/images/typescript-assertions.png"
---

### Definite Assignment Assertions

![](https://images.velog.io/images/hojin9622/post/21a6645d-7ef0-4bf1-a825-d4bf2ee582e9/Screen%20Shot%202021-12-22%20at%2011.25.31%20PM.png)

타입스크립트에서 다음과 같은 상황에서 변수 x의 값이 할당되지 않았다고 에러가 발생한다.

![](https://images.velog.io/images/hojin9622/post/19878b46-ebe6-407c-ae7a-c3c0dcf09e52/Screen%20Shot%202021-12-22%20at%2011.25.54%20PM.png)

하지만 변수 x 의 값이 있다는걸 확신할 수 있다면
변수 뒤에 느낌표(!)를 붙여주게 되면 에러가 발생하지 않는다.

타입스크립트 핸드북 : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions

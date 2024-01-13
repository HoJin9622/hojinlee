---
author: Jin
pubDatetime: 2022-09-06
title: "2022 Dev-Matching: 웹 프론트엔드 개발자(하반기)-1 후기"
tags:
  - review
description: vanilla js...
ogImage: "../../assets/images/2022-dev-matching-frontend-review.png"
---

![](https://velog.velcdn.com/images/hojin9622/post/63d4a5a6-78af-4d91-bf69-eeca97bd6b57/image.jpg)

과제테스트였고 js만으로 요구사항을 구현하는 과제였다.
평소 vanilla js로는 웹사이트를 구현해본 경험이 없어 구글링을 열심히 한다고 시간이 모자랐다 ㅠ...
`document.querySelector`로 기능들을 구현하려고 했으나 html이 DOM에 render되기 전에는 해당 클래스에 접근하지 못해 `undefined`로 나타나 문제가 발생하였는데 시험이 종료되기 전까지 끝내 해결하지 못해서 너무 아쉬웠다.
그리고 다른 js파일을 import 할때도 에러가 발생했는데 이 부분을 해결하기까지도 시간이 꽤 소모되었다.
stackoverflow에서 답변을 찾게되었는데 매우 간단한 문제여서 허탈하였다.

```js
import Component from '../components/Component'; # 에러
import Component from '../components/Component.js';
```

import를 할때 파일의 확장자를 붙이지 않아서 발생한 에러였다.
기능을 많이 구현안해서 당연히 불합격일 것이라 생각했는데
![](https://velog.velcdn.com/images/hojin9622/post/3fa27048-1d47-4530-963a-918248a60527/image.png)
생각과는 다르게 통과 메일을 받았다!
이번 과제테스트로 vanilla js에 대해 조금 더 공부해야겠다고 생각했다👏

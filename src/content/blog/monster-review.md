---
title: "먼스터 개발 회고록"
description: "여기저기 흩어진 적금/예금 특판 정보 먼스터! 개발 회고록"
pubDatetime: 2022-02-16
tags:
  - "review"
coverImage: "/images/monster.png"
---

## Liked

---

평소 회사에서 React Native로 프론트엔드 개발을 주로 진행하기 때문에 BackEnd에 원하는 기술을 사용해서 프로젝트를 진행하고 싶었다.

프로젝트에 사용한 기술들은 다음과 같다.

#### FrontEnd

- React Native
- React
- Apollo Client

#### BackEnd

- NestJS
- GraphQL
- TypeORM

#### DevOps

- Heroku
- Netlify
- Postgresql

NestJS를 이용하여 실제 프로젝트를 진행해보고 싶어 BackEnd로 선택하였다.
React를 사용하여 은행 예/적금 상품을 등록하는 관리자 화면을 구성하고 React Native로 모바일에서 예/적금 상품들을 보여주었다.
데이터베이스는 Postgresql을 사용하였고 TypeORM을 사용하여 데이터베이스와 통신하였다.
배포는 AWS를 이용하고 싶었지만, 유료라서 포기하고 Heroku와 Netlify를 이용하였다.

목표는 IOS, Android 두 플랫폼을 문제없이 출시하는 것이었다.

![](https://images.velog.io/images/hojin9622/post/89d7a83c-e787-466e-b728-e2fbe9447a22/Screen%20Shot%202022-02-15%20at%2011.59.54%20PM.png)
출시 후 3~4개월이 지난 지금 첫 목표인 문제 없이 출시는 무사히 완료하였고, 지금은 Google Analytics를 적용해 DAU 30명대인 것을 볼 수 있다.

![](https://images.velog.io/images/hojin9622/post/58d7d1f2-ed47-440d-a202-38f57ff87e70/Screen%20Shot%202022-02-16%20at%2012.04.16%20AM.png)
에러 로깅은 Firebase Crashlytics를 사용하고 있으며 Android FastImage 관련해서 3건의 비정상 종료 이벤트가 있는 것으로 보인다.
이 부분도 다음 배포때 수정해야겠다 ㅠㅠ

## Lacked

---

BackEnd 단에서는 은행 예/적금 상품 Pagination을 구현하였는데 FrontEnd 단에서 구현에 실패하였다.
아이템 Filter와 Pagination과 Caching을 동시에 구현하는 걸 원했으나 적용되지 않아서 일단은 상품의 개수가 적어서 모든 상품을 한꺼번에 불러오도록 처리해두었다.
그리고 관리자 화면의 디자인 및 편의성이 부족하다.
등록한 예/적금 상품의 수정이 불가능하고 상품을 등록할 때의 필수 값 설명과 Input이 적절하게 구성되지 않아서 상품 업로드는 관리자 화면을 만든 나 말고는 다루기 힘들게 되어있다.
![](https://images.velog.io/images/hojin9622/post/1e6161a7-9ff4-4efd-854d-1efdc891563f/Screen%20Shot%202022-02-15%20at%2011.49.20%20PM.png)
![](https://images.velog.io/images/hojin9622/post/4478b903-4d3c-4d34-a21e-87f7e9a8a178/Screen%20Shot%202022-02-15%20at%2011.58.15%20PM.png)
부실한 상품 추가 화면과 상품 목록 ㅠㅠ

## Learned

---

NestJS를 실제 프로젝트에 적용해본 것은 처음이라 서툴렀지만, 꽤 실력 향상이 도움이 되었다고 생각한다.
그리고 데이터베이스 관계에 대한 이해도가 처음에 비해 비약적으로 늘었다고 나는 생각한다.

## Longed for

---

관리자 화면의 개선이 시급한 것 같다.
React + Antd 의 조합을 이용하였는데 Antd 는 디자인이 Antd 인 것이 너무 티가 나서 Nest + Tailwind로 Develop 해보려고 한다.
또한 Form Validation이 추가되어야 다른 사람들도 예/적금 상품의 업로드가 원활하게 할 수 있을 것 같다.
관리자 화면의 개선이 완료되면 애플리케이션에서 Filter와 Pagination, Caching에 대해 더 알아보아서 적용까지 완료해봐야겠다.

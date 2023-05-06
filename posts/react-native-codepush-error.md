---
title: "Use of undeclared identifier 'CodePush' 에러 해결"
subtitle: "Use of undeclared identifier 'CodePush' 에러 해결"
date: '2021-02-16'
category: 'React Native'
---

React Native IOS 에 코드푸시를 적용한 후 Archive를 할 때 `Use of undeclared identifier 'CodePush'` 라는 에러가 발생하였다.

![](https://images.velog.io/images/hojin9622/post/2642934a-a879-44b7-bec7-7ba1384156f1/Screen%20Shot%202021-02-16%20at%2011.20.58%20PM.png)

기존 AppDelegate.m 코드에서 에러가 발생하여 검색 후 아래 참고글에서 해결방법을 발견하였다.
[참고글](https://fantashit.com/use-of-undeclared-identifier-codepush/)

![](https://images.velog.io/images/hojin9622/post/4673a732-f83f-489c-a50c-5ad6bea5cf81/Screen%20Shot%202021-02-16%20at%2011.22.35%20PM.png)
코드 푸시 import 부분을 `#ifdef FB_SONARKIT_ENABLED` 위로 옮겨주는 해결이 되는 문제였다.

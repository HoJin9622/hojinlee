---
title: 'numberOfLines를 이용한 텍스트 생략'
subtitle: 'numberOfLines를 이용한 텍스트 ... 으로 생략'
date: '2020-12-25'
category: 'React Native'
---

Text 컴포넌트의 ellipsizeMode와 numberOfLines를 설정하여 텍스트를 자연스럽게 생략할 수 있다.

## 프로젝트 기본 세팅

![](https://images.velog.io/images/hojin9622/post/3f56bdb3-645f-4b5b-b4a6-99e51c36e57a/code.png)
![](https://images.velog.io/images/hojin9622/post/3ce009da-60f2-4dca-83fc-346cf5be66de/Screen%20Shot%202020-12-25%20at%2011.11.50%20PM.png)

## 사용법

`numberOfLines` props로 Text를 몇줄 보여줄 것인지 정한다.
그리고 ellipsizeMode는 기본 tail 값을 가지며 '...' 을 어느위치에 보여줄 것인지를 정하게 된다.
![](https://images.velog.io/images/hojin9622/post/8f6d676b-99a5-41bd-9f5e-433e6883ea58/code.png)
![](https://images.velog.io/images/hojin9622/post/4cbb2d8c-1f63-4aa8-b8f9-9b45ce473643/Screen%20Shot%202020-12-25%20at%2011.14.43%20PM.png)

`numberOfLines` 속성을 3을 주고 ellipsizeMode='tail'을 주어 3번째 줄부터 `...`으로 생략한다. ellipsizeMode의 default 값이 tail 이므로 생략해도 정상동작하게 된다.

그외 ellipsizeMode에는 'head', 'middle', 'tail', 'clip' 의 속성이 있다.

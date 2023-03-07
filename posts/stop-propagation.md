---
title: 'stopPropagation을 이용한 이벤트 전파 제거'
subtitle: 'stopPropagation 을 이용한 함수 중복 수행 제거'
date: '2021-03-14'
category: 'Javascript'
coverImage: '/images/stop-propagation.png'
---

![](https://images.velog.io/images/hojin9622/post/b34cca9f-8c27-4542-aa8e-1aa69a4db2d4/Screen%20Shot%202021-03-14%20at%209.30.36%20PM.png)

위 스크린샷의 녹색 부분이 inner 영역이고 회색 부분이 out 영역이며, 각 영역을 클릭했을 때, `console.log('영역click!')` 이라고 출력되기 만들었다.

```js
const outClick = () => {
  console.log('outClick!')
}

const innerClick = () => {
  console.log('innerClick!')
}

return (
  <div
    style={{ width: '100vw', height: '100vh', background: '#e0e0e0' }}
    onClick={outClick}
  >
    <div
      style={{ width: '50%', height: '50%', background: 'green' }}
      onClick={innerClick}
    ></div>
  </div>
)
```

코드는 위와 같이 작성하였다.
바깥 부분의을 클릭하면 outClick 함수가 실행되고, 내부를 클릭하면 innerClick 함수가 실행된다.
여기서 문제점은 안쪽의 녹색 영역을 클릭했을 때 innerClick 함수와 outClick 함수가 동시에 실행된다는 점이다.

이 문제를 해결하기 위해서는 아래와 같이 innerClick 함수를 수정하면 된다.

```js
const innerClick = (e: any) => {
  e.stopPropagation()
  console.log('innerClick!')
}
```

`e.stopPropagation()` 함수를 사용하면 현재 이후의 이벤트 전파를 막을 수 있다.

![](https://images.velog.io/images/hojin9622/post/ebbdb173-03ae-4d9b-a2e9-31787a5dfaa9/Screen%20Shot%202021-03-14%20at%209.33.50%20PM.png)

녹색 영역을 클릭했을 때 정상적으로 innerClick 만 출력된 모습이다.

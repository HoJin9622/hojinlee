---
pubDatetime: 2020-12-15
title: "Redux 기본 사용법"
tags:
  - "react"
description: "Redux 기본 사용법"
---

# Redux란?

redux는 애플리케이션의 여러 곳에서 공유되는 데이터를 관리할 때 사용한다.
다른 페이지를 갔다가 돌아왔을 때 그 상태를 유지할 필요가 있는 데이터, 예를 들어 로그인 정보 같은 것들이다.

## install

```sh
$ yarn add redux
```

위 명령어로 redux 사용이 가능하다.

```sh
$ npm install redux
```

npm을 사용한다면 위 명령어를 사용할 수 있다.

## createStore & reducer

```js
import { createStore } from "redux";

const reducer = () => {};

const store = createStore(reducer);
```

redux에는 createStore라는 함수가 있다.
store가 하는 일은 기본적으로 data를 넣을 수 있는 장소를 생성한다.
Store는 state를 넣는 곳이고, state는 어플리케이션에서 바뀌는 데이터를 의미한다.
createStore를 할 때 매개변수에는 reducer가 꼭 필요하다.
reducer는 함수이고 data(state)를 수정한다.
reducer가 "hello"를 return한다면 "hello"가 어플리케이션에 있는 data가 될 것이다.

```js
const countModifier = () => {
  return "hello";
};

const countStore = createStore(countModifier);

console.log(countStore.getState()); // console : hello
```

createStore 함수로 만들어지는 store의 변수명은 위 예시처럼 countStore처럼 다른 이름 이어도 상관없으며 reducer도 마찬가지이다.
위 예시처럼 reducer에서 return하는 값이 Store의 data가 된다.
`console.log(countStore.getState())`로 값을 확인하면 return 한 hello 가 출력되는 것을 확인할 수 있다.

## action & dispatch

이제 값을 수정할 때 사용하는 것이 action이다.
action은 redux에서 function을 부를 때 쓰는 두번째 paremeter, 혹은 argument이다.

```js
const countModifier = (count = 0, action) => {
  console.log(action); // {type: "@@redux/INITp.b.n.o.c.r"} {type: "HELLO"}
  return count;
};

const countStore = createStore(countModifier);

countStore.dispatch({ type: "HELLO" });
```

dispatch는 reducer에 action을 보내는 방법이다.
dispatch에는 객체만이 들어갈 수 있고 반드시 type도 있어야한다.
type의 이름을 바꿀 수는 없다.
dispatch를 사용하면 redux가 countModifier를 호출할 것이고 console.log(action)이 호출되는 것이다.

```js
const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

const countStore = createStore(countModifier);

countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

console.log(countStore.getState()); // 4
```

dispatch로 type: "ADD"를 5번 보냄으로써 count + 5가 되고
마지막에 type: "MINUS"를 1번 보냄으로써 count - 1이 되고 최종적으로 4가 찍히는 모습이다.

## subscribe

subscribe는 state안에 있는 변화들을 알 수 있게 해준다.

```js
const onChange = () => {
  console.log(countStore.getState());
};

countStore.subscribe(onChange);
```

위의 결과로 state가 변경되면 onChange 함수가 실행되어 `console.log` 결과로 값이 변경되는 것을 볼 수 있다.

## 보편적 사용

if를 쓰는 것보다 switch를 사용한다.
redux 공식문서에서도 switch를 사용하고 훨씬 낫다고 한다.
그리고 `{type: string}`을 사용하지않고 상수를 사용해주는 것이다.
그러면 "ADDD" 같은 오타가 발생했을 때 string으로는 js 가 에러를 알려주지 않지만
`type: ADD` 로 하면 오타로 `type: ADDD` 로 했을 경우 js 는 ADDD가 선언되지 않았다고 에러를 알려줄 것이다.

```js
const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));
```

위 코드는 if문을 case문으로 수정하고 `{type: 'ADD'}`를 `{type: ADD}`로 수정한 것이다.

## 주의점

만약 reducer에서 배열을 return 할 때 그 배열을 직접 수정해서는 안된다.
store.getCurrent() + 1 같은 방법도 사용하면 안되고 store의 state를 수정하는 방법은 action을 꼭 보내야한다.
`return state.push(action.text)` 와 같은 방법도 사용하면 안된다.
filter, find 같은 함수를 사용하여 새로운 배열을 만들어 return 해야 한다.

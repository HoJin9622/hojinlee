---
pubDatetime: 2020-12-15
title: "redux toolkit 사용하기"
tags:
  - "react"
description: "redux toolkit 사용하기"
---

## Redux toolkit

많은 양의 redux 코드를 더 적은 양의 코드로 쓰게 도와주는 것.

[Redux toolkit 문서 바로가기](https://redux-toolkit.js.org/introduction/quick-start)

## 설치

```sh
yarn add @reduxjs/toolkit
```

먼저 redux toolkit을 설치한다.

## createAction

```js
const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};


const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
```

기존 작성하였던 위의 코드를

```js
import { createAction } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.text, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};
```

createAction을 사용해 더 짧게 작성 할 수 있다.
그리고 addToDo에는 type과 text를 가졌지만 createAction을 사용하면 type과 payload만 남게된다.
`console.log()`를 해보면 text가 사라지고 payload가 있는 것을 볼 수 있다.
payload의 이름은 redux toolkit이 우리에게 제공하는 것이라서 변경할 수는 없다.
action으로 보내고 싶은 정보는 payload에 담기게 된다.

```js
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }
};
```

그러므로 6번째 줄의 action.text를 action.payload로 바꿔줘야한다.
payload의 값을 보고 싶으면 `console.log(action)`을 입력하면 된다.

## createReducer

```js
import { createAction, createReducer } from "@reduxjs/toolkit";
```

먼저 createReducer를 import 해준다.

```js
const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
```

위 코드는 createReducer를 사용하기 전이다.

```js
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload),
});
```

위 코드는 createReducer를 사용한 후의 코드이다.
createReducer의 첫번째 인자에는 initial state를 넣고, 두번째 인자는 action을 넣어준다고 생각하면 된다.
위 코드에서는 initial state로 빈 배열을 주었다.
createReducer를 사용할땐 두가지 옵션이 있다.
첫번째로는 state를 변경 할 수 있게 만들어준다.
두번째로는 원래 하던대로 새로운 state를 return 할 수 있다.
mutate가 가능한 이유는 immer.js와 redux toolkit이 뒤에서 함께 작동하기 때문이다.
state를 return 할 때는 filter처럼 새로운 state여야 한다.
state를 mutate하고 싶다면 return 하지 않아야한다.
위의 코드의 push는 배열을 mutate를 해서 return을 하지 않는 모습이고, filter는 mutate를 하지 않고 새로운 array를 생성해 return 하는 모습이다.

## configureStore

```js
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";
```

configureStore를 import 한 후

```js
const store = createStore(reducer);
```

기존의 createStore를

```js
const store = configureStore({ reducer });
```

아래와 같이 변경하면 구글 크롬의 extension Redux devtools의 불이 들어온다.
redux devtools는 우리의 state를 볼 수 있게 해준다.
어떤 action이 발생했고 언제 발생했는지도 알려준다.
그리고 Redux devtools의 dispatcher를 사용해 dispatch를 보내 볼 수도 있다.
Redux devtools를 사용하기 위해 redux toolkit이 반드시 필요한건 아니다. 하지만 자동으로 실행시켜준다.

## createSlice

```js
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload),
});

const store = configureStore({ reducer });

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
```

🔺기존 코드

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter(toDo => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDos.reducer });

export const { add, remove } = toDos.actions;

export default store;
```

createAction 부분을 없앨 수 있고 코드가 더 많이 줄어든 모습이다.
name에는 reducer의 이름, initialState에는 초기 state, reducer에는 기존 작성했던 action을 적어주면 된다.
그리고 configureStore 부분에 `{reducer: toDos.reducer}`를 해주고,
action들은 toDos.actions 에서 사용할 수 있다.

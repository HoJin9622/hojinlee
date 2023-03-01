---
title: 'react-redux 사용하기'
subtitle: 'react-redux 사용하기'
date: '2020-12-15'
category: 'React'
---

## 설치

[react-redux 문서 바로가기](https://react-redux.js.org/introduction/quick-start)

```sh
yarn add react-redux
```

react에서 redux를 사용할때 react-redux를 위 명령어를 사용하여 redux와 함께 설치한다.
그 후 store.js 를 생성한다.
store.js 에는 js에서 redux를 사용하듯이 작성하면 된다.

```js
import { createStore } from 'redux'

const ADD = 'ADD'
const DELETE = 'DELETE'

export const addToDo = (text) => {
  return {
    type: ADD,
    text,
  }
}

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state]
    case DELETE:
      return state.filter((toDo) => toDo !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
```

대신 다른곳에서 사용할 수 있게 store를 export를 해주어야한다.
그 후 js에서는 subscribe를 해주었는데 react에서는 subscribe 부분을 react-redux에서 제공하는 다른 기능을 사용한다.

## Provider

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

index.js로 간 후 react-redux의 Provider를 import해준다.
그 후 `<App/>` Component를 `<Provider>`로 감싸준다.
Provider에는 store={} 값으로 export한 store를 넣어준다.

## connect

connect는 component들을 store에 연결해준다.

```js
import React, { useState } from 'react'
import { connect } from 'react-redux'

function Home(props) {
  console.log(props)
  const [text, setText] = useState('')

  function onChange(e) {
    setText(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    setText('')
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button>Add</button>
      </form>
    </>
  )
}

function getCurrentState(state, ownProps) {
  return { sexy: true }
}

export default connect(getCurrentState)(Home)
```

connect를 사용하려면 먼저 react-redux에서 connect를 import 해준다.
그 후 `export default connect(function, function)(component);` 해준다.

## mapStateToProps

mapStateToProps는 js-redux에서는 `store.getState()`와 같다.
mapStateToProps는 반드시 객체를 반환해야한다.
반환된 객체는 component의 props에서 확인할 수 있다.

```js
function getCurrentState(state, ownProps) {
  console.log(state)
  return { potato: true }
}
```

function 부분은 `return { potato: true}` 를 하게된다면, Home component의 props로 potato: true가 있을 것이다.

만약 `console.log(state)`를 한다면 현재 state의 값이 출력된다.

```js
function getCurrentState(state, ownProps) {
  return { state }
}
```

우리는 state를 return 받기를 원한다. 그러므로 위와 같이 작성한다.

```js
function getCurrentState(state) {
  return { toDos: state }
}
```

위와 같이 사용도 가능하다.

```js
function mapStateToProps(state) {
  return { toDos: state }
}

export default connect(mapStateToProps)(Home)
```

그리고 문서에서 function의 이름은 mapStateToProps여야 한다.
기본적으로 Redux state로부터 home(component)에 Props를 전달한다는 뜻이다.
그러므로 위와 같이 변경해준다.

```js
function Home({ toDos }) {
  return (
    <>
      <ul>{JSON.stringify(toDos)}</ul>
    </>
  )
}
```

이제 받은 props를 화면에 표시하려면 위와 같이 작성하면 props의 toDos 를 표시한다

## mapDispatchToProps

mapDispatchToProps는 js-redux에서의 `store.dispatch()`와 같다.
dispatch를 react에서 사용하려면 connect를 import한 후 mapDispatchToProps 함수를 만들어 connect의 두번째 매개변수로 준다.
그리고 return 값으로 객체를 반드시 줘야하며, dispatch를 return하면 dispatch 함수가 Home component의 props로 생성된다

```js
function mapDispatchToProps(dispatch) {
  return { addToDo: (text) => dispatch(actionCreators.addToDo(text)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

위 코드는 dispatch 함수를 return 하는 모습

```js
function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  }
}
```

mapDispatchToProps의 두번째 매개변수에는 ownProps라는 것이 있는데 ownProps에는 component의 props가 담겨있다.

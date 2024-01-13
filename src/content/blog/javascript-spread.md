---
title: "JavaScript 비구조화 할당"
description: "JavaScript 비구조화 할당"
pubDatetime: 2020-12-15
tags:
  - "javascript"
---

## 비구조화 할당이란?

비구조화 할당은 ECMA 2015 의 새로운 문법이다.
배열과 객체에 적용할 수 있다.

[문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## 사용법

### 배열

Before: ES5

```js
const user = ["name", "age", "number"];
const name = user[0];
const age = user[1];
const number = user[2];
```

After: ES6

```js
const [name, age, number] = ["name", "age", "number"];
```

### 객체

Before: ES5

```js
const name = req.body.name;
const age = req.body.age;
const number = req.body.number;
```

After: ES6

```js
const { name, age, number } = req.body;
```

변수의 이름과 같은 객체 key의 값이 대입된다.

### 스프레드 연산자 활용

```js
const user = ["id", "name", "age", "number"];
const [id, ...userInfo] = user;
console.log(id); // id
console.log(userInfo); // ['name', 'age', 'number']
```

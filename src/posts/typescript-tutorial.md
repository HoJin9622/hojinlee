---
title: 'TypeScript 튜토리얼'
subtitle: 'TypeScript 튜토리얼'
date: '2020-12-15'
category: 'typescript'
coverImage: '/images/typescript.jpeg'
---

## Setting

```zsh
yarn global add typescript
```

먼저 typescript를 global로 설치한다.
그 후 tsconfig.json 파일을 생성해준다.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

tsconfig.json 파일의 내용으로는 다음과 같이 입력한다.

- module: 모듈 설정
- target: 사용할 ECMAScript 버전 설정
- sourceMap: 소스맵(\*.map) 파일 생성 여부
- outDir: 출력할 디렉토리

```json
"scripts": {
    "start": "node index.js",
    "prestart": "tsc"
}
```

다음으로는 package.json 파일의 scripts에 start로 node index.js 를 추가해주고
prestart에 tsc를 주어 start 되기전에 tsc를 실행한다.
tsc는 ts파일을 컴파일 옵션에 따라서 컴파일을 실행한다.

## tsc-watch

tsc-watch는 ts 파일의 변경이 감지되면 자동으로 재시작해주는 라이브러리이다.

```ssh
yarn add tsc-watch --dev
```

위 명령으로 설치를 진행한다.
dist 폴더와 src 폴더를 생성한 후, index.ts 파일은 src 폴더에 생성한다.
package.json의 scripts의 start를 `"start": "tsc-watch --onSuccess \" node dist/index.js\" "`로 수정한다.
tsconfig.json 파일의 compilerOptions의 outDir을 dist로 생성하면 index.js 파일과 index.js.map 파일이 dist 폴더에 생성된다.
그리고 include를 `["src/**/*"]`로 지정해주어 src 폴더 밑의 모든 파일을 포함시킨다.
이제 yarn start를 실행하면 tsc-watch가 실행되며 src 폴더 밑의 ts 파일을 수정할 때마다 재시작된다.
만약 오류가 발생하면 typescript를 global로 설치하지않고 `yarn add typescript`를 사용하여 dependencies에 추가해주면 해결된다.

## 함수의 매개변수

```ts
const name = 'Hojin',
  age = 24,
  gender = 'male';

const sayHi = (name, age, gender?) => {
  console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

sayHi(name, age);
```

sayHi 함수의 gender 뒤에 ?를 붙이지 않으면 실행 시 에러가 발생된다.
일반적인 js라면 Hello Hojin, you are 24, you are a undefined로 출력이 된다.
여기서 gender 뒤에 ? 를 붙이게되면 gender라는 매개변수는 선택적이 될 수 있음을 의미한다.

## Types

```ts
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are a ${gender}!`;
};

console.log(sayHi('Hojin', 444, 'male'));

export {};
```

매개변수에 :string, :number 과 같이 type을 지정해줄 수 있다.
함수 실행 시 type과 다른 매개변수가 올 경우 컴파일이 되지 않는다.
함수의 return type을 지정하려면 `const sayHi = (): string => {}` 처럼 type을 지정해줄 수 있다.

## Interface

```ts
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: 'hojin',
  age: 22,
  gender: 'male',
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};

console.log(sayHi(person));

export {};
```

interface는 object를 넘겨줄 때 사용된다.
넘겨받을 object의 type을 interface에 지정하고
매개변수 person의 type을 Human으로 지정하면 object를 매개변수로 넘겨줄 수 있게 된다.

## Class

```ts
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const hojin = new Human('hojin', 24, 'male');

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};

console.log(sayHi(hojin));

export {};
```

class <클래스명>으로 선언한다.
public, private 속성으로 변수를 선언할 수 있고(자바스크립트에서는 불가)
물론 변수의 type도 지정해줄 수 있다.
new 키워드를 사용하여 생성하여 사용한다.

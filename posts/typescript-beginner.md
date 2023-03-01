---
title: 'TypeScript 기본'
subtitle: 'TypeScript에 대해 알아보자'
date: '2022-05-01'
category: 'Typescript'
---

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🌅 tsconfig.json](#-tsconfigjson)
- [🧾 Declaration Files](#-declaration-files)
  - [myPackage.js](#mypackagejs)
  - [index.ts](#indexts)
  - [myPackage.d.ts](#mypackagedts)
- [📜 JSDoc](#-jsdoc)
  - [tsconfig.json](#tsconfigjson)
  - [index.ts](#indexts-1)
  - [myPackage.js](#mypackagejs-1)
- [🎬 ts-node](#-ts-node)
- [🫙 DefinitelyTyped](#-definitelytyped)
- [📔 Typescript Handbook](#-typescript-handbook)
- [🏭 Reference](#-reference)

---

## <a name="tsconfig"></a>🌅 tsconfig.json

[tsconfig 공식문서 🚀](https://www.typescriptlang.org/tsconfig)

```json
{
  "include": ["src"], // typescript 소스가 작성되는 경로
  "compilerOptions": {
    "outDir": "build", // build 되는 결과물이 담길 폴더
    "target": "ES6", // build 되는 Javascript의 버전
    "lib": ["ES6", "DOM"], // Javascript 코드가 어떤 환경에서 동작될지 정의
    "strict": true,
    "allowJs": true // Javascript의 사용을 허용
  }
}
```

lib 은 Javascript 코드가 어떤 환경에서 동작될지를 정의한다.

만약 `DOM`을 넣어주게되면 typescript는 DOM 환경에서 제공되는 `document.`, `window.` 또는 `localStorage.`등을 입력하였을 때 브라우저 환경에서 지원되는 자동완성 목록을 제공해준다.

---

## <a name="declaration-file"></a>🧾 Declaration Files

npm으로 설치한 node_modules에 존재하는 Javascript 파일에 대한 type 정의 방법

### myPackage.js

```js
export function init(config) {
  return true
}
export function exit(code) {
  return code + 1
}
```

js로 작성된 간단한 파일이 있따.

### index.ts

```ts
import { init, exit } from 'myPackage'

init({ url: 'true' })

exit(1)
```

myPackage를 import하게되면 myPackage에 대한 type을 찾을 수 없다며 에러가 표시된다.

### myPackage.d.ts

```ts
interface Config {
  url: string
}

declare module 'myPackage' {
  function init(config: Config): boolean
  function exit(code: number): number
}
```

`{패키지명}.d.ts` 파일을 작성한 후 js 파일에 있는 함수들의 타입을 정의해준다면 에러가 사라지며 자동완성 기능을 제공한다.

---

## <a name="jsdoc"></a>📜 JSDoc

JSDoc은 기존 프로젝트에 존재하는 Javascript 파일들과 Typescript를 결합하기 위해 이용한다.

### tsconfig.json

```json
{
  "include": ["src"], // typescript 소스가 작성되는 경로
  "compilerOptions": {
    "outDir": "build", // build 되는 결과물이 담길 폴더
    "target": "ES6", // build 되는 Javascript의 버전
    "lib": ["ES6", "DOM"], // Javascript 코드가 어떤 환경에서 동작될지 정의
    "strict": true,
    "allowJs": true
  }
}
```

먼저 tsconfig.json의 compilerOptions에 allowJs를 `true`로 설정해준다.

### index.ts

```ts
import { init, exit } from './myPackage'

init({ url: 'hi', debug: false })
exit(1)
```

index.ts 에서는 myPackage 라는 이름의 js 파일을 import 해준다.

### myPackage.js

```js
// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true
}

/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1
}
```

myPackage.js 파일에는 함수 상단에 `// @ts-check`라고 표시해주고 주석을 작성한다.

`/**` 여기까지만 작성해도 vscode에서 자동완성으로 나머지 코드들을 완성해준다.

param에서 함수의 매개변수를 returns에서 return 타입을 설정해준다.

이렇게 설정을 해주면 index.ts 파일에는 init과 exit 함수의 타입을 js파일의 변경 없이 자동완성이 뜨게된다.

---

## <a name="tsnode"></a>🎬 ts-node

[npm ts-node](https://www.npmjs.com/package/ts-node)

typescript로 작성된 파일을 실행하려면 js로 build를 한 후 `node index.js`와 같이 실행시켜야 테스트를 할 수 있다.

그러나 ts-node 라이브러리를 사용하면 build를 하지 않고 직접 TypeScript를 실행시켜주는 역할을 한다.

`ts-node index.ts` 이런식으로 바로 typescript 파일을 실행할 수 있다.

ts-node는 typescript 코드를 build하고 start할 필요 없이 실행시켜준다.

---

## <a name="definitely-typed"></a>🫙 DefinitelyTyped

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

Typescript 유형 정의를 위한 저장소이다.

`npm install --save-dev @types/node` 를 이용해 typescript 타입을 불러 올 때 이 저장소에서 불러오게 된다.

type이 정의되지 않은 패키지에 type 정의를 기여하고 싶다면 이 저장소에 Pull Request를 하여 기여할 수 있다.

---

## <a name="typescript-handbook"></a>📔 Typescript Handbook

Typescript에 대해 더 배우고 싶다면 [Typescript Handbook🚀](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## <a name="reference"></a>🏭 Reference

https://nomadcoders.co/typescript-for-beginners

https://sddev.tistory.com/91

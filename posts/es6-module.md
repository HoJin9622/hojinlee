---
title: 'ES6 적용하기'
subtitle: 'ES6 적용하기'
date: '2020-12-15'
category: 'Javascript'
---

# ES6 Module 적용

먼저 node.js version이 14 이상이어야한다.

`package.json`에 `type` 항목을 `module`로 설정한다.

```json
{
  // ...

  "type": "module"

  // ...
}
```

그 후 import, export 문법을 사용할 수 있게 된다.

다만 파일을 import 할때 `import products from './data/products.js'` 처럼 js 확장자도 붙여주도록 한다.

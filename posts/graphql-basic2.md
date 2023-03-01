---
title: 'GraphQL 기본2'
subtitle: 'GraphQL 기본2'
date: '2020-12-15'
category: 'GraphQL'
---

## 배열

index.js 파일의 내용은 이전 글과 동일하다.

```js
import { people } from './db'

const resolvers = {
  Query: {
    people: () => people,
  },
}

export default resolvers
```

resolver.js 파일

people은 배열로 여러사람의 정보를 객체로 저장 중이다.

```
type Person {
  id: Int!
  name: String!
  age: Int!
  gender: String!
}

type Query {
  people: [Person]!
}
```

schema.graphql 파일

Person을 정의해주고 Query에서 Person은 배열이므로 []로 감싸준다.

```
query {
  people {
    id
    name
    age
  }
}
```

playground의 query문

```
{
  "data": {
    "people": [
      {
        "id": 0,
        "name": "hojin",
        "age": 24
      },
      {
        "id": 1,
        "name": "Daal",
        "age": 18
      },
      {
        "id": 2,
        "name": "JD",
        "age": 20
      },
      {
        "id": 3,
        "name": "flynn",
        "age": 19
      }
    ]
  }
}
```

결과

people을 배열로 받은걸 볼 수 있다.

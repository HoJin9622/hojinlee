---
title: "GraphQL 기본"
description: "GraphQL 기본"
pubDatetime: 2020-12-15
tags:
  - "graphql"
ogImage: "../../assets/images/graphql.png"
---

## graphql

GraphQL로 해결할 수 있는 두가지 문제

1. Over-fetching : 요청한 영역의 정보보다, 많은 정보를 서버에서 받는 것
2. Under-fetching : SNS 앱을 예로 들면 notification, users, feed 등을 불러오는 요청을 여러번 보내지만, GraphQL을 이용하면 이러한 정보를 한번의 요청으로 해결할 수 있다.

## graphql-yoga

graphql-yoga는 graphql을 더 쉽게 다룰 수 있는 라이브러리이다.

<https://github.com/prisma-labs/graphql-yoga>

```bash
yarn add graphql-yoga
```

```js
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers,
});

server.start(() => console.log("Graphql Server Running"));
```

index.js 내용

```js
type Query {
  name: String!
}
```

graphql/schema.graphql 내용

```js
const resolvers = {
  Query: {
    name: () => "hojin",
  },
};

export default resolvers;
```

graphql/resolvers.js 내용

파일하나에 모든 내용을 작성해도 되지만, 따로 나누는 것이 좋다.
playground는 graphql-yoga에만 있는 것이며, postman과 비슷하다.
localhost:4000 으로 접속하면 playground를 이용할 수 있다.

```js
query {
  name
}
```

playground에서 위 쿼리문을 playground로 보내면

```json
{
  "data": {
    "name": "hojin"
  }
}
```

위 결과를 얻을 수 있다.

---
title: "GraphQL 기초"
description: "GraphQL이란 무엇인가?"
pubDatetime: 2022-06-08
tags:
  - "graphql"
ogImage: "../../assets/images/graphql.png"
---

## 🏗 GraphQL로 영화 API 만들기

[GraphQL로 영화 API 만들기🚀](https://nomadcoders.co/graphql-for-beginners)

## 📝 Table of Contents

- [🏗 GraphQL로 영화 API 만들기](#-graphql로-영화-api-만들기)
- [📝 Table of Contents](#-table-of-contents)
- [Why GraphQL?](#why-graphql)
  - [over-fetching](#over-fetching)
  - [under-fetching](#under-fetching)
- [Apollo Server](#apollo-server)
- [Scalar Type](#scalar-type)
- [Mutations](#mutations)
- [Non-null](#non-null)
- [Resolver](#resolver)
- [Docstring](#docstring)
- [Reference](#reference)

## <a name="1"></a>Why GraphQL?

Facebook의 모바일 앱은 2012년부터 GraphQL로 구동되었습니다.
GraphQL의 spec은 2015년 오픈소스로 공개되었으며, 현재 페이스북, 깃허브, 핀터레스트, Shopify 등에서 사용하고 있습니다.

### over-fetching

```js
movie {
    id: 11,
    title: "SpiderMan",
    summary: "SpiderMan is back"
    ...
}
```

영화에 대한 정보의 title만 보여주는 앱을 제작한다고 가정한다. REST API를 fetching하면 id, title, summary... 등 모든 정보를 받게 됩니다.

내가 필요한 정보는 title인데 다른 모든 정보를 불러오게되는 것을 over-fetching 이라고 합니다.
GraphQL을 사용하면 API에 GraphQL 쿼리를 보내고 필요한 것만 정확히 얻을 수 있습니다.

> Ask for what you need, get exactly that<br/>
>
> Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server.

### under-fetching

필요한 데이터보다 적은 데이터를 fetch하는 것을 말합니다.

일반적인 REST API는 여러 URL에서 로딩해야 하지만 GraphQL API는 앱에 필요한 모든 데이터를 단일 request로 가져옵니다. GraphQL을 사용하는 앱은 느린 모바일 네트워크 연결에서도 빠를 수 있습니다.

> Get many resources in a single request<br/>
>
> GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.

## <a name="2"></a>Apollo Server

Apollo 서버는 Apollo 클라이언트를 포함한 모든 GraphQL 클라이언트와 호환되는 사양 준수의 오픈 소스 GraphQL 서버입니다. 모든 소스의 데이터를 사용할 수 있는 자체 문서화 가능한 production-ready GraphQL API를 구축하는 가장 좋은 방법입니다.

```bash
npm i apollo-server graphql
```

모든 GraphQL 서버는 스키마를 사용하여 클라이언트가 쿼리할 수 있는 데이터 구조를 정의합니다.

```js
const typeDefs = gql`
  type Query {
    text: String
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });
```

## <a name="3"></a>Scalar Type

```js
const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
`;
```

GraphQL 객체에는 이름과 필드가 있지만, 이러한 필드는 구체적인 데이터로 해석되어야 합니다. Scalar Type은 쿼리의 잎을 나타냅니다.

위 쿼리에서는 `User`의 `id, username`, `Tweet`의 `id, text` 필드가 Scalar Type 입니다.

> - Int: A signed 32‐bit integer.
> - Float: A signed double-precision floating-point value.
> - String: A UTF‐8 character sequence.
> - Boolean: true or false.
> - ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

## <a name="4"></a>Mutations

GraphQL에 대한 대부분의 논의는 데이터 fetching에 중점을 두지만 완전한 데이터 플랫폼은 서버 측 데이터도 수정할 수 있는 방법 이 필요합니다.

기술적으로 Query로 데이터 수정을 유발할 수 있습니다. 그러나 데이터 수정을 유발하는 모든 작업은 mutation을 통해 명시적으로 보내야한다는 규칙을 설정하는 것이 유용합니다.

```js
type Mutation {
  postTweet(text: String, userId: ID): Tweet
}
```

## <a name="5"></a>Non-null

```js
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

name은 String 타입을 사용하고 타입 뒤에 느낌표를 추가해서 `null`이 아닌 것으로 표시합니다.

`!`는 서버가 항상 이 필드에 대해 null이 아닌 값을 반환할 것으로 예상하고 실제로 null 값을 얻게되면 클라이언트에게 문제가 발생했음을 알립니다.

## <a name="6"></a>Resolver

Data Set(TypeDefs)를 정의했지만, Apollo Server는 query를 실행할 때마다 해당 Data Set을 사용해야한다는 것을 모릅니다. 이 문제를 해결하기 위해 Resolver를 만듭니다.

Resolver는 Apollo Server에 특정 type과 관련된 데이터를 어떻게 fetch하는지 알려줍니다.

```js
const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find(tweet => tweet.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
```

Resolver의 첫번째 매개변수는 root, 두번째 매개변수는 args로 args에서 정의한 매개변수를 가져올 수 있습니다.

[Resolver arguments 🚀](https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments)

> - parent: The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).<br/>For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.
> - args: An object that contains all GraphQL arguments provided for this field.<br/>For example, when executing query\{ user(id: "4") }, the args object passed to the user resolver is \{ "id": "4" }.
> - context: An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
> - info: Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.<br/>Its core fields are listed in the GraphQL.js source code. Apollo Server extends it with a cacheControl field.

## <a name="7"></a>Docstring

type, field, argument에 대한 설명을 제공합니다. Docstrings는 자동으로 많은 일반적인 GraphQL tools에 나타납니다.

```txt
"""
Description for the User
"""
type User {
  """
  Description for first Name
  """
  firstName: String!

  age(
    """
    Must be an integer
    """
    arg: Int
  )
}
```

## <a name="reference"></a>Reference

<https://nomadcoders.co/graphql-for-beginners>

<https://graphql.org/>

<https://graphql.org/users>

<https://www.apollographql.com/docs/apollo-server/>

<https://graphql.org/learn/schema/#scalar-types>

<https://graphql.org/learn/queries/#mutations>

<https://graphql.org/learn/schema/#lists-and-non-null>

<https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments>

<https://www.apollographql.com/docs/resources/graphql-glossary/#docstring>

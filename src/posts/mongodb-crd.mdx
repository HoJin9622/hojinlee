---
title: 'MongoDB Create/Read/Delete'
subtitle: 'MongoDB Create/Read/Delete'
date: '2020-12-15'
category: 'infra'
---

# Database 생성

```
> use test_db
switched to db test_db
```

데이터베이스를 생성한다.
데이터베이스가 이미 존재하는 경우 그 데이터베이스를 사용한다.

# 데이터베이스 목록 확인

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

데이터베이스 목록을 확인한다.
데이터베이스에 데이터가 없으면 표시되지 않는다.

# Database 제거

```
> use test_db
switched to db test_db
> db.dropDatabase()
{ "dropped" : "test_db", "ok" : 1 }
```

# Collection 생성

```
> use test_db
switched to db test_db
> db.createCollection("author")
{ "ok" : 1 }
```

`db.createCollection(name, options)`는 Collection을 생성한다.

-- Option

1.  Capped(boolean): capped collection을 만드려면 true로 지정한다. true로 지정할 경우 size field에서 최대 size를 지정하여야 한다.

2.  autoIndexId(boolean): false를 지정하여 \_id field에 인덱스를 자동으로 만들 수 없도록 설정한다.
    Note: For replica sets, all collections must have autoIndexId set to true.

3.  size(number): capped collection의 최대 크기(바이트)를 지정한다. 한번 capped collection이 최대 크기에 도달하면, MongoDB는 새로운 documents를 위한 공간을 만들기 위해 오래된 documents를 제거한다. size field는 capped collection에 필요하며 다른 collection에는 무시된다.

4.  max(number): capped collection에 허용되는 최대 documents의 수이다. size limit이 이 제한보다 우선한다. capped collection이 최대 문서 수에 도달하기 전에 크기 제한에 도달하면, MongoDB는 오래된 documents를 제거한다. max option을 사용하려면, capped collection에 필요한 크기 제한이 최대 documents 수를 포함하기에 충분한지 확인해야한다.

5.  noPadding(boolean): MMAPv1 저장 엔진에만 사용가능하다. collection을 생성할 때 사용자가 collection별로 storage engine에 대한 구성요소를 지정할 수 있도록 허용한다.

# Collection 목록 확인

```
> use test_db
switched to db test_db
> show collections
author
```

`show collections`

# Collection 제거

```
> use test_db
switched to db test_db
> show collections
author
> db.author.drop()
true
```

`db.name.drop()`은 Collection을 제거한다.

# Document 추가

```
> db.author.insert({"name": "Sherlock"})
WriteResult({ "nInserted" : 1 })
```

`db.collection.insert()` 사용 시 document를 추가할 수 있다.

# Document 확인

```
> db.author.find({})
{ "_id" : ObjectId("5f073ee88b0f1db92014e8a3"), "name" : "Sherlock" }
```

`db.collection.find()` 사용 시 documents를 확인할 수 있다.

# Document 제거

```
> db.author.remove({"name": "Sherlock"})
WriteResult({ "nRemoved" : 1 })
```

`db.collection.remove()` 사용 시 document 제거가 가능하다.

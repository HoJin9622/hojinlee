---
title: "Kotlin 변수"
description: "일반적으로 통용되는 변수선언시에만 초기화 가능, 중간에 값을 변경할 수 없음값이 할당되지 않아도 사용하는 방법"
pubDatetime: 2020-12-15
tags:
  - "kotlin"
---

# var

일반적으로 통용되는 변수

```java
fun main() {
    var a: Int = 123
    println(a)
}
```

# val

선언시에만 초기화 가능, 중간에 값을 변경할 수 없음

```java
fun main() {
    val a: Int = 123
    println(a)
}
```

값이 할당되지 않아도 사용하는 방법

```java
fun main() {
    var a: Int? = 123
    println(a)
}
```

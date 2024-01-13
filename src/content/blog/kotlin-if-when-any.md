---
title: "Kotlin if문과 when 그리고 Any 타입"
description: "is 사용으로 자료형 검사when 사용법Any는 어느 자료형이든 받는다는 kotlin 최상위 자료형"
pubDatetime: 2020-12-15
tags:
  - "kotlin"
---

# if

```java
    var a = 7

    if (a > 10) {
        println("a는 10보다 크다")
    } else {
        println("a는 10보다 작거나 같다")
    }
```

is 사용으로 자료형 검사

```java
if(a is Int) println("a는 Int형이다")
```

# when

when 사용법

Any는 어느 자료형이든 받는다는 kotlin 최상위 자료형

```java
fun doWhen(a: Any) {
    when(a) {
        1 -> println("정수 1입니다")
        "hi" -> println("hello world")
    }
}

fun main() {
    doWhen("hi")
}
```

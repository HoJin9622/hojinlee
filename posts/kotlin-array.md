---
title: 'Kotlin 배열과 형변환'
subtitle: '배열 선언과 사용return 타입과 매개변수 타입을 명시해줘야한다.반환값을 생략할 수 있다.'
date: '2020-12-15'
category: 'Kotlin'
---

# 배열

배열 선언과 사용

```java
fun main() {
    var intArr = arrayOf(1, 2, 3, 4, 5)

    var nullArr = arrayOfNulls<Int>(5)

    println(intArr[4])
}
```

# 함수 선언

return 타입과 매개변수 타입을 명시해줘야한다.

```java
fun add(a: Int, b: Int, c: Int): Int {
    return a+b+c
}
```

# 단일표현식 함수

반환값을 생략할 수 있다.

```java
fun add(a: Int, b: Int, c:Int) = a + b + c
```

# 형변환 함수

```java
toByte()
toShort()
toInt()
toLong()
toFloat()
toDouble()
toChar()
```

---
title: 'Go 문법, 타입, 함수'
subtitle: 'Go의 변수 선언과 타입 및 함수에 대해 알아보자'
date: '2022-01-13'
category: 'Golang'
coverImage: '/images/go.png'
---

## 변수 선언

```go
const name string = "hojin"
var name string = "hojin"
```

Go의 변수 선언에는 const 와 var가 있다.
const 는 상수로써 더 이상 변경이 불가능하고
var는 새로운 값을 다시 할당할 수 있다.

```go
name := "hojin"
```

위와 같이 축약형으로 선언할 수 있는데 Go가 타입을 자동으로 찾아준다.
축약형으로 선언할때는 함수내부에서만 선언이 가능하다.

## Array

```go
names := [5]string{"hi", "bye", "hello"}
names[3] = "good"
names[4] = "greet"
```

go의 Array 타입은 배열의 크기와 타입을 지정한 후 사용한다.

## Slice

```go
names := []string{"hojin", "yuri", "chulsu"}
names = append(names, "jjangu")
```

Slice 타입은 Array와 다르게 크기를 지정하지 않고 사용한다.
append 함수로 요소를 추가할 수 있으며 원본을 건드리지않고 변경된 값을 return 한다

## Map

```go
hojin := map[string]string{"name": "hojin", "age": "50"}
for key, value := range hojin {
	fmt.Println(key, value)
}
```

Map 타입은 key, value로 이루어진다.
key, value의 타입을 지정해주면 그 타입 이외의 다른 타입은 사용이 불가능하다.
for문으로 loop가 가능하며 key와 value를 반환한다.

## Struct

```go
type person struct {
	name string
    	age int
    	favFood []string
}
func main() {
	favFood := []string{"kimchi": "ramen"}
	hojin := person{name: "hojin", age: 18, favFood: favFood}
}
```

Map 타입은 value에 지정된 타입만 사용할 수 있는 반면 Strcut는 value의 타입을 원하는대로 지정할 수 있다.
`[]string`을 사용하여 Slice도 사용할 수 있으며 선언할 때 key에 맞는 value를 넣어줘야하며 비워둬도 상관은 없다.

## 함수의 가변 매개변수

```go
func repeatMe(words ...string) {
	fmt.Println(words)
}

func main() {
	repeatMe("Hi", "Bye", "Hello")
}
```

go에서 함수에 매개변수를 여러개 받고싶다면 타입 앞에 ...을 사용하면 된다.

## naked return

```go
func lenAndUpper(name string) (length int, uppercase string) {
	length = len(name)
    	uppercase = strings.ToUpper(name)
    	return
}
func main() {
	totalLength, up := lenAndUpper("hojin")
}
```

go는 함수의 return을 하나만 할 수 있는 것이 아니라 여러개도 가능하다.
`lenAndUpper` 함수는 string을 받아서 string의 길이와 대문자를 결과로 반환한다.
length와 uppercase를 함수명 뒤에 미리 선언을 해주면 return 할 때 반환하지 않아도 자동으로 반환 처리해준다.

## defer

```go
func lenAndUpper(name string) (length int, uppercase string) {
	defer fmt.Println("I'm done")
	length = len(name)
    	uppercase = strings.ToUpper(name)
    	return
}
```

go에서 defer로 함수를 선언하면 해당 함수가 종료되면 defer로 선언된 함수가 바로 작동된다.
위는 `lenAndUpper`함수가 종료된 직후 "I'm done"이 콘솔에 찍히게 된다.

---

노마드코더, https://nomadcoders.co/go-for-beginners

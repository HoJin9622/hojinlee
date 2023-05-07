---
title: 'Goroutines'
subtitle: 'Goroutines을 알아보자'
date: '2022-01-23'
category: 'golang'
coverImage: '/images/go.png'
---

### Goroutines

Goroutines은 golang에서 동시성을 가능하게해준다.

```go
func main() {
	sexyCount("a")
    	sexycount("b")
}

func sexyCount(person string) {
	for i:=0;i<10;i++ {
    	fmt.Println(person, "is sexy", i)
        time.Sleep(time.Second)
    }
}
```

위와 같은 함수를 만든다.
1초마다 한번씩 `a is sexy`를 10번 출력한 다음 `b is sexy`를 10번 출력한 후 프로그램은 종료된다.
![](https://images.velog.io/images/hojin9622/post/98871474-3b05-464a-8331-633c3eebd0cf/Screen-Recording-2022-01-23-at-4.22.42-PM.gif)

```go
func main() {
	go sexyCount("a")
    	sexycount("b")
}

func sexyCount(person string) {
	for i:=0;i<10;i++ {
    	fmt.Println(person, "is sexy", i)
        time.Sleep(time.Second)
    }
}
```

`a is sexy`와 `b is sexy`를 동시에 출력하려면 함수 앞에 `go` 키워드를 붙이면 된다.
![](https://images.velog.io/images/hojin9622/post/cfb1e05b-d6f8-4e90-9adb-4fb76e806f1c/Screen-Recording-2022-01-23-at-5.23.42-PM.gif)
`go` 키워드를 붙이게되면 두 함수가 동시에 실행된다.

```go
func main() {
	go sexyCount("a")
    	go sexycount("b")
}

func sexyCount(person string) {
	for i:=0;i<10;i++ {
    	fmt.Println(person, "is sexy", i)
        time.Sleep(time.Second)
    }
}
```

그러나 위와 같이 두 함수 모두에 `go` 키워드를 붙히게되면 main 함수가 바로 종료되기 때문에 두 함수 모두 실행되지 않는다.
Gorountines은 main 함수가 실행되고 있을 경우에만 유효하다.

노마드코더, https://nomadcoders.co/go-for-beginners

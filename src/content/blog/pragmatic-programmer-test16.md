---
title: "연습문제 16 풀이"
description: "연습문제 16 풀이"
pubDatetime: 2022-03-27
ogImage: "../../assets/images/pragmatic-programmer.jpg"
---

**연습문제 16.**
간단한 현실 점검. 다음 '불가능한'것들 중 무엇이 실제로 일어날 수 있는가?

1. 한 달이 28일보다 적은 것.
2. 시스템 콜의 오류 메시지: 현재 디렉터리에 접근할 수 없음.
3. C++에서, a = 2; b = 3; 하지만 (a + b)는 5가 아님.
4. 내각의 합이 180도가 아닌 삼각형.
5. 1분이 60초가 아님.
6. (a + 1) &lt;&#61; a

### ✅ 풀이 과정

- 1752년 9월은 2일 다음 날이 3일이 아닌 14일이다. 그러므로 19일이어서 28일보다 적다.
- 디렉터리에 접근하기 전 디렉터리가 삭제되었을 수 있다. 아래와 같이 디렉터리에 접근할 때 디렉터리가 이미 제거된 상태라면 접근할 수 없다는 에러가 발생한다.
  ![](https://images.velog.io/images/hojin9622/post/6480583c-2f9a-4257-a872-6888d011fc53/Screen%20Shot%202022-03-27%20at%206.35.33%20PM.png)
- 만약 a와 b를 string으로 선언하면 결괏값은 23으로 나오게 된다. 이러한 문제를 최근 겪었는데 주소에 있는 query string의 숫자를 가져온 후 그것을 이용하여 숫자 연산을 시도하려고 할 때 겪었던 문제이다.

```cpp
#include <iostream>

using namespace std;

int main()
{
    string a = "2";
    string b = "3";

    cout << a + b;

    return 0;
}
```

![](https://images.velog.io/images/hojin9622/post/e2a1843c-2a92-4be0-a3d0-d2c2481d11f8/Screen%20Shot%202022-03-27%20at%206.54.44%20PM.png)

- 초등, 중등 교육에서 삼각형 내각의 합은 180도라는 인식이 너무 강하게 남아 있어 당연히 불가능하다고 생각했으나 검색해본 곡면 위에서의 결과는 달랐다. 곡면 위에서 최대한 반듯하게 삼각형을 그리면 삼각형이긴 하나, 각이 하나 더 크게 보인다.
- 1분이 60초가 아닐 수 있다는 것에 대한 자료는 찾지 못했다....😂
- 오버플로우가 발생하면 불가능하다고 생각한 것이 실제로 일어날 수 있다. `unsigned short`의 자료형의 범위는 0 ~ 65,535다. 만약 65,535의 값을 넘어가면 오버플로우가 발생하여 값은 0이 된다.

```cpp
#include <iostream>

using namespace std;

int main()
{
    unsigned short a = 65535;
    cout << "a : " << a << endl;
    a = a + 1;
    cout << "a : " << a;

    return 0;
}
```

![](https://images.velog.io/images/hojin9622/post/c03fd2db-2b7a-4549-9d22-336c35caf47f/Screen%20Shot%202022-03-27%20at%207.09.26%20PM.png)

### ✅ 참고 링크

- [Whats the shortest month?](https://moviecultists.com/whats-the-shortest-month)
- [1752년 9월](https://kuduz.tistory.com/878)
- [내각의 합이 180도가 아닌 삼각형 (곡면위의 삼각형)](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hjkamy&logNo=20129089178)
- [Query String 쿼리스트링이란?](https://velog.io/@pear/Query-String-%EC%BF%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A7%81%EC%9D%B4%EB%9E%80)
- [오버플로우와 언더플로우 알아보기](https://dojang.io/mod/page/view.php?id=32)
- [정수(integer)](https://boycoding.tistory.com/150)

### 💡 책에 있는 해답

- 1752년 9월은 30일이 아니라 19일 밖에 없다. 그레고리 교황의 달력 개혁의 일환으로 달력의 날짜를 맞추기 위해 이렇게 만들었다.
- 다른 프로세서가 디렉터리를 지웠을 수도 있고, 디렉터리를 읽을 권한이 없을 수도 있다. 드라이브가 마운트되지 않았을 수도 있고, 그 밖에 여러가지 문제가 있을 수 있다. 어떤 상황인지 감이 왔으리라.
- 이 문제의 함정은 a와 b의 타입을 명시하지 않았다는 점이다. 연산자 오버로딩 때문에 +,=,!=가 예상과는 다르게 동작할 수 있다. 또 a와 b가 동일한 변수를 가리키고 있을 수도 있다. 그럴 경우 두 번째 할당문이 첫 번째 할당문에서 저장한 값을 덮어쓸 것이다. 또한 프로그램에 동시성이 있는데 이에 대한 고려가 되지 않아서 a의 값이 덧셈이 수행되기 직전에 바뀌었을 수도 있다.
- 비유클리드 기하학에서 삼각형 내각의 합은 180도가 아닐 수 있다. 구 표면에 그려진 삼각형을 생각해보라.
- 윤초 때문에 61초일 수 있다.
- 언어에 따라서 숫자가 최대 숫자 한계를 넘어가는(overflow) 바람에 a+1의 부호가 음수로 바뀔 수도 있다.

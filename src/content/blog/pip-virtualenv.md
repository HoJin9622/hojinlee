---
title: "pip & virtualenv를 이용한 python 가상환경 세팅"
description: "pip & virtualenv를 이용한 python 가상환경 세팅"
pubDatetime: 2020-12-15
tags:
  - django
---

## pip & virtualenv 란?

pip는 PyPI 저장소로부터 파이썬 패키지를 설치해주는 패키지 매니저이다.
Node.js의 npm, yarn과 비슷하다.
`pip install <package name>`을 이용하여 패키지를 설치할 경우 global하게 설치된다.
이 문제를 해결하기위해 virtualenv를 사용한다.
virtualenv는 각 프로그램별로 가상의 환경을 만들어낸다.
npm으로 따지면 node_module 폴더와 비슷하다.

## 사용법

### virtualenv 설치

```sh
pip install virtualenv
```

위 명령어를 사용하여 virtualenv를 글로벌하게 설치한다.
pip는 python을 설치할때 선택적으로 설치할 수 있으며 설치되어있지 않다면 설치해주도록 하자.

### 가상환경 생성

```sh
virtualenv venv
```

원하는 프로젝트 폴더로 이동 후 위 명령어를 실행하면 venv 라는 폴더가 생성된다.
폴더 이름은 입맛에 맞게 변경할 수 있지만 관습적으로 venv, env 라고 짓는다.

![](https://images.velog.io/images/hojin9622/post/59db840f-98c2-496f-9a90-fed4d224e328/list.png)

### 가상환경 사용

```sh
call venv/scripts/activate
```

window 기준이며 위 명령어를 사용하면 venv/scripts 폴더에 패키지들을 설치하겠다는 뜻이다.
위 명령어를 실행 후 콘솔창 앞에 (venv) 라는 글자가 붙게된다.

```sh
pip install <packagename>
```

그 후 `pip install <package name>`을 사용하면 글로벌하게 설치되는 것이 아닌 가상환경에 라이브러리를 설치하게된다.

### requirements.txt

requirements.txt 는 이 프로젝트에 설치된 패키지를 나열해준다.

```sh
pip freeze > requirements.txt
```

위 명령어를 사용하면 설치된 패키지와 버전이 정리되어 저장된다.

```sh
pip install -r requirements.txt
```

requirements.txt 에 있는 패키지를 다운받으려면 위 명령어를 실행하면 된다.

# 마무리

github에 업로드 할때는 .gitignore 에 env 폴더를 넣어주도록 하자.

![](https://images.velog.io/images/hojin9622/post/42cfca80-476b-485f-85ee-5c2d517f6486/gitignore.png)

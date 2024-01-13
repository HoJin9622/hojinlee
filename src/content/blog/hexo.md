---
title: "Hexo로 github.io 블로그 생성"
description: "Hexo로 github.io 블로그 생성"
pubDatetime: 2020-05-01
tags:
  - "javascript"
---

> 2020년 5월 1일 작성한 게시글입니다.

### Hexo란?

Hexo 는 블로그 프레임워크이다.
Jekyll, Hexo, Hugo 등의 프레임워크들이 있지만, Hexo는 자바스크립트 기반이어서 선택하게 되었다.
Hexo를 이용하여 github.io 페이지에 쉽게 블로그를 만드는 방법을 소개하려고 한다.

### How to use?

#### github 저장소 생성

1. github에 로그인 후 우측 상단에 New repository를 클릭하여 저장소를 생성해준다.
   ![](https://images.velog.io/images/hojin9622/post/972cfd7e-ceda-4bad-9237-45c7bbebba1b/repo1.png)

2. Repository name은 &#123;계정이름&#125;.github.io 로 설정해준다.
   ![](https://images.velog.io/images/hojin9622/post/b6370866-9701-48ad-b1de-de6617caa237/repo2.png)

3. Create Repository를 끝내면 완료
   ![](https://images.velog.io/images/hojin9622/post/5deaebc6-245a-48b5-82da-5c006c900e28/repo3.png)

#### Hexo 설치

Hexo의 설치에는 두가지 요구사항이 있다.

- Node.js
- Git

컴퓨터에 이것들이 설치되었다면, npm을 이용하여 Hexo를 설치 할 수 있다.

```
$ npm install hexo-cli -g
$ hexo init <name>
$ cd <name>
$ npm install
```

#### \_config.yml

\_config.yml은 환경설정 파일이다. 대부분의 설정을 이 파일에서 할 수 있다.

```
# Site
title: 웹 사이트의 제목.
description: 웹 사이트의 부제.
description: 웹 사이트에 대한 설명.
author: 작성자 이름.
language: 웹 사이트의 주 사용언어.
```

자신의 블로그의 타이틀, 서브타이틀, 설명, 작성자 등을 입력해준다.
그 후 #URL 부분의 url: 을 자신의 깃허브 주소로 입력한다.

```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://<your_github_url>.github.io/
```

그 후 Deployment 부분의 type을 git, repo는 자신의 github.io를 만들 저장소의 주소를 넣어준다.

```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
type: git
repo: <repository url> #https://github.com/HoJin9622/HoJin9622.github.io
branch: master
message: [message]
```

#### Deploy

먼저 git에 deploy하기 위한 라이브러리를 설치해준다.

```
$ npm install hexo-deployer-git --save
```

아래는 Deploy를 하기위한 명령어다. generate는 정적파일을 생성하고 deploy는 정적 생성한 파일을 github master branch로 push 해준다.

```
$ hexo generate
$ hexo deploy
```

한꺼번에 하기위해선 아래와 같이 가능하다.

```
$ hexo deploy --generate
```

#### 포스트 작성

아래 명령어로 새 글을 작성할 수 있다.

```
$ hexo new post [file_title]
```

생성된 글은 아래 경로에 생성된다.

```
source
    └── _posts
        └── file_title.md
```

아래 예시처럼 글을 제목, 날짜, 내용 등을 넣을 수 있다.

```
---
title: 'Github Blog 만들기'
pubDatetime: 2020-05-01 18:01:44
---

Github Blog 만들기!
테스트입니다.
```

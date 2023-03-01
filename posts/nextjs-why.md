---
title: 'Next.js를 쓰는 이유'
subtitle: 'Next.js를 쓰는 이유'
date: '2020-12-15'
category: 'NextJS'
---

# Next.js가 필요한 이유

`npx create-react-app` 으로 프로젝트를 생성하게되면 웹페이지의 소스보기를 클릭하면 페이지의 소스가 제대로 표현되지 않는다.

![](https://images.velog.io/images/hojin9622/post/ccfa2a1b-48e7-46c4-89ef-7c6e96166504/cra_source_view.png)

크롬 개발자 도구로 id='root'인 div를 열어보면 페이지에 대한 내용이 담겨있지만 페이지 소스 보기로 볼 경우 위 이미지처럼 나타나게 된다.

대부분 사이트의 검색엔진들은 이 페이지 소스보기로 나오는, 자바스크립트가 실행되기 전 소스를 검색하게 된다.

`npx create-next-app` 으로 프로젝트를 생성 후 웹페이지의 소스보기를 클릭하면 페이지의 소스가 제대로 표현된다.

![](https://images.velog.io/images/hojin9622/post/1d44c0e8-143a-4148-b470-fbfe05a082aa/cna_source_view.png)

Welcome to Next.js! 등 모든 소스가 한줄로 압축되어 나타나게 된다.

이러한 이유때문에 검색엔진 최적화가 가능하다.

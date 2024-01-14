---
title: "Docker Compose"
description: "Docker Compose 란 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구"
pubDatetime: 2022-03-20
tags:
  - "docker"
ogImage: "../../assets/images/docker.png"
---

## Docker Compose

---

Docker Compose 란 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구

```yml
version: "3"
services:
  redis-server:
    image: "redis"
  node-app:
    build: .
    ports:
      - "8080:8080"
```

- version: 도커 컴포즈의 버전
- services: 이곳에 실행하려는 컨테이너들을 정의
  - redis-server: 컨테이너 이름
    - image: 컨테이너에서 사용하는 이미지
  - node-app: 컨테이너 이름
    - build: 현 디렉토리에 있는 Dockerfile 사용
    - ports: 포트 맵핑 &lt;로컬 포트:컨테이너포트&gt;

```yml
version: "3"
services:
  react:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    stdin_open: true
  tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    command: ["npm", "run", "test"]
```

- context: 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
- volumes: 로컬 머신에 있는 파일들 맵핑
- stdin_open: 리액트 앱을 끌때 필요
- command: 테스트 컨테이너 시작할때 실행 되는 명령어

```bash
docer-compose up
docer-compose up --build
docker-compose down
docker-compose -d up
```

- up: 이미지가 없을때 이미지를 빌드하고 컨테이너 시작
- up --build: 이미지가 있든 없든 이미지를 빌드하고 컨테이너 시작
- down: docker-compose로 실행한 컨테이너 종료
- -d: 앱을 백그라운드로 실행, 컨테이너를 바로 빠져나온다.

## Reference

---

<https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard>

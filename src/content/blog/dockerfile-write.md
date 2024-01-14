---
title: "Dockerfile 작성"
description: "Dockerfile 작성"
pubDatetime: 2022-03-20
tags:
  - docker
ogImage: "../../assets/images/docker.png"
---

# Dockerfile

```Dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD ["node", "server.js"]
```

```Dockerfile
FROM node:alpine as builder
WORKDIR '/usr/src/app'
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
```

- FROM
  베이스 이미지를 명시해준다.
  이미지 생성시 기반이 되는 이미지 레이어
  &#60;이미지 이름&#62;:&#60;태그&#62; 형식으로 작성
  태그를 안붙이면 자동적으로 가장 최신것으로 다운 받음
  ex&#41; ubuntu:14.04

- WORKDIR
  WORKDIR을 설정해주지 않으면 root에 모든 파일이 생성된다.
  WORKDIR을 생성해주어 복사되는 파일을 설정한 WORKDIR로 복사되게 할 수 있다.

- COPY
  도커 컨테이너에 파일들을 복사해준다.
  `COPY ./ ./` 이면 현재 디렉토리에 있는 모든 파일을 복사하게 된다.

- RUN
  추가적으로 필요한 파일들을 다운로드 받는다.
  도커이미지가 생성되기 전에 수행할 쉘 명령어

- CMD
  컨테이너 시작시 실행 될 명령어를 명시해준다.
  컨테이너가 시작되었을 때 실행할 실행 파일 또는 쉘 스크립트
  해당 명령어는 DockerFile 내 1회만 쓸 수 있다.

- EXPOSE
  컨테이너에 맵핑을 할 네트워크 포트

# build

```bash
docker build .
docker build ./
```

도커 파일에 입력된것들을 도커 클라이언트에 전달한다.

## options

### -t

```bash
docker build -t kiss0104040/hello:latest
```

도커 이미지에 이름을 부여한다.
이름의 규칙은 `{나의 도커 아이디}/{저장소 또는 프로젝트 이름}:{버전}` 의 규칙으로 작성된다.

### -f

```bash
docker build -f Dockerfile.dev .
```

개발환경에서는 Dockerfile을 분리한다.
Dockerfile의 이름을 Dockerfile.dev 로 설정하고 기존과 같이 빌드를 하게되면 Dockerfile을 찾지 못한다는 에러가 발생하게 된다.
build 할때 `-f` 옵션을 주어 Dockerfile의 이름을 주게되면 명시한 도커파일로 빌드를 시작한다.

## Reference

---

<https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard>

---
title: "Docker Volume"
description: "Docker Volume"
pubDatetime: 2022-03-20
tags:
  - docker
ogImage: "../../assets/images/docker.png"
---

## Docker Volume

---

Docker Volume 을 사용하면 파일의 변경이 있을때마다 Dockerfile를 새롭게 빌드할 필요가 없어진다.
도커 컨테이너에서 local 파일들을 맵핑하여 변경이 있을때마다 바로 반영되게 할 수 있다.

```bash
docker run -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app {image id}
```

WORKDIR을 /usr/src/app 으로 설정하여서 /usr/src/app 을 붙임

`/usr/src/app/node_modules` 호스트 디렉토리에 node_modules은 없기에 컨테이너에 맵핑을 하지 말라고 하는 것

`$(pwd):/usr/src/app` pwd 경로에 있는 디렉토리 혹은 파일을 /usr/src/app 경로에서 참조
왼쪽이 내 컴퓨터의 경로, 오른쪽이 도커 컨테이너의 경로

## Reference

---

<https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard>

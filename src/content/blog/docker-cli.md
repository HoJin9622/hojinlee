---
title: "Docker CLI 명령어"
description: "Docker CLI 명령어를 알아보자"
pubDatetime: 2022-03-17
tags:
  - "docker"
ogImage: "../assets/images/docker.png"
---

# create

```bash
docker create {image name}
```

docker 컨테이너를 생성한다.
컨테이너 아이디를 받게된다.

# start

```bash
docker start {container id}
```

container를 실행하고 container id를 반환하게 된다.

## options

### -a

```bash
docker start -a {container id}
```

`-a` 옵션은 docker container 가 실행될 때 output을 출력해준다.

# run

```bash
docker run {image name}
```

도커 이미지를 실행한다.
`docker create`와 `docker start` 명령어가 합쳐진 것이다.

```bash
docker run {image name} ls
```

도커 이미지를 실행 후 `ls` 명령어를 실행한다.
이미지가 `ls` 명령어를 사용할 수 없으면 에러를 출력한다.
`docker run alpine ping localhost` 처럼 이미지에서 사용할 수 있는 다른 명령어를 사용할 수 도 있다.

## options

### -p

```bash
docker run -p {local port}:{container port} {image name}
```

port를 매핑해줄 수 있다.
예를들어 `docker run -p 5000:8000 {image name}`으로 작성해주었다면 localhost:5000 으로 접속하면 도커 컨테이너의 8000번 포트로 접속이 가능하다.

### -d

```bash
docker run -d -p 5000:8080 {image name}
```

detach 의 줄임말 컨테이너를 실행한 후 터미널에서 바로 빠져나오게 해준다.

# exec

```bash
docker exec {container id} {command}
```

이미 실행중인 컨테이너에 명령어를 전달한다.
`docker exec {container id} ls`를 전달하면 디렉토리를 볼 수 있다.

## options

### -it

```bash
docker exec -it {container id} {command}
```

예를 들어 `docker exec -it {container id} redis-cli` 과 같은 명령어를 사용하면 컨테이너의 redis-cli를 사용할 수 있다.
`-it` 옵션은 interactive terminal 의 약자로 명령어를 실행 후 계속 명령어를 적을 수 있다.
`-i` 옵션과 `-t` 옵션을 붙힌것이다.

```bash
docker exec -it {container id} {sh, bash, zsh, powershell}
```

이미지에 따라서 sh, bash, zsh, powershell 을 사용해 터미널에 접근한다.
보편적으로 사용가능한 `sh`가 많이 사용된다.
Control + D로 쉘에서 빠져나올 수 있다.

# stop

```bash
docker stop {container id}
```

도커 컨테이너를 중지시킨다.
진행중이던 작업을 완료한 후 중지시킨다.

# kill

```bash
docker kill {container id}
```

도커 컨테이너를 즉시 중지시킨다.

# ps

```bash
docker ps
```

현재 실행중인 도커 컨테이너를 확인할 수 있다.

## options

### --format

```bash
docker ps --format 'table{{.Names}}'
```

현재 실행중인 도커 컨테이너 목록에서 `Names` Column만 가져온다.

### -a

```bash
docker ps -a
```

`-a` 옵션을 넣으면 꺼져있는 컨테이너도 확인할 수 있다.

# rm

```bash
docker rm {container id}
```

컨테이너를 제거한다.
종료된 컨테이너만 제거할 수 있다.

```bash
docker rm `docker ps -a -q`
```

`ps` 명령어를 활용하여 모든 도커 컨테이너를 제거한다.

# rmi

```bash
docker rmi {image id}
```

도커 이미지를 삭제한다.

# system prune

```bash
docker system prune
```

한번에 컨테이너, 이미지, 네트워크를 모두 삭제한다.
실행중인 컨테이너에는 영향을 주지 않는다.

# Reference

---

https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard
https://docs.docker.com/engine/reference/run/

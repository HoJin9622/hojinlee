---
title: "Docker Ubuntu16.04 설치"
description: "Docker Ubuntu16.04 설치"
pubDatetime: 2020-12-15
tags:
  - "docker"
ogImage: "../assets/images/docker.png"
---

```
docker run ubuntu:16.04
```

ubuntu 16.04 컨테이너를 생성한다.
이미지가 저장되어 있는지 확인하고 없으면 다운로드(pull) 한 후 컨테이너를 생성(create)하고 시작(start)한다.
위 명령어는 뭘 하라고 다른 명령어를 전달하지 않았기 때문에 컨테이너는 생성되마자 종료된다.
컨테이너는 프로세스이기 때문에 실행중인 프로세스가 없으면 컨테이너는 종료된다.

```
docker run --rm -it ubuntu:16.04 /bin/bash
```

컨테이너 내부에 들어가기 위해 bash 쉘을 실행한다.

- --rm : 프로세스가 종료되면 컨테이너가 자동으로 삭제되도록 한다.
- -it : 키보드 입력을 위해 -it 옵션을 준다.
  `cat /etc/issue`와 `ls`를 실행해보면 ubuntu 리눅스인걸 확인할 수 있다.

```
exit
```

exit로 bash 쉘을 종료하면 컨테이너도 같이 종료된다.

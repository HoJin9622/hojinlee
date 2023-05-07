---
title: 'PM2란'
subtitle: 'node.js application 프로세스 매니저 pm2에 대해 알아보자'
date: '2020-12-21'
category: 'infra'
---

pm2는 node.js로 만들어진 앱에 대한 프로세스 관리를 편리하게 해준다.

## 설치

```zsh
$ npm install pm2 -g
```

위 명령으로 설치 가능하다.

1. pm2는 프로세스를 관찰하고 있다가 프로세스가 종료되면 다시 실행해줄 수 있다.
2. js 파일을 수정 했을때 자동으로 프로세스를 껐다가 켜준다.
3. node.js 는 기본적으로 single thread만 지원한다. pm2는 cluster라는 기능으로 16개의 프로세르를 동시에 지원가능하게 해준다.
4. 컴퓨터가 꺼졌다 켜졌을 때 프로세스를 자동으로 실행시켜준다.

## PM2 명령어 목록 확인

```zsh
$ pm2 examples
```

![](https://images.velog.io/images/hojin9622/post/afdc25c5-6ddb-42fc-a7c6-5e8c01796793/Screen%20Shot%202020-12-25%20at%209.49.08%20PM.png)

## pm2 start

```zsh
$ pm2 start app.js
```

node.js 앱을 실행, 프로세스가 만들어진다.

![](https://images.velog.io/images/hojin9622/post/148681d9-57dc-4c8c-8313-4fbace77588f/Screen%20Shot%202020-12-25%20at%209.49.59%20PM.png)

## pm2 ls

```zsh
$ pm2 ls
```

현재 pm2가 감시하고 있는 프로세스 목록

![](https://images.velog.io/images/hojin9622/post/ad2e3218-cb99-43cb-838a-efab54f5350e/Screen%20Shot%202020-12-25%20at%209.51.38%20PM.png)

## pm2 stop

```zsh
$ pm2 stop id|name|namespace|all|json|stdin
```

실행되고 있는 프로세스를 종료

![](https://images.velog.io/images/hojin9622/post/0a68a081-92e4-44a6-a7ea-07d2cd3038b1/Screen%20Shot%202020-12-25%20at%209.52.17%20PM.png)

## pm2 delete

```zsh
$ pm2 delete 0
```

pm2가 감시하고 있는 프로세스를 제거

![](https://images.velog.io/images/hojin9622/post/79d37aa0-0fca-4510-88cc-188a9c8a9aa6/Screen%20Shot%202020-12-25%20at%209.52.50%20PM.png)

## pm2 --watch option

```zsh
$ pm2 start app.js --watch
```

코드가 변경되면 프로세스를 재시작

![](https://images.velog.io/images/hojin9622/post/7b96668e-4edf-4467-b6f5-f5bd5342e597/Screen%20Shot%202020-12-25%20at%209.53.18%20PM.png)

## pm2 log

```zsh
$ pm2 log
```

현재 실행중인 프로세스들의 로그를 하나의 화면에서 보여준다

![](https://images.velog.io/images/hojin9622/post/b9f451da-4056-4222-a300-0cac6ce4be7c/Screen%20Shot%202020-12-25%20at%209.53.57%20PM.png)

## pm2-dev

```zsh
$ pm2-dev app.js
```

app.js 프로그램을 watch하면서 log도 찍어준다

![](https://images.velog.io/images/hojin9622/post/273ec968-1bab-4062-a931-919e2f51e393/Screen%20Shot%202020-12-25%20at%209.55.50%20PM.png)

## pm2 start [name] -i max

```zsh
$ pm2 start app.js -i max
```

프로세스를 실행시킬때 쓰레드의 숫자만큼 프로세스를 실행시킨다.

![](https://images.velog.io/images/hojin9622/post/336b5a84-9949-4eb2-983e-f2e9708e6d09/Screen%20Shot%202020-12-25%20at%209.56.34%20PM.png)

## 운영체제 재시작 자동실행 명령어

```zsh
$ pm2 start app.js
$ pm2 save
$ pm2 startup
```

운영체제마다 컴퓨터가 재시작되었을 때 저장된 프로세스들을 자동실행 할 수 있는 명령어를 알려준다.

```zsh
$ pm2 unstartup systemd
또는
$ pm2 unstartup launchd
```

운영체제 시작 시 저장된 프로세스 자동실행 취소

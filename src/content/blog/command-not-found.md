---
title: "react native node: command not found"
description: "react native node: command not found 해결"
pubDatetime: 2022-07-20
tags:
  - "react-native"
---

[이전 비슷한 에러](https://velog.io/@hojin9622/react-native-0.67-%EB%B2%84%EC%A0%84-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C-%ED%9B%84-fbreactnativespec-command-phasescriptexecution-failed-with-a-nonzero-exit-code-%EC%97%90%EB%9F%AC)

저번과 같은 에러가 발생했다.
mac m1으로 장비를 교체하면서 `brew install node`를 사용하지 않고 nvm으로 node를 관리할 수 있게 세팅하였다.
iTerm에서 `npx react-native start`하면 정상 실행되지만 xCode에서 실행하면 `node: command not found` 에러가 발생한다.

https://github.com/realm/realm-js/issues/1448#issuecomment-340757479

위 링크에서 해결 방법을 발견하였다.

```bash
/bin/sh
ln -s $(which node) /usr/local/bin/node
```

sh shell에 node가 연결되어있지 않아서 발생하는 문제인 것 같으며, 위 커맨드로 해결할 수 있다.

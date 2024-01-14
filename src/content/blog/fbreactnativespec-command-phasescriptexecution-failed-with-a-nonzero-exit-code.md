---
title: "react native 0.67 버전 업그레이드 후 fbreactnativespec command phasescriptexecution failed with a nonzero exit code 에러"
description: "react-native 0.67 업그레이드 후 에러 해결"
pubDatetime: 2022-02-15
tags:
  - "react-native"
---

react-native 버전을 0.67 버전으로 업데이트 후 command phasescriptexecution failed with a nonzero exit code가 나오면서 IOS 애플리케이션이 실행되지 않았다.

<https://github.com/react-native-community/upgrade-support/issues/161>

위 깃헙 이슈에서 `nvm unalias default` 를 사용하면 해결하였다는 코멘트를 보고 실행하였더니 해결되었다.

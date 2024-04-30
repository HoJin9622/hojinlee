---
title: "Expo Failed to start launchd_sim: could not bind to session, launchd_sim may have crashed or quit responding"
description: "Expo iOS Simulator 실행 시 발생한 Failed to start launchd_sim: could not bind to session, launchd_sim may have crashed or quit responding 에러 해결"
pubDatetime: 2024-05-01
tags:
  - react-native
---

Expo 개발 중 `npm run start` 명령 후 `i`를 입력하여 iOS Simulator를 실행 시킬 때 아래와 같은 에러가 발생했다.

```bash
Error: xcrun exited with non-zero code: 60
An error was encountered processing the command (domain=NSPOSIXErrorDomain, code=60):
Unable to boot the Simulator.
launchd failed to respond.
Underlying error (domain=com.apple.SimLaunchHostService.RequestError, code=4):
Failed to start launchd_sim: could not bind to session, launchd_sim may have crashed or quit responding
```

해당 에러를 해결하기 위해

```bash
sudo rm -rf ~/Library/Developer/CoreSimulator/Caches
```

위와 같이 시뮬레이터 캐시를 삭제하면 해결된다.

참고: <https://stackoverflow.com/questions/65172944/when-running-on-older-ios-simulator-error-failed-to-start-launchd-sim-could-n>

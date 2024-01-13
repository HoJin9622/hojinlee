---
pubDatetime: 2021-06-04
title: "Swift._ArrayBuffer._copyContents 에러 해결"
tags:
  - "react-native"
description: "Swift._ArrayBuffer._copyContents 에러 해결법"
ogImage: "../assets/images/react-native-swift-arraybuffer-copycontents-error.png"
---

![](https://images.velog.io/images/hojin9622/post/e55183a6-e81d-47f1-967e-ff86645fc07b/Screen%20Shot%202021-06-04%20at%205.20.00%20PM.png)

React Native에서 위와 같은 에러가 발생했을 때의 해결 방법이다.

![](https://images.velog.io/images/hojin9622/post/02ef71f6-09a2-4dee-ada7-4b4a93dacd43/Screen%20Shot%202021-06-04%20at%205.20.43%20PM.png)

코드 에디터에서 전체검색으로 `swift-5` 라고 검색 한 후 해당 코드를 제거해준 후 다시 실행하면 정상적으로 빌드가 된다.

```
"\"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)\"",
"\"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)\"",
```

제거 한 두 줄

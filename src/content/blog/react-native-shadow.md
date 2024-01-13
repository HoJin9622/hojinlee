---
pubDatetime: 2020-12-15
title: "React Native Shadow 생성"
description: "React Native Shadow 생성"
tags:
  - "react-native"
---

## Shadow & Platform

Shadow는 ios/android 플랫폼마다 약간 다르다.
따라서 platform-specific code를 작성해야한다.

```js
shadowColor:
shadowOffset:
shadowOpacity:
shadowRadius:
```

ios에서는 그림자의 color, offset, opacity, radius를 지정해줄 수 있다.

```js
elevation: 5;
```

안드로이드는 elevation을 사용한다.
elevation은 0부터 5까지 있으며 숫자가 커질수록 shadow가 커진다.

```js
import { Platform } from "react-native";
```

Platform을 확인하려면 Platform을 improt한다.

```js
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    })
```

style에 `...Platform.select`을 사용하여 ios/android에 따라 스타일을 지정해줄 수 있다.

---
pubDatetime: 2021-03-17
title: "React Native 안드로이드 포토 갤러리 에러 해결"
tags:
  - react-native
description: "react-native-image-picker를 사용하여 이미지 선택할 때 최근 이미지만 선택되고 다른 갤러리, 폴더에서 이미지 선택이 안될때 해결 방법"
---

react-native-image-picker 라이브러리를 사용하여 안드로이드에서 이미지를 선택할 때 최근 이미지는 정상적으로 잘 불러와지지만 갤러리 또는 폴더를 선택해서 이미지를 선택할 때 불러와지지 않는 에러를 발견하였다.

`AndroidManifest.xml` 파일의 `application` 부분에 아래 코드를 추가해주면 정상적으로 작동된다.

```xml
<application
    ...
      android:requestLegacyExternalStorage="true"
    ...
    >
```

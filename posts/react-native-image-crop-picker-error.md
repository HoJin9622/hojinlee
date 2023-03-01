---
title: 'react native image crop picker "Invalid image selected"'
subtitle: 'react native image crop picker "Invalid image selected"'
date: '2021-01-15'
category: 'React Native'
---

React native image crop picker를 사용 도중 디폴트로 나오는 최근 사용한 사진을 선택하지 않고 download 등과 같이 다른 갤러리를 이용하여 안드로이드에서 사진을 업로드 할 때 catch 문에서 `Invalid image selected` 에러가 출력되었다.

![](https://images.velog.io/images/hojin9622/post/6843afbf-8939-44df-9134-4a77497814fb/code.png)

에러를 검색해본 결과 아래 이슈에서 같은 문제를 찾을 수 있었다.

[이슈](https://github.com/ivpusic/react-native-image-crop-picker/issues/1377)

해결방법으로는 `android > src > main > AndroidManifest.xml` 파일에

```
<application
        android:name=".MainApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:requestLegacyExternalStorage="true"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
```

위와 같이 `android:requestLegacyExternalStorage="true"` 를 추가해주면 정상적으로 이미지 파일을 불러올 수 있게 된다.

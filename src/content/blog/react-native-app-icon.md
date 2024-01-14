---
pubDatetime: 2021-06-09
title: "React Native에서 앱 아이콘을 변경하자"
tags:
  - "react-native"
description: "React Native에서 앱 아이콘을 변경하자"
ogImage: "../../assets/images/appicon.jpg"
---

## IOS

<https://appicon.co/>
먼저 위 사이트에서 1024x1024 크기의 이미지를 넣어서 추출해줍니다.

![](https://images.velog.io/images/hojin9622/post/3ecedb2a-330b-4889-9d11-b16437453ed0/Screen%20Shot%202021-06-09%20at%209.20.02%20AM.png)

Xcode를 실행한 후 프로젝트를 열고, Images.xcassets를 클릭한다.

![](https://images.velog.io/images/hojin9622/post/f760320e-aa28-4486-9cbc-0ea9dd8af04f/Screen%20Shot%202021-06-09%20at%209.20.14%20AM.png)

그 후 AppIcon에서 크기에 맞게 뽑아낸 이미지를 넣으면 완성

![](https://images.velog.io/images/hojin9622/post/9e0a81a9-36f6-4f0f-94c3-13feb4ecadae/simulator_screenshot_9C8EC1BB-2DC1-481B-BDA8-771789A32B9B.png)

빌드 후 실행하면 위와같이 잘 넣어진걸 확인할 수 있다.

## Android

<http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher>

![](https://images.velog.io/images/hojin9622/post/e2c15672-257b-4246-be97-78731edc4381/Screen%20Shot%202021-06-09%20at%209.40.01%20AM.png)

안드로이드는 위 사이트에서 추출하고 Name을 ic_launcher와 ic_launcher_round로 두가지를 추출합니다.

![](https://images.velog.io/images/hojin9622/post/4b9bb0cf-23b8-4faf-b620-0a6847654521/Screen%20Shot%202021-06-09%20at%209.41.48%20AM.png)

그 후 추출한 이미지를 android > app > src > main > res 에 폴더별로 넣어줍니다.

![](https://images.velog.io/images/hojin9622/post/270df0f9-7f47-49b7-ab65-ec0c1697b8d8/Screen%20Shot%202021-06-09%20at%209.42.29%20AM.png)

동일한 크기의 ic_launcher_round도 넣어주게되면 완성입니다.

## 참고

<https://velog.io/@dody_/React-Native-%EC%95%B1-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B0%94%EA%BE%B8%EA%B8%B0>

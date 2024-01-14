---
pubDatetime: 2020-12-15
title: "ReactNative에 폰트 적용하기"
tags:
  - react-native
description: "ReactNative에 폰트 적용하기"
---

## 폰트 다운로드

원하는 폰트를 다운로드 받고 파일명을 postscript name으로 변경해준다.

ios 에서는 font-family를 지정할 때 postscript name으로 지정해야해서 파일명을 postscript name으로 변경해주는게 편하다.

![](https://images.velog.io/images/hojin9622/post/820e6a1e-5a34-4a7f-81f3-434eb18aefc8/font1.png)

## ios에 적용

1. 프로젝트 ios 폴더 하단에 Fonts 폴더를 생성하고, Fonts 폴더 내부에 다운로드한 폰트파일을 붙여넣는다.

2. xcode > Open another project... > 프로젝트 폴더 > ios > 프로젝트명.xcworkspace 를 연다.

3. 그 후 프로젝트 폴더를 오른쪽 클릭 후 `Add Files to 프로젝트명...`을 클릭하면 아래와 같은 화면이 나온다.

![](https://images.velog.io/images/hojin9622/post/148940da-15f6-497e-ad6e-3e7ffe26cae3/font2.png)

4. 1번단계에서 생성한 Fonts 폴더를 선택하고 Add folders: Create folder references를 선택하고 Add 한다.

5. 그 후 최상의 프로젝트명 > PROJECT에 자신의 프로젝트 선택 > TARGETS에 제일 위 선택 > Info를 열고 아래와 같이 추가한 font를 넣는다.

![](https://images.velog.io/images/hojin9622/post/c6eb6c3e-472e-42a9-b635-7dbab39eaa3e/font3.png)

## android

안드로이드는 `android/app/src/main/assets/fonts` 폴더를 생성 한 후 폴더 내부에 다운로드한 폰트 파일을 붙여넣는다.

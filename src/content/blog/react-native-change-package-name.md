---
pubDatetime: 2022-12-24
title: "react native 패키지명 변경"
tags:
  - react-native
description: "react native에서 android, ios 패키지명 변경하기"
ogImage: "../../assets/images/react-native.png"
---

```bash
npx react-native init todo --template react-native-template-typescript
```

react native cli 프로젝트 생성

처음 프로젝트를 생성하면 com.todo로 기본 설정된다.

package name을 com.company.todo로 변경하려고 한다.

### IOS

![xcode](@assets/images/react-native-package-name-change-1.png)

XCode로 프로젝트를 열어준다.

1\. Open a project or file

![xcode](@assets/images/react-native-package-name-change-2.png)

2\. todo > ios > todo.xcworkspace

해당 프로젝트 경로의 파일을 열어준다.

![xcode](@assets/images/react-native-package-name-change-3.png)

3\. todo > Signing & Capabilities > Bundle Identifier

Bundle Identifier를 com.company.todo로 변경

### Android

![android-folder](@assets/images/react-native-package-name-change-4.png)

1\. android 폴더 구조를 변경합니다.

기존 android/app/src/main/java/com/todo 로 된 구조를

android/app/src/main/java/com/company/todo 로 변경해줍니다.

com 폴더 밑에 company 폴더를 생성해서 todo 폴더를 이동시켜주세요.

![android-folder](@assets/images/react-native-package-name-change-5.png)

2\. 텍스트 에디터의 전체 검색 기능을 이용하여 com.todo를 검색합니다.

Visual Studio Code에 Mac 기준 command + shift + f 단축키입니다.

![_BUCK](@assets/images/react-native-package-name-change-6.png)
![build.gradle](@assets/images/react-native-package-name-change-7.png)
![AndroidManifest.xml](@assets/images/react-native-package-name-change-8.png)
![MainActivity.java](@assets/images/react-native-package-name-change-9.png)
![MainApplication.java](@assets/images/react-native-package-name-change-10.png)
![MainApplicationReactNativeHost.java](@assets/images/react-native-package-name-change-11.png)
![MainComponentRegistry.java](@assets/images/react-native-package-name-change-12.png)
![MainApplicationTurboModuleManagerDelegate.java](@assets/images/react-native-package-name-change-13.png)

3\. 텍스트 에디터로 검색해서 나오는 파일에서 ReactNativeFlipper.java 파일과 MainApplication.java 파일의 하단

`Class<?\> aClass = Class.forName("com.todo.ReactNativeFlipper");`

이 부분을 제외하고 모두 com.company.todo로 변경해줍니다.

---
pubDatetime: 2021-06-09
title: "React Native Splash Screen 제작(Android)"
tags:
  - "react-native"
description: "React Native Splash Screen 제작(Android)"
ogImage: "../../assets/images/meerkat.png"
---

<https://velog.io/@hojin9622/React-Native-Splash-Screen-%EC%A0%9C%EC%9E%91IOS>

Splash 이미지 파일을 뽑는법은 IOS에 기록하였습니다.

`MainActivity.java` 에 아래와 같이 코드를 넣는다.

```java
package com.meerkat;

import android.os.Bundle;  // here

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;  // here

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "meerkat";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
}
```

![](https://images.velog.io/images/hojin9622/post/b6e096d9-6ade-4e65-ae83-d9eb47885075/Screen%20Shot%202021-06-09%20at%2010.58.31%20AM.png)

그 후 레이아웃 폴더를 만들어준다.

![](https://images.velog.io/images/hojin9622/post/15b4da2a-1e27-4d47-9685-7662b2d45bfb/Screen%20Shot%202021-06-09%20at%2011.02.15%20AM.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```

layout 폴더에 launch_screen.xml 파일을 만들어주고 Design에서 Code로 변경해주고 위 코드를 붙여준다.

![](https://images.velog.io/images/hojin9622/post/86750d33-86e6-4420-8aac-d50b4048c84f/Screen%20Shot%202021-06-09%20at%2011.04.45%20AM.png)

그 후 추출한 이미지를 통째로 android > app > src > main > res 폴더에 붙여넣어준다.
이 때 이미지 파일의 이름은 `launch_screen` 이어야 한다.

![](https://images.velog.io/images/hojin9622/post/280be12c-1aa5-4fc5-bc4b-3c9b320565f0/Screen%20Shot%202021-06-09%20at%2011.08.04%20AM.png)

실행하면 정상적으로 작동한다.

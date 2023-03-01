---
title: 'React Native Splash Screen 제작(IOS)'
subtitle: 'React Native Splash Screen 제작(IOS)'
date: '2021-06-09'
category: 'React Native'
---

https://github.com/crazycodeboy/react-native-splash-screen

사용할 라이브러리이다.

먼저 `yarn add react-native-splash-screen` 로 받아준 후 `npx pod-install ios` 까지 해준다.

https://appicon.co/#image-sets

![](https://images.velog.io/images/hojin9622/post/28315dab-a670-4dce-93c8-ac76d87e4438/Screen%20Shot%202021-06-09%20at%2010.04.53%20AM.png)

그 후 위 사이트에서 2000-3000px 사이의 이미지를 넣고 추출해준다.

![](https://images.velog.io/images/hojin9622/post/00e7b0fb-3b3b-4c21-b6bb-45a1aa416102/Screen%20Shot%202021-06-09%20at%209.58.25%20AM.png)
![](https://images.velog.io/images/hojin9622/post/e1d38eaa-93ce-49eb-bb1f-f99f1891d118/Screen%20Shot%202021-06-09%20at%2010.00.33%20AM.png)

```
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // here

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code

    [RNSplashScreen show];  // here
    // or
    //[RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];
    return YES;
}

@end
```

그 후 Xcode를 켠 후 AppDelegate.m 에서 위와 같이 코드 2줄을 추가해준다.

![](https://images.velog.io/images/hojin9622/post/4dccf522-0265-432e-9ae9-ace188329647/Screen%20Shot%202021-06-09%20at%2010.07.17%20AM.png)

Images.xcassets의 AppIcon 하단 빈 공간에서 마우스 오른쪽 클릭 후 New Image Set 을 클릭하고 이름을 LaunchScreen으로 수정 후 추출한 이미지에서 1x 2x 3x를 찾아서 넣는다.

![](https://images.velog.io/images/hojin9622/post/18f5c919-76e9-4ed7-95a5-479063e537ee/Screen%20Shot%202021-06-09%20at%2010.09.08%20AM.png)

LaunchScreen.storyboard로 이동한다.

![](https://images.velog.io/images/hojin9622/post/893f1c0c-15be-4e94-8e2d-a704614f1383/Screen%20Shot%202021-06-09%20at%2010.10.00%20AM.png)

기존 텍스트를 모두 삭제해준다. 클릭 후 백스페이스를 누르면 삭제된다.

![](https://images.velog.io/images/hojin9622/post/f04142e4-0831-4ca9-9f3f-c36d7e08b472/Screen%20Shot%202021-06-09%20at%2010.11.46%20AM.png)

그 후 View 클릭 후 자 이미지를 클릭한 후 "Safe Area Layout Guide"를 체크 해제해준다.

![](https://images.velog.io/images/hojin9622/post/e1214359-67e4-474f-a7fc-d16b8c8e3618/Screen%20Shot%202021-06-09%20at%2010.14.08%20AM.png)
![](https://images.velog.io/images/hojin9622/post/10ac5859-9592-4d32-97cf-57bcf9bd30eb/Screen%20Shot%202021-06-09%20at%2010.15.08%20AM.png)
![](https://images.velog.io/images/hojin9622/post/1fa014d6-3c7c-45b4-95d4-efa6b9992ca9/Screen%20Shot%202021-06-09%20at%2010.15.38%20AM.png)
그 후 상단의 + 버튼을 눌러 Image로 검색해서 Image View를 기존 View 하단에 넣어주고 하단의 "Add New Constraints"를 클릭 해 Constrain to margins를 체크 풀어주고 모두 0으로 맞춰준다.

![](https://images.velog.io/images/hojin9622/post/dbd231a0-7a7b-4c8e-b05d-bdf6678ebb89/Screen%20Shot%202021-06-09%20at%2010.19.37%20AM.png)
그 후 Image를 LaunchScreen으로 수정하고 Content Mode는 Aspect Fill로 수정해준다.

![](https://images.velog.io/images/hojin9622/post/f7e69c1e-7c4f-41c6-8f37-4b8f871c1964/Screen%20Shot%202021-06-09%20at%2010.26.36%20AM.png)

실행하면 위와 같이 잘 나오는데 스플래시 스크린이 사라지지를 않는다.

```js
import SplashScreen from 'react-native-splash-screen'

React.useEffect(() => {
  SplashScreen.hide()
})
```

App.js 에서 위와같이 작성해주면 스플래시 스크린을 사라지게 할 수 있다.
setTimeout이나 데이터를 불러와준 후 사라지게 만들면된다.

## 참고자료

https://blog.logrocket.com/building-a-splash-screen-in-react-native/
https://dev-yakuza.posstree.com/ko/react-native/react-native-splash-screen/

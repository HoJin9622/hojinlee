---
title: '@react-native-admob/admob 을 사용한 앱 광고'
subtitle: 'react native AdMob 광고 삽입 방법'
date: '2022-01-18'
category: 'React Native'
coverImage: '/images/admob.jpg'
---

### 사용 라이브러리

https://react-native-admob.github.io/admob/docs/installation

### 설치

```zsh
yarn add @react-native-admob/admob
npx pod-install ios
```

위 커맨드로 설치를 해준다.

### Admob 세팅

![](https://images.velog.io/images/hojin9622/post/6b2bb864-a47e-48fd-a814-748cdcd97d5a/Screen%20Shot%202022-01-17%20at%2011.32.02%20PM.png)
Admob 홈페이지에서 새 앱을 추가 해준다.
플랫폼과 앱 스토어 또는 플레이스토어에 등록되었는지 체크해준다.
![](https://images.velog.io/images/hojin9622/post/509ad1a6-a69e-4798-b806-1e89ad6a9f04/Screen%20Shot%202022-01-17%20at%2011.42.12%20PM.png)
앱스토어에 아직 등록하지 않고 생성하면 다음과 같이 진행된다.
![](https://images.velog.io/images/hojin9622/post/4f34d223-2e06-4901-bae8-d340a460cd5d/Screen%20Shot%202022-01-17%20at%2011.43.08%20PM.png)
그 후 광고 단위 추가를 해준다.
![](https://images.velog.io/images/hojin9622/post/9abde10c-43d3-41f7-8999-684ee0ef35a2/Screen%20Shot%202022-01-17%20at%2011.43.37%20PM.png)
앱 하단에 작게 표시할 배너 광고를 제작할 예정이어서 배너 광고를 선택하였다.
![](https://images.velog.io/images/hojin9622/post/7c45037b-b4fc-4273-a87f-de3522803abc/image.png)
그 후 나온 아이디 두개를 복사해둔 후 완료해준다.

### IOS 추가 설정

https://developers.google.com/admob/ios/quick-start#update_your_infoplist
위 링크에서 나와있는대로 Info.plist를 수정해줘야한다.

```plist
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3940256099942544~1458002511</string>
<key>SKAdNetworkItems</key>
<array>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cstr6suwn9.skadnetwork</string>
  </dict>
</array>
```

`GADApplicationIdentifier`에는 앱을 생성할 때 복사해둔 앱ID를 입력한다.
`SKAdNetworkItems`에는 추가 구매자 리스트를 넣으면 되는데 기본으로 Google 식별자를 사용할 예정이어서 `cstr6suwn9.skadnetwork`를 넣으면 된다.
식별자 리스트는 하단 링크 참조
https://developers.google.com/admob/ios/3p-skadnetworks

### 앱 코드

```tsx
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob'
;<BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
```

unitId는 테스트 시에는 반드시 TestIds.BANNER의 값을 사용해야한다.
![](https://images.velog.io/images/hojin9622/post/2d9bea19-794e-466f-b437-039d13489b34/Screen%20Shot%202022-01-17%20at%2011.57.44%20PM.png)
광고 형식에 따른 unitId 이며, `@react-native-admob/admob` 패키지에 `TestIds.BANNER` 로 기본 제공된다.

그 후 실제 앱 배포에는 Admob 홈페이지에서 앱을 생성하며 발급받은 광고단위 ID를 사용하면 된다.

### 결과

![](https://images.velog.io/images/hojin9622/post/e8ae2a0f-5869-4f96-881c-064a8d24b1fd/Screen%20Shot%202022-01-18%20at%2012.02.58%20AM.png)
테스트 모드로 정상 출력되는걸 볼 수 있다.

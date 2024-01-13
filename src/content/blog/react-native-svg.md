---
pubDatetime: 2022-12-29
title: "react native에 svg 파일 표시하기"
tags:
  - "react-native"
description: "react native에 svg 파일 표시하기"
ogImage: "../assets/images/react-native.png"
---

react native는 react처럼 svg 파일을 표시할 수 없습니다.

그래서 react native에서 svg를 다루는 법을 정리해보았습니다.

### 패키지 설치

1\. 먼저 react-native-svg 패키지를 설치해주세요.

```bash
yarn add react-native-svg
```

2\. IOS Link도 진행해주세요.

```bash
cd ios && pod install
```

### 사용법

예시 svg 입니다.

```tsx
<svg
  width="103"
  height="102"
  viewBox="0 0 103 102"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M93.9082 46.41L82.2632 39.6525C93.4832 30.09 82.2207 12.24 68.7482 18.3175L65.0507 19.89L64.5832 15.81C64.1582 11.22 61.7782 7.94752 58.6332 6.03502C51.6632 1.98477 41.0382 4.76002 39.3382 14.875L27.6507 8.16002C23.5707 5.78002 18.3857 7.18252 16.0482 11.2625L11.7982 18.615C10.6082 20.655 11.3307 23.2475 13.3707 24.4375L46.4782 43.5625L52.8532 32.5125L60.2057 36.7625L53.8307 47.8125L86.9382 66.9375C88.9782 68 91.6132 67.405 92.7607 65.365L97.0107 58.0125C99.3482 53.9325 97.9882 48.7475 93.9082 46.41ZM52.9807 21.25C49.2832 22.3125 46.3082 18.36 48.1782 15.0875C49.2832 13.0475 51.9607 12.3675 54.0007 13.515C57.2732 15.4275 56.6357 20.3575 52.9807 21.25ZM75.0382 34C71.3832 35.0625 68.4082 31.11 70.2782 27.8375C71.4257 25.7975 74.0607 25.1175 76.0582 26.265C79.3307 28.1775 78.6932 33.1075 75.0382 34ZM89.1057 71.74C90.8482 71.74 92.5057 71.145 93.9082 70.125V85C93.9082 89.7175 90.1257 93.5 85.4082 93.5H17.4082C15.1539 93.5 12.9919 92.6045 11.3978 91.0104C9.80374 89.4164 8.9082 87.2544 8.9082 85V46.75H43.5457L47.1582 48.875V85H55.6582V53.7625L84.8557 70.5925C86.1307 71.3575 87.5332 71.74 89.1057 71.74Z"
    fill="#DADDE0"
  />
</svg>
```

해당 코드의 svg, path를 react-native-svg의 Svg, Path로 변경해줍시다.

```tsx
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Path, Svg } from "react-native-svg";

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Svg width="103" height="102" viewBox="0 0 103 102" fill="none">
          <Path
            d="M93.9082 46.41L82.2632 39.6525C93.4832 30.09 82.2207 12.24 68.7482 18.3175L65.0507 19.89L64.5832 15.81C64.1582 11.22 61.7782 7.94752 58.6332 6.03502C51.6632 1.98477 41.0382 4.76002 39.3382 14.875L27.6507 8.16002C23.5707 5.78002 18.3857 7.18252 16.0482 11.2625L11.7982 18.615C10.6082 20.655 11.3307 23.2475 13.3707 24.4375L46.4782 43.5625L52.8532 32.5125L60.2057 36.7625L53.8307 47.8125L86.9382 66.9375C88.9782 68 91.6132 67.405 92.7607 65.365L97.0107 58.0125C99.3482 53.9325 97.9882 48.7475 93.9082 46.41ZM52.9807 21.25C49.2832 22.3125 46.3082 18.36 48.1782 15.0875C49.2832 13.0475 51.9607 12.3675 54.0007 13.515C57.2732 15.4275 56.6357 20.3575 52.9807 21.25ZM75.0382 34C71.3832 35.0625 68.4082 31.11 70.2782 27.8375C71.4257 25.7975 74.0607 25.1175 76.0582 26.265C79.3307 28.1775 78.6932 33.1075 75.0382 34ZM89.1057 71.74C90.8482 71.74 92.5057 71.145 93.9082 70.125V85C93.9082 89.7175 90.1257 93.5 85.4082 93.5H17.4082C15.1539 93.5 12.9919 92.6045 11.3978 91.0104C9.80374 89.4164 8.9082 87.2544 8.9082 85V46.75H43.5457L47.1582 48.875V85H55.6582V53.7625L84.8557 70.5925C86.1307 71.3575 87.5332 71.74 89.1057 71.74Z"
            fill="#DADDE0"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};

export default App;
```

정상적으로 작동이 되었다면 그림 1과 같이 선물상자를 확인할 수 있습니다.

![example](@assets/images/react-native-svg-1.png)

### Uri 로 불러오기

SvgUri를 import하여서 사용해주세요

```tsx
import React from "react";
import { SafeAreaView, View } from "react-native";
import { SvgUri } from "react-native-svg";

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <SvgUri
          width="100%"
          height="100%"
          uri="https://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
```

### 파일로 불러오기

추가로 패키지 설치와 설정이 필요합니다.

1\. react-native-svg-transformer 패키지를 dev 옵션으로 받아주세요.

```bash
yarn add --dev react-native-svg-transformer
```

2\. metro.config.js 파일을 다음과 같이 수정해주세요.

```javascript
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      experimentalImportSupport: false,
      inlineRequires: true,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
```

3\. typescript를 사용한다면 declarations.d.ts 파일을 생성하고 다음 코드를 넣어주세요.

```ts
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

사용은 다음과 같이 사용할 수 있습니다.

```tsx
import React from "react";
import { SafeAreaView, View } from "react-native";
import TestSvg from "./test.svg";

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <TestSvg />
      </View>
    </SafeAreaView>
  );
};

export default App;
```

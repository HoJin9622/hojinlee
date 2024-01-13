---
pubDatetime: 2022-12-04
title: "React Native Realm 적용(Typescript)"
tags:
  - "react-native"
description: "React Native에서 Realm를 적용해보자"
coverImage: "/images/realm.png"
---

내가 다른 사람들에게서 받은 선물을 기록하고 저장하는 앱을 React Native로 개발하려고 합니다.

인터넷 연결이 없어도 사용할 수 있게 제작하려 해서 realm을 이용하여 개발을 진행했습니다.

## 설치

```bash
yarn add realm @realm/react react-native-get-random-values
yarn add -D @realm/babel-plugin @babel/plugin-proposal-decorators
```

관련 패키지를 먼저 설치해줍니다.

저는 yarn을 이용하고 있어서 yarn을 사용했지만 npm을 이용하시는 분은 npm으로 설치를 진행해주세요.

**ts.config.json**

```json
// prettier-ignore
{
  "extends": "@tsconfig/react-native/tsconfig.json",     /* Recommended React Native TSConfig base */
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Completeness */
    "skipLibCheck": true,                                 /* Skip type checking all .d.ts files. */
    "experimentalDecorators": true
  }
}
```

먼저 ts.config.json 파일에 `experimentalDecorators` 옵션을 `true`로 설정해줍니다.

**babel.config.json**

```json
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@realm/babel-plugin',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
```

다음으로 babel.config.json 파일에 plugins에 위와 같이 realm/babel-plugin을 추가해주세요.

**index.js**

```jsx
import "react-native-get-random-values"; // 해당 라인 추가
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
```

react-native-get-random-values를 import 해주세요.

고유한 id를 생성할 때 사용합니다.

## Object Schema 정의

**models/gift.ts**

```tsx
import { Realm } from "@realm/react";

export class Gift extends Realm.Object<Gift> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectID();
  name!: string;
  price?: number;
  peopleId!: Realm.BSON.ObjectId;

  static primaryKey = "_id";

  constructor(
    realm: Realm,
    name: string,
    peopleId: Realm.BSON.ObjectId,
    price?: number
  ) {
    super(realm, { name, peopleId, price });
  }
}
```

저는 src 폴더에 models 폴더를 생성하고 해당 폴더에서 object schema를 관리하기로 하였습니다.  
!는 required  
?는 optional  
\=을 붙여서 값을 할당해주면 default 값을 줄 수 있습니다.

constructor에서 name과 peopleId는 required니 필수로 받아주고 price는 optional 하게 받아줍니다.

## Context 생성

**models/index.ts**

```ts
import { createRealmContext } from "@realm/react";
import { Gift } from "./gift";

export const RealmContext = createRealmContext({
  schema: [Gift],
});
```

context를 생성해줍니다.  
이전에 만들었던 Gift 클래스를 schema로 줍시다.

**App.tsx**

```tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./routers/RootStack";
import { SafeAreaView, StyleSheet } from "react-native";
import { RealmContext } from "./models";

const App = () => {
  const { RealmProvider } = RealmContext;

  return (
    <SafeAreaView style={styles.container}>
      <RealmProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

그 후 RealmProvider로 App을 감싸줍니다.

## 사용법

### read

```tsx
import React, {useEffect, useMemo} from 'react';
import {RealmContext} from '../models';
import {People} from '../models/people';
import {Gift} from '../models/gift';

const {useQuery} = RealmContext;

export default function Gifts({route, navigation}: Props) {
  const result = useQuery(Gift);

  console.log(result)

  ...
}
```

RealmContext에서 useQuery를 가져와 Gift를 넘기면 Gift 목록을 확인할 수 있습니다.

### filter

```ts
const gifts = useMemo(
  () => result.filtered("peopleId == $0", _id),
  [result, _id]
);
```

해당 결과를 filter하고 싶다면 `filtered`를 사용합니다.  
`$`를 사용해서 매개변수를 사용할 수 있습니다.(여러 개를 넣게 된다면 $0, $1, $2)  
해당 예시는 \_id에 해당하는 peopleId를 filter하는 예시입니다.

### create

```tsx
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {RealmContext} from '../models';
import {Gift} from '../models/gift';

interface Form {
  name: string;
  price: string;
}

const {useRealm} = RealmContext;

export default function AddGift({navigation, route}: Props) {
  const realm = useRealm();
  const {_id} = route.params;
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<Form>();

  const onValid = async ({name, price}: Form) => {
    realm.write(() => {
      return new Gift(realm, name, _id, +price);
    });
    navigation.goBack();
  };

  ...
}
```

새로운 Gift를 생성하는 예시입니다.  
react-hook-form을 사용하였으며 realm.write 내에서 new Gift의 생성자 매개 변수만 올바르게 넣어주신다면 문제없이 생성할 수 있습니다.

### get

```tsx
const { useObject } = RealmContext;

const gift = useObject(Gift, _id);
```

id로 한 객체만 가져오고 싶을땐 useObject를 사용합니다.

이 외에도 delete, update등 필요하신 작업들은 공식문서를 참고하시면 쉽게 구현 가능합니다.

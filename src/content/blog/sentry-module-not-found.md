---
pubDatetime: 2023-06-12
title: "Sentry Module not found: Can't resolve '@sentry/utils/esm/buildPolyfills'"
tags:
  - "infra"
featured: true
description: "NextJS13 Sentry 적용 중 생긴 에러"
ogImage: "../assets/images/sentry-logo.png"
---

## 배경

진행하는 프로젝트에 Sentry를 적용하려고 하였습니다.

해당 프로젝트는 NextJS13 App Router로 구성되었고 yarn berry를 사용하였습니다.

```bash
npx @sentry/wizard@latest -i nextjs
```

위 명령어를 이용해서 Sentry를 init 하였으나 에러가 발생했습니다.

app router의 페이지들에 대해서 접근하게되면 `Module not found: Can't resolve '@sentry/utils/esm/buildPolyfills'`라는 에러가 발생하였습니다.

## 해결

처음에는 Sentry가 NextJS13 App Router에 대한 지원을 하지 않는다고 생각해서 sentry github에 이슈를 올렸습니다.

[해당 이슈](https://github.com/getsentry/sentry-javascript/issues/8180)

해당 이슈의 Comment로 yarn berry를 사용하였을 때 저와 같은 에러가 발생한다는 것을 알게되었고 Reproduction app을 생성하여 Comment를 남겼습니다.

답변으로는 yarn berry를 사용했을 때 해당 이슈가 발생해서 Sentry의 문제가 아닌 berry의 문제로 보고 해당 저장소로 이슈를 남기라고 답변을 받게 되었습니다.

그 후 yarn berry 깃허브 저장소에 이슈를 남겼기게 되었으며([해당 이슈](https://github.com/yarnpkg/berry/issues/5489)) yarn berry의 버그가 아닌 의존성 패키지를 설치하지 않아서 발생한 문제라는 답변을 받게되었습니다.

기존의 [package manager의 문제](https://yarnpkg.com/advanced/rulebook#packages-should-only-ever-require-what-they-formally-list-in-their-dependencies) 때문에 sentry를 설치할 때 `@sentry/utils` 패키지도 명시적으로 설치해주어야 하였습니다.

예를들어 동일한 기능을 제공하는 여러 의존성이 중복으로 포함되어 있는 경우 Phantom Dependency 문제가 발생할 수 있습니다.

## 결론

```bash
yarn add @sentry/utils
```

sentry/utils 패키지를 설치 후 해결되었습니다.

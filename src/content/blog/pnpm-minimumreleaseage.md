---
pubDatetime: 2025-09-30
title: "pnpm minimumReleaseAge로 패키지 보안 강화하기"
tags:
  - "pnpm"
  - "security"
  - "package-manager"
description: "pnpm의 minimumReleaseAge 옵션으로 새로 배포된 패키지 설치를 지연시켜 보안을 강화하는 방법"
---

최근 npm 생태계에서 인기 패키지들이 악성 공격을 받는 사례들이 증가하고 있습니다. pnpm v10.16.0에서는 이러한 보안 위험을 줄이기 위해 `minimumReleaseAge` 설정을 도입했습니다.

## minimumReleaseAge란?

`minimumReleaseAge`는 새로 배포된 패키지 버전이 설치되기 전에 반드시 대기해야 하는 시간을 설정하는 보안 옵션입니다. 대부분의 악성 패키지는 배포 후 짧은 시간 내에 발견되어 제거되기 때문에, 이 옵션을 통해 보안을 크게 향상시킬 수 있습니다.

### 기본 설정

- **기본값**: 0 (지연 없음)
- **단위**: 분(minutes)
- **추가된 버전**: v10.16.0

## 설정 방법

`.npmrc` 파일에 다음과 같이 설정할 수 있습니다:

```bash
# 1일(1440분) 이상 된 패키지만 설치
minimumReleaseAge: 1440
```

이 설정을 추가하면 pnpm은 패키지 배포 후 최소 1일이 지난 버전만 설치하게 됩니다.

## 예외 설정

특정 패키지는 항상 최신 버전을 바로 설치하고 싶다면 `minimumReleaseAgeExclude`를 사용할 수 있습니다:

```bash
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
- webpack
- react
```

위 설정은 webpack과 react 패키지는 지연 없이 바로 설치하도록 합니다.

## 참고 문서

- [pnpm Settings - minimumReleaseAge](https://pnpm.io/settings#minimumreleaseage)
- [pnpm 10.16 Release Notes](https://pnpm.io/blog/releases/10.16)

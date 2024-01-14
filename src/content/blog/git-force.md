---
title: "github 원격저장소 최근 커밋 1개 제거"
description: "github 원격저장소 최근 커밋 1개 제거"
pubDatetime: 2021-08-16
tags:
  - "git"
---

구글에 한글로 검색하면 local 기록까지 모두 삭제하여 --force로 원격저장소 커밋까지 삭제하는 방법밖에 나오지 않았다.

```bash
git reset --soft HEAD^
```

위 명령어를 사용하여 로컬 상태를 푸쉬하기 전으로 되돌린다.

```bash
git push origin +branchName --force
```

그 후 그 상태를 --force를 사용해 그대로 푸쉬한다.

참조 : <https://stackoverflow.com/questions/448919/how-can-i-remove-a-commit-on-github>

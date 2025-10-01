---
title: "Docker chown -R 사용 시 이미지 용량 문제"
description: "Docker chown -R 을 사용했을 때 발생하는 문제와 해결방법"
pubDatetime: 2024-01-14
tags:
  - docker
  - nextjs
---

## 문제점

기존 root 권한으로 실행되던 nextjs 앱이 보안 문제로 다른 유저를 생성하여 실행해야 해 다음과 같이 dockerfile을 작성하였다.

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /ap/public ./public

RUN mkdir .next

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

CMD ["node", "server.js"]
```

해당 도커파일에서는 chown -R 옵션을 사용하여 /app 폴더에 대해 nextjs 유저에게 권한을 부여한다.

![도커 이미지 레이어](@assets/images/layer-before.jpg)

해당 이미지의 레이어를 확인해본 결과 /app 폴더의 크기인 19.81MB만큼 레이어가 추가된 것을 확인할 수 있다.<br />
도커 이미지는 일련의 레이어로 구성되며 Docker의 경우 chown에 대해서 해당 파일을 새 레이어에 복사하고 소유권을 변경하게 된다.<br />
chown -R nextjs:nodejs /app 명령을 사용하게 된다면 /app 폴더의 용량만큼 공간을 낭비하게 되는 것이다.

> Docker 이미지는 겹치는 레이어로 구성됩니다.
> Dockerfile에 포함된 모든 멍령의 경우 레이어가 추가됩니다.
> 각 레이어는 이전 레이어와의 변경 사항의 집합입니다.
> Docker는 여러 레이어의 파일을 관리하기 위해 CoW(copy on write) 전략을 사용합니다.
> Copy-On-Write는 효율성을 극대화하기 위해 파일을 공유하고 복사하는 전략입니다.
> ![cow](@assets/images/cow.jpg)
> CoW 전략은 데이터가 자주 변경이되면 매번 새로운 복사복을 생성해서 오히려 자원 소모가 높아지는 비효율적인 상황이 발생할 수 있습니다.
> 이러한 Docker의 전략으로 다른 레이어에 포함된 파일을 변경해야하는 경우 파일을 수정하는 레이어에 파일을 복사하므로 최종 이미지에 파일은 2번 존재하고 디스크 공간의 2배를 차지하게 됩니다.
> 도커의 chown도 동일한 규칙을 따릅니다.
> 파일에 소유권 변경을 적용한다는 것은 Docker의 경우 해당 파일을 새 레이어에 복사하고 소유권을 변경하는 것을 의미합니다.
>
> 원글: <https://medium.com/@mmornati/docker-images-and-files-chown-40d2f7248fcc>

## 해결방법

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /ap/public ./public

RUN mkdir .next

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
```

이미지 용량을 축소하기 위해서는 해당 레이어를 줄여야 한다.
RUN chown -R nextjs:nodejs /app 명령을 제거하고 COPY 명령의 매개변수로 소유권을 추가합니다.
Docker 17.09 이상에 대해서 COPY 명령에 대해 --chown flag를 지원합니다.(<https://docs.docker.com/engine/release-notes/17.09/#17090-ce>)

![이미지 사이즈 차이](@assets/images/size-diff.jpg)

해당 매개변수를 사용하여 권한을 변경한 이미지 사이즈와 기존 이미지 사이즈의 차이를 비교해보면 `168.89MB` &rarr; `149.08MB`가 된 것을 확인할 수 있습니다.

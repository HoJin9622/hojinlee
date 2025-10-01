---
pubDatetime: 2025-10-01
title: "Kaniko가 Docker보다 느린 이유"
tags:
  - "kubernetes"
  - "docker"
  - "kaniko"
  - "devops"
description: "Kaniko와 Docker의 빌드 속도 차이가 발생하는 근본적인 원인 분석"
---

Kubernetes 환경에서 컨테이너 이미지를 빌드할 때 Kaniko를 사용하면 Docker보다 빌드 시간이 더 오래 걸립니다. 이 차이는 단순한 성능 차이가 아닌 근본적인 아키텍처 차이에서 비롯됩니다.

## Kaniko란?

Kaniko는 Google이 개발한 오픈소스 도구로, Dockerfile로부터 컨테이너 이미지를 빌드하되 Docker 데몬에 의존하지 않습니다. 이는 다음과 같은 상황에서 유용합니다:

- Kubernetes Pod 내에서 이미지 빌드
- 권한 상승(privileged) 없이 컨테이너 빌드

## 파일시스템 스냅샷 처리 방식의 차이

### Docker의 방식

Docker는 기본적으로 OverlayFS(overlay2) 드라이버를 사용하여 레이어를 네이티브하게 관리합니다:

- 파일시스템 드라이버에게 레이어 완료를 지시하기만 하면 됨
- 변경된 파일을 자동으로 추적하므로 스냅샷이 즉각적
- 레이어 변경 사항이 파일시스템 수준에서 추적됨

### Kaniko의 방식

Kaniko는 파일시스템 레이어를 네이티브하게 추적할 수 없습니다:

- 매 단계마다 전체 파일시스템을 순회하며 `stat` 호출로 모든 파일을 검사
- 수동으로 변경 사항을 찾아내어 스냅샷을 생성
- 각 Dockerfile 명령어마다 이 과정을 반복

## 실제 빌드에서의 병목

Kaniko로 빌드할 때 다음과 같은 메시지들이 반복적으로 나타나며, 이 과정에서 상당한 시간이 소요됩니다:

```text
[Taking snapshot of full filesystem]
[Unpacking rootfs as cmd COPY ...]
```

이 작업들은 `COPY`, `ADD`, `RUN` 등의 명령어마다 수행되므로, Dockerfile에 이러한 명령이 많을수록 빌드 시간이 크게 증가합니다.

## 성능 차이

GitHub 이슈([#875](https://github.com/GoogleContainerTools/kaniko/issues/875))에서 보고된 벤치마크 결과입니다:

- **RUN 명령이 없는 경우**: Docker 58초 vs Kaniko 67초
- **RUN 명령 10개 포함**: Docker 89초 vs Kaniko 180초 (2배 이상 차이)

RUN 명령어가 증가할수록 성능 차이가 극명하게 벌어집니다.

## 참고 문서

- [GoogleContainerTools/kaniko Issue #875](https://github.com/GoogleContainerTools/kaniko/issues/875)

---
pubDatetime: 2022-03-24
title: "3장. 기본 도구"
description: "3장. 기본 도구"
ogImage: "../../assets/images/pragmatic-programmer.jpg"
---

## 오늘 TIL 3줄 요약

- 쉘과 에디터를 유창하게 사용하라

- 버전관리 시스템을 사용하라

- 디버깅에 분할정복을 활용하라

## TIL (Today I Learned) 날짜

2022/03/24

## 오늘 읽은 범위

3장. 기본 도구

## 책에서 기억하고 싶은 내용을 써보세요

- 지식을 일반 텍스트로 저장하라.
- 일반 텍스트가 널리 쓰이는 이유
  - 지원 중단에 대한: 사람이 읽을 수 있는 데이터와 그 자체만으로 의미가 드러나는 데이터는 다른 어떤 형태의 데이터보다, 심지어 그 데이터를 생성한 애플리케이션보다 더 오래 살아남을 것이다.
  - 기존 도구의 활용: 설정 파일이 일반 텍스트로 되어 있다면 그것을 버전 관리 시스템에 넣을 수 있을 것이다. 그러면 버전 관리 시스템이 모든 변경 기록을 자동으로 보존해 줄 것이다.
  - 더 쉬운 테스트: 일반 텍스트로 표현하면 특별한 도구를 만들 필요 없이 간단하게 테스트 데이터를 추가하거나 수정할 수 있다.
- 명령어 셸의 힘을 사용하라.
- 자신만의 셸
  - 색깔 조합 설정
  - 프롬프트 설정: 디렉터리 경로, 버전관리 시스템 상태, 시간 정도만 표시하도록 설정
  - 별칭(alias)과 셸 함수
  - 명령어 자동 완성
- 에디터를 유창하게 쓸 수 있게 하라.

  - 어떤 것이 '유창'한 것인가?

    - 텍스트를 편집할 때 문자, 단어, 줄, 문단 단위로 커서를 이동하거나 내용을 선택하라.
    - 코드를 편집할 때 반대쪽 괄호로 이동하거나, 함수, 모듈 등 다양한 문법 단위로 커서를 이동하라
    - 변경한 코드의 들여쓰기를 자동으로 맞춰라.
    - 여러 줄의 코드를 명령 하나로 주석 처리했다가 다시 주석을 해제하라.
    - 실행 취소를 여러 번 했다가 취소한 명령을 재실행 기능으로 다시 수행하라.
    - 에디터 창을 여러 구역으로 쪼개라. 그리고 각 구역 사이를 이동하라.
    - 특정 줄 번호로 이동하라.
    - 여러 줄을 선택한 후 가나다순으로 정렬하라.
    - 문자열로, 또 정규 표현식으로 검색하라. 이전에 검색했던 것을 다시 검색하라.
    - 선택 영역이나 패턴 검색을 이용하여 일시적으로 여러 개의 커서를 만든 다음, 동시에 여러 곳의 텍스트를 편집하라.
    - 현재 프로젝트의 컴파일 오류를 표시하라.
    - 현재 프로제긑의 테스트를 실행하라.

    위 과제들을 마우스나 트랙패드 없이 모두 수행할 수 있는가?

  - 유용한 기능을 찾았다면 이 기능을 여러분의 몸이 기억하도록 만들어야 한다. 그래야 반사적으로 사용할 수 있다. 유일한 방법은 반복이다.

- 버전 관리
  - 언제나 버전 관리 시스템을 사용하라.
  - 브랜치의 장점 중에 다른 브랜치로부터 격리된다는 것이 있다.
  - 저장소 관리
    - 확실한 보안과 권한 관리
    - 직관적인 UI
    - 명령 줄에서도 모든 작업 수행 가능(작업을 자동화할 때 필요하다.)
    - 자동화된 빌드와 테스트
    - 브랜치 병합(풀 리퀘스트라고 부르기도 한다)을 잘 지원
    - 이슈 관리. 커밋이나 브랜치 병합과 연계가 가능하고 지표도 구할 수 있으면 이상적이다.
    - 적절한 보고서 기능. 칸반 보드 형식으로 처리할 이슈나 작업을 표시할 수 있으면 매우 유용하다.
    - 원활한 팀 의사소통을 돕는 기능. 변경 사항이 있을 때 이메일 혹은 다른 수단으로 알려준다든지, 위키를 제공한다든지 등등
  - 프로젝트 이외의 것에도 버전 관리를 사용하라.
    - 홈브루로 설치한 소프트웨어 목록
    - 애플리케이션을 설정하는 앤서블 스크립트
    - 에디터 설정
    - 모든 사용자 설정 및 "."으로 시작하는 파일
- 디버깅
  - 비난 대신 문제를 해결하라. 버그가 여러분의 잘못인지 다른 사람의 잘못인지는 중요치 않다. 어쨌거나 그 버그를 해결해야 하는 사람은 여러분이다.
  - 디버깅할 때 근시안의 함정에 주의하라. 표면에 보이는 증상만 고치려는 요구를 이겨 내라. 실제 문제는 여러분 눈앞에 있는 것에서 몇 단계 떨어져 있고, 또 다른 여러 가지와 연관되어 있을 확률이 다분하다. 겉으로 드러난 특정한 증상만 고치려고 하지 말고, 항상 문제의 근본 원인을 찾으려고 노력하라.
  - 디버깅 전략
    - 버그 재현하기: 코드를 고치기 전 실패하는 테스트부터.
    - 먼저 문제가 무엇인지 보자. 프로그램이 죽었는가? 우리가 프로그래밍 실습이 포함된 수업을 할 때면, 빨간색 예외 메시지가 튀어나오면 냅다 탭 키를 눌러서 코드로 직진하는 개발자가 얼마나 많은지 늘 놀라울 따름이다. `그놈의 오류 메시지 좀 읽어라.`
    - 입력값에 따라 바뀜: 데이터 세트를 복사한 다음, 개발 환경에서 실행시킨 애플리케이션에 입력해서 여전히 프로그램이 죽는지 확인하라. 프로그램이 죽는다면 이진 분할을 활용해서 정확히 어떤 입력값이 범인인지 찾아내라.
    - 분할 정복 방식을 사용하라.
    - 고무오리: 문제의 원인을 찾는 매우 단순하지만 꽤 유용한 기법으로 그냥 누군가에게 문제를 설명하는 방법이 있다. 코드가 무엇을 해야 하는지 차근차근 설명해 나가는 단순한 행위 그 자체로 충분할 때가 많다.
    - 버그를 수정하는 김에, 혹시 이것과 동일한 버그가 있을 법한 다른 코드가 있는지 살펴보자.
- 엔지니어링 일지
  - 회의에서 메모할 때나 작업하는 내용을 써 놓을 때, 디버깅하다가 변수의 값을 적어 놓을 때 등 일지를 쓴다.
    - 기억보다 더 믿을 만하다.
    - 진행 중인 작업과 직접적인 관계가 없는 발상을 일단 쌓아 놓을 수 있는 곳이 생긴다.
    - 무언가를 쓰기 위해 하던일을 멈추면 여러분의 뇌도 기어를 바꾼다. 누군가에게 이야기를 하는 것과 비슷하다. 하던일을 되돌아보기에 알맞은 기회가 생기는 것이다.

## 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요

- 카멜케이스를 스네이크 케이스로 변경하는 연습 문제 12, 13번을 꼭 풀고 싶다. 연습 문제와는 다르지만 최근 프로젝트의 스네이크 케이스를 카멜케이스로 변경했던 적이 있었다. 시간이 되면 꼭 변경해볼 수 있는 스크립트 등에 실패하더라도 직접 구현을 시도해보겠다.
- 3장은 텍스트 관리와 도구에 관한 부분들이 나왔다. 쉘, 에디터와 같은 도구를 유창하게 사용하라. 버전관리 시스템을 사용하라. 디버깅 전략을 구현하라. 와 같이 여러 부분이 있었는데 여기서 쉘, 에디터를 유창하게 하는 부분과 디버깅에 대한 부분이 내가 아직 많이 부족하다고 생각한다. 그래서 에디터를 유창하게 사용하는 과제부터 수행해보려 한다.

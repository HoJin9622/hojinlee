---
author: Jin
pubDatetime: 2022-11-18
title: "먼스터 NestJS에서 Django로 서버전환"
description: "서버 전환을 통한 생산성 개선"
tags:
  - django
  - nestjs
ogImage: "../../assets/images/monster.png"
---

![기존 어드민](https://velog.velcdn.com/images/hojin9622/post/a2abd994-7b35-48d9-a054-ae8a19c5624f/image.png)

먼스터 서비스는 소비자들에게 예금/적금 특판 상품 정보를 쉽게 전달하기 위해 개발되었습니다.
성공적으로 출시 후 별다른 에러 없이 앱을 운영하고 있었습니다. 초기 출시 후 DAU는 대략 30명 정도로 생각지도 못하게 높게 나와서 만족스러운 상황이었습니다.

그러나 예/적금 특판 상품을 직접 찾고 그러한 상품들을 올리는 과정에서 많은 시간이 소요되었습니다. 제작된 백오피스는 디자인도 처참했고 상품 등록을 위한 Form도 매우 조잡했습니다.
같은 팀의 디자이너분도 상품을 등록을 진행하다가 에러가 발생해서 입력했던 정보들이 소실되는 일이 종종 발생하였고, 이러한 문제와 함께 직장을 출근해야 하고 상품을 올릴 수 있는 시간이 적다 보니 상품 업로드가 점점 뜸해지게 되었습니다.

하지만 상품의 갯수가 적고 업로드 주기가 적음에도 불구하고 방문자가 계속 유지되어서 방문자들을 실망시키고 싶지 않다는 생각에 백오피스의 개선을 진행하였습니다.

---

## Todo

먼저 개선이 필요한 부분들을 나열하였습니다.

- 이미지 업로드 기능(기존에는 다른 저장소에 이미지 업로드 후 URL을 텍스트 필드에 입력)
- Form Validation
- 상품 수정 기능
- 상품 필터 기능
- 상품 복제 후 수정 기능
- 조잡한 디자인

디자이너분께 백오피스 개선에 어떤 기능이 들어갔으면 좋겠냐고 물어보니 상품을 복제한 후 수정을 할 수 있는 기능이 꼭 들어갔으면 좋겠다고 얘기했습니다.
~~해당 기능이 들어가면 하루에 상품 10개도 올릴 수 있다고 덧붙이면서...~~

<p>
  <img
    src="https://velog.velcdn.com/images/hojin9622/post/ff159e00-056d-4ef2-a1ce-615384625e00/image.png"
    width="50%"
    alt=""
  />
</p>

1. 기존의 백오피스 추가개발
2. Django로 서버 변경

두 가지의 선택지 중에서 Django로의 서버 변경을 선택하였습니다.
Django 에서 기본 제공하는 관리자페이지가 개선이 필요한 모든 부분을 해결해줄 수 있기에 선택하였습니다.
기존의 백오피스를 추가 개발을 진행하게 된다면 관련 API를 제작해야 하고 React 웹도 추가로 개발해야 하며 디자인까지 신경 써야 했습니다.
Django 을 선택하게 된다면 기존 존재하였던 API를 모두 제작하는 시간이 기존의 백오피스를 추가 개발하는 시간보다 적게 소요될 것으로 생각했습니다.
이미지 업로드, Form Validation, 수정, 필터, 복제 후 수정, 디자인과 같이 개선이 필요한 모든 사항이 Django 관리자에 내장되어있었습니다.

## After

![Django Admin](https://velog.velcdn.com/images/hojin9622/post/f05fcfaf-f8f2-437d-9513-27a6644c82c7/image.png)

기존 존재하던 로그인, 댓글 작성, 찜 등의 기능은 아직 미구현이지만 상품 App을 만든 후 기본 제공되는 관리자페이지에서 별도의 시간 소요 없이 상품 등록, 수정, 삭제, 필터, 상품 복제 후 수정 기능이 완성되었습니다.

```python
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    ...
    save_as = True
    filter_horizontal = ("join_types",)
    list_filter = ("kind", "interest_type", "bank", "max_contract_period")
    ...
```

상품 복제 후 수정 기능은 Model Admin에서 `save_as`를 `True`로 설정하는 것으로 매우 간단하게 구현이 되었습니다. 이 기능을 NestJS와 React로 일일이 구현해야 한다고 생각하면 시간을 많이 할당해야 할 텐데 이러한 부분에서 Django 의 도움을 받고 있다고 많이 느끼게 되었습니다.

![DAU](https://velog.velcdn.com/images/hojin9622/post/48bc3c5e-9b22-49d1-a755-f0679e7e8bf2/image.png)

관리자페이지가 개선된 후 상품을 올리기 수월해져 많은 상품을 올리게 되었습니다. 그 후 DAU를 측정해보니 100~200 정도로 측정되었습니다.
최근 예/적금 상품의 금리 상승으로 인한 방문자 증가인지 꾸준한 상품의 업로드 영향인지는 모르겠으나 DAU가 300% 상승하였습니다.

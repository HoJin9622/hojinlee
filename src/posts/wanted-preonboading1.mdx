---
title: '원티드 프리온보딩 백엔드 1일차'
subtitle: '원티드 프리온보딩 백엔드 1일차 회고록'
date: '2022-10-26'
category: 'review'
---

### 1️⃣ 할당된 업무에 대한 진행상황 공유.

- 수행한 업무
  - Product 모델 모델링
  - Product API(CRUD) 구현
- **이슈가 있는 업무**
- 잔여 업무
  - POST /api/v1/products/ 에 photos를 업로드할 수 있게 수정

### 2️⃣ 진행한 작업에 대한 리뷰진행.

Product 모델 구조

```py
thumbnail = models.ImageField(verbose_name="썸네일")
name = models.CharField(max_length=30, verbose_name="상품명")
description = models.TextField(verbose_name="상품 설명")
price = models.PositiveIntegerField(verbose_name="가격")
pre_sale_price = models.PositiveIntegerField(
    null=True,
    blank=True,
    verbose_name="세일 전 가격",
)
is_waiting = models.BooleanField(default=False, verbose_name="판매 대기 여부")
is_best = models.BooleanField(default=False, verbose_name="베스트 상품 여부")
is_md = models.BooleanField(default=False, verbose_name="MD 상품 여부")
stock = models.PositiveIntegerField(default=0, verbose_name="재고")
country = models.CharField(max_length=20, verbose_name="원산지")
delivery_method = models.CharField(
    max_length=6,
    choices=ProductDeliveryMethodChoices.choices,
    verbose_name="배송방법",
)
delivery_price = models.PositiveIntegerField(default=0, verbose_name="배송비")
```

Photo 모델 구조

```py
file = models.ImageField(verbose_name="상품 상세 사진")
product = models.ForeignKey(
    "Product",
    on_delete=models.CASCADE,
    related_name="photos",
    verbose_name="상품",
)
```

프룻스토어 홈페이지를 참고하여 모델링을 진행하였습니다.
상품 리스트, 상품 상세화면에서 확인한 정보들을 Product 필드로 옮기게 되었습니다.
상세화면은 상당히 길게 표시된 이미지가 있었고 `<img />` 태그들이 여러 개 붙여져 있는 것을 보고 Photo 모델을 생성해 Product 모델과 FK로 묶게 되었습니다.
상품의 세일과 세일 전 가격 구분을 %로 설정하여 서버에서 계산해서 내려줄지 사용자가 직접 입력하게 할지 고민하였습니다.
사용자가 %를 입력하게 되면 계산해야 하는 번거로움이 있어서 둘 다 입력할 수 있게 하였습니다.

### 3️⃣ Today I Learned

- CBV와 FBV에 장단점에 대해 학습하였습니다.
  Viewsets을 사용하면 코드의 양이 줄지만 코드를 읽을 때 명확성이 떨어지게 됩니다.
  동료 개발자들이 읽거나 추후 유지보수를 할 때 Viewsets을 사용한 코드라면 추상화가 많이되어 이해에 어려움이 있을 수 있습니다.
  APIView를 사용하면 코드에 명확함이 들어나게 되서 APIView를 사용하게 되었습니다.
  그렇다고 Viewsets의 사용을 지양해야하는 것은 아니라고 생각하고 더 적절한 곳에 사용하면 된다고 봅니다.

### 참고자료

- https://medium.com/@ksarthak4ever/django-class-based-views-vs-function-based-view-e74b47b2e41b
- https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/#trade-offs-between-views-vs-viewsets

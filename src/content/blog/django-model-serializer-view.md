---
title: "Django Model, Serializer, View"
description: "Django Model, Serializer, View"
pubDatetime: 2020-12-15
tags:
  - django
ogImage: "../../assets/images/python-django.png"
---

## Model

장고의 model에 하나의 클래스를 정의한다.
하나의 모델 클래스는 데이터베이스에서 하나의 테이블에 해당된다.

- 필드타입
  - CharField: 길이가 제한된 문자열 형식, max_length 옵션을 지정해야한다.
  - TextField: 길이 제한이 없는 문자열 형식
  - IntegerField: 32비트 정수형 필드
  - BooleanField: True/False 필드
  - DateTimeField: 날짜와 시간을 갖는 필드. 날짜만 가질 경우 DateField, 시간만 가질 경우 TimeField, auto_now_add=True를 줄 경우 현재 시간을 자동으로 삽입한다.
  - FileField: 파일 업로드 필드
  - ImageField: 이미지 파일 필드

- 필드옵션
  - null: null=True이면 DB에서 null이 허용된다.
  - blank: blank=False이면 이 필드는 DB에서 required 된다.
  - primary_key: primary key Field 이다.
  - unique: 해당 필드가 하나밖에 존재하지 못함을 표시한다.
  - default: 필드의 default 값을 지정한다.

## Serializer

serializer는 model을 json 형태로 바꿔준다.

```python
from rest_framework import serializers
from .models import Addresses


class AddressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addresses
        fields = ["name", "phone_number", "address", "created"]
```

Addresses 모델의 name, phone_number, address, created를 json 형태로 렌더링하게 해준다.

```python
    fields = "__all__"
```

위와 같이 fields를 지정하면 Addresses 모델의 모든 필드를 사용한다는 것을 나타낸다.

## View

View는 MVC의 Control과 비슷한 역할을 한다.
장고에서는 MTV 패턴이라고하며 여기서 Template이 MVC의 View를 담당해서 헷갈릴 수 있다.
view는 request를 받아드리고 response를 return한다.

```python
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Addresses
from .serializers import AddressesSerializer
from rest_framework.parsers import JSONParser


@csrf_exempt
# Create your views here.
def address_list(request):
    if request.method == "GET":
        query_set = Addresses.objects.all()
        serializer = AddressesSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = AddressesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
# Create your views here.
def address(request, pk):
    obj = Addresses.objects.get(pk=pk)

    if request.method == "GET":
        serializer = AddressesSerializer(obj)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = AddressesSerializer(obj, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        obj.delete()
        return HttpResponse(status=204)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        search_name = data["name"]
        obj = Addresses.objects.get(name=search_name)
        print(obj.phone_number)

        if data["phone_number"] == obj.phone_number:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)
```

request method가 GET, POST, DELETE, PUT인지에 따라 어떻게 동작할지 결졍 할 수 있다.

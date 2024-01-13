---
title: "Django REST API 튜토리얼"
description: "Django REST API 튜토리얼"
pubDatetime: 2020-12-15
tags:
  - "django"
ogImage: "../../assets/images/python-django.png"
---

## 개발환경

```bash
$ pip3 install pipenv
```

```bash
$ pipenv shell
```

프로젝트 폴더에서 실행

```bash
$ pipenv install django djangorestframework django-rest-knox
```

```bash
$ django-admin startproject leadmanager
```

## leads 생성 model 정의

```bash
$ cd leadmanager
$ python manage.py startapp leads
```

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "leads",
    "rest_framework",
]
```

INSTALLED_APPS에 leads와 rest_framework 추가

```python
from django.db import models


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

leadmanager > leads > models.py

```bash
$ python manage.py makemigrations leads
```

```bash
$ python manage.py migrate
```

## Serializers

```python
from rest_framework import serializers
from leads.models import Lead

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"
```

leadmanager > leads > serializers.py

## api

```python
from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LeadSerializer
```

leadmanager > leads > api.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("", include("leads.urls")),
]
```

leadmanager > leadmanager > urls.py 변경

```python
from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register("api/leads", LeadViewSet, "leads")

urlpatterns = router.urls
```

leadmanager > leads > urls.py 생성

## 실행

```bash
$ python manage.py runserver
```

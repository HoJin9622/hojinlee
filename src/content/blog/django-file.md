---
title: "Django 기본 파일들의 역할"
description: "Django 기본 파일들의 역할"
pubDatetime: 2020-12-15
tags:
  - "django"
ogImage: "../../assets/images/python-django.png"
---

## MVC & MTV

- Model: 안전하게 데이터를 저장
- View: 데이터를 적절하게 유저에게 보여줌
- Control, Template(Django): 사용자의 입력과 이벤트에 반응하여 Model과 View를 업데이트

## WSGI

웹 서버와 장고를 적절하게 결합시켜주는 역할

## urls.py

웹 서버로부터 신호가 들어오게되면 urls.py 에서 받게된다.
urls.py는 정규표현식으로 구성되어 있고 정규표현식에 맞게 특정한 view로 보내준다.

## views.py

데이터베이스에서 데이터를 가져올지, 데이터를 저장할지 결정을 한다.

## models.py

데이터베이스의 정보를 Class에 넣는다.
쿼리문을 사용하지않게 해준다.

## TEMPLATE

html 파일이다.

## settings.py

프로젝트의 설정이 있는 파일

- DEBUG: 디버그 모드 설정, 앱을 출시할 때 디버그 모드를 False로 설정해야한다.
- INSTALLED_APPS: pip로 설치한 앱 또는 본인이 만든 app을 추가
- MIDDLWARE: request와 response 사이의 주요 기능 레이어
- TEMPLATES: django template 관련 설정, 실제 뷰(html, 변수)
- DATABASES: 데이터베이스 엔진의 연결 설정
- STATIC_URL: 정적 파일의 URL(css, javascript, image, etc...)

## manage.py

- 프로젝트 관리 명령어 모음
- 주요 명령어
  - startapp: 앱 생성
  - runserver: 서버 실행
  - createsuperuser: 관리자 생성
  - makemigrations &#123;app_name&#125;: app의 모델 변경 사항 체크
  - migrate: 변경 사항을 DB에 반영
  - shell: 쉘을 통해 데이터를 확인
  - collectstatic: static 파일을 한 곳에 모음

## 프로젝트 생성

프로젝트 생성

```bash
$ django-admin startproject {project_name}
```

app 생성

```bash
$ python manage.py startapp {app_name}
```

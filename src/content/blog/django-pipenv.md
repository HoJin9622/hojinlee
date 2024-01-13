---
title: "pipenv를 사용한 장고 개발환경 세팅"
description: "pipenv를 사용한 장고 개발환경 세팅"
pubDatetime: 2022-02-26
tags:
  - "django"
coverImage: "/images/python-django.png"
---

## pipenv

pipenv는 Python.org에서 공식적으로 권장하는 패키지 설치 툴이다.
node.js로 비교하면 npm 또는 yarn 과 같은 프로젝트마다 종속 패캐지를 프로젝트 별로 관리할 수 있게 하듯이 pipenv도 그와 같은 패키지매니저의 역할을 한다.

```bash
# pipenv 설치
brew install pipenv

# 프로젝트에 python 3 버전대 설치
pipenv --three

# 프로젝트 가상환경 진입
pipenv shell
```

프로젝트 가상환경에 진입하면 shell에 진입했다는 표시가 나타난다.
![](https://images.velog.io/images/hojin9622/post/d542536e-ba50-40fa-bc44-44b7d093e78b/Screen%20Shot%202022-02-26%20at%2012.49.16%20AM.png)

## Django 설치 & 프로젝트 생성

```bash
# 장고 설치
pipenv install Django==4.0.2

# 장고 설치 확인
django-admin

# 장고 프로젝트 생성
django-admin startproject config
```

그 후 pipenv를 이용하여 장고를 설치한 후 장고 프로젝트를 생성해준다.
config 폴더속 내용물을 바깥으로 꺼낸다.

## Linter & Formatter

그 후 Python Linter와 Formatter를 세팅해준다.
Formatter는 black을 사용하였고 Linter는 flake8을 사용하였다.
Formatter를 사용하면 사람마다 코드의 스타일이 다르더라도 통일을 해주어 일관성 있게 작성해주고,
파이썬 공식 가이드라인을 찾아보지않고 코드스타일을 따를 수 있다.
Linter는 Python 코드상의 에러나 사용되지않은 변수 등을 밑줄로 알려줄 수 있다.

`⇧⌘P -> Python: Select Linter -> flake8`
Visual Studio Code에서 위 방법으로 flake8을 설치할 수 있다.
그러면 .vscode 폴더가 생성되고 `settings.json` 파일이 생성되는데 여기서 관련 세팅을 할 수 있다.

```json
{
  "python.linting.flake8Enabled": true,
  "python.linting.enabled": true,
  "python.formatting.provider": "black",
  "python.linting.flake8Args": ["--max-line-length=88"]
}
```

`"python.linting.flake8Args": ["--max-line-length=88"]` 옵션을 추가해주어 라인의 최대 길이를 88자로 수정해준다.

```bash
# 장고 프로젝트 실행
python manage.py runserver

# 데이터베이스 설정
python manage.py makemigrations
python manage.py migrate

# 장고 어드민 생성
python manage.py createsuperuser

# 장고 앱 생성
django-admin startapp rooms
```

### Reference

https://nomadcoders.co/airbnb-clone
https://medium.com/@erish/python-pipenv-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-961b00d4f42f
https://pipenv.pypa.io/en/latest/
https://docs.djangoproject.com/en/4.0/

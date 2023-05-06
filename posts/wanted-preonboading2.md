---
title: '원티드 프리온보딩 백엔드 2~6일차'
subtitle: '원티드 프리온보딩 백엔드 2~6일차 회고록'
date: '2022-11-02'
category: '회고록'
---

## 1️⃣ 할당된 업무에 대한 진행상황 공유.

핀트 서버팀의 과제를 받아 수행.

수행한 업무

- batch scripts 작성
- 요구사항에 작성된 API 개발
- 유저, 자산 등에 관한 모델링

## 2️⃣ 진행한 작업에 대한 리뷰진행.

제공된 xlsx 파일의 데이터를 바탕으로 데이터베이스를 매일 최신 데이터로 갱신해야 했다.
데이터 세트는 그날의 데이터가 매일 새로 제공되는 것을 가정한다 하여 스케줄러를 생각하였다.

먼저 생각한 선택지는 django-crontab 이었다.
django-crontab을 이용하면 기존 ORM을 사용할 수 있고 쉽게 구현할 수 있어 적당해 보였다.
하지만 django-crontab은 script를 만들지 않고 함수를 만들어서 해당 함수를 일정 시간마다 수행시키는 것이어서 요구사항에 적합하지 않다고 생각하였다.

다음 선택지는 github action의 스케줄링을 이용하는 것이다.
xlsx 파일을 csv 파일로 변환한 후 django 의 command를 이용하여 csv 파일을 읽어서 해당 데이터를 데이터베이스에 입력하는 command를 만드는 것이다.
그 후 github action을 이용하여 원하는 시간마다 해당 command를 실행하게 구성하였다.

완성된 yml 파일:

```yml
name: Cron Job

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    env:
      SECRET_KEY: ${{ secrets.SECRET_KEY }}

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Python 3.10
        uses: actions/setup-python@v3
        with:
          python-version: '3.10'

      - name: Install Dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Seed Assets
        run: |
          python manage.py seed_assets
      - name: Seed Transactions
        run: |
          python manage.py seed_transactions
```

github action으로 스케줄러를 만드는 도중 https://crontab.guru/ 라는 사이트를 발견하였다.
해당 사이트는 작업을 원하는 시간에 수행할 수 있게 도움을 준다.

현재는 데이터베이스가 로컬 sq lite로 구성되어있지만, AWS RDS로 교체한다면 매일 새로 제공되는 데이터를 데이터베이스에 최신 데이터로 저장이 가능하다.
AWS RDS 사용은 남은 과제 시간과 비용 문제로 TODO로 남겨두려고 한다.

## 3️⃣ Today I Learned

schedule expressions

스케줄링 표현의 예시를 들어보자면,
Example 1):
`" 5 4 * * * "`
앞에서부터 분, 시간, 일, 월, 요일을 나타낸다.
위 표현은 매번 04시 05분을 나타낸다.

Example 2):
`" 5 4 5 * * "`
위 표현은 매달 5일 04시 05분을 나타낸다.

Example 3):
`" 5 4 * * 3 "`
위 표현은 매 수요일 04시 05분을 나타낸다.

Example 4):
`" 5,10 4 * * * "`
위 표현은 매일 04시 05분과 04시 10분을 나타낸다.

\*: any value
,: value list separator
-: range of values
/: step values

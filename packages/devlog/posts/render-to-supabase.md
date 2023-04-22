---
title: "Render에서 Supabase로 데이터베이스 마이그레이션"
subtitle: "Render postgresql DB에서 Supabase DB로의 전환!"
date: "2023-04-23"
category: "Infra"
coverImage: "/images/supabase.jpg"
---

## 배경

운영하고 있는 사이드프로젝트에서 데이터베이스를 [Render](https://render.com/)의 postgresql을 사용하고 있었습니다.

기존에는 Heroku의 데이터베이스 서비스를 이용하고 있었지만, 유료로 전환된 후 Render는 무료로 사용이 가능하다해서 이용하게 되었었습니다.

![render-pricing](/images/render-to-supabase-1.png)

하지만 첫 90일까지 무료였고 그 이후로는 월 7달러의 비용을 지불해야 이용할 수 있었습니다.

![invoice-history](/images/render-to-supabase-2.png)

3개월이 지난 후 매월 7달러씩 결제가 되었고 수익이 나지않는 사이드프로젝트여서 무료로 데이터베이스를 사용할 수 있는 서비스를 찾게되었고 Supabase에서 데이터베이스를 지원하는 것을 알게되어서 마이그레이션을 진행하게 되었습니다.

## Supabase

Supabase는 백엔드 SaaS 플랫폼입니다.

Firebase와 같이 데이터베이스, 인증, 스토리지, API, 실시간 이벤트등 다양한 기능들을 제공하지만 데이터베이스만 필요하여 데이터베이스 기능만 이용하게 되었습니다.

Supabase는 PostgreSQL 데이터베이스를 기반으로하여 적합하다고 판단되어서 진행하게 되었습니다.

![supabase-pricing](/images/render-to-supabase-3.png)

먼저 Supabase는 따로 신용카드를 등록하지 않아도 이용할 수 있어 예상치 못하게 돈이 빠져나갈 걱정을 하지 않아도 됩니다.

무료플랜에 제공되는 데이터베이스는 500MB까지 제공되며 사이드프로젝트에 유저가 많아지지 않는 이상은 무리없이 무료로 계속 이용할 수 있을 것으로 생각되었습니다.

## Migration

마이그레이션을 진행하기 위해서는 기존 사용하던 Render 데이터베이스의 정보가 필요합니다.

먼저 Render Dashboard에서 마이그레이션하려는 데이터베이스를 선택한 후 Info > Connections로 이동합니다.

해당 탭에서 PSQL Command를 복사 후 메모해둡니다.

![render-database-info](/images/render-to-supabase-4.png)

그 후 Supabase에서 새로운 프로젝트를 생성하고 데이터베이스 비밀번호를 메모해둡니다. 생성된 프로젝트에서 Project Settings > Database에서 Supabase HOST를 복사 후 메모해둡니다.

https://colab.research.google.com/github/mansueli/Supa-Migrate/blob/main/Migrate_Postgres_Supabase.ipynb

그 후 해당 링크에서 제공되는 파일에 메모해둔 PSQL_COMMAND, SUPABASE_HOST, SUPABASE_PASSWORD을 작성한 후 차례대로 실행버튼을 누른다면 완료됩니다.

![Google-Colab](/images/render-to-supabase-5.png)

각 섹션 `Setting the Environment variables`, `Installing PSQL, Downloading the scripts`, `Running migration` 의 왼쪽 버튼을 순서대로 누르고 기다리면 데이터베이스 마이그레이션이 정상적으로 수행됩니다.

해당 가이드는 Supabase에서 기본으로 제공되는 [가이드](https://supabase.com/docs/guides/resources/migrating-to-supabase/render)이며 개발자가 쉽게 마이그레이션 할 수 있도록 문서화하여 너무 좋은 경험이었습니다.

이외에도 많은 기능을 제공하여 다른 사이드프로젝트를 진행하거나 할 때 Supabase의 다른기능들도 이용해본다면 좋을 것 같습니다.

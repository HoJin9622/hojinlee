---
author: Jin
pubDatetime: 2022-05-22
title: "Zappa, Github Actions, AWS Lambda를 이용한 Serverless CI/CD 구축"
tags:
  - django
description: "serverless 애플리케이션을 만들어보자"
ogImage: "../../assets/images/lambda.png"
---

## 환경

```
django = "==4.0.3"
pillow = "==9.1.0"
django-ninja = "==0.17.0"
requests = "==2.27.1"
django-environ = "==0.8.1"
psycopg2 = "==2.9.3"
boto3 = "==1.21.46"
django-storages = "==1.12.3"
zappa = "==0.54.1"
```

- OS: Mac
- 가상환경: Pipenv

S3와 RDS는 이미 연결된 상태로 시작합니다.

## Zappa

AWS IAM 유저를 새로 생성 한 후 다음 정책을 추가해줍니다.
생성한 유저의 ACCESS KEY ID와 SECRET ACCESS KEY를 잘 보관해둡니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "iam:GetAccountPasswordPolicy",
        "iam:ListServerCertificates",
        "iam:GenerateServiceLastAccessedDetails",
        "cloudformation:DescribeStackResource",
        "iam:ListVirtualMFADevices",
        "iam:SetSecurityTokenServicePreferences",
        "apigateway:UpdateRestApiPolicy",
        "iam:SimulateCustomPolicy",
        "events:ListRuleNamesByTarget",
        "iam:CreateAccountAlias",
        "cloudformation:UpdateStack",
        "events:ListRules",
        "events:RemoveTargets",
        "logs:FilterLogEvents",
        "apigateway:GET",
        "iam:GetAccountAuthorizationDetails",
        "iam:GetCredentialReport",
        "events:ListTargetsByRule",
        "cloudformation:ListStackResources",
        "iam:ListPolicies",
        "events:DescribeRule",
        "iam:ListSAMLProviders",
        "apigateway:*",
        "cloudformation:DescribeStacks",
        "iam:*",
        "iam:UpdateAccountPasswordPolicy",
        "cloudformation:DeleteStack",
        "ec2:*",
        "apigateway:POST",
        "iam:GetAccountSummary",
        "iam:GenerateCredentialReport",
        "logs:DescribeLogStreams",
        "iam:GetServiceLastAccessedDetailsWithEntities",
        "events:PutRule",
        "iam:ListPoliciesGrantingServiceAccess",
        "iam:GetServiceLastAccessedDetails",
        "iam:GetOrganizationsAccessReport",
        "apigateway:DELETE",
        "apigateway:PATCH",
        "iam:DeleteAccountAlias",
        "iam:DeleteAccountPasswordPolicy",
        "apigateway:PUT",
        "logs:DeleteLogGroup",
        "s3:*",
        "iam:ListRoles",
        "iam:GetContextKeysForCustomPolicy",
        "events:DeleteRule",
        "events:PutTargets",
        "iam:ListOpenIDConnectProviders",
        "cloudformation:CreateStack",
        "lambda:*",
        "iam:ListAccountAliases",
        "iam:ListUsers",
        "iam:ListGroups"
      ],
      "Resource": "*"
    }
  ]
}
```

먼저 로컬 환경에서 Lambda로 업로드가 되는지 확인한 후 Github Action을 활용하여 업로드 하겠습니다.

이제 Zappa를 설치해줍니다.

```bash
pipenv install zappa
```

그 후 환경변수에 AWS KEY를 임시로 저장합니다.
최종적으로 Github Action을 이용할 것이기 때문에 임시로 저장하였습니다.

```bash
export AWS_ACCESS_KEY_ID={저장한 IAM USER ID}
export AWS_SECRET_ACCESS_KEY={저장한 IAM USER SECRET}
```

이제 zappa init 명령어를 이용하여 zappa_settings.json 파일을 생성해줍니다.

```bash
zappa init

███████╗ █████╗ ██████╗ ██████╗  █████╗
╚══███╔╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
  ███╔╝ ███████║██████╔╝██████╔╝███████║
 ███╔╝  ██╔══██║██╔═══╝ ██╔═══╝ ██╔══██║
███████╗██║  ██║██║     ██║     ██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝

Welcome to Zappa!

Zappa is a system for running server-less Python web applications on AWS Lambda and AWS API Gateway.
This `init` command will help you create and configure your new Zappa deployment.
Let's get started!

Your Zappa configuration can support multiple production stages, like 'dev', 'staging', and 'production'.
What do you want to call this environment (default 'dev'): dev

AWS Lambda and API Gateway are only available in certain regions. Let's check to make sure you have a profile set up in one that will work.
We couldn't find an AWS profile to use. Before using Zappa, you'll need to set one up. See here for more info: https://boto3.readthedocs.io/en/latest/guide/quickstart.html#configuration

Your Zappa deployments will need to be uploaded to a private S3 bucket.
If you don't have a bucket yet, we'll create one for you too.
What do you want to call your bucket? (default 'zappa-y5dsfevid'):

It looks like this is a Django application!
What is the module path to your projects's Django settings?
We discovered: config.settings
Where are your project's settings? (default 'config.settings'):

You can optionally deploy to all available regions in order to provide fast global service.
If you are using Zappa for the first time, you probably don't want to do this!
Would you like to deploy this application globally? (default 'n') [y/n/(p)rimary]: n

Okay, here's your zappa_settings.json:

{
    "dev": {
        "django_settings": "config.settings",
        "profile_name": null,
        "project_name": "test-project",
        "runtime": "python3.9",
        "s3_bucket": "zappa-y5dsfevid"
    }
}

Does this look okay? (default 'y') [y/n]: y

Done! Now you can deploy your Zappa application by executing:

        $ zappa deploy dev

After that, you can update your application code with:

        $ zappa update dev

To learn more, check out our project page on GitHub here: https://github.com/Zappa/Zappa
and stop by our Slack channel here: https://zappateam.slack.com

Enjoy!,
 ~ Team Zappa!
```

`zappa init` 명령어를 실행하면 어떤 환경을 사용할 것인지(production/dev 등), S3 버킷이름은 어떻게 할 것인지, settings 이 맞는지 등을 확인합니다.

설명만 보면 zappa deploy dev로 바로 올리 수 있을 것 같지만, 실행하면 에러가 납니다.
생성된 zappa_settings.json 파일에 aws_region을 추가해줍니다.

```json
{
  "dev": {
    "django_settings": "config.settings",
    "profile_name": null,
    "project_name": "test-project",
    "runtime": "python3.9",
    "s3_bucket": "zappa-y5dsfevid",
    "aws_region": "ap-northeast-2"
  }
}
```

aws_region을 추가해주었다면 이제 `zappa deploy dev`로 lambda에 올릴 수 있고 이후부터는 `zappa update dev`로 업데이트가 가능합니다.

## 에러

### 환경변수

프로젝트에 환경변수를 사용중이라면 Lambda > 함수 > \{test_project} > 구성 > 환경 변수에서 입력이 가능합니다.
![](https://velog.velcdn.com/images/hojin9622/post/2732679c-531e-41dc-9170-5f2334968e6c/image.png)

### ImproperlyConfigured: Error loading psycopg2 module: No module named 'psycopg.\_psycopg'

`zappa update dev`로 lambda에 올리려고 했으나 계속 마지막 부분에서 실패 메시지가 발생했습니다.
`zappa update dev`로 실패 이유와 에러메시지는 콘솔에 나타나지 않아서 Lambda > 함수 > \{test_project} > 모니터링 > 로그에서 가장 최근 로그를 확인하여 에러를 발견하였습니다.
`zappa tail` 명령어로도 확인이 가능합니다!
![](https://velog.velcdn.com/images/hojin9622/post/468de406-ee9a-4597-84ee-bd85accf2532/image.png)

```bash
[ERROR] ImproperlyConfigured: Error loading psycopg2 module: No module named 'psycopg2._psycopg'
Traceback (most recent call last):
  File "/var/task/handler.py", line 655, in lambda_handler
    return LambdaHandler.lambda_handler(event, context)
  File "/var/task/handler.py", line 249, in lambda_handler
    handler = global_handler or cls()
  File "/var/task/handler.py", line 158, in __init__
    wsgi_app_function = get_django_wsgi(self.settings.DJANGO_SETTINGS)
  File "/var/task/zappa/ext/django_zappa.py", line 21, in get_django_wsgi
    return get_wsgi_application()
  File "/tmp/test_project/django/core/wsgi.py", line 12, in get_wsgi_application
    django.setup(set_prefix=False)
  File "/tmp/test_project/django/__init__.py", line 24, in setup
    apps.populate(settings.INSTALLED_APPS)
  File "/tmp/test_project/django/apps/registry.py", line 116, in populate
    app_config.import_models()
  File "/tmp/test_project/django/apps/config.py", line 304, in import_models
    self.models_module = import_module(models_module_name)
  File "/var/lang/lib/python3.8/importlib/__init__.py", line 127, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "<frozen importlib._bootstrap>", line 1014, in _gcd_import
  File "<frozen importlib._bootstrap>", line 991, in _find_and_load
  File "<frozen importlib._bootstrap>", line 975, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 671, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 843, in exec_module
  File "<frozen importlib._bootstrap>", line 219, in _call_with_frames_removed
  File "/tmp/test_project/django/contrib/auth/models.py", line 3, in <module>
    from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
  File "/tmp/test_project/django/contrib/auth/base_user.py", line 49, in <

module>
    class AbstractBaseUser(models.Model):
  File "/tmp/test_project/django/db/models/base.py", line 141, in __new__
    new_class.add_to_class("_meta", Options(meta, app_label))
  File "/tmp/test_project/django/db/models/base.py", line 369, in add_to_class
    value.contribute_to_class(cls, name)
  File "/tmp/test_project/django/db/models/options.py", line 235, in contribute_to_class
    self.db_table, connection.ops.max_name_length()
  File "/tmp/test_project/django/utils/connection.py", line 15, in __getattr__
    return getattr(self._connections[self._alias], item)
  File "/tmp/test_project/django/utils/connection.py", line 62, in __getitem__
    conn = self.create_connection(alias)
  File "/tmp/test_project/django/db/utils.py", line 208, in create_connection
    backend = load_backend(db["ENGINE"])
  File "/tmp/test_project/django/db/utils.py", line 113, in load_backend
    return import_module("%s.base" % backend_name)
  File "/var/lang/lib/python3.8/importlib/__init__.py", line 127, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "/tmp/test_project/django/db/backends/postgresql/base.py", line 28, in <module>
    raise ImproperlyConfigured("Error loading psycopg2 module: %s" % e)
```

<https://stackoverflow.com/questions/44855531/no-module-named-psycopg2-psycopg-modulenotfounderror-in-aws-lambda>

해당 글을 참조하여 `psycopg2-binary`를 설치하여 해결하였습니다.

이후 `zappa update dev`를 하면 publish된 웹 사이트 주소를 마지막에 반환해줍니다.

### Django Admin에 CSS가 적용되지 않는 문제

반환된 주소의 django admin에 접속해보면 CSS가 적용되지 않았다.
lambda는 정적 파일을 제공할 수 없어서 admin에 CSS가 적용되지 않는다.
정적 파일 제공자를 S3로 바꿔서 이 문제를 해결하였다.

settings.py

```py
STATIC_URL = "static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATICFILES_STORAGE = "core.storage.StaticStorage"
```

core/storage.py

```py
class StaticStorage(S3Boto3Storage):
    default_acl = "public-read"
    location = "static"
```

다음과 같이 변경해준 후 `python manage.py collectstatic`을 실행해주면 해결

## Github Action

이제 Github Action을 이용하여 깃헙 develop branch에 push가 되면 자동으로 배포 합니다.

.github/workflows/develop.yml

```yml
name: Deploy Develop Environment

on:
  push:
    branches:
      - develop

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Set up python 3.9
        uses: actions/setup-python@v2
        with:
          python-version: "3.9"

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      - name: Check credential
        run: |
          sudo aws configure list-profiles

      - name: Install pipenv
        run: |
          python -m pip install --upgrade pipenv wheel

      - id: cache-pipenv
        uses: actions/cache@v1
        with:
          path: ~/.local/share/virtualenvs
          key: ${{ runner.os }}-pipenv-${{ hashFiles('**/Pipfile.lock') }}

      - name: Install dependencies
        if: steps.cache-pipenv.outputs.cache-hit != 'true'
        run: |
          pipenv install --deploy --dev

      - name: Deploy
        run: |
          pipenv run zappa update dev
```

pipenv를 이용했으며, virtualenv를 이용했다면 코드가 달라질 수 있습니다.
AWS ACCESS KEY와 SECRET KEY는 Github 저장소의 Settings > Secrets > Actions > New repository secret으로 추가할 수 있습니다.

## Reference

<https://kangraemin.github.io/django/2020/10/03/django-zappa-serverless/>
<https://tech.junhabaek.net/zappa%EC%99%80-github-action%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4-django-application-aws-%EB%B0%B0%ED%8F%AC-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-15604ed6bbcc>
<https://nerogarret.tistory.com/45?category=800142>
<https://github.com/zappa/Zappa>
<https://gist.github.com/alukach/6f3a371e9af600e417aca1b36806ad72>
<https://stackoverflow.com/questions/44855531/no-module-named-psycopg2-psycopg-modulenotfounderror-in-aws-lambda>

---
title: "AWS EC2 인스턴스 docker nginx 이미지에 SSL 적용"
description: "리버스 프록시 역할의 nginx 이미지에 여러 서브도메인의 SSL 인증방법"
pubDatetime: 2024-02-04
tags:
  - docker
  - aws
---

## 개요

진행중인 여러개의 사이드프로젝트가 있는데 기존에는 cloudtype에서 무료로 서버를 실행하였지만, cloudtype의 정책변경으로 하루 한번 서버가 shutdown 상태가 되어 직접 재시작을 했습니다.

서버가 종료되는 시점도 랜덤이고 직접 재시작을 해주기전까지는 프로젝트에 문제가 생겨 저렴하게 EC2 인스턴스 한대에 여러 프로젝트의 서버를 구동을 선택했습니다.

여러대의 EC2 인스턴스에 ALB로 구성하면 더 좋겠지만 ALB도 시간당 비용이 발생해 EC2 인스턴스 한대에서 모든것을 해결하기로 결정했습니다.

## 아키텍처

![architecture](@assets/images/aws-docker-nginx-architecture.png)

가장 저렴하게 구성하기 위해 EC2 인스턴스 한대에 nginx로 여러 장고앱을 리버스프록시하기로 했고, 여러앱을 편하게 구동하기위해 docker-compose를 사용하였습니다.

## nginx conf 작성

```plaintext
upstream app1 {
    server app1:8000;
}

upstream app2 {
    server app2:8000;
}

server {
    listen 80;
    server_name app1.example.com;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://app1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name app2.example.com;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://app2;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

리버스 프록시 역할을 위해 80번 포트로 요청이 들어왔을 때 도메인에 따라서 app1과 app2로 분기를 해주었습니다.

app1.example.com으로 요청이 오면 app1 server로 app2.example.com으로 요청이 오면 app2 server로 요청을 보내줍니다.

또한 SSL 인증서 발급을 위해 ./well-known/acme-challenge/ 경로에 대한 내용도 작성해줍니다.

> SSL 인증서 발급을 위해서는 소유하고있는 도메인이 필요합니다.
> EC2 인스턴스의 Public IP가 있고 해당 아이피와 연결된 소유 도메인이 있다면, .well-known 경로에 특정 키 파일을 생성하고 SSL 인증 서버에서 생성한 경로로 직접 접근해 해당 키파일에 접근 가능한지 확인합니다.
> 이때는 서비스가 80번 포트로 동작하고 있어야합니다.

## docker-compose.yaml 작성

```yaml
version: "3.9"

services:
  nginx:
    restart: always
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app1
      - app2
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot

  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot

  app1:
    image: app1:latest
    expose:
      - "8000"

  app2:
    image: app2:latest
    expose:
      - "8000"
```

위에서 작성한 nginx.conf 파일을 conf 폴더로 위치시켜 volumes를 연결한다.
또한 인증서를 설치할 수 있게 certbot 이미지도 사용한다.

> certbot이란? (by ChatGPT)
> Certbot은 Let's Encrypt를 사용하여 웹 서버에 SSL/TLS 인증서를 쉽게 설치, 설정 및 관리할 수 있도록 도와주는 오픈 소스 도구입니다. Certbot은 Let's Encrypt의 ACME 프로토콜을 구현하여 인증서 발급 및 갱신을 자동화합니다. 이를 통해 웹 사이트 운영자는 복잡한 과정 없이도 무료 SSL/TLS 인증서를 획득하고 사용할 수 있습니다.
> Certbot은 다양한 웹 서버 플랫폼을 지원하며, Apache, Nginx 등과 같은 인기 있는 웹 서버와 함께 사용할 수 있습니다. 또한, Certbot은 다양한 운영 체제에서 사용할 수 있으며, 사용자 편의를 위해 명령 줄 인터페이스를 제공합니다.
> Certbot을 사용하면 SSL/TLS 인증서의 발급, 설치, 갱신을 자동화하여 웹 서버 보안을 강화하고 HTTPS를 통한 안전한 통신을 쉽게 설정할 수 있습니다.

docker-compose 파일을 작성 후 `docker-compose up -d` 명령으로 실행시켜준다.

## 인증서 발급 스크립트

다음으로 인증서 발급 스크립트를 다운로드한다.

```bash
# 인증서 발급 스크립트 다운로드
curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh

# 권한설정
chmod +x init-letsencrypt.sh
```

해당 스크립트는 인증서 발급을 간편하게 할 수 있게 github에 게시된 스크립트이다.

해당 스크립트의 도메인, 경로, 이메일을 수정해주어야한다.

`vi init-letsencrypt.sh` 명령으로 스크립트 내용을 수정해준다.

```sh
#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=(app1.example.com www.app1.example.com)
rsa_key_size=4096
data_path="./data/certbot"
email="example@email.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker-compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
docker-compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
docker-compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo


echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker-compose exec nginx nginx -s reload
```

상단의 domains, data_path, email만 수정해주면 된다.

그 후 `sudo ./init-letsencrypt.sh` 명령으로 스크립트를 실행해주면 인증서 발급이 완료된다.

## HTTPS 적용

```plaintext
upstream app1 {
    server app1:8000;
}

upstream app2 {
    server app2:8000;
}

server {
    listen 80;
    server_name app1.example.com;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name app1.example.com;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/app1.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app1.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://app1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name app2.example.com;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://app2;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

app1에 대해서만 인증서를 발급받았으므로 app1의 80번 포트로 들어오는 요청에 대해서는 443번 포트로 redirect 해준다.
또한 발급받은 인증서 정보를 입력해주고 경로는 발급받은 도메인으로 설정한다.

app2에 대해서도 위 과정을 반복하면 인증서를 하나 더 발급 받을 수 있다.

## 인증서 자동 갱신

```yaml
version: "3.9"

services:
  nginx:
    restart: always
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app1
      - app2
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    command: '/bin/sh -c ''while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g "daemon off;"'''

  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

  app1:
    image: app1:latest
    expose:
      - "8000"

  app2:
    image: app2:latest
    expose:
      - "8000"
```

인증서 자동 갱신을 위해 컨테이너 명령을 추가해준다.

nginx에 설정한 커맨드는 6시간 대기 후 nginx를 다시 reload 후 설정을 다시 불러오게 만든다.

certbot에 설정한 entrypoint는 12시간동안 대기한 후 다시 Certbot을 실행하고 SSL/TLS 인증서를 주기적으로 갱신하게 해준다.

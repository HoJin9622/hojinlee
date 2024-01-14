---
pubDatetime: 2021-02-23
title: "Ubuntu 80번 포트에서 다른 포트로 redirect"
tags:
  - ubuntu
description: "Ubuntu 80번 포트에서 다른 포트로 redirect"
---

```
 sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000;
```

iptables를 이용하여 80번 포트의 접속을 8000번 포트로 redirecting 한다.

```
sudo apt install iptables-persistent;
sudo bash -c "iptables-save > /etc/iptables/rules.v4";
sudo bash -c "iptables-resotre < /etc/iptables.conf";
```

iptables 설정은 컴퓨터가 재부팅되었을 때 사라지게 된다.
iptalbes-persistent를 설치를 해주고 다음과 같은 설정을 하면 재부팅을 하여도 iptables 설정을 유지할 수 있다.

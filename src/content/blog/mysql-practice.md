---
title: "생활코딩 mysql 연습"
description: "생활코딩 mysql 연습"
pubDatetime: 2021-09-28
tags:
  - mysql
---

# mysql

## 실행

C:\Bitnami\wampstack-7.3.13-0\mysql\bin 폴더로 이동.

    mysql -uroot -p

패스워드 입력

-uroot : user root 의 권한으로 접속.
-p : 비밀번호 물어봄.

## 명렁어

    CREATE DATABASE "name";

데이터 베이스 생성

    DROP DATABASE "name";

데이터 베이스 삭제

    SHOW DATABASES;

데이터 베이스 목록 보기

    USE "name";

이제부터 "name"에 대한 데이터베이스를 대상으로 명령을 실행

    CREATE TABLE topic(
        id INT(11) NOT NULL AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        description TEXT NULL,
        created DATETIME NOT NULL,
        author VARCHAR(30) NULL,
        profile VARCHAR(100) NULL,
        PRIMARY KEY(id)
    )

테이블 생성, length는 보통 11을 사용함.

NOT NULL : 값이 없는것을 허용하지 않음.

AUTO_INCREAMENT : 데이터가 추가될때 자동으로 값이 1씩 증가한다.

NULL : 값이 없는것을 허용한다.

PRIMARY KEY(id) : 메인 키를 알려준다

    DESC topic;
    DESCRIBE topic;

topic table을 보여준다.

    INSERT INTO topic (
        title, description, created, author, profile
    ) VALUES (
        'MySQL',
        'MySQL is ...',
        NOW(),
        'egoing',
        'developer'
    );

table에 값을 삽입

    SELECT * FROM topic;

topic table의 모든 데이터를 가져온다.

    SELECT id, title, created, author FROM topic;

topic table의 id, title, created, author 열만 출력한다.

    SELECT id, title, created, author FROM topic WHERE author="egoing";

topic table의 id, title, created, author 열만 출력하는데 author가 "egoing"인 것만 출력한다.

    SELECT id, title, created, author FROM topic WHERE author="egoing" ORDER BY id DESC;

오름차순으로 출력

    SELECT id, title, created, author FROM topic WHERE author="egoing" ORDER BY id DESC LIMIT 2;

2개까지만 보여줌

    UPDATE topic SET description = "Oracle is ...", title = "Oracle" WHERE id = 2;

MySQL 에서의 UPDATE

    DELETE FROM topic WHERE id = 5;

id 값이 5인 topic 테이블의 행 삭제

    RENAME TABLE topic TO topic_backup;

TABLE 이름을 변경한다.

    SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id;

topic 테이블과 author 테이블을 topic 테이블의 author_id와 author 테이블의 id를 기준으로 JOIN 한다

     SELECT topic.id, title, description, created, name, profile FROM topic LEFT JOIN author ON topic.author_id = author.id;

위에 생성한 테이블에서 author_id와 author.id를 뺌

    SELECT topic.id AS topic_id, title, description, created, name, profile FROM topic LEFT JOIN author ON topic.author_id = author.id;

id를 topic_id 로 출력해줌.

    mysql -uroot -p -hlocalhost

-hlocalhost 는 내 서버에 접속한다는것.

ex) -hgoogle.com 구글 서버에 접속

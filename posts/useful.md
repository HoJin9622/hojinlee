---
title: '유용한 것들 모음'
subtitle: '유용한 것들 모음'
date: '2021-09-28'
category: 'memo'
---

## Visual Studio Code Extension

<a href="https://wakatime.com/" target="_blank" >WakaTime</a> - 시간 관리 툴

<a href="https://prettier.io/" target="_blank" >Prettier - Code formatter</a> - 코드 정리

<a href="https://eslint.org/" target="_blank" >ESLint</a> - JavaScript 정적 코드 분석 도구

<a href="https://www.material-theme.com/" target="_blank" >Material Theme</a> - 테마

<a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme" target="_blank" >Material Icon Theme</a> - 아이콘 테마

## Color

<a href="https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp" target="_blank" >ColorZilla</a> - 크롬 브라우저 색상 추출

<a href="https://flatuicolors.com/" target="_blank" >Palettes</a> - 색상 모음

## Size

<a href="https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal" target="_blank" >Page Ruler Redux</a> - 페이지 픽셀 측정

## 디자인

<a href="https://unsplash.com/" target="_blank" >Unsplash</a> - 저작권 없는 이미지

<a href="https://fontmeme.com/fancy-fonts/" target="_blank" >Fancy Font</a> - Font 이쁘게 만들 수 있음

<a href="https://www.screentogif.com/" target="_blank">Screen To Gif</a> - gif 생성

## API

<a href="https://openweathermap.org/" target="_blank" >OpenWeatherMap</a> - Weather API

<a href="https://www.data.go.kr/" target="_blank" >공공 데이터 포털</a>

## Domain

<a href="https://www.freenom.com/en/index.html?lang=en" target="_blank" >freenom</a> - 도메인 무료 등록

<a href="https://hosting.kr/" target="_blank" >HOSTING.KR</a> - 도메인 등록

## Redux

<a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko" target="_blank" >Redux DevTools</a> - state를 볼 수 있는 구글 확장 프로그램

## 알고리즘

<a href="https://www.acmicpc.net/" target="_blank">백준 코드</a> - 알고리즘 문제

## Diagrams

<a href="https://www.diagrams.net/" target="_blank" >diagrams.net</a> - 다이어그램 만들기

## Online Compiler

<a href="https://ideone.com/" target="_blank" >ideone.com</a> - Online Java Compiler

<a href="https://codesandbox.io/" target="_blank" >CodeSandbox</a> - Online code editor(web)

<a href="https://codepen.io/" target="_blank" >CodePen</a> - 사용자 제작 HTML, CSS 및 JavaScript 코드 스 니펫을 테스트하고 보여주는 온라인 커뮤니티

<a href="https://repl.it/" target="_blank" >repl.it</a> - Online IDE, Editor, Compiler, Interpreter, and REPL. Code, compile, run, and host in 50+ programming languages

## Web 관련

<a href="https://www.w3schools.com/" target="_blank" >w3schools</a> - HTML, CSS, JavaScript 문서

<a href="https://www.advancedwebranking.com/html/" target="_blank" >The average web page</a> - 태그 사용도 순위

<a href="https://caniuse.com/" target="_blank" >Can I use?</a> - 웹 브라우저와 태그의 호환 가능 여부 확인

## git

<a href="http://gitignore.io/" target="_blank" >gitignore</a> - gitignore 파일을 만들어준다.

## github

<a href="https://chrome.google.com/webstore/detail/isometric-contributions/mjoedlfflcchnleknnceiplgaeoegien/related" target="_blank">Isometric Contributions</a> - Renders an isometric pixel view of GitHub contribution graphs.

## Eslint setting

first eslinnt settings

    npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
    npx install-peerdeps --dev eslint-config-airbnb
    npm i -g eslint
    eslint --init

    "extends": ["airbnb", "prettier", "plugin:node/recommended"],
    "plugins": ["prettier"],
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off",
        "func-names": "off",
        "no-process-exit": "off",
        "object-shorthand": "off",
        "class-method-use-this": "off"

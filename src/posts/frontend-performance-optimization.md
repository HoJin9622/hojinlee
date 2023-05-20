---
title: '프론트엔드 성능 최적화 가이드'
subtitle: ''
date: '2023-04-27'
category: 'book'
coverImage: '/images/go.png'
draft: true
---

## Properly size images

이미지 최적화

이미지 사이즈는 1200 X 1200px이지만, 화면에 그려지는 이미지의 사이즈(Rendered size)는 120 X 120px이면 큰 사이즈의 이미지를 사용해도 표시하지 못하니 작은 사이즈의 이미지를 사용하는 것이 적절

요즘 사용되는 레티나 디스플레이는 같은 공간(픽셀)에 더 많은 픽셀을 그릴 수 있기 때문에, 너비 기준으로 두 배 정도 큰 이미지를 사용하는 것이 적절

예를들어 width와 height가 120 X 120px이라면 240 X 240px 사이즈의 이미지를 사용하는것이 적당하다.

이미지를 가공하기위해서는 이미지 CDN을 사용한다.

이미지 CDN는 쿼리스트링(query string)에 필요에 따라 변경하고자 하는 형태(width, height)를 명시해주는 형식

이런 이미지 CDN을 자체적으로 만들어서 사용할 수도 있지만, Imgix와 같은 이미지 CDN 솔루션을 사용할 수도 있다.

해결한다면 Lighthouse 점수 상승 가능

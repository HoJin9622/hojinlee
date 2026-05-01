---
author: Hojin Lee
pubDatetime: 2022-05-10
title: "Cloudflare Images"
tags:
  - cloudflare
description: Cloudflare Images 란 무엇인가?
ogImage: "../../assets/images/cloudflare.jpg"
---

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🤔 Cloudflare Images란?](#-cloudflare-images란)
- [🧾 Cloudflare 가입](#-cloudflare-가입)
- [📔 Dashboard](#-dashboard)
- [📤 Upload Images](#-upload-images)
  - [1. Images Dashboard](#1-images-dashboard)
  - [2. Direct Creator Upload](#2-direct-creator-upload)
- [🔔 이미지 호출](#-이미지-호출)
- [🛞 Variants](#-variants)
- [📝 Reference](#-reference)

## <a name="1"></a>🤔 Cloudflare Images란?

Cloudflare Images는 이미지 인프라를 비용 효과적으로 구축하고 유지하는 직접적이며 처음부터 끝까지 해결하는 솔루션을 제공한다. 하나의 통합 제품을 이용해 이미지를 대규모로 저장, 크기 조정, 최적화 한다.

![](https://velog.velcdn.com/images/hojin9622/post/1fc22522-6744-47fe-b04d-5e390da68f5e/image.png)![](https://velog.velcdn.com/images/hojin9622/post/b9982b64-38d8-46b7-9b88-b308d9423061/image.png)![](https://velog.velcdn.com/images/hojin9622/post/06601f39-b091-4e40-a8e3-47dde7bd43e3/image.png)![](https://velog.velcdn.com/images/hojin9622/post/f50d98d3-de05-4741-81c5-6f9fdb065820/image.png)

공식 사이트는 다음 4가지를 강조하고 있다.

- 저장하고 전달된 이미지 비용만 지불
- 크리에이터 직접 업로드
- 변형을 이용해 크기 조정 및 최적화
- 서명된 URL을 이용한 이미지 보안

AWS의 S3 서비스처럼 모든 종류의 파일을 저장은 할 수 없지만 이미지에 대해서만큼은 최고의 서비스를 제공한다.
사용해보고 가장 마음에 드는 기능은 크기 조정 및 최적화를 추가 비용없이 모든 이미지의 변형을 만들어 적용할 수 있다는 점과 크리에이터 직접 업로드 기능이다.

## <a name="2"></a>🧾 Cloudflare 가입

<https://www.cloudflare.com/ko-kr/>
![](https://velog.velcdn.com/images/hojin9622/post/3d1b2fdb-3498-4892-8e48-db6755f3f239/image.png)

cloudflare 홈페이지에서 가입을 클릭 후 이메일과 패스워드를 입력하면 쉽게 가입할 수 있다.
입력한 이메일로 인증 메일이 오는데 꼭 인증해주어야 한다.

## <a name="3"></a>📔 Dashboard

![](https://velog.velcdn.com/images/hojin9622/post/9c2ac12e-5b2e-4cd9-b45c-7a060b76b938/image.png)

Cloudflare Images 서비스를 이용하려면 대시보드의 좌측 메뉴에 Images를 클릭하면 된다.
![](https://velog.velcdn.com/images/hojin9622/post/6d39e7a0-0137-4514-a200-bc978299c0d5/image.png)

결제화면이 나오고 각 요금에 대한 설명이을 보여준다.
저장된 이미지 10만개에 5달러라고 되어있고 많은 이미지를 저장하지 않을거라서 5달러 플랜을 선택하였다.

## <a name="4"></a>📤 Upload Images

### 1. Images Dashboard

이미지 업로드 첫번째 방법은 대시보드를 이용하는 것이다.
![](https://velog.velcdn.com/images/hojin9622/post/2052a803-e688-40b9-8f09-0b0f19cdd784/image.png)

대시보드의 Quick Upload를 이용하여 직접적으로 바로 업로드할 수 있다.

### 2. Direct Creator Upload

기존 AWS S3 다른 방식의 업로드 방법이다.
업로드 방법의 이름에서 알 수 있듯이 Client가 Cloudflare에 직접적으로 이미지를 업로드하는 방법이다.
S3 에서는 Client에서 Server로 이미지를 전송하고, Server에서 AccessToken을 이용하여 S3로 전송하게 된다.
이러한 방식에서는 용량이 큰 이미지가 전달될 경우 Client &rarr; Server &rarr; S3 로 이미지가 전송되는데 큰 비용이 발생된다.
![](https://velog.velcdn.com/images/hojin9622/post/6f95e62c-c05e-4fd4-bf00-dba1edef7d40/image.png)

Direct Creator Upload 방식은 이미지가 Client 에서 Server, Server에서 S3로 2번 이동하는 대신, Client에서 Cloudflare로 바로 전달된다.

1. 먼저 Client는 Server로 cloudflare 이미지 업로드 URL을 요청한다.
2. 서버에서는 ACCOUNT_ID와 token을 가지고 이미지 업로드 URL을 cloudflare에 요청 한 후 Client에 이미지 업로드 URL을 반환해준다.

```bash
curl --request POST \
 --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v2/direct_upload \
 --header 'Authorization: Bearer :token' \
 --form 'requireSignedURLs=true' \
 --form 'metadata={"key":"value"}'
```

3. Client는 받은 URL을 이용하여 cloudflare로 바로 이미지를 전달한다.

```html
<html>
  <body>
    <form
      action="INSERT_UPLOAD_URL_HERE"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="file" id="myFile" name="file" />
      <input type="submit" />
    </form>
  </body>
</html>
```

4. POST 요청을 보낸 후 response로 이미지 ID를 받게된다. 이미지 ID를 이용하여 저장된 이미지를 호출할 수 있다.

## <a name="5"></a>🔔 이미지 호출

![](https://velog.velcdn.com/images/hojin9622/post/11c09360-9682-4ddd-a376-5ba2c5ef3638/image.png)

대시보드의 Image Delivery URL을 복사한다.

```bash
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
```

Image Delivery URL은 다음과 같은 형태이며 Account Hash는 기본적으로 복사할때 있으며, Image ID는 response로 받은 이미지 ID를 넣으면 된다.
`VARIANT_NAME`은 일단 public으로 작성한다.

## <a name="6"></a>🛞 Variants

홈페이지에서 강조되었던 크기 조정 및 최적화를 비용없이 할 수 있다는 부분을 `Variants`를 이용하여 할 수 있다.
![](https://velog.velcdn.com/images/hojin9622/post/70051725-8ca6-40c8-a302-9ddd94cab08a/image.png)

Cloudflare 대시보드의 Variants를 선택한 후 Add New Variant 왼쪽 Input에 Variant의 이름을 정해준 후 클릭하면 위와 같은 이미지의 화면을 볼 수 있다.
이미지를 Resizing 할 수 있으며 Metadata를 어떻게 할지 선택할 수 있다.

- Scale down: 이미지는 주어진 너비, 높이에 맞도록 크기가 축소되지만 확대되지는 않는다.
- Contain: 가로 세로 비율을 유지하면서 주어진 너비 또는 높이 내에서 가능한 크게 크기 조정 된다.
- Cover: 너비와 높이로 지정된 전체 영역을 정확히 채우도록 이미지 크기가 조정되고 필요한 경우 잘린다.
- Crop: 너비와 높이로 지정된 영역에 맞게 이미지가 축소되고 잘리낟.
- Pad: 가로 세로 비율을 유지하면서 너비 또는 높니 내에서 가능한 크게 크기 조정이되며, 추가 영역은 흰색으로 채워진다.

![](https://velog.velcdn.com/images/hojin9622/post/b32282b2-c325-4570-94a8-86052507663a/image.png)

이제 이렇게 추가된 Variants를 이미지 호출에 사용할 수 있다.

```bash
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/avatar
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/public
```

URL만 변경해주면 해당 Variants에 맞는 이미지를 제공한다.

## <a name="7"></a>📝 Reference

[Cloudflare Images](https://www.cloudflare.com/ko-kr/products/cloudflare-images/)
[Serve images](https://developers.cloudflare.com/images/cloudflare-images/serve-images/)
[Resize images](https://developers.cloudflare.com/images/cloudflare-images/resize-images/)
[캐럿마켓 클론코딩](https://nomadcoders.co/carrot-market)

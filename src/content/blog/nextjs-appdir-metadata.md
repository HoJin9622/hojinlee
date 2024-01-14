---
title: "NextJS App Dir metadata 생성"
description: "새롭게 바뀐 App directory에서 SEO를 위한 metadata 생성법을 알아보자"
pubDatetime: 2023-05-28
tags:
  - nextjs
ogImage: "../../assets/images/nextjs.png"
---

## Table Of Contents

## Static Metadata

전체 페이지에 대해서 metadata를 생성하려면 app/layout.tsx 파일에서 설정할 수 있습니다.

```tsx:app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
+ title: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
- description:
-   "Jin's Tech Blog는 코드와 기술을 통해 생각하는 방법과 기술적인 사고를 공유하는 블로그입니다.",
  openGraph: {
    title: "Jin's Tech Blog: 기술적 사고와 경험의 공유", // 사이트의 제목
    description:
      "Jin's Tech Blog는 코드와 기술을 통해 생각하는 방법과 기술적인 사고를 공유하는 블로그입니다.", // 사이트 설명
    siteName: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
    locale: 'ko', // 사이트의 언어 선택
    type: 'website', // 사이트의 종류
    url: 'https://devlog.nextlevels.net/', // 사이트의 대표 url
  },
  twitter: {
    title: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
    description:
      "Jin's Tech Blog는 코드와 기술을 통해 생각하는 방법과 기술적인 사고를 공유하는 블로그입니다.",
    card: 'summary_large_image',
  },
};
```

layout.tsx 파일에서 metadata 객체를 export 해주세요.

typescript를 사용하신다면 Metadata 타입을 import해서 사용하시면 타입의 도움을 받을 수 있어요.

## Dynamic Metadata

게시물 상세페이지와 같이 동적으로 Metadata를 생성해야한다면 generate Metadata function을 사용할 수 있습니다.

```ts:app/posts/page.tsx
export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPostContent(slug);
  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: post.coverImage,
      siteName: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
      locale: 'ko',
      type: 'website',
      url: 'https://devlog.nextlevels.net/',
    },
    twitter: {
      title: post.title,
      description: post.subtitle,
      images: post.coverImage,
      card: 'summary_large_image',
    },
  };
}
```

위 예시는 slug path를 가져와 게시물에 대한 정보를 불러오고 해당 정보를 기반으로 metadata를 동적으로 생성하는 예시입니다.

## File-based metadata

app dir에 특정한 이름의 파일을 넣음으로써 metadata를 생성할 수도 있어요

og image 또는 twitter image를 metadata에 넣으려면 app directory에 `opengraph-image.jpg`와 `twitter-image.jpg`를 넣음으로써 생성이 가능해요.

```html
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="2400" />
<meta property="og:image:height" content="2400" />
<meta
  property="og:image"
  content="http://localhost:3000/opengraph-image.jpg?d6a1e3dac2466b5b"
/>
<meta name="twitter:image:type" content="image/jpeg" />
<meta name="twitter:image:width" content="2400" />
<meta name="twitter:image:height" content="2400" />
<meta
  name="twitter:image"
  content="http://localhost:3000/twitter-image.jpg?d6a1e3dac2466b5b"
/>
```

app directory의 root에 opengraph-image.jpg와 twitter-image.jpg를 넣으면 head에 위와 같은 예시로 metadata가 삽입되는 것을 볼 수 있습니다.

이미지의 타입으로는 `.jpg`, `.jpeg`, `.png`, `.gif` 가 허용되며 파일 이름은 `opengraph-image`, `twitter-image`가 지켜져야 합니다.

이미지에 alt props를 추가하려면 `opengraph-image.alt.txt`와 `twitter-image.alt.txt` 파일을 추가해주세요.

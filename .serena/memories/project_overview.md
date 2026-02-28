# hojinlee 프로젝트 개요

## 목적
개인 개발 기술 블로그 (https://www.hojinlee.dev/)

## 기술 스택
- **프레임워크**: Astro v5
- **스타일링**: TailwindCSS v3 + @tailwindcss/typography
- **UI**: React (일부 컴포넌트)
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **배포**: Cloudflare (wrangler.jsonc 존재)
- **최적화**: @divriots/jampack (빌드 후 dist 최적화)

## 주요 기능
- 블로그 포스트 (src/content/blog/*.md)
- 태그 시스템
- 검색 기능 (fuse.js)
- OG 이미지 자동 생성 (satori + @resvg/resvg-js)
- RSS 피드
- 사이트맵
- 다크/라이트 모드

## 사이트 설정
- `src/config.ts`: 사이트 전역 설정 (SITE, LOCALE, SOCIALS 등)
- 언어: 한국어 (ko-KR)
- 작성자: Jin

## 구조
```
src/
  content/blog/   # 마크다운 블로그 포스트
  pages/          # Astro 페이지
  components/     # Astro/React 컴포넌트
  layouts/        # 레이아웃 컴포넌트
  utils/          # 유틸리티 함수
  styles/         # CSS
  assets/         # 이미지 등 정적 자산
  config.ts       # 사이트 설정
  types.ts        # TypeScript 타입 정의
```

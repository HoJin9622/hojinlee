# 코드 스타일 & 컨벤션

## Prettier 설정
- `arrowParens`: "avoid" (단일 파라미터 화살표 함수에 괄호 없음)
- `semi`: true (세미콜론 사용)
- `tabWidth`: 2
- `printWidth`: 80
- `singleQuote`: false (더블 쿼트 사용)
- `jsxSingleQuote`: false
- `trailingComma`: "es5"
- `bracketSpacing`: true
- `endOfLine`: "lf"
- 플러그인: prettier-plugin-astro, prettier-plugin-tailwindcss

## TypeScript
- strict 모드 (tsconfig.json)
- 타입 파일: src/types.ts

## 파일 타입별 컨벤션
- 컴포넌트: PascalCase (Card.tsx, Header.astro)
- 유틸리티: camelCase (getSortedPosts.ts, slugify.ts)
- 블로그 포스트: kebab-case 마크다운 파일명

## 블로그 포스트 frontmatter
- `title`, `author`, `pubDatetime`, `tags`, `description` 등
- `src/content/config.ts`에 스키마 정의

## 컴포넌트 분류
- `.astro`: 정적 컴포넌트 (Header, Footer, Breadcrumbs 등)
- `.tsx`: 인터랙티브 컴포넌트 (Card, Search, Datetime 등)

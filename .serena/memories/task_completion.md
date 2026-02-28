# 태스크 완료 시 체크리스트

## 코드 수정 후
1. `pnpm format` - 코드 포매팅
2. `pnpm lint` - 린트 검사
3. `pnpm build` - 빌드 확인 (astro check 포함)

## 새 블로그 포스트 추가
- `src/content/blog/` 에 kebab-case로 .md 파일 생성
- frontmatter 필수 항목 확인 (src/content/config.ts 스키마 참조)

## 배포
- Cloudflare Pages 배포 (wrangler.jsonc 사용)
- 테스트 없음 (testing framework 미사용)

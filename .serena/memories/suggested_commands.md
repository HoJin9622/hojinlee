# 주요 개발 명령어

## 개발
```bash
pnpm dev        # 개발 서버 실행
pnpm start      # 개발 서버 실행 (동일)
pnpm preview    # 빌드 후 프리뷰
```

## 빌드
```bash
pnpm build      # astro check + astro build + jampack ./dist
pnpm sync       # astro sync (타입 생성)
```

## 포매팅 & 린팅
```bash
pnpm format         # prettier로 파일 포매팅 (--write)
pnpm format:check   # prettier 포매팅 검사
pnpm lint           # eslint 실행
```

## 커밋
```bash
pnpm cz         # commitizen으로 커밋 (conventional commits)
```

## 시스템 명령어
```bash
git, ls, cd, grep, find  # 표준 macOS 유닉스 명령어
```

## 노트
- husky + lint-staged: 커밋 전 prettier 자동 실행
- 커밋 컨벤션: conventional commits (commitizen)
- 테스트 없음

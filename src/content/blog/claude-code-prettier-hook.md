---
pubDatetime: 2026-02-28
title: "Claude Code PostToolUse 훅으로 prettier 자동 실행하기"
tags:
  - "claude-code"
  - "prettier"
  - "productivity"
description: "Claude Code가 파일을 수정할 때마다 PostToolUse 훅으로 prettier를 자동 실행하는 방법"
---

Claude Code가 파일을 수정한 뒤 prettier 포맷이 어긋나 있다면, PostToolUse 훅으로 해결할 수 있습니다. 저장 단축키도, CLAUDE.md 지시사항도 필요 없습니다.

## PostToolUse 훅이란

`PostToolUse`는 Claude Code가 도구를 실행한 직후 셸 명령을 실행하는 훅입니다. `matcher` 필드에 정규식을 지정해 특정 도구에만 반응하게 할 수 있습니다.

파일을 수정하는 `Write`(전체 작성)와 `Edit`(일부 수정) 도구에 모두 반응하도록 `matcher`를 지정합니다. 훅이 실행될 때 도구의 입출력 정보가 JSON으로 stdin에 전달됩니다. `tool_input.file_path`에 수정된 파일 경로가 있습니다.

## CLAUDE.md 방식과 비교

훅을 처음 접하면 CLAUDE.md에 지시사항을 넣는 방법을 먼저 떠올리기 쉽습니다.

```markdown
파일 수정 후 반드시 prettier를 실행하세요: `npx prettier --write <파일경로>`
```

동작은 하지만 비용이 따릅니다. CLAUDE.md는 매 세션마다 컨텍스트에 통째로 로드됩니다. prettier를 실행하든 안 하든 이 지시사항은 항상 토큰을 소비합니다. Claude가 실제로 prettier를 실행할 때는 Bash 도구 호출과 실행 결과까지 추가로 토큰이 발생합니다.

PostToolUse 훅은 Claude 컨텍스트 밖에서 셸 명령으로 실행됩니다. 토큰 소비가 없습니다.

## 설정

프로젝트 루트의 `.claude/settings.local.json` 또는 `.claude/settings.json`에 추가합니다. 팀 전체가 같은 설정을 쓴다면 `.claude/settings.json`을 커밋하면 됩니다. 글로벌 설정(`~/.claude/settings.json`)에 넣으면 prettier를 사용하지 않는 프로젝트에서도 훅이 실행되므로, 프로젝트별로 두는 게 낫습니다.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

명령을 순서대로 보면:

1. `jq -r '.tool_input.file_path'` — stdin에서 파일 경로를 추출합니다.
2. `xargs npx prettier --write` — 추출한 경로를 prettier에 넘깁니다. `npx`는 로컬 `node_modules`에 있는 버전을 우선 사용합니다.

`jq`가 없다면 먼저 설치합니다.

```bash
brew install jq
```

## 참고 문서

- [Claude Code Hooks 공식 문서](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Claude Code Hooks 가이드](https://code.claude.com/docs/ko/hooks-guide)

---
pubDatetime: 2026-03-07
title: "Claude Code Status Line으로 컨텍스트와 비용을 한눈에 확인하기"
tags:
  - "claude-code"
  - "productivity"
description: "Claude Code 하단에 모델명, 컨텍스트 사용률, 세션 비용, git 상태를 표시하는 커스텀 상태바 설정 방법"
---

Claude Code로 긴 작업을 하다 보면 신경 쓰이는 게 생깁니다. 컨텍스트 창이 얼마나 찼는지, 비용이 얼마나 나왔는지, 커밋 안 한 변경사항은 없는지. Status line은 이런 정보를 화면 하단에 고정으로 노출하는 기능입니다.

## Status line이란

Claude Code 하단에 표시되는 커스터마이징 가능한 상태바입니다. 설정한 셸 스크립트를 실행하고 그 출력을 그대로 보여줍니다. Claude Code는 각 어시스턴트 응답 후 JSON 형태의 세션 데이터를 스크립트의 stdin으로 전달하고, 스크립트가 stdout에 출력한 내용이 화면에 나타납니다.

핵심은 **스크립트가 로컬에서 실행된다는 점**입니다. API 호출이 없으므로 토큰을 소비하지 않습니다.

## 사용 가능한 데이터

스크립트가 받는 JSON에는 다음 필드가 포함됩니다.

| 필드                                  | 내용                                         |
| ------------------------------------- | -------------------------------------------- |
| `model.id`                            | 모델 ID (예: `claude-sonnet-4-6`)            |
| `model.display_name`                  | 모델 표시명 (예: `Sonnet`)                   |
| `workspace.current_dir`               | 현재 작업 디렉토리                           |
| `workspace.project_dir`               | Claude 실행 시작 디렉토리                    |
| `context_window.used_percentage`      | 컨텍스트 창 사용률 (%)                       |
| `context_window.remaining_percentage` | 컨텍스트 창 잔여 비율 (%)                    |
| `context_window.context_window_size`  | 최대 컨텍스트 크기 (토큰)                    |
| `context_window.total_input_tokens`   | 세션 누적 input 토큰 수                      |
| `context_window.total_output_tokens`  | 세션 누적 output 토큰 수                     |
| `cost.total_cost_usd`                 | 세션 누적 비용 (USD)                         |
| `cost.total_duration_ms`              | 세션 경과 시간 (밀리초)                      |
| `cost.total_api_duration_ms`          | API 응답 대기 시간 합산 (밀리초)             |
| `cost.total_lines_added`              | 세션 중 추가된 코드 라인 수                  |
| `cost.total_lines_removed`            | 세션 중 삭제된 코드 라인 수                  |
| `exceeds_200k_tokens`                 | 최근 응답 기준 200k 토큰 초과 여부 (boolean) |
| `vim.mode`                            | vim 모드 활성화 시 현재 모드 (NORMAL/INSERT) |

전체 필드 목록은 [공식 문서](https://code.claude.com/docs/en/statusline#available-data)에서 확인할 수 있습니다.

컨텍스트 퍼센트는 `context_window.current_usage`의 input 토큰 합산으로 계산됩니다. output 토큰은 포함되지 않습니다.

## 설정 방법

### /statusline 명령어 사용

Claude Code에서 자연어로 원하는 내용을 설명하면 스크립트를 자동 생성하고 `settings.json`도 업데이트해줍니다.

```text
/statusline show model name and context percentage with a progress bar
```

단, 이 방식은 Claude가 자연어를 해석하고 코드를 작성하는 과정이므로 토큰이 소비됩니다. 일회성 설정 비용입니다.

### 수동 설정

스크립트를 직접 작성하고 `~/.claude/settings.json`에 등록하면 토큰 없이 동일한 결과를 얻을 수 있습니다.

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

`command` 필드에는 스크립트 경로 대신 인라인 셸 명령도 사용할 수 있습니다.

```json
{
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)%\"'"
  }
}
```

## 스크립트 작성

다음 스크립트는 두 줄로 구성됩니다. 첫 번째 줄에 모델명, 폴더명, git 상태를, 두 번째 줄에 컨텍스트 프로그레스 바와 비용 정보를 표시합니다.

```bash
#!/bin/bash
input=$(cat)

GREEN='\033[32m'
YELLOW='\033[33m'
CYAN='\033[36m'
MAGENTA='\033[35m'
RED='\033[31m'
BOLD='\033[1m'
RESET='\033[0m'

MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.current_dir')
FOLDER="${DIR##*/}"

GIT_INFO=""
if git -C "$DIR" rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git -C "$DIR" branch --show-current 2>/dev/null)
    STAGED=$(git -C "$DIR" diff --cached --numstat 2>/dev/null | wc -l | tr -d ' ')
    MODIFIED=$(git -C "$DIR" diff --numstat 2>/dev/null | wc -l | tr -d ' ')

    GIT_PART="${CYAN}${BRANCH}${RESET}"
    [ "$STAGED" -gt 0 ] && GIT_PART="${GIT_PART} ${GREEN}+${STAGED}${RESET}"
    [ "$MODIFIED" -gt 0 ] && GIT_PART="${GIT_PART} ${YELLOW}~${MODIFIED}${RESET}"
    GIT_INFO=" | ${GIT_PART}"
fi

echo -e "${BOLD}[${MODEL}]${RESET} ${FOLDER}${GIT_INFO}"

PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
DURATION_MS=$(echo "$input" | jq -r '.cost.total_duration_ms // 0' | cut -d. -f1)
LINES_ADDED=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
LINES_REMOVED=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')

BAR_WIDTH=10
FILLED=$((PCT * BAR_WIDTH / 100))
EMPTY=$((BAR_WIDTH - FILLED))
BAR=""
[ "$FILLED" -gt 0 ] && BAR=$(printf "%${FILLED}s" | tr ' ' '▓')
[ "$EMPTY" -gt 0 ] && BAR="${BAR}$(printf "%${EMPTY}s" | tr ' ' '░')"

if [ "$PCT" -ge 80 ]; then
    BAR_COLOR="$RED"
elif [ "$PCT" -ge 50 ]; then
    BAR_COLOR="$YELLOW"
else
    BAR_COLOR="$GREEN"
fi

DURATION_SEC=$((DURATION_MS / 1000))
if [ "$DURATION_SEC" -ge 3600 ]; then
    DURATION_STR=$(printf "%dh%02dm" $((DURATION_SEC/3600)) $(((DURATION_SEC%3600)/60)))
elif [ "$DURATION_SEC" -ge 60 ]; then
    DURATION_STR=$(printf "%dm%02ds" $((DURATION_SEC/60)) $((DURATION_SEC%60)))
else
    DURATION_STR="${DURATION_SEC}s"
fi

COST_STR=$(printf "\$%.4f" "$COST")

echo -e "${BAR_COLOR}${BAR}${RESET} ${PCT}% | ${MAGENTA}${COST_STR}${RESET} | ${DURATION_STR} | ${GREEN}+${LINES_ADDED}${RESET} ${RED}-${LINES_REMOVED}${RESET}"
```

스크립트를 저장한 뒤 실행 권한을 부여합니다.

```bash
chmod +x ~/.claude/statusline.sh
```

결과는 다음과 같은 형태입니다.

```text
[Sonnet] hojinlee | main ~2
▓░░░░░░░░░ 12% | $0.0234 | 2m05s | +42 -7
```

컨텍스트 프로그레스 바는 50% 미만이면 초록, 50~80%는 노랑, 80% 이상이면 빨강으로 색이 바뀝니다.

## 주의할 점

`jq`가 설치되어 있어야 합니다. 없다면 먼저 설치합니다.

```bash
brew install jq
```

`context_window.used_percentage`는 세션 초반 첫 API 호출 전에는 `null`일 수 있습니다. `// 0` fallback을 항상 붙이는 이유입니다.

## 참고 문서

- [Claude Code Status Line 공식 문서](https://code.claude.com/docs/en/statusline)

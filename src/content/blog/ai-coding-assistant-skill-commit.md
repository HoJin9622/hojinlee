---
pubDatetime: 2026-03-18
title: "Claude Code /commit 자동화 — Skill 설정과 도구별 비교 가이드"
tags:
  - "claude-code"
  - "skill"
  - "productivity"
description: "Claude Code, Cursor, Gemini CLI, Codex CLI에서 /commit Skill을 만드는 방법과 disable-model-invocation으로 불필요한 컨텍스트 로드를 막는 설정법을 정리합니다."
---

AI 코딩 어시스턴트를 사용하다 보면 자연스럽게 반복되는 작업들이 눈에 들어오기 시작합니다. 그중 하나가 커밋입니다. 변경 내역을 분석하고, 컨벤션에 맞는 메시지를 작성하고, 논리적 단위로 나누어 스테이징하는 일련의 과정을 매번 직접 처리하게 됩니다.

이런 반복 작업을 슬래시 명령어 하나로 줄여주는 것이 **Skill**입니다. Skill은 재사용 가능한 프롬프트 템플릿에 이름을 붙여 `/commit`처럼 호출할 수 있게 만드는 기능으로, Claude Code를 비롯한 대부분의 AI 코딩 어시스턴트에서 지원합니다.

이 글에서는 `/commit` Skill을 직접 만들어보고, 각 도구에서 어떻게 설정하는지 정리합니다. 그 과정에서 Skill을 제대로 활용하려면 반드시 알아야 할 `disable-model-invocation` 옵션도 함께 다룹니다.

## Skill의 함정 — 자동 활성화

Skill을 처음 만들고 나면 예상치 못한 동작에 당황할 수 있습니다. 직접 `/commit`을 입력하지 않았는데 Claude가 커밋 관련 흐름을 따르기 시작하는 경우입니다.

이는 Skill의 기본 동작 방식 때문입니다. 기본 설정에서는 Skill의 `description`이 **항상** 컨텍스트에 올라갑니다. Claude가 대화 흐름을 보고 어떤 Skill을 써야 할지 스스로 판단하기 위해서입니다. 그 결과 "코드를 많이 수정했으니 커밋이 필요하겠다"고 판단하면, 명시적인 요청 없이도 해당 Skill을 로드합니다.

아래 표는 설정에 따라 실제로 무엇이 컨텍스트에 올라가는지 보여줍니다.

| 설정                             | 컨텍스트에 올라가는 것 | 전체 내용 로드 시점 |
| -------------------------------- | ---------------------- | ------------------- |
| 기본값                           | description 항상 포함  | 호출될 때           |
| `disable-model-invocation: true` | 아무것도 포함 안 됨    | 직접 호출할 때만    |

`disable-model-invocation: true`를 설정하면 description조차 컨텍스트에 올라가지 않습니다. Skill의 존재 자체를 Claude가 인식하지 못하다가, `/commit`을 직접 입력한 순간에만 로드됩니다.

커밋, 배포처럼 부작용이 있는 작업이나 실행 타이밍을 직접 통제하고 싶은 작업에는 이 옵션이 필수입니다.

## /commit Skill 만들기

Angular Commit Convention에 따라 한국어 커밋 메시지를 작성하는 Skill입니다.

Skill 본문은 영어로 작성했습니다. BPE 계열 토크나이저는 학습 데이터에서 영어 비중이 높기 때문에, 영어 단어는 하나의 토큰으로 처리되는 반면 한국어 음절은 여러 토큰으로 쪼개집니다. 동일한 의미라면 영어가 한국어보다 토큰을 1.5~3배 적게 소비하는 것으로 알려져 있습니다.

````
---
name: commit
description: git 변경사항을 분석해 Angular Commit Convention 형식의 한국어 커밋 메시지 작성 및 커밋
disable-model-invocation: true
allowed-tools: Bash(git *)
---

Analyze the current git changes and create one or more commits following **Angular Commit Convention**. All commit messages must be written in **Korean**.

$ARGUMENTS

## Commit Message Format

​```text
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
​```

## Types

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경 (로직 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정, 의존성 등 기타 변경
- `perf`: 성능 개선
- `ci`: CI/CD 설정 변경
- `build`: 빌드 시스템 변경
- `revert`: 이전 커밋 되돌리기

## Writing Rules

- Subject: Korean, under 50 chars, no period, imperative form (e.g. "추가", "수정", "삭제")
- Scope: affected module or component name (lowercase English)
- Body: explain why and what, wrap at 72 chars
- Breaking changes: add `BREAKING CHANGE:` in footer

## Commit Splitting

**One commit = one logical change.** Before staging anything, plan how many commits are needed.

Split into separate commits when:
- Changes span multiple types (e.g. `feat` + `fix` mixed together)
- Independent features or modules were changed simultaneously
- Refactoring and new functionality are combined

Never do:
- `git add .` to stage everything at once
- Bundle unrelated files into a single commit

## Steps

1. Run `git status` to see all changed files
2. Run `git diff HEAD` to review all changes (staged and unstaged)
3. Group changes into logical units and plan the number of commits
4. For each group: stage relevant files only → write Korean commit message → commit
5. After all commits, run `git status` to confirm a clean state
````

`allowed-tools: Bash(git *)`는 이 Skill이 활성화된 동안 Claude가 `git` 명령어를 별도 승인 없이 실행할 수 있게 해줍니다. 매번 승인 프롬프트가 뜨는 번거로움 없이 `git status`, `git diff`, `git add`, `git commit`이 연속으로 처리됩니다.

## Custom Command와 Skill, 무엇이 다를까요?

위 파일을 보고 "이거 custom command랑 뭐가 다르지?"라는 의문이 드셨다면 정확하게 짚으신 겁니다.

Claude Code에는 원래 Custom Command와 Skill이 별도 개념으로 존재했지만, 현재는 **통합**되었습니다. 공식 문서에도 다음과 같이 명시되어 있습니다.

> "Custom commands have been merged into skills. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way."

기존 `.claude/commands/` 경로의 파일은 그대로 동작합니다. 실질적인 차이는 파일 구조 하나뿐입니다.

|             | Custom Command               | Skill                                    |
| ----------- | ---------------------------- | ---------------------------------------- |
| 파일 구조   | 단일 파일                    | 디렉토리                                 |
| 예시 경로   | `.claude/commands/commit.md` | `.claude/skills/commit/SKILL.md`         |
| 지원 파일   | 없음                         | 스크립트, 템플릿, 참조 문서 등 추가 가능 |
| frontmatter | 동일하게 지원                | 동일하게 지원                            |
| 자동 활성화 | 동일하게 동작                | 동일하게 동작                            |

`/commit`처럼 단순한 작업은 단일 파일인 Custom Command로 충분합니다. Skill 디렉토리 구조는 스크립트나 참조 문서처럼 여러 파일이 함께 필요한 복잡한 작업에 적합합니다.

## 도구별 설정 방법

Skill은 [Agent Skills](https://agentskills.io) 오픈 스탠다드를 따르기 때문에 SKILL.md 형식 자체는 여러 AI 코딩 어시스턴트에서 공통으로 사용할 수 있습니다. 다만 각 도구가 바라보는 디렉토리가 달라 파일을 각각 복사해야 하며, `disable-model-invocation` 지원 여부도 도구마다 차이가 있습니다.

### Claude Code

단순한 작업이라면 Custom Command 단일 파일로 만드는 편이 간결합니다. 부가 파일이 필요한 경우 Skill 디렉토리 구조를 선택하시면 됩니다.

| 방식           | 경로 (개인)                        | 경로 (프로젝트)                  |
| -------------- | ---------------------------------- | -------------------------------- |
| Custom Command | `~/.claude/commands/commit.md`     | `.claude/commands/commit.md`     |
| Skill          | `~/.claude/skills/commit/SKILL.md` | `.claude/skills/commit/SKILL.md` |

`disable-model-invocation: true`를 완전히 지원합니다. 설정하면 description이 컨텍스트에서 제외되어 직접 호출할 때만 로드됩니다.

### Cursor

| 범위     | 경로                               |
| -------- | ---------------------------------- |
| 개인     | `~/.cursor/skills/commit/SKILL.md` |
| 프로젝트 | `.agents/skills/commit/SKILL.md`   |

`disable-model-invocation: true`를 지원하며 Claude Code와 동일하게 동작합니다.

### Codex CLI

| 범위     | 경로                               |
| -------- | ---------------------------------- |
| 개인     | `~/.agents/skills/commit/SKILL.md` |
| 프로젝트 | `.agents/skills/commit/SKILL.md`   |

frontmatter에 `disable-model-invocation`을 직접 지정하는 대신, Skill 디렉토리 안에 `agents/openai.yaml`을 추가해 동일한 효과를 낼 수 있습니다.

```yaml
# .agents/skills/commit/agents/openai.yaml
policy:
  allow_implicit_invocation: false
```

### Gemini CLI

Gemini CLI의 Skill에는 `disable-model-invocation`에 해당하는 설정이 없습니다. 활성화 여부는 모델이 컨텍스트를 보고 자율적으로 판단합니다.

커밋처럼 직접 호출하고 싶은 작업은 Skill 대신 **Custom Command**로 만드는 것이 낫습니다. Gemini CLI의 Custom Command는 TOML 형식을 사용합니다.

| 범위     | 경로                             |
| -------- | -------------------------------- |
| 개인     | `~/.gemini/commands/commit.toml` |
| 프로젝트 | `.gemini/commands/commit.toml`   |

```toml
# .gemini/commands/commit.toml
description = "git 변경사항을 분석해 Angular Commit Convention 형식의 한국어 커밋 메시지 작성 및 커밋"
prompt = """
Analyze the current git changes and create one or more commits following Angular Commit Convention. All commit messages must be written in Korean.

{{args}}

## Commit Message Format
...
"""
```

`{{args}}`는 `/commit` 뒤에 입력한 추가 인자로 대체됩니다.

## 정리

| 도구        | 저장 위치                                  | 자동 호출 비활성화                                               |
| ----------- | ------------------------------------------ | ---------------------------------------------------------------- |
| Claude Code | `.claude/commands/` 또는 `.claude/skills/` | `disable-model-invocation: true`                                 |
| Cursor      | `.agents/skills/`                          | `disable-model-invocation: true`                                 |
| Codex CLI   | `.agents/skills/`                          | `agents/openai.yaml`의 `policy.allow_implicit_invocation: false` |
| Gemini CLI  | `.gemini/commands/`                        | Skill 미지원, Custom Command 사용                                |

Skill은 반복 작업을 슬래시 명령어로 압축해주는 강력한 도구이지만, `disable-model-invocation: true` 없이는 Claude가 스스로 판단해 로드합니다. 커밋이나 배포처럼 실행 타이밍이 중요한 작업일수록 이 옵션을 명시적으로 설정해두시기 바랍니다.

## 참고 문서

- [Claude Code Skills 공식 문서](https://code.claude.com/docs/en/skills)
- [Cursor Skills 공식 문서](https://cursor.com/docs/skills)
- [Gemini CLI Custom Commands](https://geminicli.com/docs/cli/custom-commands/)
- [Codex CLI Skills](https://developers.openai.com/codex/skills)
- [Agent Skills 오픈 스탠다드](https://agentskills.io)

---
pubDatetime: 2026-02-19
title: "Claude Code Notification 훅에서 알림 클릭 시 VS Code로 돌아오기"
tags:
  - "claude-code"
  - "productivity"
  - "macos"
description: "macOS에서 osascript 대신 terminal-notifier를 사용해 알림 클릭 시 VS Code 포커스를 복귀하는 방법"
---

Claude Code에 작업을 맡기고 다른 창으로 전환해 두면, 입력을 기다리고 있는지 알 수가 없습니다. Notification 훅으로 알림을 받을 수 있지만, macOS에서는 한 가지 더 신경 쓸 부분이 있습니다.

## Claude Code Hooks

Claude Code는 특정 이벤트에 셸 명령을 실행하는 훅 시스템을 제공합니다. `~/.claude/settings.json`에 설정하며, 이벤트 타입은 `PreToolUse`, `PostToolUse`, `Notification`, `Stop`, `SubagentStop`이 있습니다.

`Notification` 훅은 Claude Code가 사용자 입력을 기다리는 시점에 트리거됩니다.

## 공식 예시와 macOS의 간극

공식 문서의 Notification 훅 예시입니다:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Awaiting your input'"
          }
        ]
      }
    ]
  }
}
```

`notify-send`는 Linux 유틸리티입니다. macOS에는 없습니다. 대신 `osascript`로 같은 동작을 구현할 수 있습니다:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Awaiting your input\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

알림은 잘 뜹니다. 문제는 그다음입니다.

**알림 배너를 클릭해도 아무 일도 일어나지 않습니다.**

`display notification`은 알림을 *표시*하는 것이 전부입니다. 클릭에 동작을 연결하는 방법이 없습니다. 배너를 클릭하면 그냥 사라지고, VS Code 창을 직접 찾아가야 합니다. 알림을 받았는데 결국 Cmd+Tab을 눌러야 하는 셈입니다.

## terminal-notifier

[terminal-notifier](https://github.com/julienXX/terminal-notifier)는 macOS 알림 센터를 셸에서 다루는 CLI 도구입니다. `osascript`와 달리 알림 클릭 시 동작을 지정할 수 있습니다.

```bash
brew install terminal-notifier
```

클릭 동작을 연결하는 옵션은 두 가지입니다.

### 방법 1: `-activate` — 번들 ID로 앱 활성화

`-activate`는 알림을 클릭하면 지정한 번들 ID의 앱을 포그라운드로 가져옵니다. VS Code의 번들 ID는 `com.microsoft.VSCode`입니다.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title \"Claude Code\" -message \"Awaiting your input\" -activate \"com.microsoft.VSCode\" -sound default"
          }
        ]
      }
    ]
  }
}
```

알림 클릭 → macOS가 번들 ID로 앱을 활성화. 셸 명령이 개입하지 않아 실행 환경에 의존하지 않습니다.

### 방법 2: `-execute` — 셸 명령 실행

`-execute`는 알림을 클릭하면 셸 명령을 실행합니다. `open -a`로 VS Code를 호출하는 방식입니다.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title \"Claude Code\" -message \"Awaiting your input\" -execute \"open -a 'Visual Studio Code'\" -sound default"
          }
        ]
      }
    ]
  }
}
```

`-execute`는 앱 활성화 외에도 파일 열기, 스크립트 실행 등 원하는 동작을 연결할 수 있습니다. 다만 알림 클릭 시점의 셸 환경에서 실행되므로, `PATH`에 따라 명령을 못 찾을 수 있습니다. 이 경우 절대 경로를 쓰면 됩니다.

## 참고 문서

- [Claude Code Hooks 공식 문서](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [terminal-notifier GitHub](https://github.com/julienXX/terminal-notifier)

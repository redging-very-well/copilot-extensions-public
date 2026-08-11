# docbot

**9 specialist HTML document generators + 1 orchestrator**, all accessible via a single `/docbot` slash command.

Docbot generates polished, self-contained HTML documents — slide decks, architecture diagrams, design system sheets, interactive prototypes, and more — directly from your codebase. Every output opens in a browser with no build step, no dependencies, and a consistent warm visual design system.

## Commands

| Command | What it generates |
|---------|-------------------|
| `/docbot` or `/docbot help` | Lists all subtasks and routes you to the right one |
| `/docbot explore` | Side-by-side approach comparisons with tradeoff tables |
| `/docbot review` | Annotated code walkthroughs and PR review documents |
| `/docbot design` | Living design system token sheets and component variant contact sheets |
| `/docbot prototype` | Animation sandboxes and clickable multi-screen flows |
| `/docbot diagram` | Inline SVG flowcharts, architecture diagrams, and ER diagrams |
| `/docbot deck` | Arrow-key slide decks — present in a meeting from one HTML file |
| `/docbot research` | Explainers with collapsible sections, tabbed code, and sidebar glossaries |
| `/docbot report` | Status updates with KPI strips, incident post-mortems with timelines |
| `/docbot editor` | Throwaway editing UIs (triage boards, config editors) with export buttons |

Docbot runs on both **Claude Code** and the **GitHub Copilot CLI**, driven by the same prompts.

## Installation — Claude Code

In a Claude Code session:

```
/plugin marketplace add redging-very-well/copilot-extensions-public
/plugin install docbot
```

Verify with `/help` — you should see `/docbot` listed under the plugin. Update later with `/plugin marketplace update redging-extensions`.

## Installation — Copilot CLI

```bash
# From the repo root:
docbot/install.sh           # user-scoped (all projects)
docbot/install.sh --project # project-scoped (current repo only)
```

The install script copies the extension files, and refuses to overwrite an existing install. To update after a `git pull`, run `docbot/uninstall.sh` first, then `docbot/install.sh`.

Verify with `/extensions list` — you should see `docbot`. Type `/docbot` to get started.

## Usage

```
/docbot diagram the authentication flow in this project
/docbot deck sprint review for the last two weeks
/docbot explore three approaches to caching the roster data
/docbot report weekly status update from recent git history
/docbot editor triage board for the open GitHub issues
```

Each command reads relevant source files from your project, then generates a self-contained HTML file saved to `docs/html/` in your working directory.

On Claude Code you can also skip the slash command — each specialist is a subagent, so asking "draw me a diagram of the auth flow" or "write up the sprint status" routes to the right one on its own.

## Uninstall

```bash
# Claude Code
/plugin uninstall docbot

# Copilot CLI
docbot/uninstall.sh           # user-scoped
docbot/uninstall.sh --project # project-scoped
```

## How It Works

Both hosts register a single `/docbot` command. The first word of your message is matched against the known subtasks (explore, review, design, …). If it matches, the shared design system and that specialist's brief are applied to your request. If it doesn't, the orchestrator helps route you.

The two hosts differ only in the front-end:

- **Claude Code** — `commands/docbot.md` parses the subtask and delegates to the matching subagent in `agents/`, which reads `prompts/shared.md` plus its own brief and generates the document in its own context.
- **Copilot CLI** — `extension.mjs` registers the command via `joinSession()` and concatenates the same two prompt files with your request before sending.

```
docbot/
├── prompts/                 # Host-neutral — the single source of truth
│   ├── shared.md            #   Design system (CSS variables, typography, components)
│   ├── orchestrator.md      #   /docbot help and routing
│   ├── deck.md              #   /docbot deck specialist prompt
│   ├── design.md            #   /docbot design
│   ├── diagram.md           #   /docbot diagram
│   ├── editor.md            #   /docbot editor
│   ├── explore.md           #   /docbot explore
│   ├── prototype.md         #   /docbot prototype
│   ├── report.md            #   /docbot report
│   ├── research.md          #   /docbot research
│   └── review.md            #   /docbot review
│
├── .claude-plugin/          # Claude Code
│   └── plugin.json
├── commands/
│   └── docbot.md            #   The /docbot command — parses subtask, delegates
├── agents/
│   └── docbot-*.md          #   9 specialist subagents
│
├── extension.mjs            # Copilot CLI entry point
├── install.sh               # Copilot CLI installer (copies files)
└── uninstall.sh
```

## Design System

All docbot agents share a consistent visual language inspired by [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/):

- **Warm ivory** backgrounds (`#FAF9F5`)
- **Serif headings** with sans-serif body text
- **Clay accents** (`#D97757`) for highlights and callouts
- **Monospace** for code, labels, and technical details
- **12px rounded cards** with subtle borders

The full design system is defined in [`prompts/shared.md`](prompts/shared.md).

## Adding a New Specialist

1. Create `prompts/<name>.md` with the specialist prompt
2. Add `agents/docbot-<name>.md` — a thin subagent that reads `prompts/shared.md` and its own brief (copy an existing one)
3. Add a row to the subtask table in `commands/docbot.md`
4. Add an entry to the `specialists` array in `extension.mjs`
5. Update this README

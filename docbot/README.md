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

## Installation

```bash
# From the repo root:
docbot/install.sh           # user-scoped (all projects)
docbot/install.sh --project # project-scoped (current repo only)
```

The install script copies the extension files. Re-run it after `git pull` to update.

### Verify

```
/extensions list
```

You should see `docbot` listed. Type `/docbot` to get started.

## Usage

```
/docbot diagram the authentication flow in this project
/docbot deck sprint review for the last two weeks
/docbot explore three approaches to caching the roster data
/docbot report weekly status update from recent git history
/docbot editor triage board for the open GitHub issues
```

Each command reads relevant source files from your project, then generates a self-contained HTML file saved to `docs/html/` in your working directory.

## Uninstall

```bash
docbot/uninstall.sh           # user-scoped
docbot/uninstall.sh --project # project-scoped
```

## How It Works

The extension registers a single `/docbot` slash command via `joinSession()`. The first word of the message is matched against known subtasks (explore, review, design, etc.). If matched, the shared design system prompt and specialist prompt are combined with your request and sent to the agent. If no subtask matches, the orchestrator helps route you.

```
docbot/
├── extension.mjs       # Entry point — registers all slash commands
├── install.sh          # Installer (copies files)
└── prompts/
    ├── shared.md        # Design system (CSS variables, typography, components)
    ├── orchestrator.md  # /docbot help and routing logic
    ├── deck.md          # /docbot deck specialist prompt
    ├── design.md        # /docbot design
    ├── diagram.md       # /docbot diagram
    ├── editor.md        # /docbot editor
    ├── explore.md       # /docbot explore
    ├── prototype.md     # /docbot prototype
    ├── report.md        # /docbot report
    ├── research.md      # /docbot research
    └── review.md        # /docbot review
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
2. Add an entry to the `specialists` array in `extension.mjs`
3. Update this README

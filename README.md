# Copilot CLI Extensions

A collection of [GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) extensions that add slash commands and specialized capabilities.

## Extensions

### docbot

**9 specialist HTML document generators + 1 orchestrator**, all accessible as slash commands.

Docbot generates polished, self-contained HTML documents — slide decks, architecture diagrams, design system sheets, interactive prototypes, and more — directly from your codebase. Every output opens in a browser with no build step, no dependencies, and a consistent warm visual design system.

| Command | What it generates |
|---------|-------------------|
| `/docbot` | Lists all generators and routes you to the right one |
| `/docbot-explore` | Side-by-side approach comparisons with tradeoff tables |
| `/docbot-review` | Annotated code walkthroughs and PR review documents |
| `/docbot-design` | Living design system token sheets and component variant contact sheets |
| `/docbot-prototype` | Animation sandboxes and clickable multi-screen flows |
| `/docbot-diagram` | Inline SVG flowcharts, architecture diagrams, and ER diagrams |
| `/docbot-deck` | Arrow-key slide decks — present in a meeting from one HTML file |
| `/docbot-research` | Explainers with collapsible sections, tabbed code, and sidebar glossaries |
| `/docbot-report` | Status updates with KPI strips, incident post-mortems with timelines |
| `/docbot-editor` | Throwaway editing UIs (triage boards, config editors) with export buttons |

## Requirements

- [GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) v1.0.5+
- An active Copilot subscription

## Installation

Clone this repo, then run the install script:

```bash
git clone https://github.com/redging-very-well/copilot-extensions-public.git
cd copilot-extensions-public
./install.sh           # installs to ~/.copilot/extensions/ (all projects)
./install.sh --project # installs to .github/extensions/ (current repo only)
```

The install script creates a symlink — the extension stays in this repo so you can `git pull` to update.

### Verify

In a Copilot CLI session:

```
/extensions list
```

You should see `docbot` listed. Type `/docbot` to get started.

## Usage

```
/docbot-diagram the authentication flow in this project
/docbot-deck sprint review for the last two weeks
/docbot-explore three approaches to caching the roster data
/docbot-report weekly status update from recent git history
/docbot-editor triage board for the open GitHub issues
```

Each command reads relevant source files from your project, then generates a self-contained HTML file saved to `docs/html/` in your working directory.

## Uninstall

```bash
# User-scoped
rm ~/.copilot/extensions/docbot

# Project-scoped
rm .github/extensions/docbot
```

## How It Works

This uses the [Copilot CLI extension system](https://dev.to/htekdev/copilot-cli-extensions-revamp-custom-slash-commands-and-full-extensibility-1f9e) — a child process that communicates with the CLI over JSON-RPC via the `@github/copilot-sdk`.

The extension registers slash commands via `joinSession()`. Each command loads a shared design system prompt plus a specialist prompt, combines them with your request, and sends the assembled prompt to the agent via `session.send()`.

```
docbot/
├── extension.mjs       # Entry point — registers all slash commands
└── prompts/
    ├── shared.md        # Design system (CSS variables, typography, components)
    ├── orchestrator.md  # /docbot routing logic
    ├── deck.md          # /docbot-deck specialist prompt
    ├── design.md        # /docbot-design
    ├── diagram.md       # /docbot-diagram
    ├── editor.md        # /docbot-editor
    ├── explore.md       # /docbot-explore
    ├── prototype.md     # /docbot-prototype
    ├── report.md        # /docbot-report
    ├── research.md      # /docbot-research
    └── review.md        # /docbot-review
```

## Design System

All docbot agents share a consistent visual language inspired by [The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/):

- **Warm ivory** backgrounds (`#FAF9F5`)
- **Serif headings** with sans-serif body text
- **Clay accents** (`#D97757`) for highlights and callouts
- **Monospace** for code, labels, and technical details
- **12px rounded cards** with subtle borders

The full design system is defined in [`docbot/prompts/shared.md`](docbot/prompts/shared.md).

## Contributing

PRs welcome. To add a new specialist:

1. Create `docbot/prompts/<name>.md` with the specialist prompt
2. Add an entry to the `specialists` array in `docbot/extension.mjs`
3. Update this README

## License

MIT

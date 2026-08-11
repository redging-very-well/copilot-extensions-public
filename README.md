# Coding Agent Extensions

A collection of extensions that add slash commands and specialized capabilities to coding agents. Each extension runs on both [Claude Code](https://claude.com/claude-code) and the [GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli), sharing one set of prompts between them.

## Available Extensions

| Extension | Description | Claude Code | Copilot CLI |
|-----------|-------------|-------------|-------------|
| [**docbot**](docbot/) | 9 specialist HTML document generators — slide decks, diagrams, design systems, prototypes, reports, and more | `/plugin install docbot` | `docbot/install.sh` |

## Install for Claude Code

This repo is a plugin marketplace. In a Claude Code session:

```
/plugin marketplace add redging-very-well/copilot-extensions-public
/plugin install docbot
```

Then `/docbot help` to get started. Update later with `/plugin marketplace update redging-extensions`.

## Install for Copilot CLI

Requires Copilot CLI v1.0.5+ and an active Copilot subscription.

```bash
git clone https://github.com/redging-very-well/copilot-extensions-public.git
cd copilot-extensions-public
<extension>/install.sh           # user-scoped   → ~/.copilot/extensions/
<extension>/install.sh --project # project-scoped → .github/extensions/
```

The installer copies the extension directory. It refuses to overwrite an existing install, so to update: `<extension>/uninstall.sh` then `<extension>/install.sh`.

Verify with `/extensions list` in a Copilot CLI session.

## How Extensions Work

Each extension keeps its prompts in a plain `prompts/` directory with no host-specific syntax, and layers a thin front-end for each agent on top:

- **Claude Code** loads it as a [plugin](https://docs.claude.com/en/docs/claude-code/plugins) — `.claude-plugin/plugin.json`, a slash command in `commands/`, and specialist subagents in `agents/`. The subagents also let Claude route to a specialist on its own, without the slash command.
- **Copilot CLI** loads `extension.mjs`, a child process that registers slash commands over JSON-RPC via the [`@github/copilot-sdk`](https://dev.to/htekdev/copilot-cli-extensions-revamp-custom-slash-commands-and-full-extensibility-1f9e).

Neither host sees the other's files. The prompts are the single source of truth.

## Contributing

PRs welcome. Each extension lives in its own top-level directory:

```
<extension>/
├── prompts/               # Host-neutral prompts — the single source of truth
│
├── .claude-plugin/        # Claude Code
│   └── plugin.json
├── commands/              # Slash command(s)
├── agents/                # Specialist subagents
│
├── extension.mjs          # Copilot CLI entry point
├── install.sh             # Copilot CLI installer
├── uninstall.sh
│
└── README.md
```

New extensions also need an entry in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json).

## License

MIT

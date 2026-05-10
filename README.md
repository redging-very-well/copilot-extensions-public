# Copilot CLI Extensions

A collection of [GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) extensions that add slash commands and specialized capabilities.

## Requirements

- [GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) v1.0.5+
- An active Copilot subscription

## Available Extensions

| Extension | Description | Install |
|-----------|-------------|---------|
| [**docbot**](docbot/) | 9 specialist HTML document generators + orchestrator — slide decks, diagrams, design systems, prototypes, reports, and more | `docbot/install.sh` |

## How Extensions Work

Each extension uses the [Copilot CLI extension system](https://dev.to/htekdev/copilot-cli-extensions-revamp-custom-slash-commands-and-full-extensibility-1f9e) — a child process that communicates with the CLI over JSON-RPC via the `@github/copilot-sdk`. Extensions register slash commands via `joinSession()`.

### Installation Pattern

Each extension has its own `install.sh` that symlinks it into either:

- **`~/.copilot/extensions/`** — user-scoped, available in all projects (default)
- **`.github/extensions/`** — project-scoped, available in one repo only

```bash
git clone https://github.com/redging-very-well/copilot-extensions-public.git
cd copilot-extensions-public
<extension>/install.sh           # user-scoped (default)
<extension>/install.sh --project # project-scoped
```

### Verify

In a Copilot CLI session:

```
/extensions list
```

## Contributing

PRs welcome. Each extension lives in its own top-level directory with:

```
<extension>/
├── extension.mjs    # Entry point (required by Copilot CLI)
├── install.sh       # Symlink installer
├── README.md        # Extension-specific docs
└── ...              # Supporting files
```

## License

MIT

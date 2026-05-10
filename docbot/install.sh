#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCBOT_DIR="$SCRIPT_DIR"

usage() {
  echo "Usage: install.sh [--user | --project]"
  echo ""
  echo "  --user     Install to ~/.copilot/extensions/docbot (available in all projects)"
  echo "  --project  Install to .github/extensions/docbot (available in this repo only)"
  echo ""
  echo "Default: --user"
}

install_user() {
  local target="$HOME/.copilot/extensions/docbot"
  if [ -e "$target" ]; then
    echo "⚠  $target already exists. Remove it first to reinstall."
    exit 1
  fi
  mkdir -p "$HOME/.copilot/extensions"
  ln -s "$DOCBOT_DIR" "$target"
  echo "✅ Installed docbot extension (user-scoped)"
  echo "   $target → $DOCBOT_DIR"
  echo ""
  echo "Available commands: /docbot, /docbot-explore, /docbot-review, /docbot-design,"
  echo "  /docbot-prototype, /docbot-diagram, /docbot-deck, /docbot-research,"
  echo "  /docbot-report, /docbot-editor"
}

install_project() {
  local git_root
  git_root="$(git rev-parse --show-toplevel 2>/dev/null || echo "")"
  if [ -z "$git_root" ]; then
    echo "❌ Not in a git repository. Run this from inside a project."
    exit 1
  fi
  local target="$git_root/.github/extensions/docbot"
  if [ -e "$target" ]; then
    echo "⚠  $target already exists. Remove it first to reinstall."
    exit 1
  fi
  mkdir -p "$git_root/.github/extensions"
  ln -s "$DOCBOT_DIR" "$target"
  echo "✅ Installed docbot extension (project-scoped)"
  echo "   $target → $DOCBOT_DIR"
}

case "${1:---user}" in
  --user)    install_user ;;
  --project) install_project ;;
  --help|-h) usage ;;
  *)         usage; exit 1 ;;
esac

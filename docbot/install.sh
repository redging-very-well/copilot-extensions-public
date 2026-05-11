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
  cp -R "$DOCBOT_DIR" "$target"
  echo "✅ Installed docbot extension (user-scoped)"
  echo "   Copied to $target"
  echo ""
  echo "Available command: /docbot <subtask> <topic>"
  echo "  Run /docbot help to see available subtasks."
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
  cp -R "$DOCBOT_DIR" "$target"
  echo "✅ Installed docbot extension (project-scoped)"
  echo "   Copied to $target"
}

case "${1:---user}" in
  --user)    install_user ;;
  --project) install_project ;;
  --help|-h) usage ;;
  *)         usage; exit 1 ;;
esac

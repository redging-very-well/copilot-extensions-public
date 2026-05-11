#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: uninstall.sh [--user | --project]"
  echo ""
  echo "  --user     Remove from ~/.copilot/extensions/docbot"
  echo "  --project  Remove from .github/extensions/docbot (current repo)"
  echo ""
  echo "Default: --user"
}

uninstall_user() {
  local target="$HOME/.copilot/extensions/docbot"
  if [ ! -d "$target" ] && [ ! -L "$target" ]; then
    echo "❌ No docbot extension found at $target"
    exit 1
  fi
  rm -rf "$target"
  echo "✅ Uninstalled docbot extension (user-scoped)"
  echo "   Removed $target"
}

uninstall_project() {
  local git_root
  git_root="$(git rev-parse --show-toplevel 2>/dev/null || echo "")"
  if [ -z "$git_root" ]; then
    echo "❌ Not in a git repository. Run this from inside a project."
    exit 1
  fi
  local target="$git_root/.github/extensions/docbot"
  if [ ! -d "$target" ] && [ ! -L "$target" ]; then
    echo "❌ No docbot extension found at $target"
    exit 1
  fi
  rm -rf "$target"
  echo "✅ Uninstalled docbot extension (project-scoped)"
  echo "   Removed $target"
}

case "${1:---user}" in
  --user)    uninstall_user ;;
  --project) uninstall_project ;;
  --help|-h) usage ;;
  *)         usage; exit 1 ;;
esac

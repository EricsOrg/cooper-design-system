#!/usr/bin/env bash
set -euo pipefail

# Sync this repo to the default branch (origin/HEAD) and fast-forward.
# Useful when your current branch tracks a remote branch that was deleted after a PR merge.

remote="${1:-origin}"

# Ensure we have the latest remote refs (and prune deleted branches)
git fetch --prune "$remote"

# Determine default branch from origin/HEAD.
# If origin/HEAD is missing (rare), fall back to main if it exists, else master.
default_branch_ref="$(git symbolic-ref --quiet --short "refs/remotes/${remote}/HEAD" 2>/dev/null || true)"
default_branch="${default_branch_ref#${remote}/}"
if [[ -z "$default_branch" || "$default_branch" == "$default_branch_ref" ]]; then
  if git show-ref --verify --quiet "refs/remotes/${remote}/main"; then
    default_branch="main"
  else
    default_branch="master"
  fi
fi

# Refuse to switch branches if there are local changes.
# This script's job is to be safe and deterministic (no implicit stash/pop).
if [[ -n "$(git status --porcelain)" ]]; then
  echo "✋ Working tree is not clean. Commit/stash your changes first, then re-run:" >&2
  echo "  git status" >&2
  echo "  git stash -u   # or commit" >&2
  exit 2
fi

# Always switch back to default branch before pulling.
# This avoids: "Your configuration specifies to merge with the ref ... but no such ref was fetched."
git switch "$default_branch" >/dev/null

git pull --ff-only "$remote" "$default_branch"

echo "✅ Synced to ${remote}/${default_branch}"

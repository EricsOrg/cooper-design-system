#!/usr/bin/env bash
set -euo pipefail

# Sync this repo to the default branch (origin/HEAD) and fast-forward.
# Useful when your current branch tracks a remote branch that was deleted after a PR merge.

remote="${1:-origin}"

# Ensure we have the latest remote refs (and prune deleted branches)
git fetch --prune "$remote"

# Determine default branch from origin/HEAD (falls back to master for this repo)
default_branch_ref="$(git symbolic-ref --quiet --short "refs/remotes/${remote}/HEAD" 2>/dev/null || true)"
default_branch="${default_branch_ref#${remote}/}"
if [[ -z "$default_branch" || "$default_branch" == "$default_branch_ref" ]]; then
  default_branch="master"
fi

# Always switch back to default branch before pulling.
# This avoids: "Your configuration specifies to merge with the ref ... but no such ref was fetched."
git switch "$default_branch" >/dev/null

git pull --ff-only "$remote" "$default_branch"

echo "✅ Synced to ${remote}/${default_branch}"

#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();

const TARGETS = [
  ".next",
  "out",
  "dist",
  "coverage",
  "test-results",
  "playwright-report",
  ".turbo",
  ".cache",
];

async function rmrf(relPath) {
  const abs = path.join(repoRoot, relPath);
  try {
    await fs.rm(abs, { recursive: true, force: true });
    process.stdout.write(`clean: removed ${relPath}\n`);
  } catch (err) {
    process.stderr.write(`clean: failed to remove ${relPath}: ${err?.message ?? err}\n`);
    process.exitCode = 1;
  }
}

await Promise.all(TARGETS.map(rmrf));

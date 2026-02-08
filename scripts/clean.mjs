#!/usr/bin/env node
/**
 * Clean local build/test artifacts.
 *
 * Intentionally does NOT delete node_modules.
 * Safe to run on macOS/Linux/Windows.
 */

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();

const targets = [
  ".next",
  "out",
  "coverage",
  "playwright-report",
  "test-results",
  ".turbo",
  "tsconfig.tsbuildinfo",
];

function rm(target) {
  const abs = path.join(cwd, target);
  if (!fs.existsSync(abs)) return false;

  fs.rmSync(abs, {
    recursive: true,
    force: true,
  });
  return true;
}

const removed = [];
for (const t of targets) {
  if (rm(t)) removed.push(t);
}

if (removed.length === 0) {
  console.log("clean: nothing to remove");
} else {
  console.log(`clean: removed ${removed.length} item(s): ${removed.join(", ")}`);
}

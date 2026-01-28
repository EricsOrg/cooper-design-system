#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

// Convenience wrapper for updating Playwright screenshot baselines.
// This simply runs the existing npm script and exits with the same code.

const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const args = ['run', 'test:visual:update'];

console.log('Updating visual regression baselines…');
console.log(`> ${cmd} ${args.join(' ')}`);

const res = spawnSync(cmd, args, { stdio: 'inherit' });
process.exit(res.status ?? 1);

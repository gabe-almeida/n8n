#!/usr/bin/env node
import { execSync } from 'node:child_process';

const isCi = process.env.CI === 'true' || process.env.CI === '1';
const runTestsEnabled = ['1', 'true', 'yes', 'on'].includes(
  String(process.env.RUN_TESTS || '').toLowerCase(),
);

if (isCi || runTestsEnabled) {
  // Preserve original test command behind an explicit runner
  execSync('pnpm -s test:run', { stdio: 'inherit', env: process.env });
} else {
  console.log('[tests disabled] Skipping automated test run. Set RUN_TESTS=1 or use "pnpm test:run" to run tests manually.');
}


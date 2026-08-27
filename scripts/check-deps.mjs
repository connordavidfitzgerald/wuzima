/* Temporary build-time probe. Vercel's restored build cache left `tslib`
   missing from node_modules even though pnpm reported a clean install, which
   fails the rolldown client bundle (rxjs -> tslib). Delete this and its
   `prebuild` hook once deploys are reliably green. */
import { existsSync } from 'node:fs';

for (const pkg of ['tslib', 'rxjs']) {
  const dir = new URL(`../node_modules/${pkg}/`, import.meta.url);
  console.log(`[check-deps] ${pkg}: ${existsSync(dir) ? 'present' : 'MISSING'}`);
}

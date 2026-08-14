import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function createViteConfig(metaUrl, overrides = {}) {
  const caseDir = fileURLToPath(new URL('.', metaUrl));
  const fixtureRoot = resolve(caseDir, '../../fixture');
  const outDir = resolve(caseDir, 'dist');

  return {
    root: fixtureRoot,
    build: {
      outDir,
      emptyOutDir: true,
      manifest: true,
      minify: false,
      ...overrides.build,
    },
    ...overrides,
  };
}

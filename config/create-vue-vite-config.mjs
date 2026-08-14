import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function createVueViteConfig(metaUrl, overrides = {}) {
  const caseDir = fileURLToPath(new URL('.', metaUrl));
  const fixtureRoot = resolve(caseDir, '../../vue-fixture');
  const outDir = resolve(caseDir, 'dist');

  return {
    root: fixtureRoot,
    ...overrides,
    build: {
      outDir,
      emptyOutDir: true,
      manifest: true,
      minify: false,
      ...overrides.build,
    },
  };
}

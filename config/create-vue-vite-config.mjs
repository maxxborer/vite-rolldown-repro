import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function createVueViteConfig(metaUrl, overrides = {}) {
  const caseDir = fileURLToPath(new URL('.', metaUrl));
  const fixtureRoot = resolve(caseDir, '../../vue-fixture');
  const outDir = resolve(caseDir, 'dist');
  const nodeModules = resolve(caseDir, 'node_modules');

  return {
    root: fixtureRoot,
    ...overrides,
    resolve: {
      ...overrides.resolve,
      alias: [
        { find: /^vue$/, replacement: resolve(nodeModules, 'vue/dist/vue.runtime.esm-bundler.js') },
        { find: /^pinia$/, replacement: resolve(nodeModules, 'pinia/dist/pinia.mjs') },
        { find: /^vue-router$/, replacement: resolve(nodeModules, 'vue-router/dist/vue-router.js') },
        ...(overrides.resolve?.alias ?? []),
      ],
    },
    build: {
      outDir,
      emptyOutDir: true,
      manifest: true,
      minify: false,
      ...overrides.build,
    },
  };
}

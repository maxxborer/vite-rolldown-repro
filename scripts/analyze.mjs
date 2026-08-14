import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, relative, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';

const root = resolve(new URL('..', import.meta.url).pathname);
const appsDir = join(root, 'apps');
const cases = readdirSync(appsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KiB`;
};

const median = (values) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? Math.round((sorted[middle - 1] + sorted[middle]) / 2) : sorted[middle];
};

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const readPackageVersion = (caseDir, name) => {
  const packagePath = join(caseDir, 'node_modules', name, 'package.json');
  return JSON.parse(readFileSync(packagePath, 'utf8')).version;
};

const collectInitialManifestKeys = (manifest) => {
  const entries = Object.entries(manifest).filter(([, item]) => item.isEntry).map(([key]) => key);
  const visited = new Set();
  const visit = (key) => {
    if (visited.has(key)) return;
    visited.add(key);
    for (const dependency of manifest[key]?.imports ?? []) visit(dependency);
  };
  for (const entry of entries) visit(entry);
  return visited;
};

const results = [];

for (const name of cases) {
  const caseDir = join(appsDir, name);
  const packageJson = join(caseDir, 'package.json');
  if (!existsSync(packageJson)) continue;

  process.stdout.write(`\n=== ${name} ===\n`);
  execFileSync('yarn', ['install', '--non-interactive', '--silent'], { cwd: caseDir, stdio: 'inherit' });

  const started = performance.now();
  execFileSync('yarn', ['build'], { cwd: caseDir, stdio: 'inherit' });
  const buildMs = Math.round(performance.now() - started);

  const distDir = join(caseDir, 'dist');
  const manifestPath = join(distDir, '.vite', 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const initialKeys = collectInitialManifestKeys(manifest);
  const initialFiles = new Set([...initialKeys].map((key) => manifest[key]?.file).filter(Boolean));

  const files = walk(distDir)
    .filter((path) => !path.endsWith('.vite/manifest.json'))
    .map((path) => {
      const buffer = readFileSync(path);
      return {
        file: relative(distDir, path),
        bytes: buffer.length,
        gzipBytes: gzipSync(buffer).length,
        type: path.endsWith('.js') ? 'js' : path.endsWith('.css') ? 'css' : 'asset',
      };
    });

  const jsFiles = files.filter((file) => file.type === 'js');
  const initialJs = jsFiles.filter((file) => initialFiles.has(file.file));
  const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);

  results.push({
    case: name,
    vite: readPackageVersion(caseDir, 'vite'),
    rolldown: readPackageVersion(caseDir, 'rolldown'),
    buildMs,
    metrics: {
      files: files.length,
      totalChunks: jsFiles.length,
      initialChunks: initialJs.length,
      dynamicChunks: jsFiles.length - initialJs.length,
      smallChunksLt2KiB: jsFiles.filter((file) => file.bytes < 2 * 1024).length,
      smallChunksLt10KiB: jsFiles.filter((file) => file.bytes < 10 * 1024).length,
      initialRawBytes: sum(initialJs, 'bytes'),
      initialGzipBytes: sum(initialJs, 'gzipBytes'),
      totalRawBytes: sum(files, 'bytes'),
      totalGzipBytes: sum(files, 'gzipBytes'),
      medianChunkBytes: median(jsFiles.map((file) => file.bytes)),
      minChunkBytes: jsFiles.length ? Math.min(...jsFiles.map((file) => file.bytes)) : 0,
      maxChunkBytes: jsFiles.length ? Math.max(...jsFiles.map((file) => file.bytes)) : 0,
    },
    initialFiles: [...initialFiles].sort(),
    files: files.sort((a, b) => a.file.localeCompare(b.file)),
  });
}

const rows = results.map(({ case: name, vite, rolldown, buildMs, metrics }) => ({
  case: name,
  vite,
  rolldown,
  initialChunks: metrics.initialChunks,
  totalChunks: metrics.totalChunks,
  dynamicChunks: metrics.dynamicChunks,
  'small<2KiB': metrics.smallChunksLt2KiB,
  'small<10KiB': metrics.smallChunksLt10KiB,
  initialRaw: formatBytes(metrics.initialRawBytes),
  initialGzip: formatBytes(metrics.initialGzipBytes),
  totalRaw: formatBytes(metrics.totalRawBytes),
  totalGzip: formatBytes(metrics.totalGzipBytes),
  medianChunk: formatBytes(metrics.medianChunkBytes),
  buildMs,
}));

console.log('\n=== Comparison ===');
console.table(rows);

const output = {
  generatedAt: new Date().toISOString(),
  node: process.version,
  results,
};
writeFileSync(join(root, 'results.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log('\nWrote results.json');

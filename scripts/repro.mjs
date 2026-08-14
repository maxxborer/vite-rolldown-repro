import { rolldown as rolldown114 } from 'rolldown-1-1-4';
import { rolldown as rolldown115 } from 'rolldown-1-1-5';
import { rolldown as rolldown123 } from 'rolldown-1-2-3';

const versions = [
  ['1.1.4', rolldown114],
  ['1.1.5', rolldown115],
  ['1.2.3', rolldown123],
];

for (const [version, rolldown] of versions) {
  const bundle = await rolldown({
    input: {
      'entry-light': 'src/entry-light.js',
      'entry-heavy': 'src/entry-heavy.js',
    },
    treeshake: { moduleSideEffects: false },
  });

  const result = await bundle.generate({ format: 'esm' });
  await bundle.close();

  const chunks = result.output.filter((item) => item.type === 'chunk');
  console.log(`rolldown ${version}: ${chunks.length} chunks`);
  for (const chunk of chunks) {
    console.log(`  ${chunk.fileName} imports=[${chunk.imports.join(', ')}] modules=[${Object.keys(chunk.modules).join(', ')}]`);
  }
}

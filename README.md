# Vite / Rolldown chunking reproduction

Reproduction and comparison harness for [rolldown/rolldown#10675](https://github.com/rolldown/rolldown/issues/10675).

The repository contains two comparison suites:

- `vanilla` — the original minimal JavaScript SPA fixture;
- `vue` — a larger Vue 3 SPA with SFCs, Vue Router, Pinia, composables, shared utilities/data, feature barrels, and five lazy-loaded views.

Each directory in `apps/` is an isolated Vite project. Cases in a suite use the same fixture and build configuration, but pin a different Rolldown version or override build settings independently. Yarn `resolutions` are intentionally local to each case so Vite cannot silently resolve another nested Rolldown version.

## Run

Requirements: Node.js 22+ and Yarn 1.22.22.

```sh
yarn analyze
```

The command installs every case independently, builds all cases, prints one comparison table, and writes a generated `results.json`. The JSON is intentionally not committed; GitHub Actions uploads it as the `rolldown-analysis` artifact for every successful run.

Reported data includes:

- suite and case/variant;
- resolved Vite and Rolldown versions;
- Vue / plugin-vue / vue-router / Pinia versions for Vue cases;
- source file count and source size;
- build duration;
- total output files and JavaScript chunks;
- JavaScript chunks in the initial static import closure;
- dynamic chunk count;
- chunks smaller than 2 KiB / 10 KiB;
- raw and gzip size of the initial closure;
- total raw and gzip output size;
- min / median / max JavaScript chunk size;
- per-file raw and gzip sizes.

## Cases in each suite

- `rolldown-1.1.4` — baseline;
- `rolldown-1.1.5` — first affected release reported in #10675;
- `rolldown-1.2.3` — later comparison release;
- `rolldown-1.2.3-min-size` — `output.codeSplitting` group with `minSize: 2048`;
- `rolldown-1.2.3-no-chunk-optimization` — `experimental.chunkOptimization: false`.

All cases use Vite `8.2.1`. The Vue suite additionally pins Vue `3.5.41`, `@vitejs/plugin-vue` `6.0.8`, Vue Router `5.2.0`, and Pinia `3.0.4`.

## Verified GitHub Actions results

### Minimal vanilla fixture

10 source files, ~1.3 KiB.

| Variant | Initial chunks | Total JS chunks | Dynamic chunks | Small <2 KiB | Initial gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| Rolldown 1.1.4 | 1 | 4 | 3 | 3 | 1.6 KiB |
| Rolldown 1.1.5 | 2 | 5 | 3 | 4 | 1.7 KiB |
| Rolldown 1.2.3 | 2 | 5 | 3 | 4 | 1.7 KiB |
| 1.2.3 + minSize | 2 | 5 | 3 | 4 | 1.7 KiB |
| 1.2.3 + chunkOptimization off | 2 | 5 | 3 | 4 | 1.7 KiB |

### Larger Vue fixture

44 source files, ~20.7 KiB; Vite transforms 80 modules. The number of dynamic route chunks stays at 8 for the default configurations.

| Variant | Initial chunks | Total JS chunks | Dynamic chunks | Small <2 KiB | Initial gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| Rolldown 1.1.4 | 1 | 9 | 8 | 4 | 63.7 KiB |
| Rolldown 1.1.5 | 4 | 12 | 8 | 6 | 64.6 KiB |
| Rolldown 1.2.3 | 4 | 12 | 8 | 6 | 64.7 KiB |
| 1.2.3 + minSize | 2 | 7 | 5 | 1 | 65.2 KiB |
| 1.2.3 + chunkOptimization off | 7 | 15 | 8 | 7 | 66.0 KiB |

On this synthetic Vue fixture, moving from Rolldown 1.1.4 to 1.1.5 changes the initial static closure from 1 to 4 JavaScript chunks while the default dynamic chunk count remains 8. `minSize` materially changes this larger graph, while disabling chunk optimization increases fragmentation.

These measurements describe only the synthetic fixtures in this repository. They demonstrate version-dependent chunk-topology changes but do not by themselves establish that the original private application has the same root cause.

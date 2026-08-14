# Vite / Rolldown chunking reproduction

Minimal reproduction and comparison harness for [rolldown/rolldown#10675](https://github.com/rolldown/rolldown/issues/10675).

Each directory in `apps/` is an isolated Vite project. Every case uses the same source fixture, while Rolldown versions and build options can be varied independently. Yarn `resolutions` are local to each case so Vite 8.2.1 is forced to use the intended Rolldown version even when it falls outside Vite's declared `~1.2.1` range.

## Run

Requirements: Node.js 22+ and Yarn 1.22.22.

```sh
yarn analyze
```

The command installs every case independently, builds all cases, prints a comparison table, and writes `results.json`.

## Verified result

The minimal fixture reproduces the regression:

| Case | Vite | Rolldown | Initial chunks | Total JS chunks | Small <2 KiB | Initial gzip |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| baseline | 8.2.1 | 1.1.4 | **1** | **4** | 3 | 1.6 KiB |
| first affected | 8.2.1 | 1.1.5 | **2** | **5** | 4 | 1.7 KiB |
| current comparison | 8.2.1 | 1.2.3 | **2** | **5** | 4 | 1.7 KiB |
| 1.2.3 + `minSize` group | 8.2.1 | 1.2.3 | **2** | **5** | 4 | 1.7 KiB |
| 1.2.3 + `chunkOptimization: false` | 8.2.1 | 1.2.3 | **2** | **5** | 4 | 1.7 KiB |

With 1.1.4 the initial static closure contains only the entry chunk. Starting with 1.1.5 an additional 107-byte `light` chunk is statically imported by the entry, while the dynamic route count stays unchanged. 1.2.3 emits the same graph as 1.1.5 for this fixture.

The two mitigation cases also reproduce the same graph: neither the tested `codeSplitting` `minSize` group nor disabling `experimental.chunkOptimization` restores the 1.1.4 topology.

## Reported metrics

`yarn analyze` reports and stores:

- resolved Vite and Rolldown versions
- build duration
- total output files and JavaScript chunks
- JavaScript chunks in the initial static import closure
- dynamic chunk count
- chunks smaller than 2 KiB / 10 KiB
- raw and gzip size of the initial closure
- total raw and gzip output size
- min / median / max JavaScript chunk size
- per-file raw and gzip sizes in the generated JSON

## Cases

- `rolldown-1.1.4` — baseline
- `rolldown-1.1.5` — first affected release
- `rolldown-1.2.3` — regression still present
- `rolldown-1.2.3-min-size` — code-splitting `minSize` mitigation check
- `rolldown-1.2.3-no-chunk-optimization` — `experimental.chunkOptimization: false`

All cases use Vite `8.2.1`, the same shared SPA fixture, manifest generation, and unminified output. GitHub Actions runs the full matrix and uploads `results.json` as an artifact.

# Vite / Rolldown chunking reproduction

Reproduction and comparison harness for [rolldown/rolldown#10675](https://github.com/rolldown/rolldown/issues/10675).

Each directory in `apps/` is an isolated Vite project. It uses the same fixture and build configuration, but can pin a different Rolldown version or override build settings independently. Yarn `resolutions` are intentionally local to each case so Vite cannot silently resolve another nested Rolldown version.

## Run

Requirements: Node.js 22+ and Yarn 1.22.22.

```sh
yarn analyze
```

The command installs every case independently, builds all cases, prints a comparison table, and writes `results.json`.

Reported metrics include:

- resolved Vite and Rolldown versions
- build duration
- total output files and JavaScript chunks
- JavaScript chunks in the initial static import closure
- dynamic chunk count
- chunks smaller than 2 KiB / 10 KiB
- raw and gzip size of the initial closure
- total raw and gzip output size
- min / median / max JavaScript chunk size
- per-file raw and gzip sizes

## Cases

- `rolldown-1.1.4` — baseline
- `rolldown-1.1.5` — first affected release reported in #10675
- `rolldown-1.2.3` — later release where the original application still reproduces the regression

All cases currently use Vite `8.2.1`, the same shared SPA fixture, manifest generation, and unminified output. Additional cases can override `vite.config.mjs` without changing the fixture or analyzer.

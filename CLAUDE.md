# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TypeScript library starter template — thin by design. Source lives in `src/index.ts`, tests in `test/index.spec.ts`. The build produces multiple output formats (ESM, CJS, UMD, minified bundles) via Rollup, with types declared at `dist/types/index.d.ts`.

## Commands

```bash
npm test               # run Jest with coverage
npm run build          # compile all dist formats (clears dist/ first)
npm run check          # prettier + eslint without writing
npm run tidy           # format and lint (writes changes)
npm run doc            # generate TypeDoc docs
```

Run a single test file:
```bash
npx vitest run test/index.spec.ts
```

## Build outputs

Rollup builds six targets from `src/index.ts`:

| File | Format |
|------|--------|
| `dist/index.js` | ESM (main entry) |
| `dist/cjs/index.cjs` | CJS |
| `dist/bundles/index.umd.js` | UMD |
| `dist/bundles/index.umd.min.js` | UMD minified |
| `dist/bundles/index.esm.js` | ESM bundle |
| `dist/bundles/index.esm.min.js` | ESM minified (browser default) |

The `exports` field in `package.json` routes `require`/`import` to CJS/ESM accordingly.


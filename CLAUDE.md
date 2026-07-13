# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TypeScript library starter template, still largely unmodified — `src/index.ts` exports a placeholder constant and `test/index.spec.ts` asserts on it. The build produces multiple output formats (ESM, CJS, UMD, minified bundles) via Rollup, with types declared at `dist/types/index.d.ts`.

## Commands

```bash
npm test               # vitest run --coverage
npm run build          # compile all dist formats (clears dist/ first)
npm run check          # prettier + eslint without writing (what CI runs)
npm run tidy           # format and lint (writes changes)
npm run doc            # generate TypeDoc docs
```

Run a single test file:

```bash
npx vitest run test/index.spec.ts
```

## The `@/*` alias does not survive the build

`@/*` → `./src/*` is wired into `tsconfig.json#paths` and `vitest.config.ts`, but `rollup.config.js` has no alias resolution. A `@/…` import inside `src/` will typecheck and pass tests, then fail at build time.

Tests may use `@/…` freely (Vitest resolves it). Source under `src/` must use relative imports only.

## Merging publishes

`.github/workflows/package.yaml` fires on pushes to `main` and `dev`. Beyond running `check` and `test`, it bumps the version (`npm version patch` on `main`, `prerelease` on `dev`), builds, publishes to GitHub Packages, pushes the commit and tags, and cuts a GitHub release. Version bumps land back on the branch as `Bump version v… [skip ci]` commits — don't edit `version` in `package.json` by hand.

## Build outputs

Rollup builds six targets from `src/index.ts`:

| File                            | Format                         |
| ------------------------------- | ------------------------------ |
| `dist/index.js`                 | ESM (main entry)               |
| `dist/cjs/index.cjs`            | CJS                            |
| `dist/bundles/index.umd.js`     | UMD                            |
| `dist/bundles/index.umd.min.js` | UMD minified                   |
| `dist/bundles/index.esm.js`     | ESM bundle                     |
| `dist/bundles/index.esm.min.js` | ESM minified (browser default) |

The `exports` field in `package.json` routes `require`/`import` to CJS/ESM accordingly.

## Template residue

Carried over from the starter and not yet adapted to this project. Worth clearing on the first substantive commit:

- Package name is still `@james-spears/ts-lib-starter`; `repository`/`bugs`/`homepage` point at `jameone/ts-lib-starter`.
- The UMD global in `rollup.config.js` is `corerxplc` (both UMD targets).
- `express` is a runtime `dependency` (with `@types/express` in devDependencies) despite nothing in `src/` importing it.
- `README.md` is the unedited template stub.

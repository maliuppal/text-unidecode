# Changelog

## 1.1.0 — 2026-04-15

- **TypeScript**: Implementation lives in `src/unidecode.ts`; `npm run build` compiles to `lib/unidecode.js`. Published typings via `types` and conditional `exports` (`.d.ts` + `.js`). `npm test` runs the compiler before Mocha.
- **Runtime dependencies**: Removed the incorrect `dependencies` block (the package only uses Node built-ins; lookup tables stay in `data/*.js`).
- **Package metadata**: Expanded `description` and `keywords` for discovery; `repository`, `bugs`, and `homepage` now reference **text-unidecode** (replacing **node-unidecode** URLs).
- **npm publish**: `prepublishOnly` runs `npm run build` so the registry tarball always includes a fresh `lib/` build.
- **Published files**: `files` now includes `src/` alongside `lib/` and `data/` (for declaration source maps).

## 1.0.0 — 2026-04-14

- First release of **text-unidecode**: Unicode-to-ASCII transliteration for Node.js (`lib/unidecode.js`, `data/` tables).

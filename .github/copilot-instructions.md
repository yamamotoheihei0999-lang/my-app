# Copilot / AI agent instructions for this repo ✅

Purpose
- Provide concise, actionable guidance so an AI coding agent can be productive immediately in this repository (no assumptions).

Quick start (setup & common commands)
- Install dependencies: `npm install`
- Start dev server (HMR): `npm run dev` (Vite)
- Build for production: `npm run build` (Vite)
- Preview build: `npm run preview`
- Run linter: `npm run lint`
- CI uses Node 20 (see `.github/workflows/ci-simple.yml`)

Project overview / architecture
- Minimal React + Vite single-page app
- Entry point: `src/main.jsx` → renders `src/App.jsx`
- Static assets under `src/assets` and root `vite.svg`
- No backend, no server-side rendering

Important files to reference
- `package.json` (scripts, dependencies, `overrides` for Vite)
- `vite.config.js` (Vite + `@vitejs/plugin-react`)
- `eslint.config.js` (ESLint flat config; see notable rules below)
- `.github/workflows/ci-simple.yml` (CI: `npm install`, `npm run lint || true`, `npm run build`)
- `src/main.jsx`, `src/App.jsx`, `src/App.css`

Project-specific conventions & gotchas
- Files use ESM (`"type": "module"`) and `.jsx` for React components.
- The repo overrides the `vite` package to `rolldown-vite` in `package.json` (`overrides`) — be cautious when changing Vite behavior.
- ESLint configuration is a flat config in `eslint.config.js`. Notable rule:
  - `"no-unused-vars": ["error", { "varsIgnorePattern": "^[A-Z_]" }]` — variables starting with an uppercase letter or underscore may be intentionally unused (e.g., exported components or constants), so avoid deleting such identifiers without double-checking usage.
- CI intentionally allows lint to fail (`npm run lint || true`). If you add stricter requirements (tests or lint failures), update `.github/workflows/ci-simple.yml` accordingly.

When making edits — concrete examples
- Add a new component: place it under `src/components/`, name the file `YourComponent.jsx`, export the component as default, and import it from `src/App.jsx` or a page file.
- Add CSS: import CSS files locally next to the component or update `src/App.css`.
- If adding dev/build scripts, update `package.json` and the CI workflow to reflect new steps.

Testing & CI notes
- There are currently **no tests** configured. If you add tests, add a `test` script in `package.json` and add a CI step in `ci-simple.yml`.
- CI runs on push and PR to `main`. It sets `CI=true` for the build step.

Best practices for agents (what to do first)
1. Run `npm install` then `npm run dev` to validate local dev server and HMR for any UI changes.
2. Run `npm run lint` and `npm run build` locally to catch lint and build issues before opening a PR.
3. When changing dependencies or build tooling (Vite/plugins), check `package.json` `overrides` and `vite.config.js`.
4. Keep changes minimal and add clear commit messages and PR descriptions explaining the intent (UI change, build change, dependency update).

Questions for maintainers / missing info
- Preferred Node version for development (CI uses 20; if you need to pin it into engines, tell us).
- Are tests planned? If yes, which framework should be used (Jest/Testing Library/Vitest)?

If anything here is unclear or you want additional, project-specific rules (naming conventions, branching policy, PR checklist), tell me and I will iterate. ✨

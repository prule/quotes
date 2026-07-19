## Why

The repository has no `CLAUDE.md`, so an AI coding agent must rediscover the project's shape every session — that it is a no-build static site served from `docs/`, that quote data has multiple parallel sources (`sql/`, `docs/*.json`), and that `notes/` is unpublished source material. A concise `CLAUDE.md` captures these non-obvious conventions so agents make correct changes on the first attempt.

## What Changes

- Add a `CLAUDE.md` file at the repository root documenting:
  - What the project is (static motivational-quotes site at `www.dailymotivationquotes.com`).
  - How it is built and served: no build step; GitHub Pages serves `docs/`; local preview via `cd docs && npx serve`.
  - Repository layout and the role of each top-level directory (`docs/`, `notes/`, `sql/`).
  - Data-flow conventions: how `quotes.js` fetches JSON, and the relationship between `sql/`, the `*.json` data files, and published pages.
  - Content conventions: story pages live in `docs/stories/`, unpublished source drafts in `notes/`, and SEO files (`llms.txt`, `robots.txt`, `sitemap.xml`) must be kept in sync when stories change.
  - Known gotchas (e.g., Safari ITP breaking Instagram video embeds — text posts and YouTube Shorts only).

## Capabilities

### New Capabilities
- `contributor-docs`: Root-level agent/contributor guidance (`CLAUDE.md`) describing the project's purpose, build/serve model, layout, and content conventions.

### Modified Capabilities
<!-- None. -->

## Impact

- **Files**: Adds `CLAUDE.md` at the repo root. No source or site behavior changes.
- **Tooling**: Consumed by Claude Code and other agents; purely additive documentation.
- **Maintenance**: A new doc to keep current as project structure evolves.

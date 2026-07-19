## Context

The project is a static motivational-quotes website. Key facts an agent needs, gathered from the repo:

- **Served from `docs/`** by GitHub Pages at `www.dailymotivationquotes.com` (`docs/CNAME`). No build step; `README.md` documents local preview as `cd docs && npx serve`.
- **`docs/quotes.js`** is vanilla JS that `fetch()`es `quotes.json`, `posts.json`, `posts-video.json`, and `stories.json` at runtime and renders random entries.
- **`sql/V20250723__v2.sql`** holds `INSERT` statements for the quotes — a parallel source of the same data that appears in `docs/quotes.json`.
- **`docs/stories/*.html`** are the published long-form success-story pages; **`notes/stories/*.md`** and **`notes/books/*.md`** are unpublished source drafts.
- **SEO/discovery files**: `docs/llms.txt`, `docs/robots.txt`, `docs/sitemap.xml` enumerate the stories and must track story additions.
- **Known gotcha** (`README.md`): Safari ITP breaks Instagram video embeds, so only text Instagram posts and YouTube Shorts are used for video.

There is no existing `CLAUDE.md`, `AGENTS.md`, or contributor guide.

## Goals / Non-Goals

**Goals:**
- A single, concise root `CLAUDE.md` an agent can read in one pass.
- Capture only non-obvious, durable conventions — not a restatement of what the code plainly shows.
- Keep it short enough to stay maintained (roughly one screen).

**Non-Goals:**
- Duplicating README content verbatim (link/point instead).
- Documenting every quote or story.
- Adding lint/build/CI tooling or changing site behavior.

## Decisions

- **Place `CLAUDE.md` at the repo root**, where Claude Code auto-loads it. A repo-root file (not `docs/CLAUDE.md`) keeps it out of the published site.
- **Structure**: short sections — Overview, Running locally, Repository layout, Data flow, Content conventions, Gotchas. Use headings and bullets for scannability.
- **Source of truth for facts**: derive from the actual repo (`README.md`, `docs/quotes.js`, directory layout) rather than assumptions, so the doc stays accurate.
- **Call out the dual quote source** (`sql/` vs `docs/quotes.json`) explicitly, since silently editing one and not the other is an easy mistake.
- **Do not include the Cloudflare analytics token or other secrets** — reference the analytics beacon only as a convention (every published page carries it), not its value.

## Risks / Trade-offs

- **Staleness**: the doc can drift as the project changes. Mitigated by keeping it short and convention-focused rather than exhaustive.
- **Redundancy with README**: some overlap is acceptable; `CLAUDE.md` is agent-oriented (conventions, gotchas, where things live) while `README.md` stays user-facing. Avoid copying large blocks.

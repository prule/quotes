## 1. Author CLAUDE.md

- [x] 1.1 Create `CLAUDE.md` at the repository root
- [x] 1.2 Write the **Overview** section: static motivational-quotes site at `www.dailymotivationquotes.com`
- [x] 1.3 Write the **Running locally / deploy** section: no build step; GitHub Pages serves `docs/`; local preview `cd docs && npx serve`
- [x] 1.4 Write the **Repository layout** section: roles of `docs/`, `docs/stories/`, `notes/` (unpublished source), `sql/`
- [x] 1.5 Write the **Data flow** section: `quotes.js` fetches `quotes.json`/`posts.json`/`posts-video.json`/`stories.json`; note that `sql/` and `docs/quotes.json` are parallel sources to keep in sync
- [x] 1.6 Write the **Content conventions** section: story pages in `docs/stories/`, drafts in `notes/`, keep `llms.txt`/`robots.txt`/`sitemap.xml` in sync when stories change; every published page carries the Cloudflare analytics beacon
- [x] 1.7 Write the **Gotchas** section: Safari ITP breaks Instagram video embeds (text posts + YouTube Shorts only)

## 2. Verify

- [x] 2.1 Confirm `CLAUDE.md` exists at the repo root and covers overview, run/deploy, layout, data flow, conventions, and gotchas
- [x] 2.2 Confirm no secrets (e.g., analytics token values) are included
- [x] 2.3 Confirm all referenced paths and commands are accurate against the current repo

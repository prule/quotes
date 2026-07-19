# CLAUDE.md

Guidance for AI agents working in this repository.

## Overview

**Daily Motivation Quotes** — a static website of motivational quotes and long-form
"success story" articles, published at <https://www.dailymotivationquotes.com>.
It is plain HTML/CSS/vanilla JS with **no framework, no build step, and no bundler**.

## Running locally / deploying

- **Published root is `docs/`.** GitHub Pages serves `docs/` directly; the custom
  domain is set by `docs/CNAME`. Deploying = merging to `main` and letting Pages redeploy.
- **There is no build step.** Edit files in `docs/` and they ship as-is.
- **Local preview:**
  ```sh
  cd docs && npx serve
  ```

## Repository layout

| Path | Role |
|------|------|
| `docs/` | The published site (everything here is public). |
| `docs/index.html` | Home page — shows a random quote + rotating story links. |
| `docs/quotes.js` | All client logic; fetches the JSON data files at runtime. |
| `docs/*.json` | Runtime data: `quotes.json`, `posts.json`, `posts-video.json`, `stories.json`. |
| `docs/stories/*.html` | Published long-form success-story pages. |
| `docs/{llms.txt,robots.txt,sitemap.xml}` | SEO/discovery files that enumerate the stories. |
| `docs/books/` | Published book-summary pages. |
| `notes/` | **Unpublished** source drafts (`notes/stories/`, `notes/books/`) — not served. |
| `sql/` | SQL `INSERT` statements for the quotes — a parallel source of the quote data. |
| `openspec/` | OpenSpec change proposals and specs (planning artifacts). |

## Data flow

- `docs/quotes.js` fetches `quotes.json`, `posts.json`, and `stories.json` (and uses
  `posts-video.json`) at runtime and renders a random entry. It is vanilla JS — no
  imports, no compilation.
- **The quote data has two parallel sources:** `sql/V*.sql` and `docs/quotes.json`.
  They are not generated from each other automatically, so if you change quotes, **update
  both** to keep them in sync.

## Content conventions

- **New story:** add the page under `docs/stories/`, keep the draft/source in `notes/stories/`,
  and add an entry to `docs/stories.json`.
- **Keep SEO files in sync:** when stories change, update `docs/llms.txt`, `docs/robots.txt`,
  and `docs/sitemap.xml` accordingly.
- **Analytics:** every published HTML page carries the Cloudflare Web Analytics beacon before
  `</body>`. If you add a page, include the same beacon `<script>` tag. Do not commit any new
  tokens/secrets beyond the existing beacon token already in the pages.

## Gotchas

- **Instagram video embeds fail in Safari** due to Intelligent Tracking Prevention (ITP),
  which blocks the cross-site cookies/scripts the embed needs. Use **text-only Instagram posts**
  and **YouTube Shorts** for video instead.

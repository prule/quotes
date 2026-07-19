## Context

The site is a static set of HTML files under `docs/`, served by GitHub Pages at `www.dailymotivationquotes.com` (see `docs/CNAME`). There is no build step, bundler, or templating layer — each HTML page is hand-maintained. There are currently 11 HTML pages: `docs/index.html` and 10 files under `docs/stories/`. No analytics exist today.

Cloudflare Web Analytics offers a free, privacy-first (cookieless) beacon that works via a single `<script>` tag, requiring no DNS proxying or Cloudflare-hosted zone. This fits a GitHub Pages static site.

## Goals / Non-Goals

**Goals:**
- Record page views and visitor/referrer data for all published pages.
- Keep the integration cookieless and dependency-free in the codebase.
- Make it trivial to add the beacon to any future page.

**Non-Goals:**
- Custom event tracking, funnels, or per-quote analytics.
- Moving DNS/hosting onto Cloudflare's proxy (orange-cloud) — not required for the JS beacon.
- Any server-side or build-time instrumentation.

## Decisions

- **Use the JS beacon, not proxied/automatic setup.** GitHub Pages serves the origin; the automatic setup path requires traffic to flow through Cloudflare's proxy. The manual beacon snippet works regardless of DNS provider.
- **Insert the snippet immediately before `</body>`** on each page, so it never blocks initial render. The tag uses `defer`.
- **Single shared token, hardcoded inline** in each HTML file. There is no shared header/partial to include from, and no build step to inject it, so the tag is duplicated per page. This is acceptable at 11 pages; if pages grow, revisit with a shared include.
- **Snippet shape:**
  ```html
  <!-- Cloudflare Web Analytics -->
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "REPLACE_WITH_TOKEN"}'></script>
  <!-- End Cloudflare Web Analytics -->
  ```
- **Token acquisition is a manual, one-time step** performed in the Cloudflare dashboard (Analytics & Logs → Web Analytics → Add a site → enter hostname) before editing the files. The real token replaces `REPLACE_WITH_TOKEN`.

## Risks / Trade-offs

- **Duplicated snippet across 11 files** means a token change requires editing all files. Mitigated by find-and-replace; low churn expected.
- **Beacon loads third-party JS from `static.cloudflareinsights.com`.** It is deferred and lightweight; if it fails to load, the site is unaffected.
- **No data until the token is real.** The change cannot be functionally verified until the Cloudflare site is created and the placeholder token is replaced. Tasks call this out as a required manual step.
- **Ad/tracker blockers** may block the beacon for some visitors, undercounting traffic slightly — inherent to any client-side analytics.

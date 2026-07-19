## Why

The site (`www.dailymotivationquotes.com`) currently has no way to measure traffic — page views, visitors, referrers, or which story pages perform best. Cloudflare Web Analytics is free, privacy-first (cookieless, no personal data collected), and needs no build step, which suits a static GitHub Pages site.

## What Changes

- Add the Cloudflare Web Analytics beacon `<script>` snippet to every HTML page served from `docs/`.
- Cover the main page (`docs/index.html`) and all 10 story pages under `docs/stories/`.
- Use a single shared beacon token so all page views report to one Cloudflare Analytics site.
- Document how to obtain the token and where to view the dashboard.

## Capabilities

### New Capabilities
- `web-analytics`: Client-side page-view tracking on all published HTML pages via the Cloudflare Web Analytics beacon, with no cookies and no personal data collected.

### Modified Capabilities
<!-- None: no existing spec requirements change. -->

## Impact

- **Files**: `docs/index.html` and `docs/stories/*.html` (11 HTML files) gain one `<script>` tag before `</body>`.
- **External services**: A new Cloudflare Web Analytics site must be created to issue the beacon token.
- **Dependencies**: None added to the codebase; the beacon loads from Cloudflare's CDN at runtime.
- **Privacy**: No cookies, no localStorage, no cross-site tracking; consistent with the site's static, low-tracking design.
- **No build/deploy pipeline change**: GitHub Pages continues to serve `docs/` as-is.

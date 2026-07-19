## 1. Create the Cloudflare Web Analytics site (manual, user)

- [x] 1.1 In the Cloudflare dashboard, go to Analytics & Logs → Web Analytics → "Add a site" and enter `www.dailymotivationquotes.com`
- [x] 1.2 Copy the issued beacon token from the generated snippet
- [x] 1.3 Provide the token to replace the `REPLACE_WITH_TOKEN` placeholder used below (token: `bea224f3fa6c4cb9b7686e7472bb9c96`)

## 2. Add the beacon to all pages

- [x] 2.1 Insert the beacon snippet immediately before `</body>` in `docs/index.html`
- [x] 2.2 Insert the same snippet before `</body>` in each of the 10 files under `docs/stories/` (andre-agassi, beethoven, james-braddock, niki-lauda, robert-downey-jr, rocky, spanx, steve-jobs, whatsapp, wilma-rudolph)
- [x] 2.3 Replace `REPLACE_WITH_TOKEN` with the real token from task 1.2 across all 11 files

## 3. Verify

- [x] 3.1 Confirm every HTML page under `docs/` contains exactly one beacon tag with the identical, non-placeholder token (`grep -rc cloudflareinsights docs`)
- [ ] 3.2 Load the deployed site and confirm the beacon request to `static.cloudflareinsights.com/beacon.min.js` fires (browser devtools Network tab) and that no cookies are set by it
- [ ] 3.3 After deploy, confirm page views appear in the Cloudflare Web Analytics dashboard

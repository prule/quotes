## ADDED Requirements

### Requirement: Beacon present on all published pages
The site SHALL include the Cloudflare Web Analytics beacon script on every HTML page published from `docs/`, so that all page views are recorded.

#### Scenario: Main page loads the beacon
- **WHEN** a visitor loads `docs/index.html`
- **THEN** the page contains a `<script defer src="https://static.cloudflareinsights.com/beacon.min.js">` tag carrying the site's beacon token

#### Scenario: Every story page loads the beacon
- **WHEN** a visitor loads any page under `docs/stories/`
- **THEN** that page contains the same beacon script tag with the same token as the main page

### Requirement: Single shared beacon token
All pages SHALL report to one Cloudflare Web Analytics site using an identical beacon token, so traffic aggregates into a single dashboard.

#### Scenario: Consistent token across pages
- **WHEN** the beacon tags across all HTML pages are compared
- **THEN** every tag references the same non-empty token value

### Requirement: No cookies or personal data
The analytics integration SHALL NOT set cookies, write to localStorage, or collect personally identifying information, preserving the site's cookieless design.

#### Scenario: No client-side storage from analytics
- **WHEN** a visitor loads any page and the beacon executes
- **THEN** no cookie or localStorage entry is created by the analytics integration

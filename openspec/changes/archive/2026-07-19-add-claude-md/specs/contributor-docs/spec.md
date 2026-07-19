## ADDED Requirements

### Requirement: Root CLAUDE.md exists
The repository SHALL contain a `CLAUDE.md` file at its root providing agent-oriented guidance for working in this project.

#### Scenario: File present at root
- **WHEN** the repository is inspected
- **THEN** a file named `CLAUDE.md` exists at the repository root

### Requirement: Documents build and serve model
`CLAUDE.md` SHALL state that the project has no build step and is served as static files from `docs/` (GitHub Pages), including the local preview command.

#### Scenario: Build/serve guidance present
- **WHEN** a reader looks for how to run or deploy the site
- **THEN** `CLAUDE.md` states there is no build step, that `docs/` is the published root, and gives the local preview command (`cd docs && npx serve`)

### Requirement: Documents layout and data conventions
`CLAUDE.md` SHALL describe the role of each top-level directory (`docs/`, `notes/`, `sql/`) and the relationship between the quote data sources (`sql/`, the `*.json` files) and the pages that consume them.

#### Scenario: Layout and data flow explained
- **WHEN** a reader needs to change quote data or add a story
- **THEN** `CLAUDE.md` explains where published files live, where unpublished source drafts live, and how `quotes.js` and the JSON data files relate to the SQL source

### Requirement: Records known gotchas
`CLAUDE.md` SHALL record project-specific gotchas that are not obvious from the code, including the Safari ITP limitation on Instagram video embeds and the need to keep SEO files in sync with story changes.

#### Scenario: Gotchas documented
- **WHEN** a reader is about to add media or a new story
- **THEN** `CLAUDE.md` warns that Safari ITP blocks Instagram video embeds (use text posts / YouTube Shorts) and that `llms.txt`, `robots.txt`, and `sitemap.xml` must be updated alongside story changes

# NullVoidLabs

OT security lab notes and write-ups by [Luis Rojas](https://www.linkedin.com/in/lrjsec).

Live site: [nullvoidlabs.io](https://www.nullvoidlabs.io)

## What's here

Notes from building toward OT security engineering: an ICS testbench, plus write-ups of lab boxes, malware analysis, and authorized security assessments. All testing is done on authorized platforms, in my own lab, or with written permission.

## How the site is built

Jekyll with a custom theme that lives entirely in this repo. There's no remote theme or CDN, and fonts are self-hosted, so the page makes no third-party requests and runs under a strict Content-Security-Policy.

The design borrows from industrial control rooms: an ISA-101 style grey HMI palette where colour only marks something that needs attention, and P&ID-style instrument tags (category code over log number) for each write-up.

| Path | What it does |
|---|---|
| `_posts/` | Write-ups. Front matter: `title`, `date`, `categories`, `tags`, optional `media_subpath` and `image` |
| `_data/summaries.yml` | One-paragraph summary per post (front page + SEO), keyed by filename slug |
| `_data/categories.yml` | Category → instrument-tag code (`CTF`, `MAL`, `SEC`) and blurb |
| `_data/now.yml` | The "Current state" panel on the front page |
| `_tabs/` | Archive, Categories, Tags, About |
| `_layouts/`, `_includes/` | Templates |
| `_plugins/nvl.rb` | `media_subpath`, log numbers, summaries, lazy images |
| `_plugins/archives.rb` | Generates `/tags/<tag>/` and `/categories/<name>/` |
| `assets/css/main.css` | All styles |
| `assets/js/site.js` | Progressive enhancement: filters, TOC, copy buttons, theme toggle |

### Adding a write-up

1. Drop the post in `_posts/YYYY-MM-DD-slug.md`.
2. If it uses a new category, add a code for it in `_data/categories.yml`.
3. Optionally add a summary in `_data/summaries.yml` under the slug. Without one, the first prose paragraph is used.

### Run locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

Pull requests to `main` are built and link-checked by GitHub Actions; pushes to `main` deploy.

# Wuzima

Bilingual site for Wuzima, built with Astro and deployed to Vercel. French is
the default locale and holds the unprefixed paths (`/about`); English lives
under `/en` (`/en/about`).

## Content

All of the site's copy and photographs live in Sanity, project `n786oraf`,
dataset `production`. The Studio is served from the site itself at
[`/admin`](http://localhost:4321/admin) — locally as well as in production, so
there is nothing separate to deploy.

Seven documents, one per page plus three shared blocks:

| Document | What it holds |
| :--- | :--- |
| Home / About / Services / Contact page | That page's copy, photographs, and its title and meta description |
| Contact form | Field labels, the service options, and the three result messages |
| Service directory | The columns on the foot of the contact page |
| Site settings | Masthead links, the language pair, and the footer's contact details |

Every string carries its French and its English side by side — one field, two
values — so the two can never drift out of step. A few fields hold a list as
plain text: paragraphs are separated by a blank line, and the entries in the
service directory, the form's options, and an experience's keywords go one per
line.

Layout is not content. Which side of the page a photograph takes, how wide a
column runs, where a spread breaks — all of that stays in the pages. What is
authored about a photograph is the photograph, its alternative text, and (on the
services page) whether it is cropped portrait or square.

The site is built statically, so **published changes appear on the next deploy**,
not immediately.

## Running it

```sh
pnpm install
pnpm dev          # localhost:4321, Studio at /admin
pnpm build
pnpm preview
```

`.env` needs, alongside the Resend keys the contact form uses:

```sh
PUBLIC_SANITY_PROJECT_ID=n786oraf
PUBLIC_SANITY_DATASET=production
```

Both are public — the dataset is readable without a token — and both have to be
set on Vercel too, or a deploy builds a site with no copy in it.

## Filling a fresh dataset

`scripts/seed.ts` writes the starting copy in `scripts/seed-content/` and uploads
the photographs in `public/images/`. It is how the content got into the CMS in
the first place, and how a new dataset (a staging one, say) gets filled from the
same point.

```sh
SANITY_WRITE_TOKEN=sk… pnpm seed
```

It writes every document by a fixed ID, so running it again **replaces whatever
is in the Studio** rather than merging with it. It is a bootstrap, not a sync.
Create the token at
[sanity.io/manage](https://www.sanity.io/manage/project/n786oraf/api) with
Editor rights.

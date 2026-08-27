## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content

Every string and photograph on the site comes from Sanity — see the Content
section of `README.md`. Nothing user-facing is hard-coded in a component; if a
page needs new copy, the field is added to the schema in
`src/sanity/schemaTypes/`, projected in `src/lib/content.ts`, and read from
there.

- `src/lib/content.ts` — one GROQ query for the whole site, narrowed to a
  locale, memoized so a build asks once per language. `paragraphs()`, `lines()`
  and `text()` unpack the fields that hold a list or may be absent.
- `src/lib/image.ts` — the image URL builder and the `Figure` shape the queries
  return. `ParallaxImage` takes one of those, and reads its alt text off it.
- `src/i18n/` — routing only: which locale a URL is for and how to write a path
  in the other one. The copy itself is not here.
- `sanity.config.ts`, `src/sanity/structure.ts` — the Studio, served at `/admin`
  by `@sanity/astro`. Every document is a singleton opened directly from the
  structure; there is nothing to create.

Run `npx sanity schema validate` after changing a schema.

Layout stays in the pages. Grid placement, spread alternation, and column spans
are not authored fields.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

Sanity: https://www.sanity.io/docs — project `n786oraf`, dataset `production`.

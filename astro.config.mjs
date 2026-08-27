// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

/* astro.config runs before Astro loads .env, so the same PUBLIC_ variables the
   pages read have to be pulled in by hand here. */
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
    process.env.NODE_ENV ?? 'development',
    process.cwd(),
    '',
);

// https://astro.build/config
export default defineConfig({
  // The site stays static; only the contact endpoint and the Studio opt into
  // running on demand, via `export const prerender = false`.
  adapter: vercel(),

  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: '2026-08-01',
      // Content is baked in at build time, so read straight from the API and
      // never from a CDN cache that may be a minute behind the last publish.
      useCdn: false,
      // Serves the Studio from this same deploy, at wuzima.ca/admin.
      studioBasePath: '/admin',
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});

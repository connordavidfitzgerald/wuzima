// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The site stays static; only the contact endpoint opts into running on
  // demand, via `export const prerender = false`.
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});

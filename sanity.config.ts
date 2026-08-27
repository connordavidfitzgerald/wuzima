import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { LOCALES } from "./src/sanity/schemaTypes/locales";
import { structure } from "./src/sanity/structure";

/* The Studio is bundled by Astro, which reads `import.meta.env`, but the same
   config is loaded straight by Node when the Sanity CLI extracts the schema —
   where that is undefined and `process.env` is what carries the variables. */
const env = (key: string): string =>
    (typeof process !== "undefined" ? process.env?.[key] : undefined) ??
    import.meta.env?.[key] ??
    "";

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
    name: "wuzima",
    title: "Wuzima",

    projectId: env("PUBLIC_SANITY_PROJECT_ID"),
    dataset: env("PUBLIC_SANITY_DATASET"),

    // Served from the site itself — see `studioBasePath` in astro.config.mjs.
    basePath: "/admin",

    plugins: [
        structureTool({ structure }),
        /* Field-level localization: every piece of copy carries its French and
           its English side by side, so the two can never drift out of step the
           way separate per-language documents can. */
        internationalizedArray({
            languages: [...LOCALES],
            defaultLanguages: ["fr"],
            fieldTypes: ["string", "text"],
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
        /* The site is a fixed set of pages, so there is nothing to create. */
        templates: (prev) => prev.filter(({ schemaType }) => !singletons.has(schemaType)),
    },

    document: {
        newDocumentOptions: (prev) =>
            prev.filter(({ templateId }) => !singletons.has(templateId)),
        // Singletons are the site itself; deleting one would empty a page.
        actions: (prev, { schemaType }) =>
            singletons.has(schemaType)
                ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate")
                : prev,
    },
});

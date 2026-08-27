import { defineField, defineType } from "sanity";

/* A photograph and its alternative text. Alt is localized because it is read
   out to assistive tech in the language of the page it appears on. */
export const figureType = defineType({
    name: "figure",
    title: "Photograph",
    type: "image",
    options: { hotspot: true },
    fields: [
        defineField({
            name: "alt",
            title: "Alternative text",
            type: "internationalizedArrayString",
            description: "What the photograph shows, for anyone who cannot see it.",
        }),
    ],
});

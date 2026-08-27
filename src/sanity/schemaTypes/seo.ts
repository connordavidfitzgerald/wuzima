import { defineField, defineType } from "sanity";

/* The <title> and meta description for a page. */
export const seoType = defineType({
    name: "seo",
    title: "Search & sharing",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Page title",
            type: "internationalizedArrayString",
        }),
        defineField({
            name: "description",
            title: "Meta description",
            type: "internationalizedArrayText",
        }),
    ],
});

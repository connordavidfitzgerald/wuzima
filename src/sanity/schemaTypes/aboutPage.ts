import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
    name: "aboutPage",
    title: "About page",
    type: "document",
    icon: UsersIcon,
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "Search & sharing" },
    ],
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "intro",
            title: "Opening paragraph",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "servicesCta",
            title: "Link to the Services page",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "impactHeading",
            title: "Second heading",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "partners",
            title: "Partners — copy",
            description: "Leave a blank line between paragraphs.",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "transformation",
            title: "Transformation — copy",
            description: "Leave a blank line between paragraphs.",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "cta",
            title: "Link to the Contact page",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "kitchen",
            title: "Photograph — tall, opening spread",
            type: "figure",
            group: "content",
        }),
        defineField({
            name: "plate",
            title: "Photograph — small, opening spread",
            type: "figure",
            group: "content",
        }),
        defineField({
            name: "plating",
            title: "Photograph — closing spread",
            type: "figure",
            group: "content",
        }),
        defineField({ name: "seo", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title: "About page" }) },
});

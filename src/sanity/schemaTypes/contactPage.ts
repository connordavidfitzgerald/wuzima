import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
    name: "contactPage",
    title: "Contact page",
    type: "document",
    icon: EnvelopeIcon,
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
        defineField({ name: "seo", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title: "Contact page" }) },
});

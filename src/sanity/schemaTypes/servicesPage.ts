import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPageType = defineType({
    name: "servicesPage",
    title: "Services page",
    type: "document",
    icon: StarIcon,
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "Search & sharing" },
    ],
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "items",
            title: "Experiences",
            description:
                "One spread each, numbered in this order. The photograph alternates sides down the page, starting on the left.",
            type: "array",
            group: "content",
            of: [
                defineArrayMember({
                    name: "experience",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            type: "internationalizedArrayString",
                        }),
                        defineField({
                            name: "body",
                            type: "internationalizedArrayText",
                        }),
                        defineField({
                            name: "image",
                            title: "Photograph",
                            type: "figure",
                        }),
                        defineField({
                            name: "ratio",
                            title: "Photograph shape",
                            description: "How the photograph is cropped in its window.",
                            type: "string",
                            initialValue: "portrait",
                            options: {
                                list: [
                                    { title: "Portrait", value: "portrait" },
                                    { title: "Square", value: "square" },
                                ],
                                layout: "radio",
                            },
                        }),
                        defineField({
                            name: "keywords",
                            title: "Keywords",
                            description:
                                "One per line. Held for future use — not shown on the page today.",
                            type: "internationalizedArrayText",
                        }),
                    ],
                    preview: {
                        select: { title: "title.0.value", media: "image" },
                        prepare: ({ title, media }) => ({ title: title ?? "Experience", media }),
                    },
                }),
            ],
        }),
        defineField({
            name: "closing",
            title: "Closing line",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "cta",
            title: "Link to the Contact page",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({ name: "seo", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title: "Services page" }) },
});

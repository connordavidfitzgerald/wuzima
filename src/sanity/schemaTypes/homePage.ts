import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

export const homePageType = defineType({
    name: "homePage",
    title: "Home page",
    type: "document",
    icon: HomeIcon,
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "Search & sharing" },
    ],
    fields: [
        defineField({
            name: "headingLead",
            title: "Heading — opening words",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "headingAccent",
            title: "Heading — last word",
            description: "Carries the drawn rule, so it is kept as one unbroken word.",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "eyebrowLeft",
            title: "Standfirst — left margin",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "eyebrowRight",
            title: "Standfirst — right margin",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({
            name: "chef",
            title: "Photograph",
            type: "figure",
            group: "content",
        }),
        defineField({
            name: "body",
            title: "Introduction",
            type: "internationalizedArrayText",
            group: "content",
        }),
        defineField({
            name: "cta",
            title: "Link to the About page",
            type: "internationalizedArrayString",
            group: "content",
        }),
        defineField({ name: "seo", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title: "Home page" }) },
});

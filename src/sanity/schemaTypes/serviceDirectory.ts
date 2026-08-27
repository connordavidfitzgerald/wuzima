import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

/* The list of what Wuzima offers, sitting on the foot of the contact page. */
export const serviceDirectoryType = defineType({
    name: "serviceDirectory",
    title: "Service directory",
    type: "document",
    icon: ThListIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "internationalizedArrayString",
        }),
        defineField({
            name: "columns",
            title: "Columns",
            description: "Laid out left to right in this order.",
            type: "array",
            of: [
                defineArrayMember({
                    name: "column",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            type: "internationalizedArrayString",
                        }),
                        defineField({
                            name: "items",
                            title: "Entries",
                            description: "One per line.",
                            type: "internationalizedArrayText",
                        }),
                    ],
                    preview: {
                        select: { title: "title.0.value" },
                        prepare: ({ title }) => ({ title: title ?? "Column" }),
                    },
                }),
            ],
        }),
        defineField({
            name: "questions",
            title: "Questions heading",
            type: "internationalizedArrayString",
        }),
        defineField({
            name: "emailBefore",
            title: "Before the email address",
            type: "internationalizedArrayString",
        }),
        defineField({
            name: "emailAfter",
            title: "After the email address",
            type: "internationalizedArrayString",
        }),
    ],
    preview: { prepare: () => ({ title: "Service directory" }) },
});

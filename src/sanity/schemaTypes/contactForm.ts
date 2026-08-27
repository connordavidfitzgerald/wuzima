import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

/* Labels and messages for the enquiry form. The four inputs themselves are
   fixed — the endpoint reads them by name — so only their labels live here. */
export const contactFormType = defineType({
    name: "contactForm",
    title: "Contact form",
    type: "document",
    icon: DocumentTextIcon,
    groups: [
        { name: "fields", title: "Fields", default: true },
        { name: "services", title: "Service options" },
        { name: "status", title: "Messages" },
    ],
    fields: [
        defineField({
            name: "labelName",
            title: "Name field",
            type: "internationalizedArrayString",
            group: "fields",
        }),
        defineField({
            name: "labelOrganisation",
            title: "Company/Organization field",
            type: "internationalizedArrayString",
            group: "fields",
        }),
        defineField({
            name: "labelEmail",
            title: "Email field",
            type: "internationalizedArrayString",
            group: "fields",
        }),
        defineField({
            name: "labelTel",
            title: "Phone field",
            type: "internationalizedArrayString",
            group: "fields",
        }),
        defineField({
            name: "submit",
            title: "Submit button",
            type: "internationalizedArrayString",
            group: "fields",
        }),

        defineField({
            name: "serviceLegend",
            title: "Service group label",
            description: "Read out to screen readers in place of the visible `Service:` marker.",
            type: "internationalizedArrayString",
            group: "services",
        }),
        defineField({
            name: "serviceLabel",
            title: "Service marker",
            description: "The visible label beside the options.",
            type: "internationalizedArrayString",
            group: "services",
        }),
        defineField({
            name: "services",
            title: "Options",
            description:
                "One per line — a checkbox each. The chosen ones are listed in the enquiry email.",
            type: "internationalizedArrayText",
            group: "services",
        }),

        defineField({
            name: "statusSending",
            title: "While sending",
            type: "internationalizedArrayString",
            group: "status",
        }),
        defineField({
            name: "statusSuccess",
            title: "On success",
            type: "internationalizedArrayText",
            group: "status",
        }),
        defineField({
            name: "statusError",
            title: "On failure",
            type: "internationalizedArrayText",
            group: "status",
        }),
    ],
    preview: { prepare: () => ({ title: "Contact form" }) },
});

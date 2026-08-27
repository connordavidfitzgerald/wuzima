import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

/* Everything that appears on every page: the masthead links, the language
   pair, and the footer's contact details. */
export const siteSettingsType = defineType({
    name: "siteSettings",
    title: "Site settings",
    type: "document",
    icon: CogIcon,
    groups: [
        { name: "nav", title: "Navigation", default: true },
        { name: "language", title: "Language switcher" },
        { name: "contact", title: "Contact details" },
    ],
    fields: [
        defineField({
            name: "navLabel",
            title: "Navigation landmark label",
            description: "Names the nav for screen readers. Not shown on the page.",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navHome",
            title: "Home link label",
            description: "The label on the centred glyph. Not shown on the page.",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navAbout",
            title: "About link",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navServices",
            title: "Services link",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navContact",
            title: "Contact link",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navBook",
            title: "Booking link",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navBookShort",
            title: "Booking link — short form",
            description:
                "Stands in for the booking link in the phone masthead, where the full wording does not fit beside the glyph. Two or three syllables: “Réservez”.",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navMenu",
            title: "Menu button",
            description: "Opens the phone menu.",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "navClose",
            title: "Close button",
            description: "Closes the phone menu.",
            type: "internationalizedArrayString",
            group: "nav",
        }),
        defineField({
            name: "menuLabel",
            title: "Phone menu landmark label",
            description: "Names the phone menu for screen readers. Not shown on the page.",
            type: "internationalizedArrayString",
            group: "nav",
        }),

        defineField({
            name: "languageLabel",
            title: "Language switcher landmark label",
            type: "internationalizedArrayString",
            group: "language",
        }),
        defineField({
            name: "switchToFr",
            title: "Switch to French — spoken label",
            description:
                "Read out in the language being switched to, so it is written in French whichever side of the site you are on.",
            type: "string",
            group: "language",
        }),
        defineField({
            name: "switchToEn",
            title: "Switch to English — spoken label",
            description: "Written in English on both sides of the site, for the same reason.",
            type: "string",
            group: "language",
        }),

        defineField({
            name: "email",
            title: "Email address",
            description: "Appears in the footer, the service directory, and the form's error message.",
            type: "string",
            group: "contact",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "instagramHandle",
            title: "Instagram handle",
            type: "string",
            group: "contact",
        }),
        defineField({
            name: "instagramUrl",
            title: "Instagram link",
            type: "url",
            group: "contact",
        }),
    ],
    preview: { prepare: () => ({ title: "Site settings" }) },
});

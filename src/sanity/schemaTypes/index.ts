import type { SchemaTypeDefinition } from "sanity";

import { aboutPageType } from "./aboutPage";
import { contactFormType } from "./contactForm";
import { contactPageType } from "./contactPage";
import { figureType } from "./figure";
import { homePageType } from "./homePage";
import { seoType } from "./seo";
import { serviceDirectoryType } from "./serviceDirectory";
import { servicesPageType } from "./servicesPage";
import { siteSettingsType } from "./siteSettings";

/* Every document here is a singleton — the site is four fixed pages, so there
   is nothing to create, only things to edit. Structure (see `structure.ts`)
   opens each one directly and the "new document" menu is turned off. */
export const singletonTypes = [
    "homePage",
    "aboutPage",
    "servicesPage",
    "contactPage",
    "contactForm",
    "serviceDirectory",
    "siteSettings",
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
    homePageType,
    aboutPageType,
    servicesPageType,
    contactPageType,
    contactFormType,
    serviceDirectoryType,
    siteSettingsType,
    figureType,
    seoType,
];

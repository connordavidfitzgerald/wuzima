/* The site's copy, read out of Sanity one locale at a time.
 *
 * Every string in the Studio is an internationalized array — a French value and
 * an English one side by side — so each query narrows those pairs down to the
 * requested locale before the copy ever reaches a component. What comes back is
 * a plain object of strings, the same shape the pages read before the content
 * moved into the CMS. */
import { sanityClient } from "sanity:client";

import { defaultLang, type Lang } from "../i18n/ui";
import type { Figure } from "./image";

/* `coalesce` is the fallback: a page still renders in English if only the
   French side of a field has been filled in.

   The locale is matched on both `language` and `_key` while the dataset is
   being moved from the internationalized-array plugin's v4 shape to its v5
   one — v4 kept the locale in the item's `_key`, v5 gives it a field of its
   own. See migrations/migrateToLanguageField.ts; once that has run everywhere
   the `_key` half comes out. */
const one = (field: string, locale: string) =>
    `${field}[language == ${locale} || _key == ${locale}][0].value`;

const loc = (field: string, as = field) =>
    `"${as}": coalesce(${one(field, "$locale")}, ${one(field, "$fallback")})`;

const FIGURE = `{
    crop,
    hotspot,
    ${loc("alt")},
    "asset": asset->{ _id, url, metadata { dimensions, lqip } }
}`;

const SEO = `seo {
    ${loc("title")},
    ${loc("description")}
}`;

/* One request for the whole site. Each singleton is fetched by its fixed ID —
   the same ID Structure opens in the Studio. */
const CONTENT_QUERY = `{
    "settings": *[_id == "siteSettings"][0]{
        ${loc("navLabel")},
        ${loc("navHome")},
        ${loc("navAbout")},
        ${loc("navServices")},
        ${loc("navContact")},
        ${loc("navBook")},
        ${loc("navBookShort")},
        ${loc("navMenu")},
        ${loc("navClose")},
        ${loc("menuLabel")},
        ${loc("languageLabel")},
        switchToFr,
        switchToEn,
        email,
        instagramHandle,
        instagramUrl
    },
    "home": *[_id == "homePage"][0]{
        ${loc("headingLead")},
        ${loc("headingAccent")},
        ${loc("eyebrowLeft")},
        ${loc("eyebrowRight")},
        ${loc("body")},
        ${loc("cta")},
        chef ${FIGURE},
        ${SEO}
    },
    "about": *[_id == "aboutPage"][0]{
        ${loc("heading")},
        ${loc("intro")},
        ${loc("servicesCta")},
        ${loc("impactHeading")},
        ${loc("partners")},
        ${loc("transformation")},
        ${loc("cta")},
        kitchen ${FIGURE},
        plate ${FIGURE},
        plating ${FIGURE},
        ${SEO}
    },
    "services": *[_id == "servicesPage"][0]{
        ${loc("heading")},
        items[]{
            ${loc("title")},
            ${loc("body")},
            ${loc("keywords")},
            ratio,
            image ${FIGURE}
        },
        ${loc("closing")},
        ${loc("cta")},
        ${SEO}
    },
    "contact": *[_id == "contactPage"][0]{
        ${loc("heading")},
        ${SEO}
    },
    "form": *[_id == "contactForm"][0]{
        ${loc("labelName")},
        ${loc("labelOrganisation")},
        ${loc("labelEmail")},
        ${loc("labelTel")},
        ${loc("submit")},
        ${loc("serviceLegend")},
        ${loc("serviceLabel")},
        ${loc("services")},
        ${loc("statusSending")},
        ${loc("statusSuccess")},
        ${loc("statusError")}
    },
    "directory": *[_id == "serviceDirectory"][0]{
        ${loc("heading")},
        columns[]{
            ${loc("title")},
            ${loc("items")}
        },
        ${loc("questions")},
        ${loc("emailBefore")},
        ${loc("emailAfter")}
    }
}`;

/* ---------------------------------------------------------------- shapes -- */

type Text = string | null;

/* What the helpers below take: a field that may be missing from the query as
   well as empty in the CMS, since every singleton is optional until it is
   created. */
type Maybe = Text | undefined;

interface Seo {
    title: Text;
    description: Text;
}

export interface Content {
    settings: {
        navLabel: Text;
        navHome: Text;
        navAbout: Text;
        navServices: Text;
        navContact: Text;
        navBook: Text;
        navBookShort: Text;
        navMenu: Text;
        navClose: Text;
        menuLabel: Text;
        languageLabel: Text;
        switchToFr: Text;
        switchToEn: Text;
        email: Text;
        instagramHandle: Text;
        instagramUrl: Text;
    } | null;
    home: {
        headingLead: Text;
        headingAccent: Text;
        eyebrowLeft: Text;
        eyebrowRight: Text;
        body: Text;
        cta: Text;
        chef: Figure | null;
        seo: Seo | null;
    } | null;
    about: {
        heading: Text;
        intro: Text;
        servicesCta: Text;
        impactHeading: Text;
        /* Blank-line separated in the Studio; see `paragraphs`. */
        partners: Text;
        transformation: Text;
        cta: Text;
        kitchen: Figure | null;
        plate: Figure | null;
        plating: Figure | null;
        seo: Seo | null;
    } | null;
    services: {
        heading: Text;
        items: {
            title: Text;
            body: Text;
            keywords: Text;
            ratio: "portrait" | "square" | null;
            image: Figure | null;
        }[] | null;
        closing: Text;
        cta: Text;
        seo: Seo | null;
    } | null;
    contact: { heading: Text; seo: Seo | null } | null;
    form: {
        labelName: Text;
        labelOrganisation: Text;
        labelEmail: Text;
        labelTel: Text;
        submit: Text;
        serviceLegend: Text;
        serviceLabel: Text;
        /* One option per line; see `lines`. */
        services: Text;
        statusSending: Text;
        statusSuccess: Text;
        statusError: Text;
    } | null;
    directory: {
        heading: Text;
        columns: { title: Text; items: Text }[] | null;
        questions: Text;
        emailBefore: Text;
        emailAfter: Text;
    } | null;
}

/* --------------------------------------------------------------- fetching -- */

/* Every page and every shared component asks for the copy, so without this the
   same query would go out a dozen times over a build. Keyed on the locale and
   holding the promise rather than the result, so parallel callers share one
   request. */
const cache = new Map<Lang, Promise<Content>>();

/** The site's copy in one locale. */
export function getContent(lang: Lang): Promise<Content> {
    let pending = cache.get(lang);

    if (!pending) {
        pending = sanityClient.fetch<Content>(CONTENT_QUERY, {
            locale: lang,
            fallback: defaultLang,
        });
        cache.set(lang, pending);
    }

    return pending;
}

/* ---------------------------------------------------------------- helpers -- */

/** A text field written as blank-line separated paragraphs. */
export const paragraphs = (value: Maybe): string[] =>
    (value ?? "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

/** A text field written one entry per line. */
export const lines = (value: Maybe): string[] =>
    (value ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

/** A field that has to render as a string, empty rather than "null". */
export const text = (value: Maybe): string => value ?? "";

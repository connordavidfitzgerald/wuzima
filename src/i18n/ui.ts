/* Language plumbing. The site is bilingual and routed by URL: French is the
   default and stays unprefixed (`/about`), English lives under `/en/about`.
   Swapping `defaultLang` flips which of the two owns the bare paths — nothing
   else in the site hard-codes a locale. */

export const languages = {
    fr: { name: "Français", short: "FR", htmlLang: "fr-CA" },
    en: { name: "English", short: "EN", htmlLang: "en-CA" },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "fr";

export const langs = Object.keys(languages) as Lang[];

const isLang = (value: string | undefined): value is Lang =>
    value !== undefined && value in languages;

/** The locale a request is for, taken off the first path segment. */
export function getLangFromUrl(url: URL): Lang {
    const [first] = url.pathname.split("/").filter(Boolean);
    return isLang(first) ? first : defaultLang;
}

/** The path with any locale prefix stripped — "/en/about" → "/about". */
export function toRoutePath(url: URL): string {
    const segments = url.pathname.split("/").filter(Boolean);
    if (isLang(segments[0])) segments.shift();
    return "/" + segments.join("/");
}

/** A route path ("/about") as it is written in a given locale. */
export function localizePath(path: string, lang: Lang): string {
    const clean = path.replace(/\/+$/, "");
    if (lang === defaultLang) return clean || "/";
    return `/${lang}${clean}`;
}

/* Every page is one file serving both locales, so each of them declares the
   same two paths: the bare one for the default language and a prefixed one for
   the other. `undefined` is how a rest param asks for the unprefixed route. */
export function localePaths() {
    return langs.map((lang) => ({
        params: { locale: lang === defaultLang ? undefined : lang },
        props: { lang },
    }));
}

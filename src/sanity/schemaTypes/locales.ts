/* The two locales the site is written in. This mirrors `src/i18n/ui.ts`, which
   owns the routing side of the same pair — FR is the default and holds the
   unprefixed paths. Adding a third language means adding it in both places. */
export const LOCALES = [
    { id: "fr", title: "Français" },
    { id: "en", title: "English" },
] as const;

export const DEFAULT_LOCALE = "fr";

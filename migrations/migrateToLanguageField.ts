/* Moves every internationalized array from the plugin's v4 shape to its v5 one.
 *
 * v4 stored the locale in the array item's `_key` — `{ _key: "fr", value: … }`.
 * v5 gives it a `language` field of its own and lets `_key` go back to being an
 * opaque key. The Studio refuses to edit a v4 field until this has been run.
 *
 * The document list is written out rather than imported from the schema on
 * purpose: a migration is a record of what was true on the day it ran, and
 * should not start covering types that were added after it.
 *
 *   npx sanity migration run migrateToLanguageField              # dry run
 *   npx sanity migration run migrateToLanguageField --no-dry-run
 */
import { migrateToLanguageField } from "sanity-plugin-internationalized-array/migrations";

const DOCUMENT_TYPES = [
    "siteSettings",
    "homePage",
    "aboutPage",
    "servicesPage",
    "contactPage",
    "contactForm",
    "serviceDirectory",
];

export default migrateToLanguageField(DOCUMENT_TYPES);

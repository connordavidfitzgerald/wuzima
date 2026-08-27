/* Fills a Sanity dataset with the site's starting copy and photographs.
 *
 * This is how the content in `scripts/seed-content/` got into the CMS, and it
 * is how a fresh dataset (a staging one, say) gets filled from the same
 * starting point. It is safe to run again: every document is written by a fixed
 * ID, so a second run replaces rather than duplicates — which also means it
 * overwrites anything edited in the Studio since. It is a bootstrap, not a
 * sync.
 *
 *   PUBLIC_SANITY_PROJECT_ID=… PUBLIC_SANITY_DATASET=… SANITY_WRITE_TOKEN=… \
 *     pnpm seed
 */
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import { createReadStream } from "node:fs";
import { basename } from "node:path";

import { en } from "./seed-content/en";
import { fr } from "./seed-content/fr";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
    console.error(
        "Set PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET and SANITY_WRITE_TOKEN before seeding.",
    );
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-08-01",
    useCdn: false,
});

/* ------------------------------------------------------- localized fields -- */

type Pair = { fr: string; en: string };

const value = (type: "String" | "Text") => (pair: Pair) =>
    [
        { _key: "fr", _type: `internationalizedArray${type}Value`, value: pair.fr },
        { _key: "en", _type: `internationalizedArray${type}Value`, value: pair.en },
    ];

const str = value("String");
const txt = value("Text");

/** A pair of paragraph lists, as the blank-line separated text the Studio holds. */
const joinParagraphs = (pair: { fr: readonly string[]; en: readonly string[] }): Pair => ({
    fr: pair.fr.join("\n\n"),
    en: pair.en.join("\n\n"),
});

/** A pair of lists, as the one-per-line text the Studio holds. */
const joinLines = (pair: { fr: readonly string[]; en: readonly string[] }): Pair => ({
    fr: pair.fr.join("\n"),
    en: pair.en.join("\n"),
});

/* -------------------------------------------------------------- uploading -- */

/** Uploads a photograph once and hands back a reference to it. */
async function figure(path: string, alt: Pair) {
    const filename = basename(path);
    const asset = await client.assets.upload("image", createReadStream(path), { filename });

    console.log(`  uploaded ${filename}`);

    return {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: str(alt),
    };
}

/* ------------------------------------------------------------------- seed -- */

const pair = <T>(pick: (d: typeof en) => T) => ({
    fr: pick(fr as unknown as typeof en),
    en: pick(en),
});

async function seed() {
    console.log(`Seeding ${projectId}/${dataset}…`);

    const [chef, kitchen, plate, plating, gastronomy, wellness, collaboration] = await Promise.all([
        figure("public/images/wuzi-chef.png", pair((d) => d.home.chefAlt)),
        figure("public/images/about-kitchen.jpg", pair((d) => d.about.alts.kitchen)),
        figure("public/images/about-plate.jpg", pair((d) => d.about.alts.plate)),
        figure("public/images/about-plating.jpg", pair((d) => d.about.alts.plating)),
        figure("public/images/food2.png", pair((d) => d.services.items[0]!.alt)),
        figure("public/images/wuzima1.png", pair((d) => d.services.items[1]!.alt)),
        figure("public/images/food3.png", pair((d) => d.services.items[2]!.alt)),
    ]);

    const images = [gastronomy, wellness, collaboration];
    /* The shapes the three spreads were drawn at. */
    const ratios = ["square", "portrait", "portrait"];

    const documents: IdentifiedSanityDocumentStub[] = [
        {
            _id: "siteSettings",
            _type: "siteSettings",
            navLabel: str(pair((d) => d.nav.label)),
            navHome: str(pair((d) => d.nav.home)),
            navAbout: str(pair((d) => d.nav.about)),
            navServices: str(pair((d) => d.nav.services)),
            navContact: str(pair((d) => d.nav.contact)),
            navBook: str(pair((d) => d.nav.book)),
            navBookShort: str(pair((d) => d.nav.bookShort)),
            navMenu: str(pair((d) => d.nav.menu)),
            navClose: str(pair((d) => d.nav.close)),
            menuLabel: str(pair((d) => d.nav.menuLabel)),
            languageLabel: str(pair((d) => d.language.label)),
            switchToFr: en.language.switchTo.fr,
            switchToEn: en.language.switchTo.en,
            email: "info@wuzima.ca",
            instagramHandle: "@wuzima_inc",
            instagramUrl: "https://instagram.com/wuzima_inc",
        },
        {
            _id: "homePage",
            _type: "homePage",
            headingLead: str(pair((d) => d.home.headingLead)),
            headingAccent: str(pair((d) => d.home.headingAccent)),
            eyebrowLeft: str(pair((d) => d.home.eyebrowLeft)),
            eyebrowRight: str(pair((d) => d.home.eyebrowRight)),
            body: txt(pair((d) => d.home.body)),
            cta: str(pair((d) => d.home.cta)),
            chef,
            seo: {
                _type: "seo",
                title: str(pair((d) => d.meta.home.title)),
                description: txt(pair((d) => d.meta.home.description)),
            },
        },
        {
            _id: "aboutPage",
            _type: "aboutPage",
            heading: txt(pair((d) => d.about.heading)),
            intro: txt(pair((d) => d.about.intro)),
            servicesCta: str(pair((d) => d.about.servicesCta)),
            impactHeading: txt(pair((d) => d.about.impactHeading)),
            partners: txt(joinParagraphs(pair((d) => d.about.partners))),
            transformation: txt(joinParagraphs(pair((d) => d.about.transformation))),
            cta: str(pair((d) => d.about.cta)),
            kitchen,
            plate,
            plating,
            seo: {
                _type: "seo",
                title: str(pair((d) => d.meta.about.title)),
                description: txt(pair((d) => d.meta.about.description)),
            },
        },
        {
            _id: "servicesPage",
            _type: "servicesPage",
            heading: str(pair((d) => d.services.heading)),
            items: en.services.items.map((item, index) => ({
                _key: `experience-${index + 1}`,
                _type: "experience",
                title: str(pair((d) => d.services.items[index]!.title)),
                body: txt(pair((d) => d.services.items[index]!.body)),
                keywords: txt(joinLines(pair((d) => d.services.items[index]!.keywords))),
                ratio: ratios[index],
                image: images[index],
            })),
            closing: txt(pair((d) => d.services.closing)),
            cta: str(pair((d) => d.services.cta)),
            seo: {
                _type: "seo",
                title: str(pair((d) => d.meta.services.title)),
                description: txt(pair((d) => d.meta.services.description)),
            },
        },
        {
            _id: "contactPage",
            _type: "contactPage",
            heading: txt(pair((d) => d.contact.heading)),
            seo: {
                _type: "seo",
                title: str(pair((d) => d.meta.contact.title)),
                description: txt(pair((d) => d.meta.contact.description)),
            },
        },
        {
            _id: "contactForm",
            _type: "contactForm",
            labelName: str(pair((d) => d.form.fields.nom)),
            labelOrganisation: str(pair((d) => d.form.fields.organisation)),
            labelEmail: str(pair((d) => d.form.fields.email)),
            labelTel: str(pair((d) => d.form.fields.tel)),
            submit: str(pair((d) => d.form.submit)),
            serviceLegend: str(pair((d) => d.form.serviceLegend)),
            serviceLabel: str(pair((d) => d.form.serviceLabel)),
            services: txt(joinLines(pair((d) => d.form.services))),
            statusSending: str(pair((d) => d.form.status.sending)),
            statusSuccess: txt(pair((d) => d.form.status.success)),
            statusError: txt(pair((d) => d.form.status.error)),
        },
        {
            _id: "serviceDirectory",
            _type: "serviceDirectory",
            heading: str(pair((d) => d.directory.heading)),
            columns: en.directory.columns.map((column, index) => ({
                _key: `column-${index + 1}`,
                _type: "column",
                title: str(pair((d) => d.directory.columns[index]!.title)),
                items: txt(joinLines(pair((d) => d.directory.columns[index]!.items))),
            })),
            questions: str(pair((d) => d.directory.questions)),
            emailBefore: str(pair((d) => d.directory.emailBefore)),
            emailAfter: str(pair((d) => d.directory.emailAfter)),
        },
    ];

    const transaction = documents.reduce(
        (tx, document) => tx.createOrReplace(document),
        client.transaction(),
    );

    await transaction.commit();

    console.log(`  wrote ${documents.length} documents`);
    console.log("Done.");
}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});

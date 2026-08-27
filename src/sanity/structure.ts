import type { StructureResolver } from "sanity/structure";

import { schemaTypes, singletonTypes } from "./schemaTypes";

const byName = new Map(schemaTypes.map((type) => [type.name, type]));

/* Opens a singleton straight into its editor, rather than through a list of
   one. The document ID is fixed to the type name, which is what lets the
   frontend fetch each one by ID instead of searching for it. */
const singleton = (S: Parameters<StructureResolver>[0], name: string) => {
    const type = byName.get(name);
    const title = (type?.title as string | undefined) ?? name;

    return S.listItem()
        .id(name)
        .title(title)
        .icon(type?.icon as never)
        .child(S.document().schemaType(name).documentId(name).title(title));
};

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Wuzima")
        .items([
            singleton(S, "homePage"),
            singleton(S, "aboutPage"),
            singleton(S, "servicesPage"),
            singleton(S, "contactPage"),
            S.divider(),
            singleton(S, "contactForm"),
            singleton(S, "serviceDirectory"),
            singleton(S, "siteSettings"),
        ]);

export { singletonTypes };

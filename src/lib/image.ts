import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

/* A photograph as it comes back from the queries in `content.ts`: the asset is
   resolved so its real dimensions and its blurred placeholder travel with it,
   and the alt text has already been narrowed to one locale. */
export interface Figure {
    alt: string | null;
    hotspot?: unknown;
    crop?: unknown;
    asset: {
        _id: string;
        url: string;
        metadata: {
            dimensions: { width: number; height: number; aspectRatio: number };
            lqip: string | null;
        } | null;
    } | null;
}

/** URL builder for a Sanity image — `urlFor(figure).width(800).url()`. */
export function urlFor(source: Figure) {
    return builder.image(source as never).auto("format");
}

/**
 * A `srcset` across the given widths. The crop is left to the hotspot rather
 * than forced to a ratio: the windows on the page already crop with
 * `object-cover`, so asking Sanity for a second crop would only throw away
 * pixels the layout wanted.
 */
export function srcSet(source: Figure, widths: number[]): string {
    return widths
        .map((width) => `${urlFor(source).width(width).url()} ${width}w`)
        .join(", ");
}

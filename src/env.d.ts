import type Lenis from "lenis";

declare global {
    interface Window {
        /* The smooth-scroll instance, put on the window by Layout.astro so a
           component that has to hold the page still — the phone menu — can stop
           it. Absent where reduced motion is asked for, since none is created.
           Underscored because Lenis declares a `window.lenis` of its own. */
        __lenis?: Lenis;
    }
}

export {};

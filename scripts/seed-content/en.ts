/* The site's copy as it stood when it moved into Sanity, kept as the input to
   `scripts/seed.ts`. Nothing on the site reads this file — the pages fetch
   their copy from the CMS. It is here so a fresh dataset can be filled from a
   known-good starting point; editing it changes nothing until you re-seed. */
export const en = {
    meta: {
        home: {
            title: "Wuzima — The art of nourishing people",
            description:
                "Exceptional culinary experiences, designed to bring people together, to celebrate, and to care.",
        },
        about: {
            title: "About — Wuzima",
            description:
                "Wuzima designs culinary experiences where exceptional cuisine, hospitality, creativity, and a focus on people converge.",
        },
        services: {
            title: "Services — Wuzima",
            description:
                "Three culinary experiences: gastronomy, corporate wellness, private events and collaborations.",
        },
        contact: {
            title: "Contact — Wuzima",
            description:
                "Let’s create an experience for your team. Corporate experiences, private events and collaborations.",
        },
    },

    nav: {
        label: "Main",
        home: "Wuzima — home",
        about: "About",
        services: "Services",
        contact: "Contact",
        book: "Book an event",
        /* The masthead on a phone puts the booking link beside the glyph,
           where the full wording does not fit. */
        bookShort: "Book",
        menu: "Menu",
        close: "Close",
        menuLabel: "Menu",
    },

    language: {
        label: "Language",
        /* Read out to assistive tech in the language being switched to, which
           is why these are not translated per locale. */
        switchTo: { fr: "Voir ce site en français", en: "View this site in English" },
    },

    home: {
        headingLead: "The art of nourishing",
        headingAccent: "people",
        eyebrowLeft: "A culinary company",
        eyebrowRight: "with social impact",
        body: "Exceptional culinary experiences, designed to bring people together, to celebrate, and to care. Wuzima creates experiences where gastronomy, culture, and human connection meet around the table.",
        cta: "[ Learn more ]",
        chefAlt: "A chef plating two dishes at the pass.",
    },

    about: {
        heading:
            "Wuzima designs culinary experiences where exceptional cuisine, hospitality, creativity, and a focus on people converge.",
        intro: "For a team, a private event, or a special collaboration, each experience is designed with the same intention: to create an exceptional moment around the table. Each service is designed as a moment of sharing, pleasure, and emotion, with a particular focus on the environment and the quality of the ingredients.",
        servicesCta: "[ See our services ]",
        impactHeading:
            "We use the culinary arts as a vessel for training, mentoring, and professional development for young people and those reintegrating into society.",
        partners: [
            "Through our ecosystem of partners, we create concrete opportunities for learning and knowledge sharing within professional environments. Thus, our experiences serve a dual purpose:",
            "To create exceptional moments for those around the table, and to create opportunities for those who contribute to making them possible.",
        ],
        transformation: [
            "We believe that being part of a professional kitchen and service environment can be transformative.",
            "Through hands-on experience, mentorship, and meaningful connections, we help young people and those reintegrating into society build confidence, develop practical skills, and discover new possibilities for their future. In this way, every event becomes an opportunity to share knowledge, create connections, and open doors.",
        ],
        cta: "[ Book an event today ]",
        alts: {
            kitchen: "A chef consulting a recipe book in a production kitchen.",
            plate: "Courgette flowers and grilled courgettes, dressed with herb oil.",
            plating: "A chef plating a dish at the pass.",
        },
    },

    services: {
        heading: "Our Experiences",
        items: [
            {
                title: "Gastronomic Experiences",
                body: "Elevated, thoughtfully designed culinary experiences that bring together gastronomy, hospitality, culture, and creativity.",
                keywords: ["Gastronomy", "Culture", "Hospitality", "Experience"],
                alt: "An overhead view of a laid table: a hand sets down a plate of thinly sliced radish, daikon and cucumber dressed with herb oil, beside glasses of red wine.",
            },
            {
                title: "Corporate Wellness Experiences",
                body: "Purposeful experiences that combine culinary arts and human development to foster connection, reflection, prevention, and well-being within teams.",
                keywords: ["Cuisine", "Well-being", "Prevention", "Connection"],
                alt: "A chef plating a row of identical bowls lined up on a board.",
            },
            {
                title: "Private Events & Collaborations",
                body: "Tailor-made experiences thoughtfully designed around your guests, your vision, and the moment you want to create.",
                keywords: ["Cuisine", "Creativity", "Memory", "Connection"],
                alt: "Two hands set a dark bowl holding a small plated dish down on a stone counter, next to a stoneware jug.",
            },
        ],
        closing: "Every experience is shaped around the people at the table.",
        cta: "[ Book an event ]",
    },

    contact: {
        heading: "Let’s create something meaningful together.",
    },

    form: {
        fields: {
            nom: "Name*",
            organisation: "Company/Organization",
            email: "Email*",
            tel: "Phone*",
        },
        serviceLegend: "Service",
        serviceLabel: "Service:",
        services: [
            "Culinary Experiences",
            "Culinary Services",
            "Programs & Social Impact",
            "Other / Not sure",
        ],
        submit: "Submit",
        status: {
            sending: "Sending…",
            success: "Thank you — our team will get back to you within 24 hours.",
            error: "Something went wrong. Please try again, or write to us at info@wuzima.ca.",
        },
    },

    directory: {
        heading: "Services",
        columns: [
            {
                title: "Culinary Experiences",
                items: [
                    "Private & Corporate Events",
                    "Community Collaboration",
                    "Cultural Experiences",
                    "Culinary Workshops",
                ],
            },
            {
                title: "Culinary Services",
                items: [
                    "Private & Corporate Catering",
                    "Team Meeting Packages",
                    "Craft Services",
                ],
            },
            {
                title: "Programs & Social Impact",
                items: [
                    "Youth and Family Programming",
                    "Mentorship / Pre-professional training",
                    "Culinary Education",
                    "Community Partnerships",
                ],
            },
        ],
        questions: "Questions?",
        emailBefore: "Send us a message at",
        emailAfter: "and we’ll get back to you as soon as we can.",
    },
} as const;

/* The shape every locale has to fill. Widened off the canonical dictionary so
   translations can supply their own strings rather than having to repeat the
   English literals. */
export type Dictionary = {
    readonly [K in keyof typeof en]: Widen<(typeof en)[K]>;
};

type Widen<T> = T extends string
    ? string
    : T extends readonly (infer Item)[]
      ? readonly Widen<Item>[]
      : { readonly [K in keyof T]: Widen<T[K]> };

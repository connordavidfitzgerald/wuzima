import type { Dictionary } from "./en";

export const fr = {
    meta: {
        home: {
            title: "Wuzima — L’art de nourrir l’humain",
            description:
                "Des expériences culinaires d’exception, pensées pour rassembler, célébrer et prendre soin.",
        },
        about: {
            title: "À propos — Wuzima",
            description:
                "Wuzima conçoit des expériences culinaires où gastronomie d’exception, hospitalité, créativité et attention à l’humain se rencontrent.",
        },
        services: {
            title: "Services — Wuzima",
            description:
                "Trois expériences culinaires : gastronomie, bien-être en entreprise, événements privés et collaborations.",
        },
        contact: {
            title: "Contact — Wuzima",
            description:
                "Créons une expérience pour votre équipe. Expériences corporatives, événements privés et collaborations.",
        },
    },

    nav: {
        label: "Principal",
        home: "Wuzima — accueil",
        about: "À propos",
        services: "Services",
        contact: "Contact",
        book: "Réserver un événement",
        bookShort: "Réservez",
        menu: "Menu",
        close: "Fermer",
        menuLabel: "Menu",
    },

    language: {
        label: "Langue",
        switchTo: { fr: "Voir ce site en français", en: "View this site in English" },
    },

    home: {
        headingLead: "L’art de nourrir",
        headingAccent: "l’humain",
        eyebrowLeft: "Entreprise culinaire",
        eyebrowRight: "à l’impact social",
        body: "Des expériences culinaires d’exception, pensées pour rassembler, célébrer et prendre soin. Wuzima crée des expériences où gastronomie, culture et connexion humaine se rencontrent autour de la table.",
        cta: "[ En savoir plus ]",
        chefAlt: "Un chef dresse deux assiettes au passe.",
    },

    about: {
        heading:
            "Wuzima conçoit des expériences culinaires où gastronomie d’exception, hospitalité, créativité et attention à l’humain se rencontrent.",
        intro: "Pour une équipe, un événement privé ou une collaboration spéciale, chaque expérience est pensée avec la même intention : créer un moment d’exception autour de la table. Chaque service est conçu comme un moment de partage, de plaisir et d’émotion, avec une attention particulière portée à l’environnement et à la qualité des ingrédients.",
        servicesCta: "[ Voir nos services ]",
        impactHeading:
            "Nous faisons des arts culinaires un véhicule de formation, de mentorat et de développement professionnel pour les jeunes et les personnes en réinsertion.",
        partners: [
            "À travers notre écosystème de partenaires, nous créons des occasions concrètes d’apprentissage et de transmission en milieu professionnel. Nos expériences ont ainsi une double vocation :",
            "Créer des moments d’exception pour celles et ceux qui prennent place à la table, et créer des occasions pour celles et ceux qui les rendent possibles.",
        ],
        transformation: [
            "Nous croyons qu’évoluer dans une cuisine et un service professionnels peut être transformateur.",
            "Par l’expérience pratique, le mentorat et des rencontres qui comptent, nous aidons les jeunes et les personnes en réinsertion à gagner en confiance, à développer des compétences concrètes et à découvrir de nouvelles possibilités pour leur avenir. Ainsi, chaque événement devient une occasion de transmettre, de créer des liens et d’ouvrir des portes.",
        ],
        cta: "[ Réservez votre événement ]",
        alts: {
            kitchen: "Un chef consulte un livre de recettes dans une cuisine de production.",
            plate: "Fleurs de courgette et courgettes grillées, nappées d’huile d’herbes.",
            plating: "Un chef dresse une assiette au passe.",
        },
    },

    services: {
        heading: "Nos expériences",
        items: [
            {
                title: "Expériences gastronomiques",
                body: "Des expériences culinaires raffinées, pensées dans le détail, où gastronomie, hospitalité, culture et créativité se rejoignent.",
                keywords: ["Gastronomie", "Culture", "Hospitalité", "Expérience"],
                alt: "Vue de haut d’une table dressée : une main dépose une assiette de radis, daikon et concombre en fines tranches, nappés d’huile d’herbes, à côté de verres de vin rouge.",
            },
            {
                title: "Expériences bien-être en entreprise",
                body: "Des expériences porteuses de sens qui allient arts culinaires et développement humain pour favoriser la connexion, la réflexion, la prévention et le bien-être au sein des équipes.",
                keywords: ["Cuisine", "Bien-être", "Prévention", "Connexion"],
                alt: "Un chef dresse une série de bols identiques alignés sur une planche.",
            },
            {
                title: "Événements privés et collaborations",
                body: "Des expériences sur mesure, conçues autour de vos invités, de votre vision et du moment que vous souhaitez créer.",
                keywords: ["Cuisine", "Créativité", "Souvenir", "Connexion"],
                alt: "Deux mains déposent une assiette creuse sombre, garnie d’une petite pièce dressée, sur un comptoir de pierre, à côté d’un pichet en grès.",
            },
        ],
        closing: "Chaque expérience prend forme autour des personnes réunies à la table.",
        cta: "[ Réserver un événement ]",
    },

    contact: {
        heading: "Créons ensemble quelque chose qui a du sens.",
    },

    form: {
        fields: {
            nom: "Nom*",
            organisation: "Entreprise/Organisation",
            email: "Courriel*",
            tel: "Téléphone*",
        },
        serviceLegend: "Service",
        serviceLabel: "Service :",
        services: [
            "Expériences culinaires",
            "Services culinaires",
            "Programmes et impact social",
            "Autre / Je ne sais pas",
        ],
        submit: "Envoyer",
        status: {
            sending: "Envoi en cours…",
            success: "Merci — notre équipe vous répondra dans les 24 heures.",
            error: "Une erreur est survenue. Merci de réessayer ou de nous écrire à info@wuzima.ca.",
        },
    },

    directory: {
        heading: "Services",
        columns: [
            {
                title: "Expériences culinaires",
                items: [
                    "Événements privés et corporatifs",
                    "Collaborations communautaires",
                    "Expériences culturelles",
                    "Ateliers culinaires",
                ],
            },
            {
                title: "Services culinaires",
                items: [
                    "Traiteur privé et corporatif",
                    "Forfaits pour réunions d’équipe",
                    "Services de plateau",
                ],
            },
            {
                title: "Programmes et impact social",
                items: [
                    "Programmation jeunesse et famille",
                    "Mentorat / formation préprofessionnelle",
                    "Éducation culinaire",
                    "Partenariats communautaires",
                ],
            },
        ],
        questions: "Des questions ?",
        emailBefore: "Écrivez-nous à",
        emailAfter: "et nous vous répondrons dès que possible.",
    },
} as const satisfies Dictionary;

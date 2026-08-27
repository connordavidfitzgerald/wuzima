import type { APIRoute } from "astro";
import { Resend } from "resend";

// Runs on demand; the rest of the site stays prerendered.
export const prerender = false;

/* The site is bilingual, so the form posts the locale it was rendered in and
   the confirmation goes back out in that language. The enquiry to the team is
   labelled the same way, so whoever reads it can tell at a glance which side of
   the site it came from. */
const COPY = {
    fr: {
        fields: { nom: "Nom", organisation: "Organisation", email: "Courriel", tel: "Téléphone" },
        services: "Services",
        subject: (name: string) => `Nouvelle demande — ${name}`,
        heading: "Nouvelle demande",
        confirmationSubject: "Merci pour votre demande — Wuzima",
        confirmation: (name: string) => `<p>Bonjour ${name},</p>
<p>Merci pour votre demande. Notre équipe vous répondra dans les 24 heures.</p>
<p>À bientôt,<br />L’équipe Wuzima</p>`,
    },
    en: {
        fields: { nom: "Name", organisation: "Organization", email: "Email", tel: "Phone" },
        services: "Services",
        subject: (name: string) => `New enquiry — ${name}`,
        heading: "New enquiry",
        confirmationSubject: "Thank you for your enquiry — Wuzima",
        confirmation: (name: string) => `<p>Hello ${name},</p>
<p>Thank you for your enquiry. Our team will get back to you within 24 hours.</p>
<p>Speak soon,<br />The Wuzima team</p>`,
    },
} as const;

type Lang = keyof typeof COPY;

const isLang = (value: string): value is Lang => value in COPY;

const REQUIRED_FIELDS = ["nom", "email", "tel"] as const;

/** Submitted text lands in an HTML email, so it has to be escaped. */
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

export const POST: APIRoute = async ({ request }) => {
    const apiKey = import.meta.env.RESEND_API_KEY;
    const to = import.meta.env.CONTACT_TO_EMAIL;
    const from = import.meta.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
        console.error("Contact endpoint is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");
        return json({ error: "server_misconfigured" }, 500);
    }

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        return json({ error: "bad_request" }, 400);
    }

    // Honeypot. Accept it so the bot sees a success and does not retry.
    if (form.get("botcheck")) return json({ ok: true }, 200);

    const value = (name: string) => String(form.get(name) ?? "").trim();

    const missing = REQUIRED_FIELDS.filter((name) => !value(name));
    if (missing.length > 0) return json({ error: "missing_fields", fields: missing }, 400);

    const email = value("email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "invalid_email" }, 400);
    }

    const services = form.getAll("service").map(String).filter(Boolean);
    const name = value("nom");

    const requested = value("lang");
    const copy = COPY[isLang(requested) ? requested : "fr"];

    const rows: [string, string][] = Object.entries(copy.fields)
        .map(([key, label]): [string, string] => [label, value(key)])
        .filter(([, entry]) => entry !== "")
        .concat(services.length > 0 ? [[copy.services, services.join(", ")]] : []);

    const resend = new Resend(apiKey);

    try {
        // The enquiry itself. Replies go straight back to the sender.
        const notification = await resend.emails.send({
            from,
            to,
            replyTo: email,
            subject: copy.subject(name),
            html: `<h2>${copy.heading}</h2><table cellpadding="6">${rows
                .map(
                    ([label, entry]) =>
                        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(entry)}</td></tr>`,
                )
                .join("")}</table>`,
        });

        if (notification.error) throw new Error(notification.error.message);

        // Confirmation to whoever submitted. Deliberately sent after the
        // enquiry and not awaited into the failure path: if this one bounces,
        // the enquiry still reached the team, so the visitor should not be
        // told their message failed.
        const confirmation = await resend.emails.send({
            from,
            to: email,
            replyTo: to,
            subject: copy.confirmationSubject,
            html: copy.confirmation(escapeHtml(name)),
        });

        if (confirmation.error) {
            console.error("Confirmation email failed:", confirmation.error.message);
        }

        return json({ ok: true }, 200);
    } catch (error) {
        console.error("Contact email failed:", error);
        return json({ error: "send_failed" }, 502);
    }
};

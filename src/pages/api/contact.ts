import type { APIRoute } from "astro";
import { Resend } from "resend";

// Runs on demand; the rest of the site stays prerendered.
export const prerender = false;

const FIELD_LABELS: Record<string, string> = {
    nom: "Nom",
    organisation: "Organisation",
    email: "Email",
    tel: "Téléphone",
};

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

    const rows = Object.entries(FIELD_LABELS)
        .map(([key, label]) => [label, value(key)] as const)
        .filter(([, entry]) => entry !== "")
        .concat(services.length > 0 ? [["Services", services.join(", ")] as const] : []);

    const resend = new Resend(apiKey);

    try {
        // The enquiry itself. Replies go straight back to the sender.
        const notification = await resend.emails.send({
            from,
            to,
            replyTo: email,
            subject: `Nouvelle demande — ${name}`,
            html: `<h2>Nouvelle demande</h2><table cellpadding="6">${rows
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
            subject: "Merci pour votre demande — Wuzima",
            html: `<p>Bonjour ${escapeHtml(name)},</p>
<p>Merci pour votre demande. Notre équipe vous répondra dans les 24 heures.</p>
<p>À bientôt,<br />L’équipe Wuzima</p>`,
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

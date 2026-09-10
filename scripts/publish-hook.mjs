/* Points Sanity at the Vercel deploy hook, so publishing in the Studio rebuilds
 * the site.
 *
 * The site is static: the copy is read out of Sanity once, at build time. This
 * is the wire that makes a publish start that build.
 *
 *   node scripts/publish-hook.mjs https://api.vercel.com/v1/integrations/deploy/…
 *
 * Run it once. It is idempotent — a second run updates the webhook it made the
 * first time rather than adding another. Authentication comes from the Sanity
 * CLI session (`npx sanity login`), so there is no token to keep anywhere.
 *
 * The deploy hook URL is made in the Vercel dashboard, under
 * Settings → Git → Deploy Hooks. It is a secret: anyone holding it can start a
 * build, which is why it lives in Sanity's webhook settings and not in the
 * repository. */
import { execFileSync } from "node:child_process";

const NAME = "Rebuild the site";

const PROJECT_ID = "n786oraf";
const DATASET = "production";

/* Sanity's own bookkeeping documents — an image asset among them — are not
   copy, and an upload is always followed by the publish that uses it. That
   publish is what should start the build. */
const FILTER = `!(_type match "sanity.*")`;

const url = process.argv[2];

if (!url?.startsWith("https://api.vercel.com/")) {
    console.error(
        "Usage: node scripts/publish-hook.mjs <vercel-deploy-hook-url>\n\n" +
            "Make the URL in the Vercel dashboard: Settings → Git → Deploy Hooks.",
    );
    process.exit(1);
}

/* `sanity api` signs the request with the logged-in CLI session. */
const api = (path, method, body) =>
    JSON.parse(
        execFileSync(
            "npx",
            [
                "--no-install",
                "sanity",
                "api",
                path,
                "-X",
                method,
                "--api-version",
                "v2025-02-19",
                ...(body ? ["--input", "-", "-H", "Content-Type: application/json"] : []),
            ],
            {
                encoding: "utf8",
                input: body && JSON.stringify(body),
                stdio: ["pipe", "pipe", "inherit"],
            },
        ),
    );

const hook = {
    /* A document webhook: one delivery per published document, and a GROQ
       filter to say which ones count. */
    type: "document",
    name: NAME,
    description: "A publish rebuilds wuzima.ca. See scripts/publish-hook.mjs.",
    url,
    dataset: DATASET,
    rule: {
        on: ["create", "update", "delete"],
        filter: FILTER,
        /* Vercel's deploy hook reads nothing from the body. */
        projection: "{}",
    },
    apiVersion: "v2021-03-25",
    httpMethod: "POST",
    /* Drafts and unpublished versions never reach the site, so they must not
       start a build. This is the half of it that a filter cannot express. */
    includeDrafts: false,
    includeAllVersions: false,
    isDisabledByUser: false,
};

const hooks = `hooks/projects/${PROJECT_ID}`;
const existing = api(hooks, "GET").find((h) => h.name === NAME);

/* A webhook's type is fixed once it is made, so an update sends everything but
   that. */
const { type: _type, ...changes } = hook;

const saved = existing
    ? api(`${hooks}/${existing.id}`, "PATCH", changes)
    : api(hooks, "POST", hook);

console.log(`${existing ? "Updated" : "Created"} webhook "${saved.name}" (${saved.id}).`);
console.log("Publish anything in the Studio and Vercel starts a build.");

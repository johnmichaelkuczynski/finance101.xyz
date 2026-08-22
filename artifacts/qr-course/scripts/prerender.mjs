#!/usr/bin/env node
/**
 * Post-build prerender script.
 *
 * Generates a static HTML file for every lecture and week URL so that
 * search-engine crawlers can read the content without running JavaScript.
 *
 * Strategy:
 *  1. Read the built index.html from dist/public as the shell template.
 *  2. Query the running API (or fall back to sequential IDs) to get lecture
 *     IDs from the live database.
 *  3. For each lecture: write dist/public/lectures/{id}/index.html with a
 *     unique <title>, <meta description>, <link canonical>, and an inline
 *     <article> containing the lecture content embedded in #root so crawlers
 *     see it before JS loads.
 *  4. For each week: write dist/public/weeks/{n}/index.html similarly.
 *  5. Regenerate public/sitemap.xml with all lecture + week URLs.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOPICS, WEEK_META } from "./course-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist", "public");
const publicDir = path.resolve(__dirname, "..", "public");

const SITE_BASE = "https://finance101.xyz";
const BASE_PATH = process.env.BASE_PATH ?? "/";

// ---------------------------------------------------------------------------
// 1. Load the built shell HTML
// ---------------------------------------------------------------------------
const shellPath = path.join(distDir, "index.html");
if (!fs.existsSync(shellPath)) {
  console.error(`[prerender] ERROR: ${shellPath} not found. Run vite build first.`);
  process.exit(1);
}
const shellHtml = fs.readFileSync(shellPath, "utf8");

// ---------------------------------------------------------------------------
// 2. Get real lecture IDs from the API (with DB fallback)
// ---------------------------------------------------------------------------

/** @returns {Promise<Array<{id: number, title: string, weekNumber: number}>>} */
async function fetchLectureIds() {
  // 1. Try DATABASE_URL via psql (most reliable — always available in Replit builds)
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      const { execSync } = await import("node:child_process");
      const rows = execSync(
        `psql "${dbUrl}" -t -A -F '|' -c "SELECT id, title, week_number FROM lectures ORDER BY id"`,
        { encoding: "utf8" }
      )
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [id, title, weekNumber] = line.split("|");
          return { id: Number(id), title, weekNumber: Number(weekNumber) };
        });
      if (rows.length > 0) {
        console.log(`[prerender] Fetched ${rows.length} lecture IDs from DATABASE_URL`);
        return rows;
      }
    } catch (e) {
      console.warn("[prerender] psql query failed:", e.message);
    }
  }

  // 2. Fallback: sequential IDs 1..N in TOPICS insertion order
  console.warn("[prerender] DATABASE_URL unavailable — using sequential IDs (DB may differ)");
  return TOPICS.map((t, i) => ({ id: i + 1, title: t.lectureTitle, weekNumber: t.weekNumber }));
}

const lectureIds = await fetchLectureIds();

// Build lookup: lectureTitle -> DB id (or fallback)
const titleToId = new Map(lectureIds.map((l) => [l.title, l.id]));

// Merge DB ids into TOPICS
const lectures = TOPICS.map((t, i) => ({
  ...t,
  id: titleToId.get(t.lectureTitle) ?? i + 1,
}));

// ---------------------------------------------------------------------------
// 3. Helper: patch the HTML shell for a given page
// ---------------------------------------------------------------------------

/** Escape HTML special chars so embedded text is safe */
function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Build a static HTML page from the shell.
 * @param {object} opts
 * @param {string} opts.title         - <title> tag content
 * @param {string} opts.description   - meta description
 * @param {string} opts.canonical     - canonical URL (full https://…)
 * @param {string} opts.bodyHtml      - inner HTML placed inside #root
 */
function buildPage({ title, description, canonical, bodyHtml }) {
  let html = shellHtml;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escHtml(description)}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escHtml(canonical)}" />`
  );

  // Replace OG/Twitter title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escHtml(title)}" />`
  );

  // Replace OG/Twitter description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escHtml(description)}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escHtml(canonical)}" />`
  );

  // Inject static content into #root so crawlers see it
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${bodyHtml}</div>`
  );

  return html;
}

/** Write a file, creating directories as needed */
function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

// ---------------------------------------------------------------------------
// 4. Generate lecture pages
// ---------------------------------------------------------------------------

console.log(`[prerender] Generating ${lectures.length} lecture pages…`);

for (const lec of lectures) {
  const urlPath = `${BASE_PATH}lectures/${lec.id}`.replace(/\/\//g, "/");
  const canonical = `${SITE_BASE}${urlPath === "/" ? "" : urlPath}`;

  const title = `${lec.lectureTitle} — Finance 101`;
  const description = lec.blurb;

  const bodyHtml = `<article style="padding:2rem;max-width:860px;margin:0 auto;font-family:Georgia,serif;line-height:1.7">
<p style="font-size:.85rem;color:#666;margin-bottom:.5rem">Week ${lec.weekNumber}</p>
<h1 style="font-size:2rem;font-weight:700;margin-bottom:1.5rem">${escHtml(lec.lectureTitle)}</h1>
${lec.body
  .split("\n\n")
  .map((para) => `<p>${escHtml(para.replace(/^#+\s*/, ""))}</p>`)
  .join("\n")}
</article>`;

  const html = buildPage({ title, description, canonical, bodyHtml });
  const outPath = path.join(distDir, "lectures", String(lec.id), "index.html");
  writeFile(outPath, html);
}

// ---------------------------------------------------------------------------
// 5. Generate week pages
// ---------------------------------------------------------------------------

console.log(`[prerender] Generating week pages…`);

for (const [weekNumStr, meta] of Object.entries(WEEK_META)) {
  const weekNumber = Number(weekNumStr);
  const urlPath = `${BASE_PATH}weeks/${weekNumber}`.replace(/\/\//g, "/");
  const canonical = `${SITE_BASE}${urlPath}`;

  const title = `${meta.title} — Finance 101`;
  const description = meta.summary;

  const weekLectures = lectures.filter((l) => l.weekNumber === weekNumber);

  const lectureListHtml = weekLectures
    .map(
      (l) =>
        `<li><a href="${escHtml(`${BASE_PATH}lectures/${l.id}`.replace(/\/\//g, "/"))}">${escHtml(l.lectureTitle)}</a> — ${escHtml(l.blurb)}</li>`
    )
    .join("\n");

  const bodyHtml = `<div style="padding:2rem;max-width:860px;margin:0 auto;font-family:Georgia,serif;line-height:1.7">
<h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem">${escHtml(meta.title)}</h1>
<p style="font-size:1.1rem;color:#444;margin-bottom:2rem">${escHtml(meta.summary)}</p>
<h2 style="font-size:1.3rem;font-weight:600;margin-bottom:1rem">Lectures</h2>
<ul style="list-style:disc;padding-left:1.5rem;display:flex;flex-direction:column;gap:.5rem">
${lectureListHtml}
</ul>
</div>`;

  const html = buildPage({ title, description, canonical, bodyHtml });
  const outPath = path.join(distDir, "weeks", String(weekNumber), "index.html");
  writeFile(outPath, html);
}

// ---------------------------------------------------------------------------
// 6. Regenerate sitemap.xml
// ---------------------------------------------------------------------------

console.log(`[prerender] Regenerating sitemap.xml…`);

const today = new Date().toISOString().slice(0, 10);

const weekUrls = [1, 2, 3, 4]
  .map(
    (n) => `  <url>
    <loc>${SITE_BASE}/weeks/${n}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n");

const lectureUrls = lectures
  .map(
    (l) => `  <url>
    <loc>${SITE_BASE}/lectures/${l.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_BASE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${weekUrls}
${lectureUrls}
</urlset>
`;

// Write to both dist/public (served) and public (source of truth)
writeFile(path.join(distDir, "sitemap.xml"), sitemap);
writeFile(path.join(publicDir, "sitemap.xml"), sitemap);

console.log(
  `[prerender] Done. Generated ${lectures.length} lecture pages, 4 week pages, and updated sitemap.xml.`
);

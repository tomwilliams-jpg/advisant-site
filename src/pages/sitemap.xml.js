// Sitemap generated at build time from the pages directory.
// Deliberately dependency-free: the @astrojs/sitemap integration broke the
// build on a minor version bump, and this file cannot.
const SITE = "https://www.advisantfinancial.com";

export async function GET() {
  const pages = import.meta.glob("./**/*.astro");
  const urls = Object.keys(pages)
    .map((p) =>
      p
        .replace("./", "")
        .replace(/\.astro$/, "")
        .replace(/^index$/, "")
    )
    .map((slug) => (slug ? `${SITE}/${slug}/` : `${SITE}/`))
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

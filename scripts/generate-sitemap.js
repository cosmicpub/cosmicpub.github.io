const fs = require("fs");
const path = require("path");

const SITE_URL = "https://toolsquares.com";
const pagesPath = path.join(__dirname, "..", "data", "tool-pages.json");
const outputPath = path.join(__dirname, "..", "sitemap.xml");

const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outputPath, xml, "utf8");
console.log("sitemap.xml generated successfully.");

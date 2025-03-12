export async function handler(req, res) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://iraniandoctorshub.com/</loc>
        <lastmod>2025-03-12</lastmod>
        <priority>1.00</priority>
      </url>
      <!-- Add other pages here -->
    </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}

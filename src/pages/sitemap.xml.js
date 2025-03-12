// Sample data - Replace with real dynamic URLs
const pages = [
  {
    loc: "https://iraniandoctorshub.com/",
    lastmod: "2025-03-12",
    priority: "1.00",
  },
  {
    loc: "https://iraniandoctorshub.com/about",
    lastmod: "2025-03-12",
    priority: "0.80",
  },
  {
    loc: "https://iraniandoctorshub.com/contact",
    lastmod: "2025-03-12",
    priority: "0.80",
  },
  {
    loc: "https://iraniandoctorshub.com/list",
    lastmod: "2025-03-12",
    priority: "0.80",
  },
  // Add more pages as necessary
];

const generateSitemap = (pages) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach((page) => {
    xml += `<url>\n`;
    xml += `  <loc>${page.loc}</loc>\n`;
    xml += `  <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `  <priority>${page.priority}</priority>\n`;
    xml += `</url>\n`;
  });

  xml += "</urlset>";
  return xml;
};

export async function getServerSideProps({ res }) {
  const xml = generateSitemap(pages);

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async function handler(req, res) {
  const links = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.8 },
  ];

  const stream = new SitemapStream({
    hostname: "https://iraniandoctorshub.com",
  });

  links.forEach((link) => stream.write(link));
  stream.end();

  const sitemap = await streamToPromise(Readable.from(stream)).then((data) =>
    data.toString()
  );

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();
}

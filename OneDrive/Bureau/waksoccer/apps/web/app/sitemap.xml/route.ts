import { LEAGUES } from "@/core/leagues";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const urls = [
    "/", 
    "/subscribe", 
    ...LEAGUES.map(l => `/league/${l.key}`)
  ].map(url => `<url><loc>${base}${url}</loc></url>`).join("");
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(xml, { 
    headers: { 'Content-Type': 'application/xml' } 
  });
}
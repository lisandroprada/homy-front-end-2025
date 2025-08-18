#!/usr/bin/env node
/*
  generate-sitemap.js
  - Reads the menu data file to extract menu links
  - Optionally fetches dynamic entries from endpoints provided via env:
      LISTINGS_API (returns array of {id, slug, updatedAt})
      BLOGS_API (returns array of {id, slug, updatedAt})
  - Writes public/sitemap.xml
  Usage:
    LISTINGS_API="https://.../listings" BLOGS_API="https://.../posts" node scripts/generate-sitemap.js
*/
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const ROOT = 'https://www.ipropietas.com.ar';
const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');

function readMenuData() {
  const menuPath = path.join(process.cwd(), 'src', 'data', 'home-data', 'MenuData.ts');
  const raw = fs.readFileSync(menuPath, 'utf8');
  // Remove block and line comments so commented-out menu items aren't picked up
  const cleaned = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  // crude TS parsing: extract link strings like '/path' or 'blog_01'
  const regex = /link:\s*['"]([^'"\)]+)['"]/g;
  const links = new Set();
  let m;
  while ((m = regex.exec(cleaned))) links.add(m[1]);
  return Array.from(links)
    .map((l) => {
      if (l === '#') return null;
      if (!l.startsWith('/')) return l.startsWith('http') ? l : `/${l}`;
      return l;
    })
    .filter(Boolean);
}

async function fetchDynamic(url) {
  if (!url) return [];
  try {
    const res = await axios.get(url, {timeout: 10_000});
    // API may return either an array or an object with `items` array
    const source = Array.isArray(res.data) ? res.data : res.data && Array.isArray(res.data.items) ? res.data.items : [];
    if (!Array.isArray(source)) return [];
    return source
      .map((item) => {
        const id = item._id || item.id || item.slug || null;
        const lastmod = item.updatedAt || item.updated_at || item.updated || item.createdAt || item.date || null;
        if (!id) return null;
        return {id: String(id), lastmod: lastmod ? String(lastmod) : null};
      })
      .filter(Boolean);
  } catch (err) {
    console.error('Failed to fetch', url, err.message);
    return [];
  }
}

function writeSitemap(urls) {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const u of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${ROOT}${u.path}</loc>`);
    if (u.priority) lines.push(`    <priority>${u.priority}</priority>`);
    if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    lines.push('  </url>');
  }
  lines.push('</urlset>');
  fs.writeFileSync(outPath, lines.join('\n'));
  console.log('Wrote', outPath);
}

async function main() {
  const menuLinks = readMenuData();
  // base static entries from menu
  const base = menuLinks.map((p) => {
    let priority = 0.5,
      changefreq = 'monthly';
    if (p === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    if (p.startsWith('/listing')) {
      priority = 0.8;
      changefreq = 'daily';
    }
    if (p.startsWith('/blog')) {
      priority = 0.6;
      changefreq = 'weekly';
    }
    if (p === '/contact' || p === '/about_us_03') {
      priority = 0.6;
      changefreq = 'monthly';
    }
    return {path: p === '/' ? '/' : p, priority, changefreq, lastmod: new Date().toISOString().slice(0, 10)};
  });

  // Allow passing explicit endpoints, otherwise build from NEXT_PUBLIC_API_URL
  const apiBase = process.env.LISTINGS_API_BASE || process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const listingsApi = process.env.LISTINGS_API || (apiBase ? `${apiBase.replace(/\/$/, '')}/property/public?page=0&pageSize=1000` : null);
  const blogsApi = process.env.BLOGS_API || (apiBase ? `${apiBase.replace(/\/$/, '')}/blog/public?page=0&pageSize=1000` : null);

  const dynamic = [];
  // Only expand dynamic entries if the menu contains the corresponding listing/blog entries
  const listingMenuEnabled = menuLinks.some((l) => l.startsWith('/listing_05') || l.startsWith('/listing_14'));
  const blogMenuEnabled = menuLinks.some((l) => l.startsWith('/blog_01') || l.startsWith('/blog_details') || l.startsWith('/blog_'));

  // Fetch listings and map to app detail routes (/listing_details_05/{id}) only if menu enabled
  if (listingMenuEnabled && listingsApi) {
    const items = await fetchDynamic(listingsApi);
    for (const it of items) {
      dynamic.push({path: `/listing_details_05/${it.id}`, priority: 0.7, changefreq: 'daily', lastmod: it.lastmod ? it.lastmod.slice(0, 10) : null});
    }
  }

  // Fetch blogs and map to app detail routes (/blog_details/{id}) only if menu enabled
  if (blogMenuEnabled && blogsApi) {
    const posts = await fetchDynamic(blogsApi);
    for (const p of posts) {
      dynamic.push({path: `/blog_details/${p.id}`, priority: 0.6, changefreq: 'weekly', lastmod: p.lastmod ? p.lastmod.slice(0, 10) : null});
    }
  }

  // merge, base first, then dynamic (avoid duplicates)
  const seen = new Set();
  const merged = [];
  for (const u of [...base, ...dynamic]) {
    if (seen.has(u.path)) continue;
    seen.add(u.path);
    merged.push(u);
  }

  writeSitemap(merged);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

# HC 3D Static Website

This folder contains a pure static website for HC 3D, a 3D printing product manufacturer.

## Files

- `index.html` - Page structure and English content
- `styles.css` - Responsive styles
- `script.js` - Category switching and page interactions
- `assets/products/` - Product images

## Product Directions

- 3D printing filament
- Toys
  - Articulated figures
  - Stress toys
  - Desktop ornaments
  - Storage
- Custom products
- 3D printer parts

## Contact

- Email: `libin19881841909@gmail.com`
- Phone: `+86-19881841909`

## Static Deployment

Upload the entire `matterforge-site` folder as the site root.

Common settings:

- Build command: leave empty
- Output directory: `.` or `/`
- Entry file: `index.html`
- Node version: not required

Keep the `assets` folder and `index.html` in the same directory when uploading.

## Cloudflare Pages

Recommended Cloudflare Pages settings:

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Production branch: `master` or your chosen deployment branch
- Custom domain: `superhc3d.com`

After the custom domain is active, open these URLs to confirm they return `200`:

- `https://superhc3d.com/`
- `https://superhc3d.com/robots.txt`
- `https://superhc3d.com/sitemap.xml`

Use only one public canonical domain for search engines. If Cloudflare also exposes a `*.pages.dev` URL or a `www.superhc3d.com` URL, redirect those versions to `https://superhc3d.com/`.

## Google Indexing

After deployment:

1. Add `superhc3d.com` as a Domain property in Google Search Console.
2. Verify the domain by adding the TXT record Google provides to Cloudflare DNS.
3. Submit this sitemap in Search Console: `https://superhc3d.com/sitemap.xml`.
4. Use URL Inspection for `https://superhc3d.com/` and request indexing.
5. Keep the page publicly accessible, avoid password protection, and make sure `robots.txt` remains crawlable.

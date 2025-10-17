# Pages Directory

This directory contains all HTML pages for the Flight Service 365 website, organized by language.

## Structure

```
pages/
├── de/          # German pages
│   ├── index.html
│   ├── 404.html
│   └── ...
└── en/          # English pages
    ├── index.html
    ├── 404.html
    └── ...
```

## 404 Error Pages

Custom 404 error pages are provided for both languages:

- **German**: `de/404.html` - Displayed when a German page is not found
- **English**: `en/404.html` - Displayed when an English page is not found

### Features

The 404 pages include:
- Full header and footer for consistent navigation
- Large "404" error code display with yellow accent color
- Friendly error message explaining the page doesn't exist
- Suggestions section with links to popular pages:
  - Home
  - Aircraft Charter / Flugzeug Charter
  - Fleet / Flotte
  - Contact / Kontakt
- Language switcher to try the other language
- "Back to Home" button with yellow accent styling
- Proper accessibility attributes (ARIA labels, semantic HTML)

### Server Configuration

#### GitHub Pages
GitHub Pages automatically serves custom 404 pages. No additional configuration needed.

#### Nginx (Docker/VPS)
The `nginx.conf` file is configured to serve language-specific 404 pages:
- URLs starting with `/de/` serve `/de/404.html`
- URLs starting with `/en/` serve `/en/404.html`
- All other URLs default to `/de/404.html`

#### Testing 404 Pages

To test 404 pages locally:

1. Build the site:
   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Navigate to a non-existent page:
   - German: `http://localhost:4173/de/nonexistent.html`
   - English: `http://localhost:4173/en/nonexistent.html`

Note: Vite's dev server (`npm run dev`) may not properly serve 404 pages. Use the preview server for testing.

## Page Naming Conventions

### German Pages
- Use German words in URLs (e.g., `flugzeugcharter.html`, `flotte.html`)
- Keep URLs lowercase
- Use hyphens for multi-word pages (e.g., `hour-building.html` is an exception)

### English Pages
- Use English words in URLs (e.g., `aircraft-charter.html`, `fleet.html`)
- Keep URLs lowercase
- Use hyphens to separate words (e.g., `trial-flights.html`)

## Adding New Pages

When adding a new page:

1. Create the HTML file in both `de/` and `en/` directories
2. Add the page to `vite.config.js` build inputs
3. Update `src/scripts/language-switcher.js` with the URL mapping
4. Add navigation links in the header component if needed
5. Update `public/sitemap.xml` with the new URLs
6. Test language switching between the new pages

## Meta Tags

All pages should include:
- Title tag (format: "Page Name - Flight Service 365")
- Meta description (150-160 characters)
- Open Graph tags for social media sharing
- Canonical URL
- Hreflang tags for language alternates
- Viewport meta tag for responsive design

See existing pages for examples of proper meta tag implementation.

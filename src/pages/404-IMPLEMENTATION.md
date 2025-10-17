# 404 Error Pages Implementation

## Overview

Custom 404 error pages have been implemented for both German and English versions of the Flight Service 365 website. These pages provide a user-friendly experience when visitors navigate to non-existent pages.

## Files Created

### HTML Pages
- `src/pages/de/404.html` - German 404 error page
- `src/pages/en/404.html` - English 404 error page

### Documentation
- `src/pages/README.md` - Documentation for the pages directory
- `src/pages/404-IMPLEMENTATION.md` - This file

## Features Implemented

### 1. Consistent Design
- Full header and footer components maintain site navigation
- Dark theme matching the site's design (#111111 background)
- Yellow accent color (#ffe928) for the 404 code and buttons
- Responsive layout that works on all devices

### 2. User-Friendly Content
- Large, prominent "404" error code
- Clear error message explaining the page doesn't exist
- Friendly, professional tone appropriate for aviation industry

### 3. Navigation Assistance
- **Suggestions Section**: Links to popular pages
  - Home / Startseite
  - Aircraft Charter / Flugzeug Charter
  - Fleet / Flotte
  - Contact / Kontakt
- **Language Switcher**: Allows users to try the other language
- **Back to Home Button**: Prominent yellow button to return to homepage

### 4. Accessibility
- Proper semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Skip to main content link
- Proper heading hierarchy

### 5. SEO Configuration
- `noindex, nofollow` meta robots tag (404 pages should not be indexed)
- Proper language attributes (`lang="de"` / `lang="en"`)
- No canonical URL (404 pages are not canonical)

## Server Configuration

### GitHub Pages
GitHub Pages automatically serves custom 404 pages. No additional configuration needed.

### Nginx (Docker/VPS)
The `nginx.conf` file has been updated to serve language-specific 404 pages:

```nginx
# German 404 for /de/ paths
location ~ ^/de/ {
    try_files $uri $uri/ $uri.html /de/404.html;
}

# English 404 for /en/ paths
location ~ ^/en/ {
    try_files $uri $uri/ $uri.html /en/404.html;
}

# Default 404 page (German)
error_page 404 /de/404.html;
```

This ensures:
- URLs starting with `/de/` serve the German 404 page
- URLs starting with `/en/` serve the English 404 page
- All other URLs default to the German 404 page

### Vite Build Configuration
The 404 pages are included in the Vite build configuration (`vite.config.js`):

```javascript
input: {
  'de-404': resolve(__dirname, 'src/pages/de/404.html'),
  'en-404': resolve(__dirname, 'src/pages/en/404.html'),
  // ... other pages
}
```

## Language Switcher Integration

The language switcher (`src/scripts/language-switcher.js`) includes mappings for 404 pages:

```javascript
'/de/404.html': '/en/404.html',
'/en/404.html': '/de/404.html'
```

This allows users on a 404 page to switch languages and try finding the page in the other language.

## Testing

### Local Testing

1. Build the site:
   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Test 404 pages by navigating to non-existent URLs:
   - German: `http://localhost:4173/de/nonexistent.html`
   - English: `http://localhost:4173/en/nonexistent.html`

**Note**: The Vite dev server (`npm run dev`) may not properly serve 404 pages. Always use the preview server for testing.

### Production Testing

After deployment, test by navigating to:
- `https://www.flightservice365.com/de/nonexistent.html`
- `https://www.flightservice365.com/en/nonexistent.html`

Verify:
- Correct 404 page is displayed
- Header and footer are present
- Language switcher works
- Links to popular pages work
- "Back to Home" button works
- Page is responsive on mobile devices

## Styling

The 404 pages include inline styles for the error content to ensure they display correctly even if external stylesheets fail to load. The styles include:

- **Error Code**: 120px font size (80px on mobile), yellow color
- **Error Title**: Large font size, white color
- **Error Message**: Medium font size, white color, readable line height
- **Suggestions Box**: Dark background (#202020), rounded corners, padding
- **Primary Button**: Yellow background, dark text, hover effects
- **Responsive Design**: Adapts to mobile screens (max-width: 768px)

## Requirements Satisfied

This implementation satisfies **Requirement 1.3** from the requirements document:

> WHEN a user switches language THEN the system SHALL maintain the same page context (e.g., from German "Team" to English "Team")

The 404 pages maintain this requirement by:
- Providing language-specific error messages
- Including the language switcher
- Allowing users to try the other language if the page doesn't exist in the current language

## Deployment Documentation

The `DEPLOYMENT.md` file has been updated with:
- GitHub Pages 404 configuration section
- Nginx 404 configuration examples
- Troubleshooting section for 404 page issues
- Testing instructions

## Future Enhancements

Potential improvements for the future:
1. Add analytics tracking for 404 errors to identify broken links
2. Implement smart suggestions based on the requested URL
3. Add a search functionality on the 404 page
4. Include recently viewed pages in suggestions
5. Add a "Report Broken Link" button

## Maintenance

When adding new pages to the site:
1. Ensure the page exists in both languages
2. Update the language switcher mappings
3. Test that the 404 pages still work correctly
4. Verify the sitemap does not include 404 pages

## Support

For issues with 404 pages:
1. Check server logs for 404 errors
2. Verify nginx.conf configuration (for Docker/VPS deployments)
3. Test with the preview server locally
4. Ensure the 404.html files are in the correct directories
5. Check that the language switcher script is loaded

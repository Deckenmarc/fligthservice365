# Language Switching System Documentation

This document explains how the bilingual language system works for the Flight Service 365 website.

## Overview

The website supports two languages: German (de) and English (en). The language switching system consists of three main components:

1. **language-switcher.js** - Handles user interaction with language switcher buttons
2. **seo-tags.js** - Automatically adds hreflang and canonical tags for SEO
3. **content.json** - Contains all bilingual content in a structured format

## How It Works

### Language Switcher (language-switcher.js)

The language switcher allows users to switch between German and English versions of pages.

**Features:**
- Detects current language from URL path
- Maps pages between languages (e.g., `/de/flugzeugcharter.html` ↔ `/en/aircraft-charter.html`)
- Stores language preference in localStorage
- Updates active state of language buttons
- Navigates to corresponding page in target language

**Usage in HTML:**
```html
<div class="language-switcher">
  <button data-lang="de" aria-label="Deutsch">
    <img src="/assets/flags/de.png" alt="Deutsch">
  </button>
  <button data-lang="en" aria-label="English">
    <img src="/assets/flags/en.png" alt="English">
  </button>
</div>

<script src="/scripts/language-switcher.js"></script>
```

### SEO Tags (seo-tags.js)

Automatically adds proper hreflang and canonical tags to each page for search engine optimization.

**Features:**
- Adds canonical tag pointing to current page
- Adds hreflang tags for both language versions
- Adds x-default hreflang pointing to German version (default)
- Prevents duplicate content issues in search engines

**Usage in HTML:**
```html
<head>
  <!-- Other meta tags -->
  <script src="/scripts/seo-tags.js"></script>
</head>
```

The script will automatically add tags like:
```html
<link rel="canonical" href="https://www.flightservice365.com/de/index.html">
<link rel="alternate" hreflang="de" href="https://www.flightservice365.com/de/index.html">
<link rel="alternate" hreflang="en" href="https://www.flightservice365.com/en/index.html">
<link rel="alternate" hreflang="x-default" href="https://www.flightservice365.com/de/index.html">
```

### Content Data (content.json)

Contains all bilingual content in a structured JSON format.

**Structure:**
```json
{
  "de": {
    "navigation": { ... },
    "services": [ ... ],
    "team": [ ... ],
    "aircraft": [ ... ],
    "pages": { ... }
  },
  "en": {
    "navigation": { ... },
    "services": [ ... ],
    "team": [ ... ],
    "aircraft": [ ... ],
    "pages": { ... }
  }
}
```

**Usage in JavaScript:**
```javascript
// Fetch and use content
fetch('/assets/data/content.json')
  .then(response => response.json())
  .then(data => {
    const lang = getCurrentLanguage(); // 'de' or 'en'
    const content = data[lang];
    
    // Use content to populate page
    document.querySelector('.hero-title').textContent = content.pages.home.hero.tagline;
  });
```

## Page URL Structure

All pages follow a consistent URL structure:

### German Pages (de)
- `/de/index.html` - Homepage
- `/de/flugzeugcharter.html` - Aircraft Charter
- `/de/blockcharter.html` - BlockCharter
- `/de/ppl365.html` - PPL-365 Training
- `/de/hourbuilding.html` - Hour Building
- `/de/rundfluge.html` - Trial Flights
- `/de/flotte.html` - Fleet
- `/de/team.html` - Team
- `/de/standorte.html` - Locations
- `/de/kontakt.html` - Contact
- `/de/datenschutz.html` - Privacy Policy
- `/de/impressum.html` - Imprint
- `/de/agb.html` - Terms & Conditions

### English Pages (en)
- `/en/index.html` - Homepage
- `/en/aircraft-charter.html` - Aircraft Charter
- `/en/blockcharter.html` - BlockCharter
- `/en/ppl365.html` - PPL-365 Training
- `/en/hour-building.html` - Hour Building
- `/en/trial-flights.html` - Trial Flights
- `/en/fleet.html` - Fleet
- `/en/team.html` - Team
- `/en/locations.html` - Locations
- `/en/contact.html` - Contact
- `/en/privacy.html` - Privacy Policy
- `/en/imprint.html` - Imprint
- `/en/terms.html` - Terms & Conditions

## Adding New Pages

When adding a new page to the website:

1. **Create both language versions** (de and en)
2. **Update path mappings** in both `language-switcher.js` and `seo-tags.js`
3. **Add content** to `content.json` for both languages
4. **Include scripts** in the HTML head:
   ```html
   <script src="/scripts/seo-tags.js"></script>
   <script src="/scripts/language-switcher.js"></script>
   ```

## Configuration

### Base URL
Update the `BASE_URL` constant in `seo-tags.js` when deploying to production:

```javascript
const BASE_URL = 'https://www.flightservice365.com';
```

For local development, you might use:
```javascript
const BASE_URL = 'http://localhost:3000';
```

### Default Language
The default language is German (de). This is used for:
- x-default hreflang tag
- Fallback when language cannot be detected
- Initial language preference if not stored

To change the default language, update the relevant functions in both scripts.

## Browser Support

The language switching system uses modern JavaScript features:
- localStorage API
- ES6 modules and arrow functions
- Fetch API (for content.json)

Supported browsers:
- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Opera 47+

## Testing

To test the language switching system:

1. **Manual Testing:**
   - Click language switcher buttons on each page
   - Verify navigation to correct language version
   - Check localStorage for stored preference
   - Verify active state on language buttons

2. **SEO Testing:**
   - View page source and check for hreflang tags
   - Verify canonical tags point to correct URLs
   - Use Google Search Console to validate hreflang implementation
   - Test with SEO tools like Screaming Frog

3. **Content Testing:**
   - Verify all content loads correctly in both languages
   - Check for missing translations
   - Ensure images and links are correct for each language

## Troubleshooting

### Language switcher not working
- Check that buttons have `data-lang` attribute
- Verify script is loaded in HTML
- Check browser console for JavaScript errors
- Ensure page mappings are correct

### SEO tags not appearing
- Verify script is loaded in `<head>` section
- Check that BASE_URL is set correctly
- Ensure page path matches mapping structure

### Content not loading
- Verify content.json file path is correct
- Check JSON syntax is valid
- Ensure fetch request completes successfully
- Check browser console for errors

## Requirements Satisfied

This implementation satisfies the following requirements:

- **1.1**: Language switcher flags in header
- **1.2**: Content switches to selected language
- **1.3**: Maintains page context when switching
- **1.4**: Proper hreflang tags for SEO
- **1.5**: Canonical URLs to avoid duplicate content
- **12.3**: Hreflang implementation
- **12.4**: Canonical URL implementation

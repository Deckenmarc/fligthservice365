# Semantic HTML and ARIA Implementation Guide

## Page Structure

All pages should follow this semantic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
</head>
<body data-lang="en">
  
  <!-- Skip to main content link (from header component) -->
  <a href="#main-content" class="skip-to-main">Skip to main content</a>
  
  <!-- Header with role="banner" -->
  <header class="site-header" role="banner">
    <!-- Header content -->
  </header>
  
  <!-- Main content with id for skip link -->
  <main id="main-content">
    
    <!-- Use section elements for major content areas -->
    <section class="hero-section" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Page Title</h1>
    </section>
    
    <section class="services-section" aria-labelledby="services-heading">
      <h2 id="services-heading">Our Services</h2>
      <!-- Content -->
    </section>
    
  </main>
  
  <!-- Footer with role="contentinfo" -->
  <footer class="site-footer" role="contentinfo">
    <!-- Footer content -->
  </footer>
  
  <!-- Scripts -->
</body>
</html>
```

## ARIA Labels Checklist

### Navigation
- ✅ Main navigation: `<nav aria-label="Main navigation">`
- ✅ Language switcher: `<div role="navigation" aria-label="Language selection">`
- ✅ Footer legal links: `<nav aria-label="Legal links">`
- ✅ Dropdown buttons: `aria-expanded`, `aria-haspopup`, `aria-controls`
- ✅ Mobile menu toggle: `aria-label="Open menu"` / `aria-label="Close menu"`
- ✅ Menu items: `role="menubar"`, `role="menuitem"`

### Forms
- ✅ All inputs have associated labels using `for` and `id`
- ✅ Required fields: `required` and `aria-required="true"`
- ✅ Form messages: `role="alert"` and `aria-live="polite"`
- ✅ Form descriptions: `aria-describedby` linking to help text
- ✅ Honeypot fields: `tabindex="-1"` and `aria-hidden="true"`

### Interactive Elements
- ✅ Icon-only buttons: `aria-label` describing action
- ✅ Decorative images: `alt=""` and `aria-hidden="true"`
- ✅ Informative images: descriptive `alt` text
- ✅ Links with context: `aria-label` when link text isn't descriptive

### Modals and Dialogs
- ✅ Cookie banner: `role="dialog"`, `aria-label`, `aria-hidden`
- ✅ Cookie modal: `role="dialog"`, `aria-modal="true"`, `aria-hidden`
- ✅ Modal close buttons: `aria-label="Close modal"`

### Dynamic Content
- ✅ Form success/error messages: `role="alert"`, `aria-live="polite"`, `aria-atomic="true"`
- ✅ Loading states: `aria-busy="true"` when loading
- ✅ Updated content: `aria-live="polite"` for non-critical updates

## Semantic HTML Elements

### Use These Elements
- `<header>` - Site header (with `role="banner"`)
- `<nav>` - Navigation sections (with `aria-label`)
- `<main>` - Main content (with `id="main-content"`)
- `<section>` - Thematic grouping of content (with `aria-labelledby`)
- `<article>` - Self-contained content (cards, posts)
- `<aside>` - Tangentially related content
- `<footer>` - Site footer (with `role="contentinfo"`)
- `<address>` - Contact information
- `<figure>` and `<figcaption>` - Images with captions
- `<dl>`, `<dt>`, `<dd>` - Definition lists (for specs, etc.)

### Heading Hierarchy
- Use only one `<h1>` per page
- Don't skip heading levels (h1 → h2 → h3, not h1 → h3)
- Use headings to create document outline

## Screen Reader Support

### Screen Reader Only Text
Use the `.sr-only` class for text that should only be read by screen readers:

```html
<label for="email" class="sr-only">Email Address</label>
```

### Hiding Decorative Content
Use `aria-hidden="true"` for decorative elements:

```html
<span class="icon" aria-hidden="true">→</span>
<span class="separator" aria-hidden="true">|</span>
```

## Current Page Indicator

For navigation, mark the current page:

```html
<a href="/en/index.html" aria-current="page">Home</a>
```

## Implementation Status

### Completed
- ✅ Header component with full ARIA support
- ✅ Footer component with full ARIA support
- ✅ Cookie banner with dialog roles
- ✅ Navigation with keyboard support
- ✅ Form components with proper labels
- ✅ Card components with semantic HTML

### To Update
- All page files need:
  - `<main id="main-content">` wrapper
  - Proper section elements with `aria-labelledby`
  - Current page indicator in navigation
  - Skip link included (from header component)

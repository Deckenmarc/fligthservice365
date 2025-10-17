# Accessibility Quick Reference Guide

Quick reference for developers working on the Flight Service 365 website.

## Essential Checklist

When creating or modifying pages, ensure:

### 1. Page Structure
```html
<body>
  <!-- Skip link (from header component) -->
  <a href="#main-content" class="skip-to-main">Skip to main content</a>
  
  <!-- Header -->
  <header role="banner">...</header>
  
  <!-- Main content with ID -->
  <main id="main-content">
    <section aria-labelledby="section-heading">
      <h2 id="section-heading">Section Title</h2>
    </section>
  </main>
  
  <!-- Footer -->
  <footer role="contentinfo">...</footer>
</body>
```

### 2. Interactive Elements

**Buttons**
```html
<!-- Icon-only buttons need aria-label -->
<button aria-label="Close menu">
  <span aria-hidden="true">×</span>
</button>

<!-- Dropdown buttons -->
<button aria-expanded="false" aria-haspopup="true" aria-controls="menu-id">
  Menu
</button>
```

**Links**
```html
<!-- Descriptive link text -->
<a href="/contact">Contact Us</a>

<!-- Or use aria-label for context -->
<a href="tel:+34691367430" aria-label="Call Mallorca office">
  +34 691 367 430
</a>

<!-- Current page -->
<a href="/en/index.html" aria-current="page">Home</a>
```

### 3. Forms

**Always associate labels with inputs**
```html
<div class="form-group">
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    required 
    aria-required="true"
    aria-describedby="email-help"
  >
  <span id="email-help">We'll never share your email</span>
</div>

<!-- Form messages -->
<div role="alert" aria-live="polite" aria-atomic="true">
  Success! Your message has been sent.
</div>
```

### 4. Images

**Informative images**
```html
<img src="aircraft.jpg" alt="Socata TB20 Trinidad exterior view" width="800" height="600">
```

**Decorative images**
```html
<img src="decoration.svg" alt="" aria-hidden="true">
```

**Responsive images**
```html
<picture>
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 5. Navigation

**Main navigation**
```html
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/" role="menuitem">Home</a>
    </li>
  </ul>
</nav>
```

**Dropdown menus**
```html
<li class="has-submenu" role="none">
  <button 
    aria-expanded="false" 
    aria-haspopup="true" 
    role="menuitem"
    aria-controls="services-menu"
  >
    Services
  </button>
  <ul id="services-menu" role="menu" aria-label="Services">
    <li role="none">
      <a href="/service" role="menuitem">Service Name</a>
    </li>
  </ul>
</li>
```

### 6. Modals/Dialogs

```html
<div 
  class="modal" 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
  aria-hidden="true"
>
  <h2 id="modal-title">Modal Title</h2>
  <button aria-label="Close modal">×</button>
  <!-- Modal content -->
</div>
```

## CSS Guidelines

### Focus Indicators
```css
/* Already defined globally, but can be customized */
.custom-element:focus {
  outline: 2px solid var(--color-accent-yellow);
  outline-offset: 2px;
}
```

### Touch Targets
```css
/* Minimum 44x44px for interactive elements */
button,
a {
  min-height: 44px;
  min-width: 44px;
}
```

### Text Scaling
```css
/* Use relative units */
.element {
  font-size: 1rem; /* Good */
  padding: var(--space-40); /* Good */
  /* Avoid: font-size: 16px; */
}

/* Limit line length */
p {
  max-width: 80ch;
}
```

### Color Contrast
```css
/* Use approved color combinations */
.text-on-dark {
  color: var(--color-white); /* #ffffff */
  background: var(--color-bg-dark-1); /* #111111 */
  /* Contrast: 18.24:1 ✅ */
}

.accent-text {
  color: var(--color-accent-yellow); /* #ffe928 */
  background: var(--color-bg-dark-1); /* #111111 */
  /* Contrast: 13.89:1 ✅ */
}
```

## JavaScript Guidelines

### Keyboard Navigation
```javascript
// Handle keyboard events
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Activate element
  }
  if (e.key === 'Escape') {
    // Close menu/modal
  }
});
```

### Focus Management
```javascript
// Trap focus in modal
const focusableElements = modal.querySelectorAll(
  'a[href], button:not([disabled]), input, textarea, select'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

// Focus first element when modal opens
firstElement.focus();
```

### ARIA State Updates
```javascript
// Update aria-expanded
button.setAttribute('aria-expanded', 'true');

// Update aria-label
button.setAttribute('aria-label', 'Close menu');

// Update aria-hidden
modal.setAttribute('aria-hidden', 'false');
```

### Dynamic Content
```javascript
// Announce to screen readers
const message = document.createElement('div');
message.setAttribute('role', 'alert');
message.setAttribute('aria-live', 'polite');
message.textContent = 'Form submitted successfully';
document.body.appendChild(message);
```

## Common Patterns

### Service Card
```html
<article class="service-card">
  <img src="icon.svg" alt="" aria-hidden="true" class="service-icon">
  <h3>Service Name</h3>
  <p>Description</p>
  <a href="/service">Learn More</a>
</article>
```

### Team Member Card
```html
<article class="team-member">
  <img src="photo.jpg" alt="John Doe, Pilot" class="team-photo">
  <h3>John Doe</h3>
  <p class="role">Chief Pilot</p>
  <p class="bio">Biography text...</p>
</article>
```

### Form with Validation
```html
<form aria-label="Contact form">
  <div class="form-group">
    <label for="name">Name</label>
    <input 
      type="text" 
      id="name" 
      required 
      aria-required="true"
      aria-invalid="false"
    >
    <span class="error" role="alert" aria-live="polite"></span>
  </div>
  <button type="submit">Send</button>
</form>
```

## Testing Commands

### Quick Tests
```bash
# Check for common issues
grep -r "onclick=" src/  # Avoid inline handlers
grep -r "<div.*button" src/  # Use <button> not <div>
grep -r "tabindex=\"[1-9]" src/  # Avoid positive tabindex
```

### Browser Testing
1. **Keyboard**: Tab through entire page
2. **Zoom**: Test at 200% (Ctrl/Cmd +)
3. **Screen Reader**: Test with NVDA/VoiceOver
4. **Lighthouse**: Run accessibility audit (F12 → Lighthouse)

## Resources

- Full guide: `ACCESSIBILITY-IMPLEMENTATION.md`
- Semantic HTML: `src/components/semantic-html-guide.md`
- Color contrast: `src/styles/base/color-contrast-verification.md`
- Text scaling: `src/styles/base/responsive-text-scaling-test.md`

## Quick Fixes

### Missing alt text
```html
<!-- Before -->
<img src="image.jpg">

<!-- After -->
<img src="image.jpg" alt="Description">
<!-- or for decorative -->
<img src="image.jpg" alt="" aria-hidden="true">
```

### Missing label
```html
<!-- Before -->
<input type="email" placeholder="Email">

<!-- After -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="Email">
```

### Poor focus indicator
```css
/* Before */
button:focus { outline: none; }

/* After */
button:focus {
  outline: 2px solid var(--color-accent-yellow);
  outline-offset: 2px;
}
```

### Non-semantic markup
```html
<!-- Before -->
<div class="button" onclick="doSomething()">Click me</div>

<!-- After -->
<button type="button" onclick="doSomething()">Click me</button>
```

## Remember

✅ **DO**
- Use semantic HTML
- Provide text alternatives
- Ensure keyboard access
- Use sufficient color contrast
- Test with real users
- Keep it simple

❌ **DON'T**
- Use `div` or `span` as buttons
- Remove focus indicators
- Use color alone to convey information
- Create keyboard traps
- Skip heading levels
- Use positive tabindex values

## Support

Questions? Check the full documentation or contact the development team.

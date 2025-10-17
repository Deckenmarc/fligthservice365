# Responsive Images Implementation Guide

This guide provides practical examples for implementing responsive images throughout the Flight Service 365 website.

## Table of Contents
1. [Quick Reference](#quick-reference)
2. [Hero Images](#hero-images)
3. [Service Cards](#service-cards)
4. [Team Photos](#team-photos)
5. [Aircraft Photos](#aircraft-photos)
6. [Icons and Logos](#icons-and-logos)
7. [Background Images](#background-images)
8. [Route Images](#route-images)

---

## Quick Reference

### When to Use Picture Element
- Large images that benefit from WebP compression
- Images that need multiple sizes for different viewports
- Images where art direction matters

### When to Use Simple Img
- Small icons (< 200px)
- SVG images
- Logos that don't need multiple sizes

### Always Include
- ✅ `alt` attribute (descriptive or empty for decorative)
- ✅ `width` and `height` attributes
- ✅ `loading="lazy"` for below-the-fold images

---

## Hero Images

Hero images are large, full-width images at the top of pages.

### Implementation

```html
<section class="hero">
  <picture>
    <source 
      type="image/webp"
      srcset="
        /src/assets/images/backgrounds/hero-home-320.webp 320w,
        /src/assets/images/backgrounds/hero-home-768.webp 768w,
        /src/assets/images/backgrounds/hero-home-1024.webp 1024w,
        /src/assets/images/backgrounds/hero-home-1920.webp 1920w
      "
      sizes="100vw"
    >
    <source 
      type="image/jpeg"
      srcset="
        /src/assets/images/backgrounds/hero-home-320.jpg 320w,
        /src/assets/images/backgrounds/hero-home-768.jpg 768w,
        /src/assets/images/backgrounds/hero-home-1024.jpg 1024w,
        /src/assets/images/backgrounds/hero-home-1920.jpg 1920w
      "
      sizes="100vw"
    >
    <img 
      src="/src/assets/images/backgrounds/hero-home-1920.jpg" 
      alt="Aircraft flying over Mallorca coastline at sunset"
      width="1920"
      height="1080"
      class="hero-image"
    >
  </picture>
  <div class="hero-content">
    <h1>Supporting pilots - Inspiring guests - Enabling students</h1>
  </div>
</section>
```

### Alt Text Examples
- ✅ "Aircraft flying over Mallorca coastline at sunset"
- ✅ "Socata TB20 Trinidad in flight with blue sky background"
- ✅ "Cockpit view during flight training session"
- ❌ "Hero image" (not descriptive)
- ❌ "Image of plane" (too generic)

---

## Service Cards

Service cards display on the homepage and service overview pages.

### Implementation

```html
<article class="service-card">
  <div class="service-card-image">
    <picture>
      <source 
        type="image/webp"
        srcset="
          /src/assets/images/services/aircraft-charter-320.webp 320w,
          /src/assets/images/services/aircraft-charter-768.webp 768w,
          /src/assets/images/services/aircraft-charter-1024.webp 1024w
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      >
      <img 
        src="/src/assets/images/services/aircraft-charter-768.jpg" 
        alt="Business travelers boarding private aircraft"
        width="800"
        height="600"
        loading="lazy"
        class="service-bg-image"
      >
    </picture>
    <div class="service-card-overlay"></div>
  </div>
  <div class="service-card-content">
    <img 
      src="/src/assets/images/icons/icon-aircraft-charter.svg" 
      alt=""
      width="128"
      height="128"
      loading="lazy"
      class="service-icon"
      aria-hidden="true"
    >
    <h3 class="service-title">Aircraft Charter</h3>
    <p class="service-description">Excursion or business trip</p>
    <a href="/en/aircraft-charter.html" class="service-link">Learn More</a>
  </div>
</article>
```

### Notes
- Service icons should have empty `alt=""` and `aria-hidden="true"` since they're decorative
- Background images should describe what's shown, not the service name
- Use `loading="lazy"` since these are typically below the fold

---

## Team Photos

Team member photos on the team page.

### Implementation

```html
<article class="team-member">
  <div class="team-member-image">
    <picture>
      <source 
        type="image/webp"
        srcset="
          /src/assets/images/team/gregor-schulz-400.webp 400w,
          /src/assets/images/team/gregor-schulz-800.webp 800w
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      >
      <img 
        src="/src/assets/images/team/gregor-schulz-400.jpg" 
        alt="Gregor Schulz, General Manager and Chief Flight Instructor"
        width="400"
        height="400"
        loading="lazy"
        class="team-photo"
      >
    </picture>
  </div>
  <div class="team-member-info">
    <h3 class="team-member-name">Gregor Schulz</h3>
    <p class="team-member-role">General Manager, Cpt. i.R. Ausbilder und COO</p>
    <p class="team-member-bio">Der erfahrene Pilot und Ausbilder...</p>
  </div>
</article>
```

### Alt Text Pattern
Format: `[Name], [Role/Title]`

Examples:
- "Gregor Schulz, General Manager and Chief Flight Instructor"
- "Maria Schmidt, Flight Operations Manager"
- "Thomas Weber, Senior Flight Instructor"

---

## Aircraft Photos

Aircraft photos on the fleet page.

### Implementation

```html
<article class="aircraft-card">
  <div class="aircraft-image">
    <picture>
      <source 
        type="image/webp"
        srcset="
          /src/assets/images/fleet/socata-tb20-320.webp 320w,
          /src/assets/images/fleet/socata-tb20-768.webp 768w,
          /src/assets/images/fleet/socata-tb20-1024.webp 1024w,
          /src/assets/images/fleet/socata-tb20-1920.webp 1920w
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
      >
      <img 
        src="/src/assets/images/fleet/socata-tb20-1024.jpg" 
        alt="Socata TB20 Trinidad exterior view on tarmac"
        width="1200"
        height="800"
        loading="lazy"
        class="aircraft-photo"
      >
    </picture>
  </div>
  <div class="aircraft-details">
    <h3 class="aircraft-name">Socata TB20 Trinidad</h3>
    <!-- specs here -->
  </div>
</article>
```

### Alt Text Pattern
Format: `[Aircraft Model] [view type/context]`

Examples:
- "Socata TB20 Trinidad exterior view on tarmac"
- "Socata TB20 Trinidad cockpit instrumentation"
- "Cessna 172 in flight over Mallorca"

---

## Icons and Logos

Small icons and logos don't need responsive images.

### Service Icons (Decorative)

```html
<img 
  src="/src/assets/images/icons/icon-aircraft-charter.svg" 
  alt=""
  width="128"
  height="128"
  loading="lazy"
  class="service-icon"
  aria-hidden="true"
>
```

### Feature Icons (Meaningful)

```html
<img 
  src="/src/assets/images/icons/icon-weather.svg" 
  alt="Weather advantages"
  width="64"
  height="64"
  loading="lazy"
  class="feature-icon"
>
```

### Logos

```html
<!-- Header logo (above fold, no lazy loading) -->
<img 
  src="/src/assets/images/logos/logo-white-600.svg" 
  alt="Flight Service 365"
  width="600"
  height="75"
  class="site-logo"
>

<!-- Footer logo (below fold, lazy load) -->
<img 
  src="/src/assets/images/logos/logo-white-300.svg" 
  alt="Flight Service 365"
  width="300"
  height="38"
  loading="lazy"
  class="footer-logo"
>
```

---

## Background Images

For CSS background images, use responsive images in HTML with absolute positioning or use CSS with media queries.

### HTML Approach (Recommended)

```html
<section class="section-with-bg">
  <picture class="section-bg-image">
    <source 
      type="image/webp"
      srcset="
        /src/assets/images/backgrounds/section-bg-768.webp 768w,
        /src/assets/images/backgrounds/section-bg-1920.webp 1920w
      "
      sizes="100vw"
    >
    <img 
      src="/src/assets/images/backgrounds/section-bg-1920.jpg" 
      alt=""
      width="1920"
      height="600"
      loading="lazy"
      aria-hidden="true"
    >
  </picture>
  <div class="section-content">
    <!-- Content here -->
  </div>
</section>
```

### CSS

```css
.section-with-bg {
  position: relative;
  overflow: hidden;
}

.section-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.section-bg-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## Route Images

Trial flight route images on the trial flights page.

### Implementation

```html
<article class="route-card">
  <div class="route-image">
    <picture>
      <source 
        type="image/webp"
        srcset="
          /src/assets/images/routes/sa-foradada-320.webp 320w,
          /src/assets/images/routes/sa-foradada-768.webp 768w,
          /src/assets/images/routes/sa-foradada-1024.webp 1024w
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
      >
      <img 
        src="/src/assets/images/routes/sa-foradada-768.jpg" 
        alt="Aerial view of Sa Foradada coastal rock formation"
        width="1200"
        height="800"
        loading="lazy"
        class="route-photo"
      >
    </picture>
  </div>
  <div class="route-info">
    <h3 class="route-name">Sa Foradada</h3>
    <p class="route-description">Spectacular coastal formation on the west coast</p>
    <p class="route-duration">Duration: 30 minutes</p>
  </div>
</article>
```

### Alt Text Pattern
Format: `Aerial view of [location/landmark]`

Examples:
- "Aerial view of Sa Foradada coastal rock formation"
- "Aerial view of Sa Dragonera island off Mallorca coast"
- "Aerial view of Palma Cathedral and old town"

---

## Testing Checklist

Before deploying, verify:

- [ ] All images have descriptive alt text (or empty alt for decorative)
- [ ] All images have width and height attributes
- [ ] Images below the fold have `loading="lazy"`
- [ ] Hero images don't have lazy loading
- [ ] Picture elements include WebP source with JPEG/PNG fallback
- [ ] Srcset includes appropriate breakpoints (320w, 768w, 1024w, 1920w)
- [ ] Sizes attribute matches actual display size
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] No console warnings about missing attributes
- [ ] Images load correctly on mobile, tablet, and desktop
- [ ] WebP images are served to supporting browsers
- [ ] Fallback images work in older browsers

---

## Performance Tips

1. **Optimize image file sizes**
   - JPEG quality: 80-85%
   - WebP quality: 80-85%
   - PNG: Use lossless compression

2. **Use appropriate formats**
   - Photos: JPEG/WebP
   - Graphics with transparency: PNG/WebP
   - Simple icons: SVG
   - Logos: SVG (or PNG if complex)

3. **Lazy load strategically**
   - Don't lazy load above-the-fold images
   - Do lazy load everything else

4. **Provide dimensions**
   - Always include width and height
   - Prevents cumulative layout shift (CLS)
   - Improves Core Web Vitals score

5. **Use CDN**
   - Serve images from CDN for faster delivery
   - Enable caching headers
   - Use image optimization services if available

---

## Browser Support

### Picture Element
- ✅ Chrome 38+
- ✅ Firefox 38+
- ✅ Safari 9.1+
- ✅ Edge 13+

### WebP Format
- ✅ Chrome 32+
- ✅ Firefox 65+
- ✅ Safari 14+
- ✅ Edge 18+

### Lazy Loading
- ✅ Chrome 77+
- ✅ Firefox 75+
- ✅ Safari 15.4+
- ✅ Edge 79+

For older browsers, the fallback JPEG/PNG images will be used automatically.

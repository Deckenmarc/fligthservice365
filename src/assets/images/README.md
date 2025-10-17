# Image Assets Documentation

This document outlines all required images for the Flight Service 365 website, including specifications, formats, and usage.

## Directory Structure

```
src/assets/images/
├── logos/           # Company logos in various sizes
├── team/            # Team member photos
├── fleet/           # Aircraft photos
├── backgrounds/     # Hero and section background images
├── icons/           # Service and feature icons
├── services/        # Service-specific images
├── flags/           # Language flag icons
└── routes/          # Trial flight route images
```

## Required Images

### Logos (`logos/`)

| Filename | Dimensions | Format | Usage |
|----------|------------|--------|-------|
| `logo-white-600.png` | 600x75px | PNG (transparent) | Header logo on dark backgrounds |
| `logo-white-300.png` | 300x38px | PNG (transparent) | Footer logo, smaller displays |
| `logo-dark-600.png` | 600x75px | PNG (transparent) | Optional: for light backgrounds |

**Specifications:**
- Transparent background
- White color for dark theme
- High resolution for retina displays
- Export as PNG for transparency

---

### Team Photos (`team/`)

| Filename | Subject | Dimensions | Format |
|----------|---------|------------|--------|
| `gregor-schulz.jpg` | Gregor Schulz - General Manager | 400x400px | JPEG |
| `team-member-2.jpg` | Team Member 2 | 400x400px | JPEG |
| `team-member-3.jpg` | Team Member 3 | 400x400px | JPEG |
| `team-member-4.jpg` | Team Member 4 | 400x400px | JPEG |

**Specifications:**
- Square aspect ratio (1:1)
- Professional headshots or upper body shots
- Consistent lighting and background style
- Minimum 400x400px, ideally 800x800px for retina
- JPEG format, quality 85%
- Neutral or aviation-themed backgrounds

---

### Fleet/Aircraft Photos (`fleet/`)

| Filename | Aircraft | Dimensions | Format |
|----------|----------|------------|--------|
| `socata-tb20-main.jpg` | Socata TB20 Trinidad - Exterior | 1200x800px | JPEG |
| `socata-tb20-cockpit.jpg` | Socata TB20 Trinidad - Cockpit | 1200x800px | JPEG |
| `training-aircraft-1.jpg` | Training Aircraft 1 | 1200x800px | JPEG |
| `training-aircraft-2.jpg` | Training Aircraft 2 | 1200x800px | JPEG |

**Specifications:**
- Landscape aspect ratio (3:2 or 16:9)
- High-quality exterior shots showing full aircraft
- Cockpit shots showing instrumentation
- Clear, well-lit photos
- Minimum 1200x800px, ideally 1920x1280px
- JPEG format, quality 85%
- Blue sky backgrounds preferred

---

### Background Images (`backgrounds/`)

| Filename | Usage | Dimensions | Format |
|----------|-------|------------|--------|
| `hero-home.jpg` | Homepage hero section | 1920x1080px | JPEG |
| `hero-charter.jpg` | Aircraft Charter page hero | 1920x1080px | JPEG |
| `hero-blockcharter.jpg` | BlockCharter page hero | 1920x1080px | JPEG |
| `hero-ppl365.jpg` | PPL-365 Training page hero | 1920x1080px | JPEG |
| `hero-hourbuilding.jpg` | Hour Building page hero | 1920x1080px | JPEG |
| `hero-trialflights.jpg` | Trial Flights page hero | 1920x1080px | JPEG |
| `hero-fleet.jpg` | Fleet page hero | 1920x1080px | JPEG |
| `hero-team.jpg` | Team page hero | 1920x1080px | JPEG |
| `hero-locations.jpg` | Locations page hero | 1920x1080px | JPEG |
| `hero-contact.jpg` | Contact page hero | 1920x1080px | JPEG |
| `section-bg-dark.jpg` | Dark section backgrounds | 1920x600px | JPEG |

**Specifications:**
- Wide landscape format (16:9)
- Aviation-themed imagery (aircraft, sky, cockpit views)
- Suitable for text overlay (not too busy)
- Minimum 1920x1080px for full-width hero sections
- JPEG format, quality 80-85%
- Consider darker overlays for text readability

---

### Service Icons (`icons/`)

| Filename | Service | Dimensions | Format |
|----------|---------|------------|--------|
| `icon-aircraft-charter.png` | Aircraft Charter | 128x128px | PNG |
| `icon-blockcharter.png` | BlockCharter | 128x128px | PNG |
| `icon-ppl365.png` | PPL-365 Training | 128x128px | PNG |
| `icon-hourbuilding.png` | Hour Building | 128x128px | PNG |
| `icon-trialflights.png` | Trial Flights | 128x128px | PNG |
| `icon-business.png` | Business Travel use case | 128x128px | PNG |
| `icon-leisure.png` | Leisure & Tourism use case | 128x128px | PNG |
| `icon-events.png` | Special Events use case | 128x128px | PNG |

**Specifications:**
- Square format (1:1)
- Simple, recognizable icons
- Transparent background
- White or yellow color to match theme
- Minimum 128x128px, ideally 256x256px for retina
- PNG format with transparency
- Consistent style across all icons

---

### Service Images (`services/`)

| Filename | Service | Dimensions | Format |
|----------|---------|------------|--------|
| `banner-aircraft-charter.jpg` | Aircraft Charter card | 800x600px | JPEG |
| `banner-blockcharter.jpg` | BlockCharter card | 800x600px | JPEG |
| `banner-ppl365.jpg` | PPL-365 Training card | 800x600px | JPEG |
| `banner-hourbuilding.jpg` | Hour Building card | 800x600px | JPEG |
| `banner-trialflights.jpg` | Trial Flights card | 800x600px | JPEG |

**Specifications:**
- 4:3 aspect ratio
- Service-specific imagery
- Suitable for dark overlay
- Minimum 800x600px, ideally 1200x900px
- JPEG format, quality 85%
- Consistent style and quality

---

### Language Flags (`flags/`)

| Filename | Language | Dimensions | Format |
|----------|----------|------------|--------|
| `de.png` | German flag | 32x32px | PNG |
| `en.png` | English/UK flag | 32x32px | PNG |

**Specifications:**
- Square format (1:1)
- Small file size for fast loading
- PNG format
- 32x32px standard, 64x64px for retina
- Clear, recognizable flag designs

---

### Trial Flight Routes (`routes/`)

| Filename | Route | Dimensions | Format |
|----------|-------|------------|--------|
| `sa-foradada.jpg` | Sa Foradada coastal formation | 1200x800px | JPEG |
| `sa-dragonera.jpg` | Sa Dragonera island | 1200x800px | JPEG |
| `palma-city.jpg` | Palma city and cathedral | 1200x800px | JPEG |

**Specifications:**
- Landscape aspect ratio (3:2)
- Aerial or scenic views of routes
- High quality, vibrant colors
- Minimum 1200x800px
- JPEG format, quality 85%
- Showcase the beauty of each route

---

## Image Optimization Guidelines

### Formats
- **JPEG**: Photos, backgrounds, complex images (quality 80-85%)
- **PNG**: Logos, icons, images requiring transparency
- **WebP**: Modern format for all images (with JPEG/PNG fallback)

### Responsive Images
All images should be provided in multiple sizes:
- **Small (mobile)**: 320w, 480w
- **Medium (tablet)**: 768w, 1024w
- **Large (desktop)**: 1440w, 1920w

### Performance
- Use lazy loading for images below the fold
- Provide width and height attributes to prevent layout shift
- Compress all images before upload
- Use WebP format with fallback for better compression

### Accessibility
- All images must have descriptive alt text
- Decorative images should have empty alt attributes
- Complex images should have detailed descriptions

---

## Placeholder Images

For development purposes, placeholder images are provided in each directory. These should be replaced with actual images before production deployment.

### Creating Placeholders
Placeholders can be generated using:
- https://placehold.co/ - Simple colored placeholders
- https://picsum.photos/ - Random photos
- https://placeholder.com/ - Customizable placeholders

### Placeholder Naming Convention
Temporary placeholders are prefixed with `placeholder-`:
- `placeholder-logo.png`
- `placeholder-team-1.jpg`
- `placeholder-aircraft.jpg`

**Important:** Remove all placeholder images before production deployment!

---

## Image Credits and Licensing

Ensure all images used have proper licensing:
- Own photography
- Licensed stock photos (with proper attribution if required)
- Creative Commons images (with attribution)
- Client-provided images

Document image sources and licenses in this section:

| Image | Source | License | Attribution Required |
|-------|--------|---------|---------------------|
| TBD | TBD | TBD | TBD |

---

## Updating Images

When adding or updating images:

1. Follow the specifications above for dimensions and format
2. Optimize images before committing (use ImageOptim, TinyPNG, or similar)
3. Update this README if adding new image categories
4. Test responsive behavior across devices
5. Verify alt text is descriptive and accurate
6. Check that WebP versions are generated in build process

---

## Build Process

Images are automatically optimized during the build process:
- WebP versions generated automatically
- Multiple sizes created for responsive images
- Compression applied based on format
- Output to `dist/assets/images/`

See `vite.config.js` for image optimization configuration.

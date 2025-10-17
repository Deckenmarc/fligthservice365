# Flight Service 365 Website

Aviation services website featuring aircraft charter, flight training, and related services. Built as a modern, static bilingual (German/English) website.

## Project Structure

```
flight-service-website/
├── src/
│   ├── assets/
│   │   ├── images/          # Image assets organized by category
│   │   ├── fonts/           # Custom fonts
│   │   └── data/            # JSON data files for content
│   ├── styles/
│   │   ├── base/            # Reset, variables, typography
│   │   ├── components/      # Component-specific styles
│   │   ├── layouts/         # Layout utilities
│   │   └── pages/           # Page-specific styles
│   ├── scripts/             # JavaScript modules
│   ├── pages/
│   │   ├── de/              # German pages
│   │   └── en/              # English pages
│   └── components/          # Reusable HTML components
├── public/                  # Static assets (robots.txt, sitemap.xml)
└── dist/                    # Build output (generated)
```

## Tech Stack

- **Build Tool**: Vite
- **CSS**: PostCSS with Autoprefixer
- **Image Optimization**: vite-plugin-imagemin
- **Multi-page Support**: vite-plugin-html

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite development server. The site will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Features

- Bilingual support (German/English)
- Responsive design (mobile, tablet, desktop)
- Dark theme with yellow accents
- GDPR-compliant cookie consent
- Optimized images with WebP support
- SEO-friendly with proper meta tags
- Accessible (WCAG AA compliant)

## Requirements

See `.kiro/specs/flight-service-website/requirements.md` for detailed requirements.

## Design

See `.kiro/specs/flight-service-website/design.md` for technical architecture and design decisions.

## Implementation Plan

See `.kiro/specs/flight-service-website/tasks.md` for the implementation task list.

# Implementation Plan

- [x] 1. Set up project structure and build configuration
  - Initialize npm project with package.json
  - Install and configure Vite as build tool with HTML plugin for multi-page support
  - Set up PostCSS for CSS processing with autoprefixer
  - Configure image optimization pipeline (vite-plugin-imagemin or similar)
  - Create directory structure: src/assets/{images,fonts,data}, src/styles/{base,components,layouts,pages}, src/scripts, src/pages/{de,en}, public
  - Add .gitignore for node_modules and dist
  - _Requirements: 2.1, 13.1, 13.2, 13.4_

- [x] 2. Create base CSS system and variables
  - Write CSS reset/normalize in src/styles/base/reset.css (box-sizing, margins, padding reset)
  - Define CSS custom properties in src/styles/base/variables.css: colors (#111111, #202020, #333333, #ffe928), spacing scale (0.44rem-5.06rem), typography (font sizes 13px-42px, font families)
  - Create typography system in src/styles/base/typography.css with heading styles (H1: 42px, H2: 36px, H3: 20px) and body text (20px)
  - Implement responsive breakpoint utilities using CSS custom properties (mobile: 320px-767px, tablet: 768px-1023px, desktop: 1024px+)
  - Create main.css that imports all base styles
  - _Requirements: 3.1, 3.3, 3.4, 3.5, 17.1, 17.2, 17.3, 18.1, 18.2, 18.3, 19.1, 19.2, 19.3_

- [x] 3. Build layout system and grid
  - Create container utilities in src/styles/layouts/containers.css with max-width constraints (800px for content, 1200px for wide sections)
  - Implement CSS Grid utilities in src/styles/layouts/grid.css for responsive layouts
  - Create responsive spacing utilities using the defined spacing scale
  - Add flexbox utilities for common layout patterns
  - _Requirements: 2.2, 19.3, 19.4_

- [x] 4. Implement header component
- [x] 4.1 Create header HTML structure
  - Build header component in src/components/header.html with: logo (600x75px white transparent), email link, language switcher (DE/EN flags), main navigation (Home, Services dropdown, About Us dropdown, Contact), phone numbers (+34 691 367 430, +49 171 6502219), mobile menu toggle button
  - Add proper semantic HTML5 elements (header, nav) and ARIA labels (aria-label, aria-expanded, aria-haspopup)
  - Structure navigation with nested ul/li for dropdown menus
  - _Requirements: 5.1, 5.6, 15.2_

- [x] 4.2 Style header component
  - Write src/styles/components/header.css with dark background (#111111), sticky positioning (position: sticky, top: 0, z-index: 100)
  - Style navigation menu with horizontal layout on desktop, yellow hover effects (#ffe928)
  - Implement responsive mobile menu styles (hamburger icon, slide-in/overlay menu)
  - Style dropdown submenus with proper positioning and transitions
  - Add focus indicators for keyboard navigation
  - _Requirements: 3.1, 3.3, 5.1, 5.6, 15.1_

- [x] 4.3 Implement navigation JavaScript
  - Write src/scripts/navigation.js with mobile menu toggle functionality (open/close, toggle aria-expanded)
  - Implement dropdown menu interactions (hover on desktop, click on mobile)
  - Add keyboard navigation support (Tab, Enter, Escape keys)
  - Handle click-outside to close dropdowns and mobile menu
  - Manage focus trapping in mobile menu when open
  - _Requirements: 5.2, 5.3, 5.4, 5.5, 15.1, 20.1, 20.2, 20.3, 20.4, 20.5_

- [x] 5. Implement footer component
- [x] 5.1 Create footer HTML structure
  - Build footer component in src/components/footer.html with: logo (300px white), "Call us" section (both phone numbers), "Send Us A Message" quick contact form (name, email, message fields), location info (Son Bonet address), newsletter signup form, embedded map placeholder (iframe or div)
  - Add footer bottom section with copyright notice and legal links (AGB/Terms, Datenschutz/Privacy, Impressum/Imprint)
  - Use semantic HTML (footer, address elements) and proper form labels
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 5.2 Style footer component
  - Write src/styles/components/footer.css with dark background (#111111 or #202020)
  - Style footer columns with responsive CSS Grid (4-5 columns on desktop, stacked on mobile)
  - Style forms with consistent input styling, yellow accent buttons
  - Add spacing between sections using defined spacing scale
  - Style map container with appropriate dimensions
  - _Requirements: 3.1, 11.1_

- [x] 6. Create language switching system
- [x] 6.1 Implement language switcher JavaScript
  - Write src/scripts/language-switcher.js with URL path mapping (e.g., /de/flugzeugcharter.html ↔ /en/aircraft-charter.html, /de/flotte.html ↔ /en/fleet.html)
  - Handle language switching by detecting current page and navigating to corresponding page in other language
  - Store language preference in localStorage
  - Add event listeners to language flag buttons
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 6.2 Create content.json data structure
  - Create src/assets/data/content.json with bilingual content structure
  - Include navigation labels (Home, Services, About Us, Contact and all submenu items) in both languages
  - Add service data (5 services: Aircraft Charter, BlockCharter, PPL-365, Hour Building, Trial Flights) with titles, descriptions, icons, images, links
  - Include team member data (names, roles, bios, images) in both languages
  - Add aircraft data (specs, descriptions, images) in both languages
  - Include page-specific content for all service pages
  - _Requirements: 1.1, 1.2, 4.2, 6.1, 6.2, 7.2, 8.2, 23.1, 23.2, 23.3, 23.4, 23.5_

- [x] 6.3 Add hreflang and canonical tags
  - Add hreflang link tags to HTML head of each page (e.g., <link rel="alternate" hreflang="de" href="/de/index.html">, <link rel="alternate" hreflang="en" href="/en/index.html">)
  - Add canonical URL tags to each page to avoid duplicate content
  - Ensure x-default hreflang points to appropriate default language
  - _Requirements: 1.4, 1.5, 12.3, 12.4_

- [x] 7. Build reusable card components
- [x] 7.1 Create service card component
  - Write HTML structure in src/components/service-card.html for service cards with: background image, icon overlay, title, description, "Learn More" link
  - Style in src/styles/components/cards.css with overlay effect (dark gradient over image), centered content
  - Add hover animations: slight scale transform, yellow accent on link/border
  - Make responsive: full width on mobile, grid layout on desktop
  - _Requirements: 4.2, 4.3, 21.3_

- [x] 7.2 Create team member card component
  - Write HTML structure for team member cards with: photo, name, role/title, bio text
  - Style with consistent card design, proper image sizing
  - Implement responsive grid layout (1 column mobile, 2-3 columns tablet/desktop)
  - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [x] 7.3 Create aircraft card component
  - Write HTML structure for aircraft cards with: aircraft image, name, specifications list (Power, Cruising Speed, Max Takeoff Weight, Range, Navigation)
  - Style aircraft specs as definition list or structured list
  - Add visual hierarchy for specs display
  - _Requirements: 7.1, 7.2, 7.3, 7.5_

- [x] 8. Implement cookie consent system
- [x] 8.1 Create cookie banner HTML and modal
  - Build cookie banner component in src/components/cookie-banner.html with: title, description text, "Accept All", "Essential Only", "Customize" buttons, privacy policy link
  - Create customization modal with checkboxes for: Essential (checked, disabled), Analytics, Marketing cookies
  - Add proper ARIA attributes (role="dialog", aria-label, aria-hidden)
  - _Requirements: 14.1, 14.2, 14.5_

- [x] 8.2 Style cookie banner
  - Write src/styles/components/cookie-banner.css with fixed positioning (bottom: 0, z-index: 1000)
  - Add slide-up animation (@keyframes slideUp, animation on load)
  - Style buttons: yellow accent (#ffe928) for "Accept All", secondary style for others
  - Style modal with overlay backdrop and centered content
  - Make responsive: full width on mobile, max-width on desktop
  - _Requirements: 14.1_

- [x] 8.3 Implement cookie consent JavaScript
  - Write src/scripts/cookie-consent.js to manage consent preferences (accept all, essential only, custom)
  - Store consent in cookie (name: cookieConsent, value: JSON with preferences, expiry: 365 days)
  - Check for existing consent on page load and hide banner if already set
  - Load analytics scripts (Google Analytics or similar) only after consent granted
  - Implement modal open/close functionality
  - _Requirements: 14.1, 14.2, 14.3, 14.5_

- [x] 9. Create form handling system
- [x] 9.1 Implement form validation JavaScript
  - Write src/scripts/forms.js with client-side validation (email format, required fields, min/max length)
  - Add real-time field validation with visual feedback (error/success states)
  - Implement honeypot field (hidden input) for spam prevention
  - Show error/success messages in user's language (detect from page URL or data attribute)
  - Validate on blur and on submit
  - _Requirements: 9.2, 9.3, 9.4, 22.2, 22.3_

- [x] 9.2 Set up form submission handling
  - Configure form action to point to Formspree endpoint or serverless function URL
  - Implement fetch API for AJAX form submission (prevent default, serialize FormData, POST request)
  - Handle success state: show success message, reset form
  - Handle error state: show error message, keep form data
  - Add loading state during submission
  - _Requirements: 9.4, 22.4_

- [x] 9.3 Create serverless function for form processing
  - Write serverless function (e.g., Netlify Function or Vercel Function) at /api/contact or /api/newsletter
  - Validate form data server-side (required fields, email format, honeypot check)
  - Integrate with email service API (SendGrid, Mailgun, or SMTP)
  - Add rate limiting (max 5 submissions per IP per hour)
  - Return JSON response with success/error status
  - _Requirements: 9.4, 22.4, 22.5_

- [x] 10. Build homepage
- [x] 10.1 Create German homepage (de/index.html)
  - Include header component and link to main.css and all scripts
  - Build hero section with tagline "Supporting pilots - Inspiring guests - Enabling students" and subtitle "...TRY US & FLY US – Das revolutionäre Erlebnis..."
  - Add services section with 5 service cards (Aircraft Charter, BlockCharter, Hour-Building, PPL-365, Trial Flights) using service card component structure
  - Include team preview section with 2-3 key team members
  - Include footer component
  - Add meta tags (title, description, Open Graph, hreflang, canonical)
  - _Requirements: 4.1, 4.2, 4.4, 4.5_

- [x] 10.2 Create English homepage (en/index.html)
  - Duplicate structure from German version
  - Update all content with English translations (tagline, subtitle, service titles/descriptions)
  - Update language switcher to point to /de/index.html
  - Update hreflang and canonical tags for English version
  - Update navigation links to English paths
  - _Requirements: 1.2, 1.3, 4.1, 4.2_

- [x] 10.3 Style homepage
  - Write src/styles/pages/home.css with hero section styling (full viewport height, background image with overlay, centered text)
  - Style services section with CSS Grid (1 column mobile, 2-3 columns tablet, 3 columns desktop)
  - Add background images and dark overlays for visual depth
  - Style team preview section with horizontal layout
  - Add section spacing and alternating background colors
  - _Requirements: 3.1, 3.2, 4.2, 4.3_

- [-] 11. Build service pages
- [x] 11.1 Create Aircraft Charter pages (de/flugzeugcharter.html, en/aircraft-charter.html)
  - Include header and footer components, add meta tags
  - Build hero section with aircraft charter imagery and title/subtitle
  - Add use cases section with 3 cards: Business Travel, Leisure & Tourism, Special Events (with icons and descriptions)
  - Display available aircraft section using aircraft card components (Socata TB20 Trinidad)
  - Include booking process explanation (4 steps: Contact, Quote, Confirm, Fly)
  - Add contact/quote request form at bottom
  - _Requirements: 6.1, 6.2, 6.3, 23.5_

- [x] 11.2 Create BlockCharter pages (de/blockcharter.html, en/blockcharter.html)
  - Include header and footer components, add meta tags
  - Build hero section with title "BlockCharter" and subtitle
  - Add benefits grid with 3 items: Weather Advantages (300+ sunny days), Cost Savings (package prices), Infrastructure (modern aircraft)
  - Include package options section (if applicable) or general description
  - Add call-to-action button for inquiries linking to contact page
  - _Requirements: 23.1_

- [x] 11.3 Create PPL365 Training pages (de/ppl365.html, en/ppl365.html)
  - Include header and footer components, add meta tags
  - Build hero section with training aircraft image and title "PPL-365 Training"
  - Add course overview section with description of PPL-A training according to EASA standards
  - Create requirements section: minimum age 17, Class 2 medical certificate, language proficiency
  - Display course structure: 100 hours theoretical training, 45+ flight hours practical, solo and cross-country flights
  - List benefits of training in Mallorca (weather, infrastructure, experience)
  - Add enrollment call-to-action
  - _Requirements: 23.2_

- [x] 11.4 Create Hour Building pages (de/hourbuilding.html, en/hour-building.html)
  - Include header and footer components, add meta tags
  - Build hero section with title "Hour Building"
  - Add purpose section: building required flight hours for commercial licenses
  - Display benefits list: competitive rates, flexible booking, various aircraft types, experienced instructors
  - Show pricing structure section (if specific prices available)
  - List available aircraft with hourly rates
  - Add booking call-to-action
  - _Requirements: 23.3_

- [x] 11.5 Create Trial Flights pages (de/rundfluge.html, en/trial-flights.html)
  - Include header and footer components, add meta tags
  - Build hero section with aerial photography of Mallorca
  - Create route cards section with 3 routes: Sa Foradada (30 min, coastal formation), Sa Dragonera (45 min, island), Palma City Tour (20 min, cathedral overflight)
  - Add pricing information for each route
  - Include "what to expect" section (safety briefing, flight experience, photo opportunities)
  - Add booking call-to-action
  - _Requirements: 6.4, 23.4_

- [x] 11.6 Style service pages
  - Write src/styles/pages/services.css for common service page elements
  - Style hero sections: full-width background images, dark overlay, centered text, min-height 50vh
  - Style benefits grids: CSS Grid 3 columns desktop, 1 column mobile, card-style items
  - Style feature lists and use case cards
  - Add responsive layouts with proper breakpoints
  - Style CTAs with yellow accent buttons
  - _Requirements: 6.1, 6.2_

- [x] 12. Build About Us pages
- [x] 12.1 Create Fleet pages (de/flotte.html, en/fleet.html)
  - Include header and footer components, add meta tags
  - Build page title section "Our Fleet" / "Unsere Flotte"
  - Display all available aircraft using aircraft card components
  - Show aircraft specifications for each: Power, Cruising Speed, Max Takeoff Weight, Range, Navigation equipment
  - Categorize aircraft with section headings: "Charter Aircraft" and "Training Aircraft"
  - Add high-quality aircraft images (main exterior shot, optional cockpit shot)
  - Include brief description for each aircraft
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 12.2 Create Team pages (de/team.html, en/team.html)
  - Include header and footer components, add meta tags
  - Build page title section "Our Team" / "Unser Team"
  - Display team members in grid layout using team member card components
  - Show for each member: photo, name, title/role, bio with qualifications and experience
  - Implement responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
  - Include key team members like Gregor Schulz (General Manager, Cpt. i.R. Ausbilder und COO)
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 12.3 Create Locations pages (de/standorte.html, en/locations.html)
  - Include header and footer components, add meta tags
  - Build page title section "Our Locations" / "Unsere Standorte"
  - Display Son Bonet location section: ICAO code (LESB), full address (Edificio 8, Ctra.Palma-Inca, km 6, 07141 Marratxi), description, image or embedded map
  - Display Stuttgart location section: ICAO code (EDDS), office address, contact details, description
  - Add location images or embedded Google Maps for each
  - Clearly distinguish locations with section headings and visual separation
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 12.4 Style About Us pages
  - Write src/styles/pages/fleet.css for aircraft display: grid layout, card styling, specs list formatting
  - Write src/styles/pages/team.css for team member grid: responsive grid, card styling, image sizing
  - Write src/styles/pages/locations.css for location sections: two-column layout, map container styling
  - Add responsive layouts with proper breakpoints
  - Ensure consistent spacing and typography
  - _Requirements: 7.1, 8.4, 8.5_

- [x] 13. Build Contact page
- [x] 13.1 Create Contact pages (de/kontakt.html, en/contact.html)
  - Include header and footer components, add meta tags
  - Build page title section "Contact Us" / "Kontakt"
  - Add contact form with fields: name (text, required), email (email, required), phone (tel, optional), message (textarea, required), honeypot field (hidden)
  - Display contact information section: phone numbers (+34 691 367 430 Mallorca, +49 171 6502219 Germany), email address (contact@flightservice365.com), physical address (Son Bonet, Edificio 8, Ctra.Palma-Inca, km 6, 07141 Marratxi)
  - Embed location map (Google Maps iframe or similar) showing Son Bonet location
  - Add form submission success/error message containers
  - _Requirements: 9.1, 9.2, 9.5, 9.6_

- [x] 13.2 Style Contact page
  - Write src/styles/pages/contact.css for two-column layout (form on left, contact info on right, stacked on mobile)
  - Style form fields: consistent input styling, proper spacing, focus states with yellow accent
  - Style submit button with yellow accent, hover effects
  - Add map container styling: appropriate height (400-500px), responsive width
  - Style contact information with icons and proper hierarchy
  - _Requirements: 9.1_

- [x] 14. Create legal pages
- [x] 14.1 Create Privacy Policy pages (de/datenschutz.html, en/privacy.html)
  - Include header and footer components, add meta tags
  - Add GDPR-compliant privacy policy content: data collection practices, purpose of data processing, user rights (access, deletion, portability)
  - Include cookie usage information: types of cookies used (essential, analytics, marketing), purpose, duration
  - Add data handling procedures: how data is stored, who has access, third-party services used
  - Include contact information for data protection inquiries
  - Add last updated date
  - _Requirements: 14.3, 14.4_

- [x] 14.2 Create Terms pages (de/agb.html, en/terms.html)
  - Include header and footer components, add meta tags
  - Add terms and conditions content: service usage terms, liability limitations, booking conditions, cancellation policies
  - Include dispute resolution procedures
  - Add last updated date
  - _Requirements: 11.4_

- [x] 14.3 Create Imprint pages (de/impressum.html, en/imprint.html)
  - Include header and footer components, add meta tags
  - Add company information: legal name, address, registration details
  - Include responsible person/management details
  - Add contact information: email, phone
  - Include VAT ID if applicable
  - Add regulatory authority information
  - _Requirements: 11.4_

- [x] 15. Implement SEO and meta tags
- [x] 15.1 Add meta tags to all pages
  - Add proper title tags for each page (format: "Page Name - Flight Service 365", max 60 characters)
  - Add meta descriptions (unique for each page, 150-160 characters, compelling and keyword-rich)
  - Add Open Graph tags: og:title, og:description, og:image, og:url, og:type, og:site_name
  - Include Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
  - Add viewport meta tag for responsive design
  - Include charset meta tag (UTF-8)
  - _Requirements: 12.1, 12.2, 12.5_

- [x] 15.2 Generate sitemap.xml
  - Create public/sitemap.xml with all pages in both languages (26 pages total: 13 German + 13 English)
  - Include proper priority values (homepage: 1.0, main pages: 0.8, service pages: 0.7, legal pages: 0.3)
  - Set change frequency (homepage: weekly, service pages: monthly, legal pages: yearly)
  - Add lastmod dates
  - Follow XML sitemap protocol format
  - _Requirements: 12.1_

- [x] 15.3 Create robots.txt
  - Create public/robots.txt file
  - Allow all user agents to crawl all pages (User-agent: *, Allow: /)
  - Add sitemap location (Sitemap: https://www.flightservice365.com/sitemap.xml)
  - Optionally disallow crawling of admin or private directories if any
  - _Requirements: 12.1_

- [x] 16. Optimize images and assets
- [x] 16.1 Organize image assets
  - Create directory structure: src/assets/images/{logos, team, fleet, backgrounds, icons, services, flags, routes}
  - Add placeholder images for development: logo (600x75px white transparent), team photos, aircraft photos, service background images, flag icons (DE/EN), route images
  - Document required images in README or separate file
  - _Requirements: 16.1, 16.5_

- [x] 16.2 Implement responsive images
  - Use picture element with WebP and fallback formats (JPEG/PNG) for all images
  - Add srcset attribute for different screen sizes (320w, 768w, 1024w, 1920w)
  - Include descriptive alt text for all images (aircraft names, team member names, location descriptions)
  - Add loading="lazy" attribute to images below the fold
  - Add width and height attributes to prevent layout shift
  - _Requirements: 2.3, 13.4, 16.2, 16.3, 16.4_

- [x] 16.3 Set up image optimization in build process
  - Configure Vite plugin for image optimization (vite-plugin-imagemin or vite-imagetools)
  - Set up automatic WebP generation with quality settings (80-85%)
  - Configure image compression for JPEG (quality 85%) and PNG (lossless compression)
  - Set up automatic responsive image generation if using vite-imagetools
  - _Requirements: 13.1, 13.4_

- [x] 17. Implement accessibility features
- [x] 17.1 Add keyboard navigation support
  - Ensure all interactive elements (links, buttons, form inputs) are keyboard accessible with Tab key
  - Add visible focus indicators with yellow outline (outline: 2px solid #ffe928, outline-offset: 2px)
  - Implement skip to main content link at top of page (visually hidden until focused)
  - Verify logical tab order follows visual flow of page
  - Ensure dropdown menus can be opened and navigated with keyboard (Enter/Space to open, Arrow keys to navigate, Escape to close)
  - _Requirements: 15.1, 15.5_

- [x] 17.2 Add ARIA labels and semantic HTML
  - Use semantic HTML5 elements throughout: header, nav, main, section, article, aside, footer
  - Add ARIA labels for icon-only buttons (aria-label="Open menu", aria-label="Close menu")
  - Add ARIA attributes for navigation: aria-expanded, aria-haspopup, aria-current
  - Implement ARIA live regions for dynamic content (form success/error messages with role="alert" aria-live="polite")
  - Associate all form labels with inputs using for/id attributes
  - Add role="dialog" and aria-modal="true" to modals
  - _Requirements: 15.2_

- [x] 17.3 Verify color contrast
  - Test all text/background combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
  - Verify white text (#ffffff) on dark backgrounds (#111111, #202020, #333333) meets contrast requirements
  - Ensure yellow accent (#ffe928) on dark backgrounds meets contrast for interactive elements
  - Ensure focus indicators have 3:1 contrast ratio against background
  - Use browser DevTools or online contrast checker to verify
  - _Requirements: 15.3_

- [x] 17.4 Test responsive text scaling
  - Verify text remains readable at 200% browser zoom (no text truncation or overlap)
  - Test that line height (1.5-1.6 for body text) provides adequate spacing
  - Ensure paragraph width doesn't exceed 80 characters for readability
  - Test that all interactive elements remain clickable at 200% zoom
  - _Requirements: 15.4_

- [x] 18. Set up deployment configuration
- [x] 18.1 Create GitHub Actions workflow
  - Create .github/workflows/deploy.yml file
  - Configure workflow to trigger on push to main branch
  - Add build step: install dependencies (npm ci), run build (npm run build)
  - Add deployment step: deploy dist folder to GitHub Pages using actions/deploy-pages or similar
  - Set up GitHub Pages in repository settings to deploy from gh-pages branch or GitHub Actions
  - _Requirements: 13.3_

- [x] 18.2 Create Dockerfile for future VPS deployment
  - Write multi-stage Dockerfile: stage 1 (build with Node.js, run npm install and npm run build), stage 2 (serve with Nginx, copy dist folder)
  - Create nginx.conf with proper routing (try_files for SPA-like routing, gzip compression, caching headers)
  - Add security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
  - Add health check configuration (HEALTHCHECK instruction)
  - Expose port 80
  - _Requirements: 13.3_

- [x] 18.3 Create docker-compose.yml for local testing
  - Configure Docker Compose service for web application
  - Map port 80 to host port (e.g., 8080:80)
  - Set up volume mounts for development if needed
  - Add environment variables section (placeholder for future use)
  - _Requirements: 13.3_

- [x] 18.4 Add deployment documentation
  - Create DEPLOYMENT.md file
  - Document GitHub Pages deployment: prerequisites, setup steps, automatic deployment process
  - Document Coolify/VPS deployment: Docker setup, environment variables, domain configuration
  - Include troubleshooting section for common deployment issues
  - Add instructions for updating content and redeploying
  - _Requirements: 13.3_

- [x] 19. Create custom 404 page
- [x] 19.1 Build 404 pages (de/404.html, en/404.html)
  - Include header and footer components to maintain consistency
  - Create error content section: large "404" display, "Page not found" / "Seite nicht gefunden" heading, friendly explanation message
  - Add suggestions section with links to popular pages: Home, Aircraft Charter, Fleet, Contact
  - Include language switcher in header to allow trying other language
  - Add "Back to Home" button with yellow accent styling
  - Style with centered layout, appropriate spacing, maintain brand colors
  - Configure server/hosting to serve these pages for 404 errors
  - _Requirements: 1.3_

- [x] 20. Final integration and testing
- [x] 20.1 Test language switching across all pages
  - Manually test language switcher on every page (13 pages × 2 languages = 26 pages)
  - Verify URL translation works correctly (e.g., /de/flugzeugcharter.html ↔ /en/aircraft-charter.html)
  - Check that language preference is stored in localStorage
  - Verify hreflang tags are correct in HTML head of all pages
  - Test that navigation links update correctly when switching languages
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 20.2 Test responsive design on all breakpoints
  - Test mobile (320px-767px): hamburger menu, stacked layouts, touch targets, font sizes
  - Test tablet (768px-1023px): grid layouts adapt, navigation behavior, image sizing
  - Test desktop (1024px+): full navigation, multi-column layouts, hover effects
  - Verify all components adapt properly: header, footer, cards, forms, images
  - Test on actual devices if possible (iPhone, iPad, Android)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 20.3 Test form submissions
  - Test contact form: validation (required fields, email format), submission, success/error messages
  - Test newsletter signup: email validation, submission, success message
  - Test footer quick contact form: validation, submission
  - Verify honeypot spam prevention works
  - Test error messages display in correct language
  - Verify form data is sent to correct endpoint and emails are received
  - _Requirements: 9.2, 9.3, 9.4, 22.2, 22.3, 22.4_

- [x] 20.4 Test cookie consent flow
  - Test banner appearance on first visit (after 1 second delay)
  - Test "Accept All" button: banner dismisses, consent stored, analytics loads
  - Test "Essential Only" button: banner dismisses, only essential cookies set
  - Test "Customize" button: modal opens, preferences can be selected, saved correctly
  - Verify consent preferences are stored in cookie with 365-day expiry
  - Test that banner doesn't appear on subsequent visits if consent given
  - Verify analytics scripts only load after consent granted
  - _Requirements: 14.1, 14.2, 14.5_

- [x] 20.5 Run accessibility audit
  - Run Lighthouse accessibility audit in Chrome DevTools (target score 90+)
  - Test with screen reader (NVDA on Windows or VoiceOver on Mac): navigation, form labels, image alt text, heading structure
  - Verify keyboard navigation: Tab through all interactive elements, Enter/Space to activate, Escape to close modals
  - Check color contrast ratios using browser DevTools or WebAIM contrast checker
  - Test focus indicators are visible on all interactive elements
  - Verify skip to main content link works
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 20.6 Run performance audit
  - Run Lighthouse performance audit in Chrome DevTools (target score 90+)
  - Test page load times using Network tab (target < 3s on 3G, < 1s on broadband)
  - Verify Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
  - Test on mobile devices or using mobile emulation
  - Check image optimization: WebP format used, lazy loading working, appropriate sizes
  - Verify CSS and JS are minified in production build
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 20.7 Validate SEO implementation
  - Verify all meta tags are present on all pages: title, description, Open Graph, Twitter Card
  - Test Open Graph tags with Facebook Sharing Debugger and Twitter Card Validator
  - Validate sitemap.xml format using online validator or Google Search Console
  - Check robots.txt is accessible and correctly formatted
  - Verify canonical URLs are present and correct on all pages
  - Verify hreflang tags point to correct language versions
  - Test structured data if implemented (using Google Rich Results Test)
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 21. Build and deploy to GitHub Pages
  - Run production build locally: npm run build
  - Test built files locally: serve dist folder with local server, verify all pages work
  - Commit and push code to GitHub repository
  - Verify GitHub Actions workflow runs successfully
  - Check deployment to GitHub Pages completes
  - Test live site on GitHub Pages URL: verify all pages load, links work, images display
  - Test on multiple browsers: Chrome, Firefox, Safari, Edge
  - _Requirements: 13.3_

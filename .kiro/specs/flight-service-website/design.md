# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for the Flight Service 365 website. The site will be built as a modern, static website with bilingual support (German/English), featuring a dark, professional design aesthetic appropriate for an aviation services company.

The design prioritizes:
- **Performance**: Fast loading times with optimized assets
- **Accessibility**: WCAG AA compliance for all users
- **Responsiveness**: Seamless experience across all devices
- **SEO**: Proper meta tags, structured data, and multilingual support
- **Maintainability**: Clean, modular code structure

## Architecture

### Technology Stack

**Frontend Framework:**
- HTML5 for semantic markup
- CSS3 with modern features (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript for interactivity (no heavy framework needed)
- Progressive enhancement approach

**Build Tools:**
- Modern bundler (Vite or Parcel) for development and production builds
- PostCSS for CSS processing and autoprefixing
- Image optimization pipeline for WebP conversion and responsive images

**Hosting Considerations:**
- Static site hosting (Netlify, Vercel, or similar)
- CDN for global content delivery
- HTTPS by default

### Project Structure

```
flight-service-website/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logos/
│   │   │   ├── team/
│   │   │   ├── fleet/
│   │   │   ├── backgrounds/
│   │   │   ├── icons/
│   │   │   ├── services/
│   │   │   └── flags/
│   │   ├── fonts/
│   │   └── data/
│   │       └── content.json
│   ├── styles/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── navigation.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   └── cookie-banner.css
│   │   ├── layouts/
│   │   │   ├── grid.css
│   │   │   └── containers.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── services.css
│   │       ├── contact.css
│   │       ├── fleet.css
│   │       └── team.css
│   ├── scripts/
│   │   ├── navigation.js
│   │   ├── language-switcher.js
│   │   ├── forms.js
│   │   ├── cookie-consent.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── de/
│   │   │   ├── index.html
│   │   │   ├── flugzeugcharter.html
│   │   │   ├── blockcharter.html
│   │   │   ├── flotte.html
│   │   │   ├── ppl365.html
│   │   │   ├── hourbuilding.html
│   │   │   ├── rundfluge.html
│   │   │   ├── standorte.html
│   │   │   ├── team.html
│   │   │   ├── kontakt.html
│   │   │   ├── datenschutz.html
│   │   │   ├── impressum.html
│   │   │   └── agb.html
│   │   └── en/
│   │       ├── index.html
│   │       ├── aircraft-charter.html
│   │       ├── blockcharter.html
│   │       ├── fleet.html
│   │       ├── ppl365.html
│   │       ├── hour-building.html
│   │       ├── trial-flights.html
│   │       ├── locations.html
│   │       ├── team.html
│   │       ├── contact.html
│   │       ├── privacy.html
│   │       ├── imprint.html
│   │       └── terms.html
│   └── components/
│       ├── header.html
│       ├── footer.html
│       ├── service-card.html
│       └── cookie-banner.html
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── config/
    └── i18n.json
```

## Components and Interfaces

### 1. Header Component

**Purpose:** Consistent navigation and branding across all pages

**Structure:**
```html
<header class="site-header">
  <div class="header-top">
    <a href="mailto:contact@flightservice365.com" class="header-email">
      contact@flightservice365.com
    </a>
    <div class="language-switcher">
      <button data-lang="de" aria-label="Deutsch">
        <img src="/assets/flags/de.png" alt="Deutsch">
      </button>
      <button data-lang="en" aria-label="English">
        <img src="/assets/flags/en.png" alt="English">
      </button>
    </div>
  </div>
  
  <div class="header-main">
    <a href="/" class="logo">
      <img src="/assets/logos/logo-white-600.png" alt="Flight Service 365">
    </a>
    
    <nav class="main-navigation" aria-label="Main navigation">
      <ul class="nav-menu">
        <li><a href="/">Home</a></li>
        <li class="has-submenu">
          <button aria-expanded="false">Services</button>
          <ul class="submenu">
            <li><a href="/aircraft-charter">Aircraft Charter</a></li>
            <li><a href="/blockcharter">BlockCharter</a></li>
            <li><a href="/ppl365">PPL-A/NFQ</a></li>
            <li><a href="/hour-building">Hour Building</a></li>
            <li><a href="/trialflights">Trial Flights</a></li>
          </ul>
        </li>
        <li class="has-submenu">
          <button aria-expanded="false">About Us</button>
          <ul class="submenu">
            <li><a href="/team">Team</a></li>
            <li><a href="/fleet">Fleet</a></li>
            <li><a href="/locations">Locations</a></li>
          </ul>
        </li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    
    <button class="mobile-menu-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <div class="header-phones">
      <a href="tel:+34691367430">+34 691 367 430</a>
      <a href="tel:+491716502219">+49 171 6502219</a>
    </div>
  </div>
</header>
```

**Styling Approach:**
- Sticky header on scroll
- Dark background (#111111) with white text
- Yellow hover effects (#ffe928)
- Mobile: Hamburger menu with slide-in navigation
- Desktop: Horizontal menu with dropdown submenus

### 2. Footer Component

**Purpose:** Consistent contact information, newsletter signup, and site links

**Structure:**
```html
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-column footer-logo">
      <img src="/assets/logos/logo-white-300.png" alt="Flight Service 365">
    </div>
    
    <div class="footer-column footer-contact">
      <h3>Call us</h3>
      <a href="tel:+34691367430">+34 691 367 430</a>
      <a href="tel:+491716502219">+49 171 6502219</a>
    </div>
    
    <div class="footer-column footer-form">
      <h3>Send Us A Message</h3>
      <form class="quick-contact-form">
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <textarea name="message" placeholder="Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
    
    <div class="footer-column footer-location">
      <h3>Unser Standort</h3>
      <address>
        Son Bonet<br>
        Edificio 8<br>
        Ctra.Palma-Inca, km 6<br>
        07141 Marratxi
      </address>
      <div class="footer-map">
        <!-- Embedded map -->
      </div>
    </div>
    
    <div class="footer-column footer-newsletter">
      <h4>Newsletter</h4>
      <form class="newsletter-form">
        <input type="email" placeholder="Your email" required>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>Copyright © 2021. All rights reserved.</p>
    <nav class="footer-legal">
      <a href="/terms">AGB</a>
      <a href="/privacy">Datenschutz</a>
      <a href="/imprint">Impressum</a>
    </nav>
  </div>
</footer>
```

### 3. Service Card Component

**Purpose:** Reusable card for displaying services on homepage

**Structure:**
```html
<article class="service-card">
  <div class="service-card-image">
    <img src="/assets/images/service-bg.jpg" alt="Service name">
  </div>
  <div class="service-card-content">
    <img src="/assets/icons/service-icon.png" alt="" class="service-icon">
    <h3 class="service-title">Service Name</h3>
    <p class="service-description">Brief description of the service</p>
    <a href="/service-page" class="service-link">Learn More</a>
  </div>
</article>
```

**Styling:**
- Overlay effect with background image
- Icon positioned at top
- Hover effect: slight scale and yellow accent
- Responsive: Full width on mobile, grid on desktop

### 4. Team Member Card

**Purpose:** Display team member information

**Structure:**
```html
<article class="team-member">
  <div class="team-member-image">
    <img src="/assets/images/team/member.jpg" alt="Member Name">
  </div>
  <div class="team-member-info">
    <h3 class="team-member-name">Member Name</h3>
    <p class="team-member-role">Role/Title</p>
    <p class="team-member-bio">Brief biography and qualifications</p>
  </div>
</article>
```

### 5. Aircraft Card

**Purpose:** Display aircraft specifications

**Structure:**
```html
<article class="aircraft-card">
  <div class="aircraft-image">
    <img src="/assets/images/fleet/aircraft.jpg" alt="Aircraft Name">
  </div>
  <div class="aircraft-details">
    <h3 class="aircraft-name">Aircraft Name</h3>
    <ul class="aircraft-specs">
      <li><strong>Power:</strong> 250 hp</li>
      <li><strong>Cruising Speed:</strong> 290 km/h (157 kts)</li>
      <li><strong>Max Takeoff Weight:</strong> 1,399 kg</li>
      <li><strong>Range:</strong> 1050 NM (1,700 km)</li>
      <li><strong>Navigation:</strong> VOR, DME, Garmin GNS430</li>
    </ul>
  </div>
</article>
```

### 6. Cookie Consent Banner

**Purpose:** GDPR compliance for cookie usage tracking (Requirements 14.1, 14.2, 14.5)

**Rationale:** European regulations require explicit user consent before setting non-essential cookies. The banner must be non-intrusive yet clearly visible, with options to accept all, reject non-essential, or customize preferences. This component ensures compliance with GDPR by only activating non-essential cookies after explicit user consent.

**Structure:**
```html
<div class="cookie-banner" role="dialog" aria-label="Cookie consent" aria-hidden="false">
  <div class="cookie-banner-content">
    <h3 class="cookie-banner-title">Cookie Settings</h3>
    <p class="cookie-banner-text">
      We use cookies to enhance your browsing experience and analyze site traffic. 
      You can accept all cookies or customize your preferences.
    </p>
    <div class="cookie-banner-actions">
      <button class="btn btn-accept-all" data-action="accept-all">Accept All</button>
      <button class="btn btn-essential-only" data-action="essential-only">Essential Only</button>
      <button class="btn btn-customize" data-action="customize">Customize</button>
    </div>
    <a href="/privacy" class="cookie-banner-link">Privacy Policy</a>
  </div>
</div>

<!-- Customization Modal (shown when "Customize" is clicked) -->
<div class="cookie-modal" role="dialog" aria-hidden="true">
  <div class="cookie-modal-content">
    <h3>Cookie Preferences</h3>
    <div class="cookie-category">
      <label>
        <input type="checkbox" checked disabled>
        <strong>Essential Cookies</strong>
        <span>Required for site functionality</span>
      </label>
    </div>
    <div class="cookie-category">
      <label>
        <input type="checkbox" name="analytics">
        <strong>Analytics Cookies</strong>
        <span>Help us understand how visitors use our site</span>
      </label>
    </div>
    <div class="cookie-category">
      <label>
        <input type="checkbox" name="marketing">
        <strong>Marketing Cookies</strong>
        <span>Used to deliver relevant advertisements</span>
      </label>
    </div>
    <div class="cookie-modal-actions">
      <button class="btn btn-save">Save Preferences</button>
      <button class="btn btn-cancel">Cancel</button>
    </div>
  </div>
</div>
```

**Styling:**
- Fixed position at bottom of viewport
- Dark background with yellow accent for primary action
- Slide-up animation on page load (after 1 second delay)
- Z-index above all content but below modals
- Mobile: Full width, stacked buttons
- Desktop: Centered, horizontal button layout

## Data Models

### Content Structure (JSON)

**Language Content Model:**
```json
{
  "de": {
    "navigation": {
      "home": "Startseite",
      "services": "Services",
      "about": "Über uns",
      "contact": "Kontakt"
    },
    "pages": {
      "home": {
        "title": "Startseite - Flight Service",
        "hero": {
          "tagline": "Supporting pilots - Inspiring guests - Enabling students",
          "subtitle": "...TRY US & FLY US – Das revolutionäre Erlebnis..."
        },
        "services": [
          {
            "id": "aircraft-charter",
            "title": "Flugzeug Charter",
            "description": "Ausflug oder Geschäftsreise",
            "icon": "/assets/icons/icon-1.png",
            "image": "/assets/images/banner-1.jpg",
            "link": "/de/flugzeugcharter"
          },
          {
            "id": "blockcharter",
            "title": "BlockCharter",
            "description": "Flexible Flugstunden-Pakete",
            "icon": "/assets/icons/icon-2.png",
            "image": "/assets/images/banner-2.jpg",
            "link": "/de/blockcharter"
          },
          {
            "id": "hour-building",
            "title": "Hour-Building",
            "description": "Flugstunden sammeln",
            "icon": "/assets/icons/icon-3.png",
            "image": "/assets/images/banner-3.jpg",
            "link": "/de/hourbuilding"
          },
          {
            "id": "ppl365",
            "title": "PPL-365 Training",
            "description": "Pilotenausbildung",
            "icon": "/assets/icons/icon-4.png",
            "image": "/assets/images/banner-4.jpg",
            "link": "/de/ppl365"
          },
          {
            "id": "trial-flights",
            "title": "Rundflüge",
            "description": "Erleben Sie Mallorca von oben",
            "icon": "/assets/icons/icon-5.png",
            "image": "/assets/images/banner-5.jpg",
            "link": "/de/rundfluge"
          }
        ]
      },
      "blockcharter": {
        "title": "BlockCharter - Flight Service 365",
        "hero": {
          "title": "BlockCharter",
          "subtitle": "Flexible Flugstunden-Pakete für Ihre Bedürfnisse"
        },
        "benefits": [
          {
            "title": "Wetter-Vorteile",
            "description": "Mallorca bietet über 300 Sonnentage im Jahr - ideale Flugbedingungen"
          },
          {
            "title": "Kosteneinsparungen",
            "description": "Sparen Sie durch Paketpreise und vermeiden Sie Standgebühren"
          },
          {
            "title": "Infrastruktur",
            "description": "Moderne Flugzeuge und professionelle Wartung"
          }
        ]
      },
      "ppl365": {
        "title": "PPL-A/NFQ Training - Flight Service 365",
        "hero": {
          "title": "PPL-365 Training",
          "subtitle": "Ihre Pilotenausbildung auf Mallorca"
        },
        "courseInfo": {
          "description": "Komplette PPL-A Ausbildung nach EASA-Standards",
          "requirements": [
            "Mindestalter 17 Jahre",
            "Medizinisches Tauglichkeitszeugnis Klasse 2",
            "Ausreichende Deutschkenntnisse"
          ],
          "structure": [
            "Theoretische Ausbildung: 100 Stunden",
            "Praktische Ausbildung: Mindestens 45 Flugstunden",
            "Alleinflüge und Überlandflüge"
          ]
        }
      },
      "hourbuilding": {
        "title": "Hour-Building - Flight Service 365",
        "hero": {
          "title": "Hour-Building",
          "subtitle": "Sammeln Sie Flugstunden für Ihre Karriere"
        },
        "purpose": "Bauen Sie die erforderlichen Flugstunden für kommerzielle Lizenzen auf",
        "benefits": [
          "Günstige Stundenpreise",
          "Flexible Buchung",
          "Verschiedene Flugzeugtypen",
          "Erfahrene Fluglehrer verfügbar"
        ]
      },
      "trialflights": {
        "title": "Rundflüge - Flight Service 365",
        "hero": {
          "title": "Rundflüge über Mallorca",
          "subtitle": "Erleben Sie die Insel aus der Vogelperspektive"
        },
        "routes": [
          {
            "name": "Sa Foradada",
            "description": "Spektakuläre Küstenformation an der Westküste",
            "duration": "30 Minuten",
            "image": "/assets/images/routes/sa-foradada.jpg"
          },
          {
            "name": "Sa Dragonera",
            "description": "Unbewohnte Insel vor der Westküste Mallorcas",
            "duration": "45 Minuten",
            "image": "/assets/images/routes/sa-dragonera.jpg"
          },
          {
            "name": "Palma Rundflug",
            "description": "Überflug der Hauptstadt und Kathedrale",
            "duration": "20 Minuten",
            "image": "/assets/images/routes/palma.jpg"
          }
        ]
      }
    }
  },
  "en": {
    "navigation": {
      "home": "Home",
      "services": "Services",
      "about": "About Us",
      "contact": "Contact"
    },
    "pages": {
      "home": {
        "title": "Home - Flight Service",
        "hero": {
          "tagline": "Supporting pilots - Inspiring guests - Enabling students",
          "subtitle": "...TRY US & FLY US – The revolutionary experience..."
        },
        "services": [
          {
            "id": "aircraft-charter",
            "title": "Aircraft Charter",
            "description": "Excursion or business trip",
            "icon": "/assets/icons/icon-1.png",
            "image": "/assets/images/banner-1.jpg",
            "link": "/en/aircraft-charter"
          },
          {
            "id": "blockcharter",
            "title": "BlockCharter",
            "description": "Flexible flight hour packages",
            "icon": "/assets/icons/icon-2.png",
            "image": "/assets/images/banner-2.jpg",
            "link": "/en/blockcharter"
          },
          {
            "id": "hour-building",
            "title": "Hour Building",
            "description": "Build your flight hours",
            "icon": "/assets/icons/icon-3.png",
            "image": "/assets/images/banner-3.jpg",
            "link": "/en/hour-building"
          },
          {
            "id": "ppl365",
            "title": "PPL-365 Training",
            "description": "Pilot training",
            "icon": "/assets/icons/icon-4.png",
            "image": "/assets/images/banner-4.jpg",
            "link": "/en/ppl365"
          },
          {
            "id": "trial-flights",
            "title": "Trial Flights",
            "description": "Experience Mallorca from above",
            "icon": "/assets/icons/icon-5.png",
            "image": "/assets/images/banner-5.jpg",
            "link": "/en/trial-flights"
          }
        ]
      },
      "blockcharter": {
        "title": "BlockCharter - Flight Service 365",
        "hero": {
          "title": "BlockCharter",
          "subtitle": "Flexible flight hour packages for your needs"
        },
        "benefits": [
          {
            "title": "Weather Advantages",
            "description": "Mallorca offers over 300 sunny days per year - ideal flying conditions"
          },
          {
            "title": "Cost Savings",
            "description": "Save with package prices and avoid parking fees"
          },
          {
            "title": "Infrastructure",
            "description": "Modern aircraft and professional maintenance"
          }
        ]
      },
      "ppl365": {
        "title": "PPL-A/NFQ Training - Flight Service 365",
        "hero": {
          "title": "PPL-365 Training",
          "subtitle": "Your pilot training in Mallorca"
        },
        "courseInfo": {
          "description": "Complete PPL-A training according to EASA standards",
          "requirements": [
            "Minimum age 17 years",
            "Class 2 medical certificate",
            "Sufficient language proficiency"
          ],
          "structure": [
            "Theoretical training: 100 hours",
            "Practical training: Minimum 45 flight hours",
            "Solo flights and cross-country flights"
          ]
        }
      },
      "hourbuilding": {
        "title": "Hour Building - Flight Service 365",
        "hero": {
          "title": "Hour Building",
          "subtitle": "Build flight hours for your career"
        },
        "purpose": "Build the required flight hours for commercial licenses",
        "benefits": [
          "Competitive hourly rates",
          "Flexible booking",
          "Various aircraft types",
          "Experienced flight instructors available"
        ]
      },
      "trialflights": {
        "title": "Trial Flights - Flight Service 365",
        "hero": {
          "title": "Trial Flights over Mallorca",
          "subtitle": "Experience the island from a bird's eye view"
        },
        "routes": [
          {
            "name": "Sa Foradada",
            "description": "Spectacular coastal formation on the west coast",
            "duration": "30 minutes",
            "image": "/assets/images/routes/sa-foradada.jpg"
          },
          {
            "name": "Sa Dragonera",
            "description": "Uninhabited island off the west coast of Mallorca",
            "duration": "45 minutes",
            "image": "/assets/images/routes/sa-dragonera.jpg"
          },
          {
            "name": "Palma City Tour",
            "description": "Overflight of the capital and cathedral",
            "duration": "20 minutes",
            "image": "/assets/images/routes/palma.jpg"
          }
        ]
      }
    }
  }
}
```

### Team Member Model:
```json
{
  "id": "gregor-schulz",
  "name": "Gregor Schulz",
  "role": {
    "de": "General Manager, Cpt. i.R. Ausbilder und COO",
    "en": "General Manager, Cpt. retd Instructor and COO"
  },
  "bio": {
    "de": "Der erfahrene Pilot und Ausbilder sitzt seit über 50 Jahren im Cockpit...",
    "en": "The experienced pilot and instructor has been in the cockpit for over 50 years..."
  },
  "image": "/assets/images/team/gregor-schulz.jpg",
  "order": 1
}
```

### Aircraft Model:
```json
{
  "id": "socata-tb20",
  "name": "Socata TB20 Trinidad",
  "category": "charter",
  "specs": {
    "power": "250 PS",
    "cruisingSpeed": "290 km/h (157 Kts)",
    "maxTakeoffWeight": "1,399 kg",
    "range": "1050 NM (1,700 Km)",
    "navigation": "VOR, DME, Garmin GNS430, Autopilot"
  },
  "images": [
    "/assets/images/fleet/tb20-main.jpg",
    "/assets/images/fleet/tb20-cockpit.jpg"
  ],
  "description": {
    "de": "1-motoriges Kurzstrecken- und Ausflugsflugzeug",
    "en": "1-engine short-haul and excursion aircraft"
  }
}
```

### Aircraft Charter Page Content Model:
```json
{
  "aircraftCharter": {
    "title": "Aircraft Charter - Flight Service 365",
    "hero": {
      "title": "Aircraft Charter",
      "subtitle": "Your private flight solution for business and leisure"
    },
    "useCases": [
      {
        "title": "Business Travel",
        "description": "Efficient point-to-point travel for executives and teams",
        "icon": "/assets/icons/business.png"
      },
      {
        "title": "Leisure & Tourism",
        "description": "Explore destinations at your own pace",
        "icon": "/assets/icons/leisure.png"
      },
      {
        "title": "Special Events",
        "description": "Arrive in style for weddings, conferences, and celebrations",
        "icon": "/assets/icons/events.png"
      }
    ],
    "bookingProcess": {
      "title": "How It Works",
      "steps": [
        "Contact us with your travel requirements",
        "Receive a customized quote",
        "Confirm your booking",
        "Enjoy your flight"
      ]
    },
    "availableAircraft": [
      "socata-tb20"
    ]
  }
}
```

## Error Handling

### 404 Page Not Found

**Rationale:** A custom 404 page (Requirements 1.3) maintains brand consistency and helps users find their way back to relevant content, reducing bounce rates from broken links.

**Design Approach:**
- Maintain full header and footer for consistent navigation
- Include language switcher to allow users to try the other language
- Provide helpful suggestions for popular pages
- Use friendly, professional messaging appropriate for aviation industry

**404 Page Structure:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seite nicht gefunden - Flight Service 365</title>
  <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
  <!-- Include standard header component -->
  
  <main class="error-page">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Seite nicht gefunden</h2>
      <p class="error-message">
        Die von Ihnen gesuchte Seite existiert leider nicht. 
        Möglicherweise wurde sie verschoben oder gelöscht.
      </p>
      
      <div class="error-suggestions">
        <h3>Beliebte Seiten:</h3>
        <ul>
          <li><a href="/de/index.html">Startseite</a></li>
          <li><a href="/de/flugzeugcharter.html">Flugzeug Charter</a></li>
          <li><a href="/de/flotte.html">Unsere Flotte</a></li>
          <li><a href="/de/kontakt.html">Kontakt</a></li>
        </ul>
      </div>
      
      <a href="/de/index.html" class="btn-primary">Zur Startseite</a>
    </div>
  </main>
  
  <!-- Include standard footer component -->
</body>
</html>
```

**Styling:**
```css
.error-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-60);
  background-color: var(--color-bg-dark-1);
}

.error-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: var(--color-accent-yellow);
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: var(--font-size-xlarge);
  color: var(--color-white);
  margin: var(--space-40) 0;
}

.error-message {
  font-size: var(--font-size-medium);
  color: var(--color-white);
  margin-bottom: var(--space-60);
}

.error-suggestions {
  margin: var(--space-60) 0;
  text-align: left;
}

.error-suggestions ul {
  list-style: none;
  padding: 0;
}

.error-suggestions li {
  margin: var(--space-30) 0;
}

.error-suggestions a {
  color: var(--color-white);
  text-decoration: underline;
  transition: var(--transition-fast);
}

.error-suggestions a:hover {
  color: var(--color-accent-yellow);
}
```

### Form Validation and Submission

**Rationale:** Since this is a static site, form submissions require a third-party service or serverless function. We'll use a progressive enhancement approach that works without JavaScript but enhances with it.

**Client-Side Validation:**
- Email format validation using HTML5 pattern attribute
- Required field validation
- Real-time feedback as user types
- Clear error messages in user's language
- Field-level validation feedback with visual indicators

**Form Submission Strategy:**
```javascript
// forms.js - Progressive enhancement approach
const FormHandler = (() => {
  const init = () => {
    const forms = document.querySelectorAll('form[data-ajax]');
    forms.forEach(form => {
      form.addEventListener('submit', handleSubmit);
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Validate
    if (!form.checkValidity()) {
      showValidationErrors(form);
      return;
    }
    
    // Submit via fetch to serverless function or form service
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showSuccessMessage(form);
        form.reset();
      } else {
        showErrorMessage(form);
      }
    } catch (error) {
      showErrorMessage(form);
    }
  };
  
  return { init };
})();
```

**Backend Options:**
1. **Formspree/Netlify Forms** - Simple form handling service
2. **Serverless Function** - AWS Lambda, Netlify Functions, or Vercel Functions
3. **Email Service API** - SendGrid, Mailgun for direct email sending

**Newsletter Subscription:**

**Rationale:** Newsletter signup (Requirements 22.1-22.5) provides a way to maintain engagement with potential customers while complying with GDPR requirements.

**Implementation Approach:**
- Integrate with email marketing service (Mailchimp, SendGrid, or similar)
- Double opt-in confirmation email required for GDPR compliance
- Store preferences in service provider's system
- GDPR-compliant data handling with clear privacy policy link

**Newsletter Form Structure:**
```html
<form class="newsletter-form" data-ajax action="/api/newsletter-signup" method="POST">
  <div class="form-group">
    <label for="newsletter-email" class="sr-only">Email Address</label>
    <input 
      type="email" 
      id="newsletter-email"
      name="email" 
      placeholder="Your email" 
      required
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    >
  </div>
  <button type="submit" class="btn-primary">Subscribe</button>
  <p class="newsletter-privacy">
    By subscribing, you agree to our <a href="/privacy">Privacy Policy</a>
  </p>
  <div class="form-message" role="alert" aria-live="polite"></div>
</form>
```

**JavaScript Handling:**
```javascript
// Newsletter signup handling in forms.js
const handleNewsletterSignup = async (form) => {
  const email = form.querySelector('input[type="email"]').value;
  const messageEl = form.querySelector('.form-message');
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    if (response.ok) {
      messageEl.textContent = 'Thank you! Please check your email to confirm your subscription.';
      messageEl.className = 'form-message success';
      form.reset();
    } else {
      throw new Error('Subscription failed');
    }
  } catch (error) {
    messageEl.textContent = 'Something went wrong. Please try again.';
    messageEl.className = 'form-message error';
  }
};
```

**Backend Integration Options:**
1. **Mailchimp API** - Popular email marketing platform with GDPR features
2. **SendGrid Marketing Campaigns** - Transactional email service with marketing features
3. **Custom Serverless Function** - Store in database and send confirmation emails

### Language Fallback
- If requested language page doesn't exist, redirect to default (German)
- Show language switcher even on error pages
- Maintain URL structure for SEO

### Image Loading Errors

**Rationale:** Robust image handling (Requirements 2.3, 13.4, 16.2-16.4) ensures good user experience even with slow connections or missing assets.

**Error Handling Strategy:**
- Provide fallback placeholder images
- Use descriptive alt text for accessibility
- Lazy loading with intersection observer
- Progressive image loading (blur-up technique)

**Responsive Image Implementation:**
```html
<!-- Example: Hero image with multiple formats and sizes -->
<picture>
  <source 
    type="image/webp"
    srcset="
      /assets/images/hero-320.webp 320w,
      /assets/images/hero-640.webp 640w,
      /assets/images/hero-1024.webp 1024w,
      /assets/images/hero-1920.webp 1920w
    "
    sizes="100vw"
  >
  <source 
    type="image/jpeg"
    srcset="
      /assets/images/hero-320.jpg 320w,
      /assets/images/hero-640.jpg 640w,
      /assets/images/hero-1024.jpg 1024w,
      /assets/images/hero-1920.jpg 1920w
    "
    sizes="100vw"
  >
  <img 
    src="/assets/images/hero-1024.jpg" 
    alt="Flight Service 365 aircraft at Son Bonet Airport"
    loading="lazy"
    onerror="this.src='/assets/images/placeholder.jpg'"
  >
</picture>
```

**Lazy Loading Implementation:**
```javascript
// utils.js - Lazy loading with Intersection Observer
const LazyLoader = (() => {
  const init = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  const loadImage = (img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
    }
    img.classList.add('loaded');
  };

  return { init };
})();
```

**Image Optimization Guidelines:**
- Maximum width: 1920px for hero images
- Maximum width: 800px for content images
- Maximum width: 400px for thumbnails
- WebP format with JPEG fallback
- Quality: 80% for photos, 90% for graphics with text
- Compress all images before deployment

## Page-Specific Designs

### Locations Page

**Rationale:** The Locations page (Requirements 10.1-10.5) needs to clearly present operational bases with relevant aviation details (ICAO codes) and contact information.

**Content Structure:**
```json
{
  "locations": {
    "title": "Our Locations - Flight Service 365",
    "hero": {
      "title": "Where We Operate",
      "subtitle": "Professional aviation services across Europe"
    },
    "sites": [
      {
        "id": "son-bonet",
        "name": "Son Bonet",
        "icao": "LESB",
        "type": "Main Base",
        "address": {
          "building": "Edificio 8",
          "street": "Ctra.Palma-Inca, km 6",
          "city": "Marratxi",
          "postal": "07141",
          "country": "Spain"
        },
        "description": {
          "de": "Unser Hauptstandort auf Mallorca mit vollständiger Infrastruktur für Charter, Training und Wartung.",
          "en": "Our main base in Mallorca with complete infrastructure for charter, training, and maintenance."
        },
        "image": "/assets/images/locations/son-bonet.jpg",
        "mapEmbed": "https://maps.google.com/...",
        "facilities": [
          "Aircraft parking",
          "Maintenance hangar",
          "Flight school",
          "Pilot lounge"
        ]
      },
      {
        "id": "stuttgart",
        "name": "Stuttgart",
        "icao": "EDDS",
        "type": "Office",
        "address": {
          "street": "Office address",
          "city": "Stuttgart",
          "country": "Germany"
        },
        "description": {
          "de": "Unser deutsches Büro für Kundenbetreuung und Buchungen.",
          "en": "Our German office for customer service and bookings."
        },
        "image": "/assets/images/locations/stuttgart.jpg"
      }
    ]
  }
}
```

**Location Card Component:**
```html
<article class="location-card">
  <div class="location-header">
    <h3 class="location-name">Son Bonet</h3>
    <span class="location-icao">ICAO: LESB</span>
    <span class="location-type">Main Base</span>
  </div>
  
  <div class="location-image">
    <img src="/assets/images/locations/son-bonet.jpg" alt="Son Bonet Airport">
  </div>
  
  <div class="location-details">
    <div class="location-description">
      <p>Unser Hauptstandort auf Mallorca mit vollständiger Infrastruktur...</p>
    </div>
    
    <address class="location-address">
      <strong>Address:</strong><br>
      Edificio 8<br>
      Ctra.Palma-Inca, km 6<br>
      07141 Marratxi<br>
      Spain
    </address>
    
    <div class="location-facilities">
      <strong>Facilities:</strong>
      <ul>
        <li>Aircraft parking</li>
        <li>Maintenance hangar</li>
        <li>Flight school</li>
        <li>Pilot lounge</li>
      </ul>
    </div>
    
    <div class="location-map">
      <iframe src="..." loading="lazy"></iframe>
    </div>
  </div>
</article>
```

**Styling Approach:**
- Two-column layout on desktop (side-by-side location cards)
- Single column on mobile
- ICAO codes prominently displayed for pilot audience
- Embedded maps for each location
- Clear visual distinction between main base and satellite offices

### Trial Flights Page

**Rationale:** The Trial Flights page (Requirements 6.4, 23.4) showcases scenic routes with visual appeal to attract tourists and aviation enthusiasts.

**Route Card Component:**
```html
<article class="route-card">
  <div class="route-image">
    <img src="/assets/images/routes/sa-foradada.jpg" alt="Sa Foradada Route">
    <span class="route-duration">30 minutes</span>
  </div>
  
  <div class="route-details">
    <h3 class="route-name">Sa Foradada</h3>
    <p class="route-description">
      Spektakuläre Küstenformation an der Westküste Mallorcas. 
      Erleben Sie atemberaubende Ausblicke auf das türkisfarbene Mittelmeer.
    </p>
    <ul class="route-highlights">
      <li>Coastal cliffs and rock formations</li>
      <li>Crystal-clear Mediterranean waters</li>
      <li>Photo opportunities</li>
    </ul>
    <button class="btn-primary">Book This Flight</button>
  </div>
</article>
```

**Visual Design:**
- Large, high-quality images of routes
- Duration badge overlaid on images
- Grid layout: 3 columns on desktop, 1 on mobile
- Hover effect: slight zoom on images
- "What to Expect" section with flight experience details

## Deployment and Hosting

**Rationale:** The site needs flexible deployment options (Requirements 13.3) to support both quick prototyping (GitHub Pages) and production hosting (VPS with Coolify).

### Deployment Strategy

**Option 1: GitHub Pages (Development/Staging)**
- Automatic deployment via GitHub Actions
- Free hosting for static sites
- HTTPS by default
- Custom domain support
- Ideal for testing and client review

**GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Option 2: VPS with Coolify (Production)**
- Full control over hosting environment
- Docker-based deployment
- Automatic SSL certificates
- Better performance and caching control
- Suitable for production traffic

**Dockerfile:**
```dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Nginx Configuration:**
```nginx
# nginx.conf
server {
    listen 80;
    server_name flightservice365.com www.flightservice365.com;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Language-specific routing
    location / {
        try_files $uri $uri/ /de/index.html;
    }

    location /de/ {
        try_files $uri $uri/ /de/index.html;
    }

    location /en/ {
        try_files $uri $uri/ /en/index.html;
    }

    # 404 handling with language detection
    error_page 404 /de/404.html;
}
```

**Docker Compose (Local Development):**
```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - ./dist:/usr/share/nginx/html:ro
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### CDN and Performance Optimization

**Rationale:** Performance requirements (13.1-13.5) demand optimized asset delivery and caching strategies.

**CDN Strategy:**
- Use Cloudflare or similar CDN for global content delivery
- Cache static assets at edge locations
- Automatic image optimization
- DDoS protection and security

**Build Optimization:**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['navigation', 'forms', 'language-switcher'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});
```

## Testing Strategy

### Unit Testing
- Test language switching functionality
- Test form validation logic
- Test navigation menu interactions
- Test responsive breakpoint behaviors

### Integration Testing
- Test complete user flows (e.g., contact form submission)
- Test language switching across different pages
- Test navigation between pages
- Test mobile menu functionality

### Cross-Browser Testing
**Target Browsers:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Accessibility Testing

**Rationale:** WCAG AA compliance (Requirements 15.1-15.5) ensures the site is usable by all visitors, including those with disabilities.

**Testing Checklist:**
- Keyboard navigation testing (all interactive elements accessible via Tab)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification (minimum 4.5:1 for normal text, 3:1 for large text)
- Focus indicator visibility (yellow outline matching brand)
- ARIA label verification for all icon-only buttons
- Zoom testing up to 200%
- Form label associations

**Accessibility Implementation Details:**

**Skip to Main Content:**
```html
<!-- Add at the very top of body -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-accent-yellow);
  color: var(--color-black);
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

**Focus Indicators:**
```css
/* Global focus styles */
*:focus {
  outline: 3px solid var(--color-accent-yellow);
  outline-offset: 2px;
}

/* Remove default outline and add custom for better visibility */
button:focus,
a:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 3px solid var(--color-accent-yellow);
  outline-offset: 2px;
}

/* Ensure focus is visible even on dark backgrounds */
.dark-section *:focus {
  outline-color: var(--color-accent-yellow);
  box-shadow: 0 0 0 3px rgba(255, 233, 40, 0.3);
}
```

**ARIA Labels for Icon Buttons:**
```html
<!-- Language switcher with proper labels -->
<button data-lang="de" aria-label="Switch to German language">
  <img src="/assets/flags/de.png" alt="" role="presentation">
</button>

<!-- Mobile menu toggle -->
<button class="mobile-menu-toggle" 
        aria-label="Toggle navigation menu" 
        aria-expanded="false"
        aria-controls="main-navigation">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
</button>

<!-- Phone links with descriptive text -->
<a href="tel:+34691367430" aria-label="Call Mallorca office at +34 691 367 430">
  +34 691 367 430
</a>
```

**Form Accessibility:**
```html
<form class="contact-form">
  <div class="form-group">
    <label for="contact-name">Name <span aria-label="required">*</span></label>
    <input 
      type="text" 
      id="contact-name" 
      name="name" 
      required
      aria-required="true"
      aria-describedby="name-error"
    >
    <span id="name-error" class="error-message" role="alert"></span>
  </div>
  
  <div class="form-group">
    <label for="contact-email">Email <span aria-label="required">*</span></label>
    <input 
      type="email" 
      id="contact-email" 
      name="email" 
      required
      aria-required="true"
      aria-describedby="email-error"
    >
    <span id="email-error" class="error-message" role="alert"></span>
  </div>
  
  <div class="form-group">
    <label for="contact-message">Message <span aria-label="required">*</span></label>
    <textarea 
      id="contact-message" 
      name="message" 
      required
      aria-required="true"
      aria-describedby="message-error"
    ></textarea>
    <span id="message-error" class="error-message" role="alert"></span>
  </div>
  
  <button type="submit">Send Message</button>
  
  <div class="form-status" role="status" aria-live="polite"></div>
</form>
```

**Semantic HTML Structure:**
```html
<!-- Proper heading hierarchy -->
<main id="main-content">
  <article>
    <h1>Page Title</h1>
    <section>
      <h2>Section Title</h2>
      <h3>Subsection Title</h3>
    </section>
  </article>
</main>

<!-- Proper landmark regions -->
<header role="banner">...</header>
<nav role="navigation" aria-label="Main navigation">...</nav>
<main role="main" id="main-content">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

**Color Contrast Compliance:**
- White text (#ffffff) on dark backgrounds (#111111): 18.6:1 ✓
- Yellow accent (#ffe928) on dark backgrounds: 13.4:1 ✓
- Button text on yellow background: 12.8:1 ✓
- All combinations exceed WCAG AA requirements (4.5:1)

### Performance Testing
- Lighthouse audits (target: 90+ scores)
- Page load time testing (target: < 3s)
- Image optimization verification
- Mobile performance testing
- Core Web Vitals monitoring

### SEO Testing
- Meta tag verification
- Structured data validation
- Sitemap generation
- Robots.txt configuration
- Hreflang tag verification
- Canonical URL verification

## Design Decisions Summary

This section summarizes key design decisions and their rationales:

### 1. Static Site Architecture
**Decision:** Build as a static HTML/CSS/JS site with Vite as the build tool.
**Rationale:** 
- No dynamic backend needed for content that changes infrequently
- Better performance and security
- Lower hosting costs
- Easier to deploy and maintain
- Can still handle forms via serverless functions or third-party services

### 2. Vanilla JavaScript Over Framework
**Decision:** Use vanilla JavaScript instead of React/Vue/Angular.
**Rationale:**
- Site complexity doesn't justify framework overhead
- Faster page loads without framework bundle
- Easier for future developers to maintain
- Progressive enhancement approach works better for static content
- Better SEO with server-rendered HTML

### 3. Bilingual URL Structure
**Decision:** Use separate directories for languages (de/ and en/) rather than query parameters or subdomains.
**Rationale:**
- Better for SEO (clear language signals to search engines)
- Easier to implement hreflang tags
- Simpler to manage and deploy
- Users can easily share language-specific URLs
- Aligns with best practices for multilingual sites

### 4. Dark Color Scheme
**Decision:** Use dark backgrounds (#111111, #202020, #333333) with white text and yellow accents.
**Rationale:**
- Reflects premium, professional aviation industry aesthetic
- Yellow accent (#ffe928) provides high contrast and visibility
- Reduces eye strain for users browsing in low-light conditions
- Creates visual hierarchy and draws attention to CTAs
- Differentiates from competitors

### 5. Component-Based CSS Architecture
**Decision:** Use BEM naming convention with CSS custom properties.
**Rationale:**
- Maintainable and scalable CSS structure
- Easy to understand component boundaries
- CSS variables allow for consistent theming
- No build step required for CSS (though PostCSS adds autoprefixing)
- Reduces specificity conflicts

### 6. Progressive Enhancement for Forms
**Decision:** Forms work without JavaScript but enhance with it.
**Rationale:**
- Ensures forms work even if JavaScript fails to load
- Better accessibility for assistive technologies
- Graceful degradation for older browsers
- Follows web standards best practices

### 7. Cookie Consent with Customization
**Decision:** Provide three options: Accept All, Essential Only, and Customize.
**Rationale:**
- GDPR compliance requires granular consent
- Respects user privacy preferences
- Essential-only option allows users to decline tracking
- Customization provides transparency about cookie usage

### 8. Mobile-First Responsive Design
**Decision:** Design for mobile first, then enhance for larger screens.
**Rationale:**
- Mobile traffic represents significant portion of users
- Easier to scale up than scale down
- Forces prioritization of essential content
- Better performance on mobile devices

### 9. Lazy Loading for Images
**Decision:** Implement lazy loading for all below-the-fold images.
**Rationale:**
- Reduces initial page load time
- Saves bandwidth for users who don't scroll
- Improves Core Web Vitals scores
- Native browser support with loading="lazy" attribute

### 10. Serverless Functions for Form Handling
**Decision:** Use serverless functions or third-party services (Formspree) for form submissions.
**Rationale:**
- No need for dedicated backend server
- Scales automatically with traffic
- Cost-effective (pay per use)
- Easy to integrate with email services
- Maintains static site benefits

### 11. Docker-Based Deployment
**Decision:** Provide Docker configuration for production deployment.
**Rationale:**
- Consistent environment across development and production
- Easy to deploy to any VPS or cloud provider
- Works with Coolify for simplified management
- Nginx provides efficient static file serving
- Easy to add caching and security headers

### 12. Dual Deployment Strategy
**Decision:** Support both GitHub Pages and VPS deployment.
**Rationale:**
- GitHub Pages for quick prototyping and staging
- VPS for production with more control
- Flexibility for client preferences
- Easy to switch between options
- Both support custom domains and HTTPS

## Requirements Coverage

This design document addresses all 23 requirements from the requirements document:

- **Requirements 1.1-1.5:** Multi-language support with language switcher, hreflang tags, and URL structure
- **Requirements 2.1-2.5:** Responsive design with mobile menu, flexible layouts, and touch-friendly targets
- **Requirements 3.1-3.6:** Visual design with dark theme, yellow accents, and typography system
- **Requirements 4.1-4.5:** Homepage structure with hero, service cards, and team section
- **Requirements 5.1-5.6:** Navigation system with dropdowns and phone numbers
- **Requirements 6.1-6.4:** Service pages with detailed content and imagery
- **Requirements 7.1-7.5:** Fleet page with aircraft specifications
- **Requirements 8.1-8.5:** Team page with member profiles
- **Requirements 9.1-9.6:** Contact page with forms and location information
- **Requirements 10.1-10.5:** Locations page with ICAO codes and addresses
- **Requirements 11.1-11.5:** Footer with contact info, forms, and legal links
- **Requirements 12.1-12.5:** SEO with meta tags, Open Graph, and structured data
- **Requirements 13.1-13.5:** Performance optimization with image optimization and caching
- **Requirements 14.1-14.5:** GDPR compliance with cookie consent
- **Requirements 15.1-15.5:** Accessibility with keyboard navigation and ARIA labels
- **Requirements 16.1-16.5:** Image assets organization and optimization
- **Requirements 17.1-17.5:** Typography system with consistent sizing
- **Requirements 18.1-18.5:** Color system with defined palette
- **Requirements 19.1-19.5:** Spacing and layout system
- **Requirements 20.1-20.5:** Mobile navigation with hamburger menu
- **Requirements 21.1-21.5:** Call-to-action elements throughout site
- **Requirements 22.1-22.5:** Newsletter signup with GDPR compliance
- **Requirements 23.1-23.5:** Page-specific content for all service pages

## Call-to-Action Strategy

**Rationale:** Clear CTAs throughout the site (Requirement 21) guide users toward conversion actions while maintaining a professional, non-pushy approach appropriate for aviation services.

**CTA Hierarchy:**

1. **Primary CTAs** - High-priority conversion actions
   - Phone numbers in header (always visible, clickable tel: links)
   - "Contact Us" / "Get a Quote" buttons on service pages
   - Newsletter signup in footer
   - Styled with yellow accent color (#ffe928) for visibility

2. **Secondary CTAs** - Informational navigation
   - "Learn More" links on service cards
   - "View Fleet" / "Meet the Team" links
   - Styled with subtle hover effects

3. **Tertiary CTAs** - Supporting actions
   - Social media links (if applicable)
   - Download brochures (if applicable)
   - Minimal styling, text-based

**CTA Placement Strategy:**
- Header: Phone numbers prominently displayed on all pages
- Hero sections: Primary CTA button below headline
- Service cards: "Learn More" link at bottom of each card
- End of content sections: Contact form or phone number reminder
- Footer: Multiple contact options (form, phone, email, newsletter)

**Visual Design:**
```css
/* Primary CTA Button */
.btn-primary {
  background-color: var(--color-accent-yellow);
  color: var(--color-black);
  padding: 12px 32px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  transition: var(--transition-normal);
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #ffd700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 233, 40, 0.3);
}

/* Secondary CTA Link */
.btn-secondary {
  color: var(--color-white);
  text-decoration: underline;
  transition: var(--transition-fast);
}

.btn-secondary:hover {
  color: var(--color-accent-yellow);
}

/* Phone Number CTA */
.phone-cta {
  color: var(--color-white);
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition-fast);
}

.phone-cta:hover {
  color: var(--color-accent-yellow);
}
```

## Design Patterns

### CSS Architecture

**CSS Custom Properties (Variables):**
```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-bg-dark-1: #111111;
  --color-bg-dark-2: #202020;
  --color-bg-dark-3: #333333;
  --color-accent-yellow: #ffe928;
  --color-button-gray: #32373c;
  
  /* Typography */
  --font-size-small: 13px;
  --font-size-medium: 20px;
  --font-size-large: 36px;
  --font-size-xlarge: 42px;
  --font-family-base: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Spacing */
  --space-20: 0.44rem;
  --space-30: 0.67rem;
  --space-40: 1rem;
  --space-50: 1.5rem;
  --space-60: 2.25rem;
  --space-70: 3.38rem;
  --space-80: 5.06rem;
  
  /* Layout */
  --content-width: 800px;
  --wide-width: 1200px;
  --block-gap: 24px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}
```

**BEM Naming Convention:**
```css
/* Block */
.service-card { }

/* Element */
.service-card__image { }
.service-card__title { }
.service-card__description { }

/* Modifier */
.service-card--featured { }
.service-card--large { }
```

### Language Switching System

**Rationale:** The bilingual nature of the site (Requirements 1.1-1.5) requires a robust language switching mechanism that maintains context across page transitions and properly handles SEO considerations.

**Implementation Strategy:**
```javascript
// language-switcher.js
const LanguageSwitcher = (() => {
  const LANGUAGE_COOKIE = 'fs365_language';
  const LANGUAGE_PATHS = {
    'de': {
      'index.html': 'en/index.html',
      'flugzeugcharter.html': 'en/aircraft-charter.html',
      'blockcharter.html': 'en/blockcharter.html',
      'flotte.html': 'en/fleet.html',
      'ppl365.html': 'en/ppl365.html',
      'hourbuilding.html': 'en/hour-building.html',
      'rundfluge.html': 'en/trial-flights.html',
      'standorte.html': 'en/locations.html',
      'team.html': 'en/team.html',
      'kontakt.html': 'en/contact.html',
      'datenschutz.html': 'en/privacy.html',
      'impressum.html': 'en/imprint.html',
      'agb.html': 'en/terms.html'
    },
    'en': {
      'index.html': 'de/index.html',
      'aircraft-charter.html': 'de/flugzeugcharter.html',
      'blockcharter.html': 'de/blockcharter.html',
      'fleet.html': 'de/flotte.html',
      'ppl365.html': 'de/ppl365.html',
      'hour-building.html': 'de/hourbuilding.html',
      'trial-flights.html': 'de/rundfluge.html',
      'locations.html': 'de/standorte.html',
      'team.html': 'de/team.html',
      'contact.html': 'de/kontakt.html',
      'privacy.html': 'de/datenschutz.html',
      'imprint.html': 'de/impressum.html',
      'terms.html': 'de/agb.html'
    }
  };
  
  const init = () => {
    const languageButtons = document.querySelectorAll('[data-lang]');
    languageButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = button.dataset.lang;
        switchLanguage(targetLang);
      });
    });
    
    // Set active language indicator
    const currentLang = getCurrentLanguage();
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');
  };
  
  const getCurrentLanguage = () => {
    const path = window.location.pathname;
    return path.includes('/en/') ? 'en' : 'de';
  };
  
  const switchLanguage = (targetLang) => {
    const currentLang = getCurrentLanguage();
    if (currentLang === targetLang) return;
    
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Find the corresponding page in the target language
    const targetPath = LANGUAGE_PATHS[currentLang][currentPage];
    
    if (targetPath) {
      // Save language preference
      setCookie(LANGUAGE_COOKIE, targetLang, 365);
      // Navigate to the translated page
      window.location.href = '/' + targetPath;
    } else {
      // Fallback to homepage if no mapping exists
      window.location.href = targetLang === 'en' ? '/en/index.html' : '/de/index.html';
    }
  };
  
  return { init };
})();
```

**SEO Considerations:**
- Each page includes hreflang tags pointing to language alternatives
- Canonical URLs prevent duplicate content issues
- Language preference stored in cookie for returning visitors
- URL structure clearly indicates language (de/ vs en/)

### JavaScript Patterns

**Module Pattern for Organization:**
```javascript
// navigation.js
const Navigation = (() => {
  const init = () => {
    setupMobileMenu();
    setupDropdowns();
  };
  
  const setupMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.main-navigation');
    
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open');
    });
  };
  
  const setupDropdowns = () => {
    const dropdownButtons = document.querySelectorAll('.has-submenu > button');
    
    dropdownButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Close other dropdowns
        dropdownButtons.forEach(btn => {
          if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            btn.nextElementSibling.classList.remove('is-open');
          }
        });
        
        // Toggle current dropdown
        button.setAttribute('aria-expanded', !isExpanded);
        button.nextElementSibling.classList.toggle('is-open');
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.has-submenu')) {
        dropdownButtons.forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.classList.remove('is-open');
        });
      }
    });
  };
  
  return { init };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});
```

**Cookie Consent Management:**
```javascript
// cookie-consent.js
const CookieConsent = (() => {
  const COOKIE_NAME = 'fs365_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;
  
  const init = () => {
    if (!hasConsent()) {
      showBanner();
    } else {
      loadConsentedScripts();
    }
    
    setupEventListeners();
  };
  
  const hasConsent = () => {
    return getCookie(COOKIE_NAME) !== null;
  };
  
  const showBanner = () => {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      setTimeout(() => {
        banner.classList.add('is-visible');
        banner.setAttribute('aria-hidden', 'false');
      }, 1000);
    }
  };
  
  const setupEventListeners = () => {
    document.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      
      if (action === 'accept-all') {
        saveConsent({ analytics: true, marketing: true });
        hideBanner();
        loadConsentedScripts();
      } else if (action === 'essential-only') {
        saveConsent({ analytics: false, marketing: false });
        hideBanner();
      } else if (action === 'customize') {
        showCustomizationModal();
      }
    });
  };
  
  const saveConsent = (preferences) => {
    const consentData = {
      timestamp: new Date().toISOString(),
      preferences: preferences
    };
    setCookie(COOKIE_NAME, JSON.stringify(consentData), COOKIE_EXPIRY_DAYS);
  };
  
  const loadConsentedScripts = () => {
    const consent = getConsent();
    if (consent && consent.preferences.analytics) {
      // Load analytics scripts (e.g., Google Analytics)
      loadAnalytics();
    }
    if (consent && consent.preferences.marketing) {
      // Load marketing scripts
      loadMarketing();
    }
  };
  
  const hideBanner = () => {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    }
  };
  
  return { init };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  CookieConsent.init();
}); marketing: true });
        hideBanner();
        loadConsentedScripts();
      } else if (action === 'essential-only') {
        saveConsent({ analytics: false, marketing: false });
        hideBanner();
      } else if (action === 'customize') {
        showCustomizeModal();
      }
    });
  };
  
  const saveConsent = (preferences) => {
    const consentData = {
      timestamp: new Date().toISOString(),
      preferences: preferences
    };
    setCookie(COOKIE_NAME, JSON.stringify(consentData), COOKIE_EXPIRY_DAYS);
  };
  
  const hideBanner = () => {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    }
  };
  
  const loadConsentedScripts = () => {
    const consent = JSON.parse(getCookie(COOKIE_NAME) || '{}');
    
    if (consent.preferences?.analytics) {
      // Load analytics scripts (e.g., Google Analytics)
    }
    
    if (consent.preferences?.marketing) {
      // Load marketing scripts
    }
  };
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };
  
  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  CookieConsent.init();
});
```

**Language Switcher:**
```javascript
const LanguageSwitcher = (() => {
  // Path mapping between German and English URLs
  const pathMap = {
    'de': {
      'flugzeugcharter': 'aircraft-charter',
      'blockcharter': 'blockcharter',
      'flotte': 'fleet',
      'ppl365': 'ppl365',
      'hourbuilding': 'hour-building',
      'rundfluge': 'trial-flights',
      'standorte': 'locations',
      'team': 'team',
      'kontakt': 'contact',
      'datenschutz': 'privacy',
      'impressum': 'imprint',
      'agb': 'terms'
    },
    'en': {
      'aircraft-charter': 'flugzeugcharter',
      'blockcharter': 'blockcharter',
      'fleet': 'flotte',
      'ppl365': 'ppl365',
      'hour-building': 'hourbuilding',
      'trial-flights': 'rundfluge',
      'locations': 'standorte',
      'team': 'team',
      'contact': 'kontakt',
      'privacy': 'datenschutz',
      'imprint': 'impressum',
      'terms': 'agb'
    }
  };
  
  const init = () => {
    const buttons = document.querySelectorAll('[data-lang]');
    buttons.forEach(button => {
      button.addEventListener('click', handleLanguageSwitch);
    });
  };
  
  const handleLanguageSwitch = (e) => {
    const targetLang = e.currentTarget.dataset.lang;
    const currentPath = window.location.pathname;
    const newPath = translatePath(currentPath, targetLang);
    window.location.href = newPath;
  };
  
  const translatePath = (path, targetLang) => {
    // Remove leading/trailing slashes
    const cleanPath = path.replace(/^\/|\/$/g, '');
    
    // Handle homepage
    if (cleanPath === '' || cleanPath === 'de' || cleanPath === 'en') {
      return targetLang === 'de' ? '/' : '/en/';
    }
    
    // Split path into parts
    const parts = cleanPath.split('/');
    const currentLang = parts[0] === 'en' ? 'en' : 'de';
    const pageName = parts[0] === 'en' ? parts[1] : parts[0];
    
    // If already on target language, do nothing
    if (currentLang === targetLang) {
      return path;
    }
    
    // Translate page name
    const translatedPage = pathMap[currentLang][pageName] || pageName;
    
    // Build new path
    return targetLang === 'de' 
      ? `/${translatedPage}` 
      : `/en/${translatedPage}`;
  };
  
  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  LanguageSwitcher.init();
});
```

### Responsive Design Approach

**Mobile-First Breakpoints:**
```css
/* Mobile: 320px - 767px (default) */
.container {
  padding: var(--space-40);
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) {
  .container {
    padding: var(--space-60);
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-80);
    max-width: var(--wide-width);
    margin: 0 auto;
  }
}
```

### Image Optimization Strategy

**Responsive Images:**
```html
<picture>
  <source 
    srcset="/assets/images/hero-large.webp 1200w,
            /assets/images/hero-medium.webp 800w,
            /assets/images/hero-small.webp 400w"
    type="image/webp">
  <source 
    srcset="/assets/images/hero-large.jpg 1200w,
            /assets/images/hero-medium.jpg 800w,
            /assets/images/hero-small.jpg 400w"
    type="image/jpeg">
  <img 
    src="/assets/images/hero-medium.jpg" 
    alt="Flight Service 365"
    loading="lazy"
    width="800"
    height="600">
</picture>
```

## Security Considerations

### Form Security
- CSRF protection for form submissions (handled by form service provider)
- Input sanitization on client-side before submission
- Rate limiting for form submissions (via serverless function or service provider)
- Honeypot fields for spam prevention
- Email validation using regex patterns
- XSS prevention through proper escaping

**Honeypot Implementation:**
```html
<!-- Hidden field that bots will fill but humans won't see -->
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:;
               frame-src https://www.google.com;
               connect-src 'self' https://formspree.io;">
```

**Rationale:** The CSP allows necessary third-party services (Google Maps for location embedding, form submission services) while restricting other potentially harmful content sources.

### HTTPS Enforcement
- All resources loaded over HTTPS
- HSTS header configuration on hosting platform
- Secure cookie flags (SameSite=Lax, Secure in production)
- Redirect HTTP to HTTPS at hosting level

### Cookie Security
```javascript
// Production cookie settings
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax${secure}`;
};
```

## Page-Specific Content Structures

### BlockCharter Page

**Rationale:** This page needs to clearly communicate the value proposition of block charter arrangements, emphasizing cost savings and flexibility.

**Content Sections:**
1. Hero section with compelling imagery
2. Benefits grid (Weather, Cost, Infrastructure)
3. Package options/pricing tiers
4. Call-to-action for inquiries

### PPL365 Training Page

**Rationale:** Prospective students need comprehensive information about training requirements, structure, and benefits.

**Content Sections:**
1. Hero section with training aircraft
2. Course overview and description
3. Requirements section (age, medical, language)
4. Course structure breakdown (theory + practical hours)
5. Benefits of training in Mallorca
6. Call-to-action for enrollment

### Hour Building Page

**Rationale:** Pilots need clear information about rates, aircraft availability, and booking flexibility.

**Content Sections:**
1. Hero section
2. Purpose and target audience explanation
3. Benefits list (rates, flexibility, aircraft variety)
4. Pricing structure
5. Available aircraft with hourly rates
6. Booking call-to-action

### Trial Flights Page

**Rationale:** This page should inspire visitors with beautiful imagery and clear route options.

**Content Sections:**
1. Hero section with aerial photography
2. Route cards with images, descriptions, and durations:
   - Sa Foradada (30 min)
   - Sa Dragonera (45 min)
   - Palma City Tour (20 min)
   - Additional routes as available
3. Pricing information
4. Booking call-to-action
5. What to expect section

### Aircraft Charter Page

**Rationale:** Business and leisure clients need to understand available aircraft, use cases, and booking process.

**Content Sections:**
1. Hero section
2. Use cases (business travel, excursions, special events)
3. Available aircraft with specifications
4. Booking process explanation
5. Contact/quote request form

## Deployment Strategy

### Build Process
1. Optimize and minify CSS using PostCSS
2. Optimize and minify JavaScript using Terser
3. Optimize images (WebP conversion with fallbacks, compression)
4. Generate sitemap.xml with all language versions
5. Generate robots.txt
6. Inline critical CSS for above-the-fold content
7. Generate service worker for offline capability (optional)

### Initial Deployment: GitHub Pages

**Rationale:** GitHub Pages provides free static site hosting with automatic deployment from the repository, perfect for initial deployment and testing.

**Setup:**
1. Build output to `dist/` directory
2. GitHub Actions workflow for automatic deployment
3. Custom domain support (optional)

**GitHub Actions Workflow (.github/workflows/deploy.yml):**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Future Deployment: Coolify on VPS

**Rationale:** Coolify provides self-hosted deployment with Docker containers, giving full control over the hosting environment while maintaining ease of deployment.

**Preparation for Coolify:**

**Dockerfile:**
```dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Default language redirect (root to /de/)
    location = / {
        return 302 /de/;
    }

    # German pages (default)
    location /de/ {
        try_files $uri $uri/ $uri.html =404;
    }

    # English pages
    location /en/ {
        try_files $uri $uri/ $uri.html =404;
    }

    # Fallback for other paths
    location / {
        try_files $uri $uri/ $uri.html /de/index.html;
    }

    # Custom 404 page
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

**docker-compose.yml (for local testing):**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

**Coolify Configuration:**
When deploying to Coolify, the platform will:
1. Detect the Dockerfile automatically
2. Build the Docker image
3. Deploy the container
4. Handle SSL certificates via Let's Encrypt
5. Provide automatic health checks
6. Enable zero-downtime deployments

**Environment Variables (for future API integrations):**
```env
# .env.example
NODE_ENV=production
FORM_SUBMISSION_ENDPOINT=https://your-api-endpoint.com/submit
NEWSLETTER_API_KEY=your_api_key_here
ANALYTICS_ID=your_analytics_id
```

### CI/CD Pipeline (GitHub Actions)
- Automated testing on commit (accessibility, performance)
- Build verification
- Deployment to GitHub Pages (current)
- Future: Webhook trigger to Coolify for VPS deployment

### Monitoring
- Performance monitoring (Core Web Vitals via Google Search Console)
- Error tracking (Sentry or similar)
- Analytics integration (Google Analytics with cookie consent)
- Uptime monitoring (UptimeRobot or similar)
- Form submission tracking

## Accessibility Implementation Details

**Rationale:** WCAG AA compliance ensures the site is usable by visitors with disabilities, which is both legally required in the EU and expands the potential customer base.

### Keyboard Navigation
- All interactive elements accessible via Tab key
- Visible focus indicators (yellow outline matching brand)
- Skip to main content link
- Logical tab order
- Escape key closes modals and dropdowns

### Screen Reader Support
- Semantic HTML5 elements (nav, main, article, aside)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content updates
- Alt text for all images (decorative images use alt="")
- Form labels properly associated with inputs

### Color Contrast
- Text on dark backgrounds: white (#ffffff) on #111111 = 18.6:1 ratio ✓
- Yellow accent (#ffe928) used only for non-text elements or with sufficient contrast
- Link text underlined or with sufficient contrast
- Focus indicators with 3:1 contrast ratio

### Responsive Text
- Base font size: 20px (1.25rem)
- Minimum font size: 13px (0.8125rem)
- Text scales with viewport zoom up to 200%
- Line height: 1.5 for body text
- Paragraph width: max 800px for readability

This comprehensive design provides a solid foundation for building a professional, performant, accessible, and GDPR-compliant aviation services website that meets all the requirements outlined in the requirements document.

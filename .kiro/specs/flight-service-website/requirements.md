# Requirements Document

## Introduction

This document outlines the requirements for recreating the Flight Service 365 website (www.flightservice365.com). The website is a bilingual (German/English) aviation services platform offering aircraft charter, flight training, and related services. The site features a modern, dark-themed design with a focus on visual appeal and user experience.

The website serves multiple user types:
- Potential customers seeking flight services
- Pilots looking for training or hour-building opportunities
- Visitors interested in trial flights
- Business clients needing aircraft charter services

## Requirements

### Requirement 1: Multi-language Support

**User Story:** As a visitor, I want to view the website in my preferred language (German or English), so that I can understand the content in my native language.

#### Acceptance Criteria

1. WHEN a user visits the site THEN they SHALL see language switcher flags (German/English) in the header
2. WHEN a user clicks a language flag THEN the system SHALL switch all content to the selected language
3. WHEN a user switches language THEN the system SHALL maintain the same page context (e.g., from German "Team" to English "Team")
4. IF a page exists in both languages THEN the system SHALL include proper hreflang tags for SEO
5. WHEN search engines crawl the site THEN they SHALL find proper canonical URLs and language alternates

### Requirement 2: Responsive Design and Layout

**User Story:** As a visitor, I want the website to work seamlessly on any device, so that I can access information whether I'm on desktop, tablet, or mobile.

#### Acceptance Criteria

1. WHEN a user views the site on desktop THEN the content width SHALL be maximum 1200px for wide sections and 800px for content sections
2. WHEN a user views the site on mobile THEN the navigation SHALL collapse into a mobile-friendly menu
3. WHEN a user resizes the browser THEN all images SHALL scale proportionally without distortion
4. WHEN a user views on any device THEN text SHALL remain readable with appropriate font sizes (13px-42px range)
5. WHEN a user interacts with elements THEN touch targets SHALL be appropriately sized for mobile devices

### Requirement 3: Visual Design and Branding

**User Story:** As a visitor, I want to experience a professional and visually appealing design that reflects the premium nature of aviation services.

#### Acceptance Criteria

1. WHEN a user views any page THEN the background SHALL use dark tones (#111111, #202020, #333333)
2. WHEN a user sees the logo THEN it SHALL be the white transparent version (600x75px) on dark backgrounds
3. WHEN a user hovers over interactive elements THEN they SHALL see the yellow accent color (#ffe928)
4. WHEN a user views headings THEN they SHALL be bold and large (36px-42px)
5. WHEN a user views body text THEN it SHALL be 20px for readability
6. WHEN sections alternate THEN they SHALL use different dark background shades for visual separation

### Requirement 4: Home Page Structure

**User Story:** As a first-time visitor, I want to immediately understand what services are offered and see compelling visuals, so that I can quickly determine if this company meets my needs.

#### Acceptance Criteria

1. WHEN a user lands on the homepage THEN they SHALL see a hero section with the tagline "Supporting pilots - Inspiring guests - Enabling students"
2. WHEN a user scrolls down THEN they SHALL see a services section with 5 service cards (Aircraft Charter, Block Charter, Hour-Building, PPL-365 Training, Trial Flights)
3. WHEN a user views service cards THEN each SHALL have an icon, title, background image, and link
4. WHEN a user continues scrolling THEN they SHALL see a team section with photos and names of key team members
5. WHEN a user reaches the footer THEN they SHALL see contact information, newsletter signup, and location map

### Requirement 5: Navigation System

**User Story:** As a visitor, I want to easily navigate between different sections of the website, so that I can find the information I need quickly.

#### Acceptance Criteria

1. WHEN a user views the header THEN they SHALL see the logo, email contact, language switcher, and main navigation menu
2. WHEN a user views the main menu THEN it SHALL include: Home, Services (dropdown), About Us (dropdown), and Contact
3. WHEN a user hovers over "Services" THEN they SHALL see: Aircraft Charter, BlockCharter, PPL-A/NFQ, Hour Building, Trial Flights
4. WHEN a user hovers over "About Us" THEN they SHALL see: Team, Fleet, Locations
5. WHEN a user clicks any menu item THEN they SHALL navigate to the corresponding page
6. WHEN a user views the header THEN they SHALL see phone numbers prominently displayed

### Requirement 6: Service Pages

**User Story:** As a potential customer, I want detailed information about each service offering, so that I can make an informed decision.

#### Acceptance Criteria

1. WHEN a user visits a service page THEN they SHALL see a hero image relevant to that service
2. WHEN a user reads the content THEN they SHALL see clear descriptions, benefits, and features
3. WHEN a user views the Aircraft Charter page THEN they SHALL see information about available aircraft with images
4. WHEN a user views the BlockCharter page THEN they SHALL see benefits of block charter arrangements
5. WHEN a user views the Trial Flights page THEN they SHALL see different flight route options with descriptions and images

### Requirement 7: Fleet Page

**User Story:** As a potential customer, I want to see detailed information about available aircraft, so that I can choose the right aircraft for my needs.

#### Acceptance Criteria

1. WHEN a user visits the Fleet page THEN they SHALL see all available aircraft listed
2. WHEN a user views each aircraft THEN they SHALL see: name, photo, specifications (power, speed, weight, range, navigation equipment)
3. WHEN a user views aircraft specs THEN they SHALL be organized in a clear, scannable format
4. WHEN a user views the page THEN aircraft SHALL be categorized (e.g., charter aircraft vs. training aircraft)
5. WHEN a user views aircraft images THEN they SHALL be high-quality and properly sized

### Requirement 8: Team Page

**User Story:** As a potential customer, I want to know about the team members and their qualifications, so that I can trust the expertise of the company.

#### Acceptance Criteria

1. WHEN a user visits the Team page THEN they SHALL see all team members with photos
2. WHEN a user views each team member THEN they SHALL see: photo, name, title/role, and brief description
3. WHEN a user reads descriptions THEN they SHALL see relevant qualifications and experience
4. WHEN a user views the page THEN team members SHALL be displayed in a grid layout
5. WHEN a user views on mobile THEN the grid SHALL adapt to a single column

### Requirement 9: Contact Page and Forms

**User Story:** As a visitor, I want multiple ways to contact the company, so that I can reach them through my preferred communication method.

#### Acceptance Criteria

1. WHEN a user visits the Contact page THEN they SHALL see: contact form, phone numbers, email address, and physical address
2. WHEN a user fills out the contact form THEN they SHALL provide: name, email, and message
3. WHEN a user submits the form THEN the system SHALL validate all required fields
4. WHEN a user submits a valid form THEN they SHALL see a confirmation message
5. WHEN a user views the page THEN they SHALL see an embedded map showing the location
6. WHEN a user views contact info THEN they SHALL see both Mallorca (+34) and Germany (+49) phone numbers

### Requirement 10: Locations Page

**User Story:** As a visitor, I want to know where the company operates, so that I can determine if they serve my area.

#### Acceptance Criteria

1. WHEN a user visits the Locations page THEN they SHALL see information about all operational locations
2. WHEN a user views Son Bonet location THEN they SHALL see: ICAO code (LESB), full address, and description
3. WHEN a user views Stuttgart location THEN they SHALL see: ICAO code (EDDS), office address, and contact details
4. WHEN a user views location information THEN they SHALL see relevant images or maps
5. WHEN a user views the page THEN locations SHALL be clearly distinguished and organized

### Requirement 11: Footer Structure

**User Story:** As a visitor, I want consistent footer information on every page, so that I can always access important links and contact information.

#### Acceptance Criteria

1. WHEN a user views any page footer THEN they SHALL see: logo, contact information, newsletter signup, and location info
2. WHEN a user views the footer THEN they SHALL see "Call us" section with both phone numbers
3. WHEN a user views the footer THEN they SHALL see "Send Us A Message" contact form
4. WHEN a user views the footer THEN they SHALL see copyright notice and links to Terms, Privacy, and Imprint
5. WHEN a user views the footer THEN they SHALL see an embedded map showing the main location

### Requirement 12: SEO and Meta Information

**User Story:** As a business owner, I want the website to rank well in search engines, so that potential customers can find us easily.

#### Acceptance Criteria

1. WHEN search engines crawl any page THEN they SHALL find proper meta titles and descriptions
2. WHEN search engines crawl the site THEN they SHALL find Open Graph tags for social media sharing
3. WHEN search engines crawl the site THEN they SHALL find proper hreflang tags for language versions
4. WHEN search engines crawl the site THEN they SHALL find canonical URLs to avoid duplicate content
5. WHEN a user shares a page on social media THEN they SHALL see proper preview images and descriptions

### Requirement 13: Performance and Loading

**User Story:** As a visitor, I want the website to load quickly, so that I don't have to wait for content to appear.

#### Acceptance Criteria

1. WHEN a user visits any page THEN images SHALL be optimized and properly sized
2. WHEN a user loads a page THEN critical CSS SHALL be inlined for faster rendering
3. WHEN a user navigates the site THEN subsequent pages SHALL load quickly using browser caching
4. WHEN a user views images THEN they SHALL use modern formats (WebP) with fallbacks
5. WHEN a user loads the page THEN the system SHALL lazy-load images below the fold

### Requirement 14: GDPR Compliance

**User Story:** As a European visitor, I want my privacy to be respected according to GDPR regulations, so that my data is handled properly.

#### Acceptance Criteria

1. WHEN a user first visits the site THEN they SHALL see a cookie consent banner
2. WHEN a user views the cookie banner THEN they SHALL be able to accept or customize cookie preferences
3. WHEN a user submits a form THEN they SHALL see privacy policy information
4. WHEN a user requests it THEN they SHALL be able to access the privacy policy page
5. WHEN cookies are set THEN only essential cookies SHALL be active until user consent is given

### Requirement 15: Accessibility

**User Story:** As a visitor with disabilities, I want to be able to access and navigate the website using assistive technologies.

#### Acceptance Criteria

1. WHEN a user navigates with keyboard THEN all interactive elements SHALL be accessible via Tab key
2. WHEN a screen reader user visits THEN all images SHALL have appropriate alt text
3. WHEN a user views the site THEN color contrast SHALL meet WCAG AA standards
4. WHEN a user zooms the page THEN content SHALL remain readable and functional up to 200%
5. WHEN a user navigates THEN focus indicators SHALL be clearly visible

### Requirement 16: Image Assets

**User Story:** As a content manager, I want all images to be properly organized and optimized, so that the site maintains visual quality while loading quickly.

#### Acceptance Criteria

1. WHEN images are stored THEN they SHALL be organized in the wp-content/uploads directory structure
2. WHEN images are displayed THEN they SHALL have proper alt text for accessibility and SEO
3. WHEN images are used THEN they SHALL be in multiple sizes for responsive display
4. WHEN logos are displayed THEN they SHALL use the transparent PNG versions
5. WHEN team photos are displayed THEN they SHALL be consistently sized and formatted

### Requirement 17: Typography System

**User Story:** As a designer, I want consistent typography throughout the site, so that the visual hierarchy is clear and professional.

#### Acceptance Criteria

1. WHEN headings are displayed THEN H1 SHALL be 42px, H2 SHALL be 36px, H3 SHALL be 20px
2. WHEN body text is displayed THEN it SHALL be 20px for optimal readability
3. WHEN small text is needed THEN it SHALL be 13px minimum
4. WHEN text is displayed THEN it SHALL use system fonts or Roboto/Montserrat
5. WHEN headings are displayed THEN they SHALL be bold weight

### Requirement 18: Color System

**User Story:** As a designer, I want a consistent color palette used throughout the site, so that branding is cohesive.

#### Acceptance Criteria

1. WHEN backgrounds are displayed THEN they SHALL use #111111, #202020, or #333333
2. WHEN interactive elements are hovered THEN they SHALL use #ffe928 (yellow accent)
3. WHEN text is displayed on dark backgrounds THEN it SHALL use #ffffff (white)
4. WHEN buttons are displayed THEN they SHALL use #32373c (dark gray) as base
5. WHEN accent colors are needed THEN they SHALL use the defined palette (vivid red, orange, cyan, etc.)

### Requirement 19: Spacing and Layout System

**User Story:** As a designer, I want consistent spacing throughout the site, so that the layout feels harmonious and professional.

#### Acceptance Criteria

1. WHEN elements are spaced THEN they SHALL use the defined spacing scale (0.44rem to 5.06rem)
2. WHEN content blocks are displayed THEN they SHALL have 24px gap between them
3. WHEN content is centered THEN it SHALL not exceed 800px for readability
4. WHEN wide sections are displayed THEN they SHALL not exceed 1200px
5. WHEN padding is applied THEN it SHALL use values from the spacing scale

### Requirement 20: Mobile Navigation

**User Story:** As a mobile user, I want easy navigation on small screens, so that I can access all pages without difficulty.

#### Acceptance Criteria

1. WHEN a user views on mobile THEN the menu SHALL collapse into a hamburger icon
2. WHEN a user taps the hamburger icon THEN the menu SHALL expand as an overlay or slide-in
3. WHEN a user views the mobile menu THEN all menu items SHALL be easily tappable
4. WHEN a user taps a menu item with submenu THEN it SHALL expand to show sub-items
5. WHEN a user closes the mobile menu THEN it SHALL smoothly animate closed

### Requirement 21: Call-to-Action Elements

**User Story:** As a potential customer, I want clear calls-to-action throughout the site, so that I know how to take the next step.

#### Acceptance Criteria

1. WHEN a user views any service page THEN they SHALL see clear contact CTAs
2. WHEN a user views the header THEN they SHALL see phone numbers as clickable links
3. WHEN a user views service cards THEN they SHALL have clear "Learn More" or similar CTAs
4. WHEN a user reaches the end of content THEN they SHALL see contact options
5. WHEN a user hovers over CTAs THEN they SHALL see visual feedback (color change, etc.)

### Requirement 22: Newsletter Signup

**User Story:** As a visitor interested in updates, I want to sign up for a newsletter, so that I can stay informed about services and offers.

#### Acceptance Criteria

1. WHEN a user views the footer THEN they SHALL see a newsletter signup section
2. WHEN a user enters their email THEN the system SHALL validate the email format
3. WHEN a user submits the form THEN they SHALL see a confirmation message
4. WHEN a user signs up THEN their email SHALL be stored securely
5. WHEN a user signs up THEN they SHALL receive a confirmation email

### Requirement 23: Page-Specific Content Requirements

**User Story:** As a content manager, I want each page to have its specific required content, so that visitors get complete information.

#### Acceptance Criteria

1. WHEN the BlockCharter page is viewed THEN it SHALL include: benefits, weather advantages, cost savings, infrastructure information
2. WHEN the PPL365 page is viewed THEN it SHALL include: training information, course structure, requirements, benefits
3. WHEN the Hour Building page is viewed THEN it SHALL include: purpose, benefits, pricing structure
4. WHEN the Trial Flights page is viewed THEN it SHALL include: different route options (Sa Forradada, Sa Dragonera, etc.) with descriptions and images
5. WHEN the Aircraft Charter page is viewed THEN it SHALL include: available aircraft, booking process, use cases

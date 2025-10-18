# Automated Page Template System

## Template Structure

### All Pages Follow This Pattern:
```
1. Header (Navigation) - Same on all pages
2. Small Hero Section - Page-specific title + background image
3. Content Section - Flexible grid with images + text
4. Footer - Same on all pages
```

## Page Types & Layouts

### Type 1: Service Pages (Charter, BlockCharter, Hour Building, Trial Flights)
- Small hero with service name
- 2-column layout: Image left, text right
- Features/benefits list
- CTA button

### Type 2: Fleet Page
- Small hero
- Grid of aircraft cards (similar to homepage services)
- Each card: Image, name, specs list

### Type 3: Team Page
- Small hero
- Grid of team member cards
- Each card: Photo, name, role, bio

### Type 4: PPL365 Page
- Small hero
- Multi-section layout with more text
- Images interspersed with content blocks

### Type 5: Locations Page
- Small hero
- 2 location cards (Mallorca, Stuttgart)
- Map, address, features

### Type 6: Contact Page
- Small hero
- 2-column: Contact info + Form

### Type 7: Legal Pages (Privacy, Terms, Imprint)
- Small hero
- Single column text content

## Content Extraction from rules.txt

I have all the text content in rules.txt. I'll extract:
- Page titles
- Headings
- Body text
- Meta descriptions
- For both English and German

## Image Allocation Logic

- **Charter/BlockCharter**: cockpit.jpg, socata images
- **Fleet**: socata.jpg, socata1.JPG, socata2.jpg, piper-arrow.jpg, tecnam1.jpeg
- **Team**: Erika.webp, Fabian.webp, Marcel.webp, Maximilian.webp, Olivier_Bild.webp, Philipp.webp
- **Trial Flights**: WhatsApp images, aerial shots
- **PPL365**: training/cockpit images
- **Locations**: efsflightschool-Mallorca.jpg, stuttgart image

## Implementation Plan

1. Create base template HTML
2. Create content JSON from rules.txt
3. Generate all 24 pages automatically
4. Test and refine

## Status
Ready to implement!

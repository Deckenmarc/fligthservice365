# Next Session Instructions - Page Redesign Continuation

## Current Status

### ✅ Completed This Session
1. **Fixed GitHub Pages deployment** - Site is now live and working
2. **Fixed navigation links** - All pages have working navigation
3. **Fixed root URL redirect** - Homepage redirect working
4. **Created approved design template** - Team page (EN) with homepage header/footer
5. **Updated team page** - Now has 10 team member boxes in 2-column layout

### 🎯 What Needs to Be Done Next

Apply the approved design (from `src/pages/en/team.html`) to all remaining pages with specific box configurations.

## Template Reference

**Use `src/pages/en/team.html` as the template** - it has:
- ✅ Same header as homepage (blue navigation with dropdowns)
- ✅ Same footer as homepage (dark footer with links)
- ✅ Same colors (Primary: #0a66c2, Accent: #ffe928)
- ✅ Hero section with page title
- ✅ Grid layout for content boxes
- ✅ Responsive design

## Box Configuration Requirements

### Team Pages (2 columns × 5 rows = 10 boxes)
- ✅ `src/pages/en/team.html` - DONE
- ⏳ `src/pages/de/team.html` - TODO (translate to German)

### Charter Pages (2 columns × 2 rows = 4 boxes)
- ⏳ `src/pages/en/aircraft-charter.html`
- ⏳ `src/pages/de/flugzeugcharter.html`

### Fleet Pages (2 columns × 2 rows = 4 boxes)
- ⏳ `src/pages/en/fleet.html`
- ⏳ `src/pages/de/flotte.html`

### Trial Flights (1 column × 5 rows = 5 boxes FULL WIDTH)
- ⏳ `src/pages/en/trial-flights.html`
- ⏳ `src/pages/de/rundfluge.html`
**Note**: These should have `grid-template-columns: 1fr` (single column, full width)

### Other Service Pages (2 columns × 3 rows = 6 boxes)
- ⏳ `src/pages/en/blockcharter.html`
- ⏳ `src/pages/de/blockcharter.html`
- ⏳ `src/pages/en/ppl365.html`
- ⏳ `src/pages/de/ppl365.html`
- ⏳ `src/pages/en/hour-building.html`
- ⏳ `src/pages/de/hourbuilding.html`

### Other Pages (Keep existing content, just update header/footer/colors)
- ⏳ `src/pages/en/locations.html`
- ⏳ `src/pages/de/standorte.html`
- ⏳ `src/pages/en/contact.html`
- ⏳ `src/pages/de/kontakt.html`

## Total Pages to Update
**17 pages remaining** (1 done, 18 total)

## Step-by-Step Process

### For Each Page:

1. **Copy the template structure** from `src/pages/en/team.html`
2. **Update the page-specific content**:
   - Change `<title>` tag
   - Update hero section title and subtitle
   - Update section header (tag, title, description)
   - Adjust grid layout based on box count requirements
3. **Add the correct number of boxes** (see requirements above)
4. **For German pages**: Translate all text to German
5. **Update navigation** to highlight current page
6. **Test and commit** in batches

### Grid Layout CSS Adjustments

For different box counts, update this CSS in the `<style>` section:

```css
/* 2 columns (default - for 4, 6, 10 boxes) */
.team-grid {
    grid-template-columns: repeat(2, 1fr);
}

/* 1 column (for trial flights - 5 boxes) */
.team-grid {
    grid-template-columns: 1fr;
}
```

## Deployment Process

After updating pages:
```bash
git add src/pages/
git commit -m "Update [page names] with approved design"
git push origin main
```

GitHub Actions will automatically build and deploy (takes 2-3 minutes).

## Important Notes

1. **Keep the same header/footer** on all pages - consistency is key
2. **Use placeholder content** for boxes (icons like 👨‍✈️, ✈️, 📋, etc.)
3. **Maintain color scheme** throughout (blue #0a66c2, yellow #ffe928)
4. **Test navigation links** - make sure they all work
5. **German translations** - translate all visible text, keep HTML structure

## German Translation Quick Reference

- Our Team → Unser Team
- Meet Our Team → Lernen Sie unser Team kennen
- Services → Dienstleistungen
- About Us → Über Uns
- Contact → Kontakt
- Home → Startseite
- Fleet → Flotte
- Locations → Standorte
- Team → Team
- Aircraft Charter → Flugzeugcharter
- Trial Flights → Rundflüge
- Hour Building → Hour Building (keep English)
- PPL-365 → PPL-365 (keep as is)
- BlockCharter → BlockCharter (keep as is)

## Success Criteria

When complete, all pages should:
- ✅ Have the same blue navigation header
- ✅ Have the same dark footer
- ✅ Use the same color scheme
- ✅ Have working navigation links
- ✅ Have the correct number of content boxes
- ✅ Be responsive (work on mobile)
- ✅ Be deployed and live on GitHub Pages

## Testing URLs

After deployment, test these URLs:
- https://deckenmarc.github.io/fligthservice365/src/pages/en/team.html
- https://deckenmarc.github.io/fligthservice365/src/pages/en/fleet.html
- https://deckenmarc.github.io/fligthservice365/src/pages/en/aircraft-charter.html
- https://deckenmarc.github.io/fligthservice365/src/pages/en/trial-flights.html
- (etc.)

## Estimated Time

- ~15-20 minutes per page
- Total: 4-5 hours for all 17 pages
- Recommend doing in 2-3 sessions with breaks

## Questions to Ask User

Before starting:
1. Do you want to review pages in batches or all at once?
2. Any specific content for the boxes or use placeholders?
3. Priority order for pages?

## Current Site Status

- ✅ Homepage working: https://deckenmarc.github.io/fligthservice365/
- ✅ Navigation working on all pages
- ✅ Images loading correctly
- ✅ Team page updated with new design
- ⏳ Other pages need design update

---

**Ready to continue in next session!**

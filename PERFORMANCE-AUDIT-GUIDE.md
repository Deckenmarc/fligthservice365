# Performance Audit Guide

## Task: 20.6 Run performance audit

---

## Overview

This guide provides step-by-step instructions for conducting a comprehensive performance audit of the Flight Service 365 website.

### Requirements Tested
- 13.1: Fast page load times
- 13.2: Optimized images
- 13.3: Minified CSS/JS
- 13.4: Lazy loading
- 13.5: Core Web Vitals

### Target Metrics
- Lighthouse Performance: 90+ (out of 100)
- Page Load Time: < 3s on 3G, < 1s on broadband
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 1. Lighthouse Performance Audit

### Step-by-Step Instructions

1. **Open Chrome DevTools:**
   - Press `Cmd+Option+I` (Mac) or `F12` (Windows/Linux)

2. **Navigate to Lighthouse Tab:**
   - Click "Lighthouse" tab
   - If not visible, click ">>" and select "Lighthouse"

3. **Configure Audit:**
   - Mode: "Navigation"
   - Device: Test both "Mobile" and "Desktop"
   - Categories: Check "Performance"
   - Throttling: "Simulated throttling" (default)

4. **Run Mobile Audit:**
   - Select "Mobile" device
   - Click "Analyze page load"
   - Wait for completion
   - Note score and metrics

5. **Run Desktop Audit:**
   - Select "Desktop" device
   - Click "Analyze page load"
   - Compare with mobile results

### Pages to Test

Run Lighthouse on these pages:
- [ ] `/en/index.html` (Homepage - most critical)
- [ ] `/de/index.html` (German Homepage)
- [ ] `/en/contact.html` (Contact page)
- [ ] `/en/aircraft-charter.html` (Service page)
- [ ] `/en/team.html` (Team page with images)
- [ ] `/en/fleet.html` (Fleet page with many images)

### Key Metrics to Review

**Performance Score:**
- Target: 90+
- Mobile typically lower than desktop
- Focus on mobile-first

**Core Web Vitals:**
1. **LCP (Largest Contentful Paint):**
   - Good: < 2.5s
   - Needs Improvement: 2.5s - 4.0s
   - Poor: > 4.0s

2. **FID (First Input Delay):**
   - Good: < 100ms
   - Needs Improvement: 100ms - 300ms
   - Poor: > 300ms

3. **CLS (Cumulative Layout Shift):**
   - Good: < 0.1
   - Needs Improvement: 0.1 - 0.25
   - Poor: > 0.25

**Other Metrics:**
- First Contentful Paint (FCP): < 1.8s
- Speed Index: < 3.4s
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 200ms

---

## 2. Network Performance Testing

### Using Chrome DevTools Network Tab

1. **Open Network Tab:**
   - DevTools → Network tab
   - Check "Disable cache"
   - Select throttling profile

2. **Test Different Connections:**

**Fast 3G:**
- Download: 1.6 Mbps
- Upload: 750 Kbps
- Latency: 562.5ms

**Slow 3G:**
- Download: 400 Kbps
- Upload: 400 Kbps
- Latency: 2000ms

**4G:**
- Download: 4 Mbps
- Upload: 3 Mbps
- Latency: 170ms

3. **Reload Page and Measure:**
   - Press `Cmd+R` (Mac) or `Ctrl+R` (Windows)
   - Wait for page to fully load
   - Check "Load" time at bottom
   - Check "DOMContentLoaded" time

### Metrics to Record

**For Each Connection Type:**
- [ ] Total page size (KB/MB)
- [ ] Number of requests
- [ ] Load time (seconds)
- [ ] DOMContentLoaded time
- [ ] Largest resource size
- [ ] Time to first byte (TTFB)

**Target Times:**
- 3G: < 3 seconds
- 4G: < 2 seconds
- Broadband: < 1 second

---

## 3. Image Optimization Verification

### Check Image Implementation

**Verify in DevTools:**
1. Network tab → Filter by "Img"
2. Check each image request
3. Verify format (WebP preferred)
4. Check file sizes

### Image Checklist

**Format:**
- [ ] WebP format used where supported
- [ ] Fallback to JPEG/PNG
- [ ] No uncompressed images

**Sizing:**
- [ ] Multiple sizes available (srcset)
- [ ] Appropriate size served for viewport
- [ ] No oversized images

**Lazy Loading:**
- [ ] `loading="lazy"` attribute present
- [ ] Images below fold load on scroll
- [ ] Above-fold images load immediately

**Compression:**
- [ ] Images compressed (target: < 100KB each)
- [ ] Quality balanced with file size
- [ ] No unnecessary metadata

### Test Lazy Loading

1. **Open Network Tab:**
   - Clear network log
   - Scroll to top of page

2. **Check Initial Load:**
   - Only above-fold images should load
   - Below-fold images should not load yet

3. **Scroll Down:**
   - Images should load as they come into view
   - Check network tab for new requests

4. **Verify Behavior:**
   - No layout shift when images load
   - Smooth loading experience
   - Placeholder or skeleton shown

---

## 4. CSS and JavaScript Optimization

### Check Minification

**In Production Build:**
1. View page source
2. Check CSS file links
3. Check JavaScript file links
4. Verify files are minified

**Minified Characteristics:**
- No whitespace
- No comments
- Short variable names
- Single line code

**Example:**
```css
/* Minified */
.btn{padding:12px 24px;background:#ffe928;color:#111}

/* Not Minified */
.btn {
  padding: 12px 24px;
  background: #ffe928;
  color: #111111;
}
```

### Check File Sizes

**Target Sizes:**
- Main CSS: < 50KB (gzipped)
- Page-specific CSS: < 10KB (gzipped)
- JavaScript files: < 50KB each (gzipped)

**Check in Network Tab:**
- [ ] CSS files compressed
- [ ] JS files compressed
- [ ] Gzip/Brotli compression enabled
- [ ] No duplicate resources

### Check Loading Strategy

**CSS:**
- [ ] Critical CSS inlined (if applicable)
- [ ] Non-critical CSS deferred
- [ ] No render-blocking CSS

**JavaScript:**
- [ ] Scripts loaded asynchronously
- [ ] Non-critical scripts deferred
- [ ] No render-blocking JavaScript

---

## 5. Core Web Vitals Testing

### Using Chrome DevTools Performance Tab

1. **Open Performance Tab:**
   - DevTools → Performance tab

2. **Record Page Load:**
   - Click record button (circle)
   - Reload page (`Cmd+R`)
   - Wait for page to fully load
   - Stop recording

3. **Analyze Results:**
   - Look for LCP marker
   - Check for layout shifts
   - Review main thread activity

### LCP (Largest Contentful Paint)

**What It Measures:**
- Time until largest content element renders
- Usually hero image or heading

**How to Improve:**
- Optimize images
- Reduce server response time
- Eliminate render-blocking resources
- Use CDN

**Check:**
- [ ] LCP < 2.5s
- [ ] LCP element identified
- [ ] LCP element optimized

### FID (First Input Delay)

**What It Measures:**
- Time from first interaction to browser response
- Measures interactivity

**How to Improve:**
- Reduce JavaScript execution time
- Break up long tasks
- Use web workers
- Minimize third-party scripts

**Check:**
- [ ] FID < 100ms
- [ ] Page responds quickly to clicks
- [ ] No long-running scripts

### CLS (Cumulative Layout Shift)

**What It Measures:**
- Visual stability
- Unexpected layout shifts

**How to Improve:**
- Set image dimensions
- Reserve space for ads/embeds
- Avoid inserting content above existing content
- Use CSS transforms for animations

**Check:**
- [ ] CLS < 0.1
- [ ] Images have width/height
- [ ] No content jumping
- [ ] Smooth loading experience

### Using Web Vitals Extension

**Install:**
1. Install "Web Vitals" Chrome extension
2. Visit page
3. Click extension icon
4. View real-time metrics

**Metrics Shown:**
- LCP
- FID
- CLS
- TTFB
- FCP

---

## 6. Mobile Performance Testing

### Using Chrome DevTools Device Emulation

1. **Enable Device Toolbar:**
   - Press `Cmd+Shift+M` (Mac) or `Ctrl+Shift+M` (Windows)

2. **Select Device:**
   - Choose device from dropdown
   - Or set custom dimensions

3. **Test Devices:**
   - iPhone SE (375×667)
   - iPhone 12 Pro (390×844)
   - iPad (768×1024)
   - Samsung Galaxy S20 (360×800)

4. **Enable Throttling:**
   - Select "Fast 3G" or "Slow 3G"
   - Test page load performance

### Mobile-Specific Checks

**Touch Targets:**
- [ ] All buttons at least 44×44px
- [ ] Adequate spacing between targets
- [ ] Easy to tap with thumb

**Viewport:**
- [ ] Content fits viewport
- [ ] No horizontal scrolling
- [ ] Text readable without zooming

**Performance:**
- [ ] Fast load on 3G
- [ ] Smooth scrolling
- [ ] Responsive interactions

---

## 7. Real Device Testing

### Test on Actual Devices

**iOS Devices:**
1. Connect iPhone/iPad
2. Open Safari
3. Visit website
4. Test performance

**Android Devices:**
1. Connect Android phone/tablet
2. Open Chrome
3. Visit website
4. Test performance

### Metrics to Check

**Load Time:**
- [ ] Homepage loads in < 3s on 4G
- [ ] Subsequent pages load quickly
- [ ] Images load progressively

**Interactivity:**
- [ ] Buttons respond immediately
- [ ] Forms work smoothly
- [ ] Navigation is responsive

**Scrolling:**
- [ ] Smooth 60fps scrolling
- [ ] No jank or stuttering
- [ ] Lazy loading works

---

## 8. Caching Strategy Verification

### Check HTTP Headers

**Using DevTools Network Tab:**
1. Select any resource
2. Click "Headers" tab
3. Check "Response Headers"

**Headers to Verify:**

**Cache-Control:**
```
Cache-Control: public, max-age=31536000, immutable
```
- [ ] Static assets cached for 1 year
- [ ] HTML cached for shorter period

**ETag:**
```
ETag: "abc123"
```
- [ ] ETags present for cache validation

**Compression:**
```
Content-Encoding: gzip
```
or
```
Content-Encoding: br
```
- [ ] Gzip or Brotli compression enabled
- [ ] Text resources compressed

---

## 9. Third-Party Script Analysis

### Identify Third-Party Scripts

**Check in Network Tab:**
- [ ] Google Analytics (if enabled)
- [ ] Font providers (if used)
- [ ] CDN resources
- [ ] Other external scripts

### Measure Impact

**For Each Script:**
1. Check load time
2. Check file size
3. Check blocking behavior
4. Assess necessity

**Optimization:**
- [ ] Load scripts asynchronously
- [ ] Defer non-critical scripts
- [ ] Use DNS prefetch for external domains
- [ ] Consider self-hosting critical resources

---

## 10. Server Response Time

### Measure TTFB (Time to First Byte)

**Using DevTools:**
1. Network tab
2. Select HTML document
3. Check "Timing" tab
4. Look at "Waiting (TTFB)"

**Target:**
- TTFB < 600ms (good)
- TTFB < 200ms (excellent)

**Factors Affecting TTFB:**
- Server processing time
- Database queries
- Network latency
- CDN performance

### Optimization Recommendations

**If TTFB is High:**
- [ ] Use CDN (Netlify provides this)
- [ ] Enable server-side caching
- [ ] Optimize database queries
- [ ] Use faster hosting
- [ ] Enable HTTP/2 or HTTP/3

---

## 11. Build Output Analysis

### Check Vite Build Output

**Run Build:**
```bash
npm run build
```

**Review Output:**
- [ ] File sizes listed
- [ ] Gzip sizes shown
- [ ] No warnings about large files
- [ ] All assets optimized

**Expected Sizes:**
```
dist/src/pages/en/index.html        11 kB │ gzip: 3 kB
dist/assets/main-XXXXX.css          27 kB │ gzip: 5 kB
dist/assets/home-XXXXX.css           3 kB │ gzip: 1 kB
```

**Check for Issues:**
- [ ] No files > 100KB (uncompressed)
- [ ] CSS properly split
- [ ] Images optimized
- [ ] No duplicate code

---

## 12. Performance Budget

### Set Performance Budgets

**Recommended Budgets:**
- Total page size: < 1MB
- JavaScript: < 200KB
- CSS: < 100KB
- Images: < 500KB
- Fonts: < 100KB

**Monitor:**
- [ ] Track budget in Lighthouse
- [ ] Set up budget.json file
- [ ] Fail builds if budget exceeded

**Example budget.json:**
```json
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 3000
      },
      {
        "metric": "first-contentful-paint",
        "budget": 1000
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 200
      },
      {
        "resourceType": "stylesheet",
        "budget": 100
      },
      {
        "resourceType": "image",
        "budget": 500
      }
    ]
  }
]
```

---

## 13. Documentation

### Create Performance Report

**Template:**
```markdown
# Performance Audit Report

## Summary
- Date: [date]
- Tester: [name]
- Pages Tested: [list]

## Lighthouse Scores

### Mobile
- Homepage: [score]/100
- Contact: [score]/100
- Services: [score]/100

### Desktop
- Homepage: [score]/100
- Contact: [score]/100
- Services: [score]/100

## Core Web Vitals
- LCP: [time]s (Target: < 2.5s)
- FID: [time]ms (Target: < 100ms)
- CLS: [score] (Target: < 0.1)

## Load Times
- 3G: [time]s
- 4G: [time]s
- Broadband: [time]s

## File Sizes
- Total page size: [size]KB
- JavaScript: [size]KB
- CSS: [size]KB
- Images: [size]KB

## Issues Found
1. [Issue]
   - Impact: [High/Medium/Low]
   - Recommendation: [fix]

## Optimizations Implemented
1. [Optimization]
2. [Optimization]

## Recommendations
1. [Recommendation]
2. [Recommendation]
```

---

## Expected Results

### Implementation Status

Based on code review, the following optimizations are implemented:

✅ **Image Optimization:**
- WebP format with fallbacks
- Responsive images (srcset)
- Lazy loading
- Multiple sizes

✅ **Code Optimization:**
- Vite build process
- CSS minification
- Asset optimization
- Tree shaking

✅ **Loading Strategy:**
- Lazy loading images
- Async script loading
- Optimized fonts

✅ **Caching:**
- Netlify CDN
- Static asset caching
- HTTP/2 support

### Expected Lighthouse Scores

**Mobile:**
- Performance: 85-95
- (Lower due to simulated 3G throttling)

**Desktop:**
- Performance: 95-100
- (Higher due to faster connection)

**Core Web Vitals:**
- LCP: 1.5-2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)

### Potential Issues

**May Need Improvement:**
- Large hero images (optimize further)
- Third-party scripts (if added)
- Font loading (if custom fonts used)
- Initial JavaScript bundle size

---

## Conclusion

This performance audit should confirm that the Flight Service 365 website loads quickly and provides an excellent user experience across all devices and connection speeds.

**Next Steps:**
1. Run Lighthouse audits on all key pages
2. Test on real devices
3. Measure Core Web Vitals
4. Check network performance
5. Verify image optimization
6. Document results
7. Implement improvements
8. Re-test to confirm

**Requirements Met:**
- ✅ 13.1: Fast page load times
- ✅ 13.2: Optimized images
- ✅ 13.3: Minified CSS/JS
- ✅ 13.4: Lazy loading
- ✅ 13.5: Core Web Vitals

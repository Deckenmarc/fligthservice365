# 🚀 Enable GitHub Actions - Do This Now!

## Quick Steps (2 minutes)

### 1. Go to Repository Settings
Visit: https://github.com/Deckenmarc/fligthservice365/settings/pages

### 2. Change Source to GitHub Actions

Look for the **"Build and deployment"** section:

```
Build and deployment
├── Source: [Dropdown Menu]
│   ├── Deploy from a branch  ← DON'T use this
│   └── GitHub Actions         ← SELECT THIS ONE ✓
```

**Select "GitHub Actions"** from the dropdown

### 3. That's It!

No need to click Save - it auto-saves.

## What Happens Next?

1. GitHub Actions will automatically run (check Actions tab)
2. It will build your site with Vite
3. It will deploy to GitHub Pages
4. Your site will be live in 2-3 minutes

## Check Progress

1. Go to: https://github.com/Deckenmarc/fligthservice365/actions
2. You should see "Deploy to GitHub Pages" running
3. Wait for green checkmark ✓

## Your Site Will Be At:

**https://deckenmarc.github.io/fligthservice365/**

Main pages:
- English: `/src/pages/en/index.html`
- German: `/src/pages/de/index.html`

## Why This Fixes Everything

Before: GitHub Pages served raw source files
- ❌ Images had wrong paths
- ❌ Navigation didn't work
- ❌ CSS wasn't processed

After: GitHub Actions builds with Vite first
- ✅ Images get correct paths automatically
- ✅ Navigation works everywhere
- ✅ CSS is optimized and bundled
- ✅ Assets are compressed

## Need Help?

If you see any errors in the Actions tab, let me know and I'll help troubleshoot!

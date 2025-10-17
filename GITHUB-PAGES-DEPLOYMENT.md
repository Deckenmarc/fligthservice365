# GitHub Pages Deployment Guide

## Build Status

✅ **Production build completed successfully**
- All 28 HTML pages built and minified
- CSS optimized and bundled (27.14 kB main.css)
- Images optimized
- Build output in `dist/` directory

## Local Testing

The site has been built and can be tested locally using:

```bash
npm run preview
```

This will start a local server at `http://localhost:4173/` where you can verify:
- All pages load correctly
- Navigation works between pages
- Language switching functions properly
- Forms display correctly
- Images load properly

## GitHub Repository Setup

To deploy to GitHub Pages, follow these steps:

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `flight-service-365`)
4. Choose "Public" visibility (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME and YOUR_REPO with your values)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename the default branch to main (if needed)
git branch -M main

# Push the code to GitHub
git push -u origin main
```

Example:
```bash
git remote add origin https://github.com/flightservice365/flight-service-365.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. The workflow will automatically run on the next push

### 4. Verify Deployment

After pushing to GitHub:

1. Go to the "Actions" tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the build and deployment progress
4. Once complete (green checkmark), your site will be live

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

For example:
```
https://flightservice365.github.io/flight-service-365/
```

## Testing the Live Site

Once deployed, test the following:

### Pages to Test
- ✅ German homepage: `/src/pages/de/index.html`
- ✅ English homepage: `/src/pages/en/index.html`
- ✅ All service pages (5 in each language)
- ✅ About pages (Fleet, Team, Locations)
- ✅ Contact page
- ✅ Legal pages (Privacy, Terms, Imprint)
- ✅ 404 pages

### Functionality to Test
- ✅ Language switcher works on all pages
- ✅ Navigation menu (desktop and mobile)
- ✅ All internal links work correctly
- ✅ Images display properly
- ✅ Forms display correctly (submission requires Netlify/serverless setup)
- ✅ Cookie consent banner appears
- ✅ Responsive design on mobile, tablet, desktop

### Browser Testing
Test on multiple browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ Edge

## Troubleshooting

### Workflow Fails
If the GitHub Actions workflow fails:
1. Check the Actions tab for error messages
2. Ensure `package.json` and `package-lock.json` are committed
3. Verify Node.js version compatibility (workflow uses Node 20)

### 404 Errors on GitHub Pages
If you get 404 errors:
1. Check that the repository is public
2. Verify GitHub Pages is enabled in Settings
3. Check the deployment URL matches your repository name
4. Wait a few minutes for DNS propagation

### Images Not Loading
If images don't load:
1. Check image paths are relative (not absolute)
2. Verify images are in the `src/assets/images/` directory
3. Check browser console for 404 errors

### Styles Not Applied
If styles aren't loading:
1. Check the browser console for CSS loading errors
2. Verify the build completed successfully
3. Clear browser cache and hard reload (Cmd+Shift+R or Ctrl+Shift+R)

## Custom Domain (Optional)

To use a custom domain like `www.flightservice365.com`:

1. In your repository Settings > Pages
2. Enter your custom domain in the "Custom domain" field
3. Add DNS records at your domain registrar:
   - For apex domain (flightservice365.com):
     ```
     A record: 185.199.108.153
     A record: 185.199.109.153
     A record: 185.199.110.153
     A record: 185.199.111.153
     ```
   - For www subdomain:
     ```
     CNAME record: YOUR_USERNAME.github.io
     ```
4. Wait for DNS propagation (can take up to 24 hours)
5. Enable "Enforce HTTPS" in GitHub Pages settings

## Updating the Site

To make changes and redeploy:

```bash
# Make your changes to files
# ...

# Build locally to test
npm run build
npm run preview

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub (triggers automatic deployment)
git push
```

The GitHub Actions workflow will automatically:
1. Install dependencies
2. Build the site
3. Deploy to GitHub Pages

## Performance Optimization

The build includes:
- ✅ Minified HTML
- ✅ Optimized and bundled CSS
- ✅ Image optimization (WebP generation)
- ✅ Gzip compression
- ✅ Lazy loading for images

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Next Steps

After deployment:
1. Test all pages and functionality
2. Run Lighthouse audits
3. Set up form submission (Netlify Functions or similar)
4. Add real images to replace placeholders
5. Configure custom domain (if desired)
6. Set up analytics (Google Analytics, etc.)
7. Submit sitemap to search engines

## Support

For issues with:
- **GitHub Pages**: Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- **GitHub Actions**: Check [GitHub Actions documentation](https://docs.github.com/en/actions)
- **Build errors**: Check the Actions tab for detailed logs

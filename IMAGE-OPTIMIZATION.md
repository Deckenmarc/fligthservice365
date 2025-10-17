# Image Optimization Build Process

This document explains how images are automatically optimized during the build process for the Flight Service 365 website.

## Overview

The build process uses `vite-plugin-imagemin` to automatically optimize all images in the `src/assets/images/` directory. This happens during the production build (`npm run build`) and results in smaller file sizes without visible quality loss.

## Optimization Settings

### JPEG Images
- **Quality**: 85%
- **Format**: Progressive JPEG
- **Tool**: mozjpeg

Progressive JPEGs load incrementally, showing a low-resolution version first that gradually improves. This provides better perceived performance.

**File size reduction**: Typically 20-40% smaller than unoptimized JPEGs

### PNG Images
- **Quality**: 80-90%
- **Optimization**: Lossless (optipng) + Lossy (pngquant)
- **Tools**: optipng + pngquant

PNG optimization uses two passes:
1. Lossless optimization with optipng (removes unnecessary data)
2. Lossy optimization with pngquant (reduces color palette)

**File size reduction**: Typically 40-70% smaller than unoptimized PNGs

### WebP Images
- **Quality**: 85%
- **Format**: Lossy WebP
- **Tool**: webp

WebP is a modern image format that provides superior compression compared to JPEG and PNG. The build process automatically generates WebP versions of all images.

**File size reduction**: Typically 25-35% smaller than equivalent JPEG

### SVG Images
- **Optimization**: Remove unnecessary metadata, comments, and whitespace
- **Tool**: svgo
- **Preserves**: viewBox (for responsive scaling), accessibility attributes

SVG optimization removes unnecessary data while preserving functionality.

**File size reduction**: Typically 10-30% smaller than unoptimized SVGs

### GIF Images
- **Optimization Level**: 7 (maximum)
- **Interlacing**: Disabled
- **Tool**: gifsicle

Note: Consider converting animated GIFs to video formats (MP4, WebM) for better compression.

## Build Process

### Development Mode

```bash
npm run dev
```

In development mode, images are served as-is without optimization for faster build times.

### Production Build

```bash
npm run build
```

During production build:
1. All images in `src/assets/images/` are processed
2. Original formats are optimized (JPEG, PNG, SVG, GIF)
3. WebP versions are generated for JPEG and PNG images
4. Optimized images are output to `dist/assets/images/`

### Build Output Structure

```
dist/
└── assets/
    └── images/
        ├── logos/
        │   ├── logo-white-600.svg (optimized)
        │   └── logo-white-300.svg (optimized)
        ├── team/
        │   ├── member-400.jpg (optimized)
        │   ├── member-400.webp (generated)
        │   ├── member-800.jpg (optimized)
        │   └── member-800.webp (generated)
        ├── fleet/
        │   ├── aircraft-320.jpg (optimized)
        │   ├── aircraft-320.webp (generated)
        │   ├── aircraft-768.jpg (optimized)
        │   ├── aircraft-768.webp (generated)
        │   └── ...
        └── ...
```

## Manual Image Preparation

While the build process handles optimization automatically, following these guidelines will result in even better performance:

### Before Adding Images

1. **Resize images to appropriate dimensions**
   - Don't upload 4000px images if they'll only display at 800px
   - Create multiple sizes for responsive images (320w, 768w, 1024w, 1920w)

2. **Use appropriate formats**
   - Photos: JPEG
   - Graphics with transparency: PNG
   - Simple graphics/logos: SVG
   - Avoid GIF for photos

3. **Basic optimization**
   - Use tools like ImageOptim, TinyPNG, or Squoosh
   - Remove EXIF data from photos
   - Reduce color depth if possible

### Recommended Tools

**Online Tools:**
- [Squoosh](https://squoosh.app/) - Visual image optimization
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

**Desktop Tools:**
- [ImageOptim](https://imageoptim.com/) (Mac) - Batch image optimization
- [FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer) (Windows) - Multi-format optimization

**Command Line:**
```bash
# Install imagemin-cli
npm install -g imagemin-cli

# Optimize JPEG
imagemin input.jpg --plugin=mozjpeg > output.jpg

# Optimize PNG
imagemin input.png --plugin=pngquant > output.png

# Generate WebP
cwebp -q 85 input.jpg -o output.webp
```

## Responsive Image Workflow

### 1. Create Source Images

Start with high-resolution source images:
- Photos: 2400px+ width
- Graphics: Vector format (SVG) or 2x final display size

### 2. Generate Multiple Sizes

Create versions at standard breakpoints:

```bash
# Using ImageMagick
convert source.jpg -resize 320x source-320.jpg
convert source.jpg -resize 768x source-768.jpg
convert source.jpg -resize 1024x source-1024.jpg
convert source.jpg -resize 1920x source-1920.jpg
```

Or use an automated tool like [Sharp](https://sharp.pixelplumbing.com/):

```javascript
const sharp = require('sharp');

const sizes = [320, 768, 1024, 1920];
const inputFile = 'source.jpg';

sizes.forEach(size => {
  sharp(inputFile)
    .resize(size)
    .jpeg({ quality: 85 })
    .toFile(`output-${size}.jpg`);
});
```

### 3. Add to Project

Place images in appropriate directory:
```
src/assets/images/
├── backgrounds/
│   ├── hero-home-320.jpg
│   ├── hero-home-768.jpg
│   ├── hero-home-1024.jpg
│   └── hero-home-1920.jpg
```

### 4. Build

Run `npm run build` - the build process will:
- Optimize all JPEG files
- Generate WebP versions automatically
- Output to `dist/assets/images/`

### 5. Use in HTML

```html
<picture>
  <source 
    type="image/webp"
    srcset="
      /assets/images/backgrounds/hero-home-320.webp 320w,
      /assets/images/backgrounds/hero-home-768.webp 768w,
      /assets/images/backgrounds/hero-home-1024.webp 1024w,
      /assets/images/backgrounds/hero-home-1920.webp 1920w
    "
    sizes="100vw"
  >
  <source 
    type="image/jpeg"
    srcset="
      /assets/images/backgrounds/hero-home-320.jpg 320w,
      /assets/images/backgrounds/hero-home-768.jpg 768w,
      /assets/images/backgrounds/hero-home-1024.jpg 1024w,
      /assets/images/backgrounds/hero-home-1920.jpg 1920w
    "
    sizes="100vw"
  >
  <img 
    src="/assets/images/backgrounds/hero-home-1920.jpg" 
    alt="Description"
    width="1920"
    height="1080"
  >
</picture>
```

## Performance Metrics

### Target Metrics

- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Image Weight**: < 500KB per page

### Measuring Performance

Use Chrome DevTools Lighthouse:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://yoursite.com --view
```

Or use online tools:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### Optimization Checklist

- [ ] All images are appropriately sized (not oversized)
- [ ] JPEG quality is 80-85%
- [ ] WebP versions are generated
- [ ] Responsive images use srcset
- [ ] Images below fold use lazy loading
- [ ] All images have width/height attributes
- [ ] SVGs are optimized
- [ ] No unnecessary image formats (e.g., PNG for photos)

## Troubleshooting

### Build Fails with Image Optimization Error

If the build fails during image optimization:

1. **Check image format**: Ensure images are valid JPEG, PNG, SVG, or GIF
2. **Check file size**: Very large images (>10MB) may cause issues
3. **Disable optimization temporarily**:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [
    // Comment out viteImagemin temporarily
    // viteImagemin({ ... }),
  ],
});
```

### WebP Images Not Generated

Ensure the webp configuration is present in vite.config.js:

```javascript
viteImagemin({
  webp: {
    quality: 85,
  },
})
```

### Images Look Blurry

If optimized images appear blurry:

1. Increase quality setting (85 → 90)
2. Check source image resolution
3. Ensure correct image size is being served

### Large Bundle Size

If the build output is too large:

1. Check for oversized source images
2. Reduce JPEG/WebP quality (85 → 80)
3. Remove unused images
4. Consider lazy loading more images

## Advanced Configuration

### Custom Quality Settings

Adjust quality per image type:

```javascript
viteImagemin({
  mozjpeg: {
    quality: 80, // Lower for smaller files
  },
  webp: {
    quality: 80,
  },
})
```

### Exclude Certain Images

To exclude images from optimization:

```javascript
viteImagemin({
  // ... other settings
  exclude: /placeholder-.*\.(jpg|png)$/,
})
```

### Add Additional Formats

To generate AVIF (next-gen format):

```bash
npm install imagemin-avif
```

```javascript
import imageminAvif from 'imagemin-avif';

viteImagemin({
  // ... other settings
  plugins: [
    imageminAvif({
      quality: 80,
    }),
  ],
})
```

## Resources

- [Vite Plugin Imagemin](https://github.com/vbenjs/vite-plugin-imagemin)
- [WebP Documentation](https://developers.google.com/speed/webp)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Responsive Images Guide](https://web.dev/responsive-images/)
- [Core Web Vitals](https://web.dev/vitals/)

## Support

For issues with image optimization:
1. Check the build logs for specific errors
2. Verify image file formats and sizes
3. Test with a minimal set of images
4. Consult the vite-plugin-imagemin documentation

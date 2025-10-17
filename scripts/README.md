# Build Scripts

This directory contains utility scripts for the Flight Service 365 website build process.

## Available Scripts

### generate-responsive-images.js

Generates multiple sizes of images for responsive design with WebP support.

**Installation:**
```bash
npm install sharp
```

**Usage:**
```bash
node scripts/generate-responsive-images.js <input-file> <output-directory>
```

**Example:**
```bash
# Generate responsive versions of a hero image
node scripts/generate-responsive-images.js hero-original.jpg src/assets/images/backgrounds/

# Generate responsive versions of a team photo
node scripts/generate-responsive-images.js team-member.jpg src/assets/images/team/
```

**What it does:**
- Creates images at standard breakpoints: 320w, 768w, 1024w, 1920w
- Generates both original format (JPEG/PNG) and WebP versions
- Optimizes images with appropriate quality settings
- Provides HTML usage example

**Output:**
```
src/assets/images/backgrounds/
├── hero-320.jpg
├── hero-320.webp
├── hero-768.jpg
├── hero-768.webp
├── hero-1024.jpg
├── hero-1024.webp
├── hero-1920.jpg
└── hero-1920.webp
```

## Adding New Scripts

When adding new build scripts:

1. Create the script file in this directory
2. Add appropriate shebang: `#!/usr/bin/env node`
3. Make it executable: `chmod +x scripts/your-script.js`
4. Add documentation to this README
5. Add npm script to package.json if needed

## Dependencies

Scripts may require additional dependencies:

- **sharp**: Image processing (for generate-responsive-images.js)
  ```bash
  npm install sharp
  ```

Install dependencies as needed when using specific scripts.

#!/usr/bin/env node

/**
 * Generate Responsive Images Script
 * 
 * This script helps generate multiple sizes of images for responsive design.
 * It uses Sharp (https://sharp.pixelplumbing.com/) for high-quality image processing.
 * 
 * Usage:
 *   node scripts/generate-responsive-images.js <input-file> <output-directory>
 * 
 * Example:
 *   node scripts/generate-responsive-images.js hero.jpg src/assets/images/backgrounds/
 * 
 * This will generate:
 *   - hero-320.jpg
 *   - hero-768.jpg
 *   - hero-1024.jpg
 *   - hero-1920.jpg
 * 
 * Requirements:
 *   npm install sharp
 */

import sharp from 'sharp';
import { basename, extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Standard breakpoints for responsive images
const BREAKPOINTS = [320, 768, 1024, 1920];

// Quality settings
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;
const WEBP_QUALITY = 85;

/**
 * Generate responsive image sizes
 */
async function generateResponsiveImages(inputFile, outputDir) {
  try {
    // Validate input file
    if (!existsSync(inputFile)) {
      console.error(`Error: Input file "${inputFile}" does not exist`);
      process.exit(1);
    }

    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
      console.log(`Created directory: ${outputDir}`);
    }

    // Get file info
    const ext = extname(inputFile).toLowerCase();
    const baseName = basename(inputFile, ext);
    
    // Get image metadata
    const metadata = await sharp(inputFile).metadata();
    console.log(`\nProcessing: ${inputFile}`);
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    console.log(`Format: ${metadata.format}\n`);

    // Generate images at each breakpoint
    for (const width of BREAKPOINTS) {
      // Skip if breakpoint is larger than original
      if (width > metadata.width) {
        console.log(`⏭️  Skipping ${width}w (larger than original)`);
        continue;
      }

      const outputBase = join(outputDir, `${baseName}-${width}`);

      // Generate original format
      if (ext === '.jpg' || ext === '.jpeg') {
        const outputFile = `${outputBase}.jpg`;
        await sharp(inputFile)
          .resize(width)
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toFile(outputFile);
        console.log(`✅ Generated: ${outputFile}`);
      } else if (ext === '.png') {
        const outputFile = `${outputBase}.png`;
        await sharp(inputFile)
          .resize(width)
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toFile(outputFile);
        console.log(`✅ Generated: ${outputFile}`);
      }

      // Generate WebP version (for JPEG and PNG)
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const webpFile = `${outputBase}.webp`;
        await sharp(inputFile)
          .resize(width)
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpFile);
        console.log(`✅ Generated: ${webpFile}`);
      }
    }

    console.log('\n✨ Done! All images generated successfully.\n');

    // Print usage example
    printUsageExample(baseName, ext);

  } catch (error) {
    console.error('Error generating images:', error.message);
    process.exit(1);
  }
}

/**
 * Print HTML usage example
 */
function printUsageExample(baseName, ext) {
  const format = ext === '.png' ? 'png' : 'jpeg';
  
  console.log('📝 HTML Usage Example:\n');
  console.log('<picture>');
  console.log('  <source');
  console.log('    type="image/webp"');
  console.log('    srcset="');
  BREAKPOINTS.forEach(bp => {
    console.log(`      /assets/images/path/${baseName}-${bp}.webp ${bp}w,`);
  });
  console.log('    "');
  console.log('    sizes="100vw"');
  console.log('  >');
  console.log('  <source');
  console.log(`    type="image/${format}"`);
  console.log('    srcset="');
  BREAKPOINTS.forEach(bp => {
    const fileExt = format === 'jpeg' ? 'jpg' : format;
    console.log(`      /assets/images/path/${baseName}-${bp}.${fileExt} ${bp}w,`);
  });
  console.log('    "');
  console.log('    sizes="100vw"');
  console.log('  >');
  console.log('  <img');
  const fileExt = format === 'jpeg' ? 'jpg' : format;
  console.log(`    src="/assets/images/path/${baseName}-1920.${fileExt}"`);
  console.log('    alt="Descriptive alt text"');
  console.log('    width="1920"');
  console.log('    height="1080"');
  console.log('    loading="lazy"');
  console.log('  >');
  console.log('</picture>\n');
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Generate Responsive Images

Usage:
  node scripts/generate-responsive-images.js <input-file> <output-directory>

Arguments:
  input-file        Path to the source image (JPEG or PNG)
  output-directory  Directory where generated images will be saved

Examples:
  node scripts/generate-responsive-images.js hero.jpg src/assets/images/backgrounds/
  node scripts/generate-responsive-images.js team-photo.png src/assets/images/team/

Generated Sizes:
  - 320w  (mobile portrait)
  - 768w  (tablet portrait)
  - 1024w (tablet landscape / small desktop)
  - 1920w (desktop / large screens)

Output Formats:
  - Original format (JPEG or PNG) at each size
  - WebP format at each size (for better compression)

Quality Settings:
  - JPEG: ${JPEG_QUALITY}% (progressive)
  - PNG: ${PNG_QUALITY}% (compression level 9)
  - WebP: ${WEBP_QUALITY}%

Requirements:
  npm install sharp

For more information, see IMAGE-OPTIMIZATION.md
  `);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (args.length < 2) {
  console.error('Error: Missing required arguments\n');
  printHelp();
  process.exit(1);
}

const [inputFile, outputDir] = args;
generateResponsiveImages(inputFile, outputDir);

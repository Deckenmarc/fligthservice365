import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';
import { resolve } from 'path';

export default defineConfig({
  base: '/fligthservice365/',
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
    // Image optimization plugin
    // Automatically optimizes images during build process
    viteImagemin({
      // GIF optimization
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      // PNG optimization (lossless)
      optipng: {
        optimizationLevel: 7,
      },
      // JPEG optimization
      mozjpeg: {
        quality: 85, // 85% quality for good balance of size/quality
        progressive: true, // Progressive JPEGs load faster
      },
      // PNG optimization (lossy, better compression than optipng)
      pngquant: {
        quality: [0.8, 0.9], // 80-90% quality range
        speed: 4,
      },
      // SVG optimization
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // Don't remove viewBox - needed for responsive SVGs
                removeViewBox: false,
                // Keep empty attributes for accessibility
                removeEmptyAttrs: false,
              },
            },
          },
          // Remove unnecessary metadata
          'removeDoctype',
          'removeComments',
        ],
      },
      // WebP generation
      // Creates WebP versions alongside original images
      webp: {
        quality: 85, // 85% quality for WebP (better compression than JPEG)
        lossless: false, // Use lossy compression for smaller files
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // German pages
        'de-index': resolve(__dirname, 'src/pages/de/index.html'),
        'de-flugzeugcharter': resolve(__dirname, 'src/pages/de/flugzeugcharter.html'),
        'de-blockcharter': resolve(__dirname, 'src/pages/de/blockcharter.html'),
        'de-flotte': resolve(__dirname, 'src/pages/de/flotte.html'),
        'de-ppl365': resolve(__dirname, 'src/pages/de/ppl365.html'),
        'de-hourbuilding': resolve(__dirname, 'src/pages/de/hourbuilding.html'),
        'de-rundfluge': resolve(__dirname, 'src/pages/de/rundfluge.html'),
        'de-standorte': resolve(__dirname, 'src/pages/de/standorte.html'),
        'de-team': resolve(__dirname, 'src/pages/de/team.html'),
        'de-kontakt': resolve(__dirname, 'src/pages/de/kontakt.html'),
        'de-datenschutz': resolve(__dirname, 'src/pages/de/datenschutz.html'),
        'de-impressum': resolve(__dirname, 'src/pages/de/impressum.html'),
        'de-agb': resolve(__dirname, 'src/pages/de/agb.html'),
        'de-404': resolve(__dirname, 'src/pages/de/404.html'),
        
        // English pages
        'en-index': resolve(__dirname, 'src/pages/en/index.html'),
        'en-aircraft-charter': resolve(__dirname, 'src/pages/en/aircraft-charter.html'),
        'en-blockcharter': resolve(__dirname, 'src/pages/en/blockcharter.html'),
        'en-fleet': resolve(__dirname, 'src/pages/en/fleet.html'),
        'en-ppl365': resolve(__dirname, 'src/pages/en/ppl365.html'),
        'en-hour-building': resolve(__dirname, 'src/pages/en/hour-building.html'),
        'en-trial-flights': resolve(__dirname, 'src/pages/en/trial-flights.html'),
        'en-locations': resolve(__dirname, 'src/pages/en/locations.html'),
        'en-team': resolve(__dirname, 'src/pages/en/team.html'),
        'en-contact': resolve(__dirname, 'src/pages/en/contact.html'),
        'en-privacy': resolve(__dirname, 'src/pages/en/privacy.html'),
        'en-imprint': resolve(__dirname, 'src/pages/en/imprint.html'),
        'en-terms': resolve(__dirname, 'src/pages/en/terms.html'),
        'en-404': resolve(__dirname, 'src/pages/en/404.html'),
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});

/**
 * Responsive Images Utility
 * 
 * Provides helper functions for creating and managing responsive images
 * with WebP support, lazy loading, and proper accessibility attributes.
 */

const ResponsiveImages = (() => {
  
  /**
   * Standard breakpoints for responsive images
   */
  const BREAKPOINTS = {
    mobile: 320,
    mobileLarge: 480,
    tablet: 768,
    desktop: 1024,
    desktopLarge: 1440,
    wide: 1920
  };

  /**
   * Creates a responsive picture element with WebP support
   * 
   * @param {Object} options - Configuration options
   * @param {string} options.basePath - Base path without extension (e.g., '/images/hero')
   * @param {string} options.alt - Alt text for accessibility
   * @param {number} options.width - Intrinsic width
   * @param {number} options.height - Intrinsic height
   * @param {string} options.sizes - Sizes attribute value
   * @param {boolean} options.lazy - Whether to lazy load (default: true)
   * @param {string} options.className - CSS class name
   * @param {Array<number>} options.breakpoints - Custom breakpoints (optional)
   * @returns {HTMLPictureElement}
   */
  const createPicture = (options) => {
    const {
      basePath,
      alt,
      width,
      height,
      sizes = '100vw',
      lazy = true,
      className = '',
      breakpoints = [BREAKPOINTS.mobile, BREAKPOINTS.tablet, BREAKPOINTS.desktop, BREAKPOINTS.wide]
    } = options;

    const picture = document.createElement('picture');

    // Create WebP source
    const webpSource = document.createElement('source');
    webpSource.type = 'image/webp';
    webpSource.srcset = breakpoints
      .map(bp => `${basePath}-${bp}.webp ${bp}w`)
      .join(', ');
    webpSource.sizes = sizes;
    picture.appendChild(webpSource);

    // Create JPEG/PNG fallback source
    const fallbackSource = document.createElement('source');
    fallbackSource.type = 'image/jpeg';
    fallbackSource.srcset = breakpoints
      .map(bp => `${basePath}-${bp}.jpg ${bp}w`)
      .join(', ');
    fallbackSource.sizes = sizes;
    picture.appendChild(fallbackSource);

    // Create img element
    const img = document.createElement('img');
    img.src = `${basePath}-${breakpoints[breakpoints.length - 1]}.jpg`;
    img.alt = alt;
    img.width = width;
    img.height = height;
    if (lazy) {
      img.loading = 'lazy';
    }
    if (className) {
      img.className = className;
    }
    picture.appendChild(img);

    return picture;
  };

  /**
   * Creates a simple img element with proper attributes
   * 
   * @param {Object} options - Configuration options
   * @param {string} options.src - Image source
   * @param {string} options.alt - Alt text
   * @param {number} options.width - Width
   * @param {number} options.height - Height
   * @param {boolean} options.lazy - Lazy load (default: true)
   * @param {string} options.className - CSS class
   * @returns {HTMLImageElement}
   */
  const createImage = (options) => {
    const {
      src,
      alt,
      width,
      height,
      lazy = true,
      className = ''
    } = options;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.width = width;
    img.height = height;
    if (lazy) {
      img.loading = 'lazy';
    }
    if (className) {
      img.className = className;
    }

    return img;
  };

  /**
   * Updates all images on the page to add lazy loading if not present
   */
  const enableLazyLoading = () => {
    const images = document.querySelectorAll('img:not([loading])');
    
    images.forEach((img, index) => {
      // Don't lazy load the first few images (likely above the fold)
      if (index > 2) {
        img.loading = 'lazy';
      }
    });
  };

  /**
   * Validates that all images have proper alt text
   * Logs warnings for images missing alt attributes
   */
  const validateAltText = () => {
    const images = document.querySelectorAll('img');
    const missingAlt = [];

    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        missingAlt.push(img);
        console.warn('Image missing alt attribute:', img.src);
      }
    });

    return missingAlt.length === 0;
  };

  /**
   * Validates that all images have width and height attributes
   * to prevent layout shift
   */
  const validateDimensions = () => {
    const images = document.querySelectorAll('img');
    const missingDimensions = [];

    images.forEach(img => {
      if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        missingDimensions.push(img);
        console.warn('Image missing width/height attributes:', img.src);
      }
    });

    return missingDimensions.length === 0;
  };

  /**
   * Generates srcset string for a given base path and breakpoints
   * 
   * @param {string} basePath - Base path without size suffix
   * @param {string} extension - File extension (jpg, webp, png)
   * @param {Array<number>} breakpoints - Array of widths
   * @returns {string}
   */
  const generateSrcset = (basePath, extension, breakpoints = null) => {
    const bps = breakpoints || [
      BREAKPOINTS.mobile,
      BREAKPOINTS.tablet,
      BREAKPOINTS.desktop,
      BREAKPOINTS.wide
    ];

    return bps
      .map(bp => `${basePath}-${bp}.${extension} ${bp}w`)
      .join(', ');
  };

  /**
   * Common sizes attribute patterns
   */
  const SIZES_PATTERNS = {
    fullWidth: '100vw',
    halfWidth: '(max-width: 768px) 100vw, 50vw',
    thirdWidth: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    maxWidth800: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px',
    maxWidth600: '(max-width: 768px) 100vw, 600px',
    maxWidth400: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px'
  };

  /**
   * Initialize responsive images functionality
   * - Enables lazy loading on existing images
   * - Validates alt text and dimensions in development
   */
  const init = () => {
    // Enable lazy loading for images below the fold
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enableLazyLoading);
    } else {
      enableLazyLoading();
    }

    // Validate images in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          validateAltText();
          validateDimensions();
        });
      } else {
        validateAltText();
        validateDimensions();
      }
    }
  };

  // Public API
  return {
    createPicture,
    createImage,
    generateSrcset,
    enableLazyLoading,
    validateAltText,
    validateDimensions,
    init,
    BREAKPOINTS,
    SIZES_PATTERNS
  };
})();

// Auto-initialize
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResponsiveImages;
} else {
  // Initialize when DOM is ready
  ResponsiveImages.init();
}

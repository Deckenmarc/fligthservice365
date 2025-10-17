/**
 * SEO Tags Module
 * Automatically adds hreflang and canonical tags to pages
 * Should be included in the <head> of each page
 */

const SEOTags = (() => {
  // Base URL for the site (update this for production)
  const BASE_URL = 'https://www.flightservice365.com';

  // Page mappings between languages (same as language-switcher.js)
  const pageMappings = {
    // Homepage
    '/de/index.html': '/en/index.html',
    '/en/index.html': '/de/index.html',
    '/de/': '/en/',
    '/en/': '/de/',
    
    // Service pages
    '/de/flugzeugcharter.html': '/en/aircraft-charter.html',
    '/en/aircraft-charter.html': '/de/flugzeugcharter.html',
    
    '/de/blockcharter.html': '/en/blockcharter.html',
    '/en/blockcharter.html': '/de/blockcharter.html',
    
    '/de/ppl365.html': '/en/ppl365.html',
    '/en/ppl365.html': '/de/ppl365.html',
    
    '/de/hourbuilding.html': '/en/hour-building.html',
    '/en/hour-building.html': '/de/hourbuilding.html',
    
    '/de/rundfluge.html': '/en/trial-flights.html',
    '/en/trial-flights.html': '/de/rundfluge.html',
    
    // About Us pages
    '/de/flotte.html': '/en/fleet.html',
    '/en/fleet.html': '/de/flotte.html',
    
    '/de/team.html': '/en/team.html',
    '/en/team.html': '/de/team.html',
    
    '/de/standorte.html': '/en/locations.html',
    '/en/locations.html': '/de/standorte.html',
    
    // Contact page
    '/de/kontakt.html': '/en/contact.html',
    '/en/contact.html': '/de/kontakt.html',
    
    // Legal pages
    '/de/datenschutz.html': '/en/privacy.html',
    '/en/privacy.html': '/de/datenschutz.html',
    
    '/de/impressum.html': '/en/imprint.html',
    '/en/imprint.html': '/de/impressum.html',
    
    '/de/agb.html': '/en/terms.html',
    '/en/terms.html': '/de/agb.html',
    
    // 404 pages
    '/de/404.html': '/en/404.html',
    '/en/404.html': '/de/404.html'
  };

  /**
   * Get the current page path
   * @returns {string} Current page path
   */
  const getCurrentPath = () => {
    return window.location.pathname;
  };

  /**
   * Get the current language from the path
   * @returns {string} 'de' or 'en'
   */
  const getCurrentLanguage = () => {
    const path = getCurrentPath();
    if (path.includes('/de/')) {
      return 'de';
    } else if (path.includes('/en/')) {
      return 'en';
    }
    // Default to German
    return 'de';
  };

  /**
   * Get the alternate language path for the current page
   * @returns {string|null} Alternate language path or null if not found
   */
  const getAlternatePath = () => {
    const currentPath = getCurrentPath();
    return pageMappings[currentPath] || null;
  };

  /**
   * Create a link element for hreflang or canonical
   * @param {string} rel - Relationship type ('alternate' or 'canonical')
   * @param {string} href - URL
   * @param {string} hreflang - Language code (optional, for alternate links)
   * @returns {HTMLLinkElement} Link element
   */
  const createLinkElement = (rel, href, hreflang = null) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (hreflang) {
      link.hreflang = hreflang;
    }
    return link;
  };

  /**
   * Add canonical tag to the page
   */
  const addCanonicalTag = () => {
    const currentPath = getCurrentPath();
    const canonicalUrl = BASE_URL + currentPath;
    
    // Check if canonical tag already exists
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = canonicalUrl;
    } else {
      const canonical = createLinkElement('canonical', canonicalUrl);
      document.head.appendChild(canonical);
    }
  };

  /**
   * Add hreflang tags to the page
   */
  const addHreflangTags = () => {
    const currentPath = getCurrentPath();
    const currentLang = getCurrentLanguage();
    const alternatePath = getAlternatePath();
    
    // Remove existing hreflang tags to avoid duplicates
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    // Add hreflang for current language
    const currentHreflang = createLinkElement(
      'alternate',
      BASE_URL + currentPath,
      currentLang
    );
    document.head.appendChild(currentHreflang);
    
    // Add hreflang for alternate language if it exists
    if (alternatePath) {
      const alternateLang = currentLang === 'de' ? 'en' : 'de';
      const alternateHreflang = createLinkElement(
        'alternate',
        BASE_URL + alternatePath,
        alternateLang
      );
      document.head.appendChild(alternateHreflang);
    }
    
    // Add x-default hreflang (pointing to German version as default)
    const defaultPath = currentLang === 'de' ? currentPath : (alternatePath || '/de/index.html');
    const xDefaultHreflang = createLinkElement(
      'alternate',
      BASE_URL + defaultPath,
      'x-default'
    );
    document.head.appendChild(xDefaultHreflang);
  };

  /**
   * Initialize SEO tags
   */
  const init = () => {
    addCanonicalTag();
    addHreflangTags();
  };

  // Public API
  return {
    init,
    addCanonicalTag,
    addHreflangTags,
    getCurrentLanguage,
    getAlternatePath
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SEOTags.init);
} else {
  SEOTags.init();
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOTags;
}

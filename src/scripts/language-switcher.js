/**
 * Language Switcher Module
 * Handles switching between German and English versions of pages
 * Stores language preference in localStorage
 */

const LanguageSwitcher = (() => {
  // URL path mappings between German and English pages
  const pathMappings = {
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
    // Default to German if no language detected
    return 'de';
  };

  /**
   * Get the alternate language path for the current page
   * @returns {string|null} Alternate language path or null if not found
   */
  const getAlternatePath = () => {
    const currentPath = getCurrentPath();
    return pathMappings[currentPath] || null;
  };

  /**
   * Switch to the specified language
   * @param {string} targetLang - Target language ('de' or 'en')
   */
  const switchLanguage = (targetLang) => {
    const currentLang = getCurrentLanguage();
    
    // If already on target language, do nothing
    if (currentLang === targetLang) {
      return;
    }

    const alternatePath = getAlternatePath();
    
    if (alternatePath) {
      // Store language preference
      storeLanguagePreference(targetLang);
      
      // Navigate to alternate page
      window.location.href = alternatePath;
    } else {
      // If no mapping found, try to navigate to homepage of target language
      console.warn('No alternate path found for current page, redirecting to homepage');
      storeLanguagePreference(targetLang);
      window.location.href = `/${targetLang}/index.html`;
    }
  };

  /**
   * Store language preference in localStorage
   * @param {string} lang - Language code ('de' or 'en')
   */
  const storeLanguagePreference = (lang) => {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.warn('Could not store language preference:', e);
    }
  };

  /**
   * Get stored language preference from localStorage
   * @returns {string|null} Stored language preference or null
   */
  const getStoredLanguagePreference = () => {
    try {
      return localStorage.getItem('preferredLanguage');
    } catch (e) {
      console.warn('Could not retrieve language preference:', e);
      return null;
    }
  };

  /**
   * Update active state of language buttons
   */
  const updateActiveLanguage = () => {
    const currentLang = getCurrentLanguage();
    const languageButtons = document.querySelectorAll('[data-lang]');
    
    languageButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      if (buttonLang === currentLang) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'true');
      } else {
        button.classList.remove('active');
        button.removeAttribute('aria-current');
      }
    });
  };

  /**
   * Initialize language switcher
   */
  const init = () => {
    // Find all language switcher buttons
    const languageButtons = document.querySelectorAll('[data-lang]');
    
    if (languageButtons.length === 0) {
      console.warn('No language switcher buttons found');
      return;
    }

    // Add click event listeners to language buttons
    languageButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = button.getAttribute('data-lang');
        if (targetLang) {
          switchLanguage(targetLang);
        }
      });
    });

    // Update active state on page load
    updateActiveLanguage();

    // Store current language preference
    const currentLang = getCurrentLanguage();
    storeLanguagePreference(currentLang);
  };

  // Public API
  return {
    init,
    switchLanguage,
    getCurrentLanguage,
    getAlternatePath,
    getStoredLanguagePreference
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', LanguageSwitcher.init);
} else {
  LanguageSwitcher.init();
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}

/**
 * Cookie Consent Management
 * Handles GDPR-compliant cookie consent banner and preferences
 */

const CookieConsent = (() => {
  const COOKIE_NAME = 'cookieConsent';
  const COOKIE_EXPIRY_DAYS = 365;
  
  let banner = null;
  let modal = null;
  let preferences = {
    essential: true,
    analytics: false,
    marketing: false
  };

  /**
   * Initialize the cookie consent system
   */
  const init = () => {
    banner = document.querySelector('.cookie-banner');
    modal = document.querySelector('.cookie-modal');
    
    if (!banner) {
      console.warn('Cookie banner not found');
      return;
    }

    // Check if consent already exists
    const existingConsent = getConsent();
    if (existingConsent) {
      preferences = existingConsent;
      loadScriptsBasedOnConsent();
    } else {
      // Show banner after 1 second delay
      setTimeout(() => {
        showBanner();
      }, 1000);
    }

    // Attach event listeners
    attachEventListeners();
  };

  /**
   * Attach event listeners to buttons
   */
  const attachEventListeners = () => {
    // Banner buttons
    const acceptAllBtn = banner?.querySelector('[data-action="accept-all"]');
    const essentialOnlyBtn = banner?.querySelector('[data-action="essential-only"]');
    const customizeBtn = banner?.querySelector('[data-action="customize"]');

    acceptAllBtn?.addEventListener('click', handleAcceptAll);
    essentialOnlyBtn?.addEventListener('click', handleEssentialOnly);
    customizeBtn?.addEventListener('click', handleCustomize);

    // Modal buttons
    const saveBtn = modal?.querySelector('[data-action="save-preferences"]');
    const closeModalBtns = modal?.querySelectorAll('[data-action="close-modal"]');

    saveBtn?.addEventListener('click', handleSavePreferences);
    closeModalBtns?.forEach(btn => {
      btn.addEventListener('click', handleCloseModal);
    });

    // Close modal on overlay click
    const overlay = modal?.querySelector('.cookie-modal-overlay');
    overlay?.addEventListener('click', handleCloseModal);
  };

  /**
   * Show the cookie banner
   */
  const showBanner = () => {
    if (banner) {
      banner.setAttribute('aria-hidden', 'false');
    }
  };

  /**
   * Hide the cookie banner
   */
  const hideBanner = () => {
    if (banner) {
      banner.setAttribute('aria-hidden', 'true');
    }
  };

  /**
   * Show the customization modal
   */
  const showModal = () => {
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      
      // Set current preferences in checkboxes
      const analyticsCheckbox = modal.querySelector('input[name="analytics"]');
      const marketingCheckbox = modal.querySelector('input[name="marketing"]');
      
      if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics;
      if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing;
      
      // Focus the modal for accessibility
      modal.querySelector('.cookie-modal-content')?.focus();
    }
  };

  /**
   * Hide the customization modal
   */
  const hideModal = () => {
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  /**
   * Handle "Accept All" button click
   */
  const handleAcceptAll = () => {
    preferences = {
      essential: true,
      analytics: true,
      marketing: true
    };
    saveConsent();
    hideBanner();
    loadScriptsBasedOnConsent();
  };

  /**
   * Handle "Essential Only" button click
   */
  const handleEssentialOnly = () => {
    preferences = {
      essential: true,
      analytics: false,
      marketing: false
    };
    saveConsent();
    hideBanner();
  };

  /**
   * Handle "Customize" button click
   */
  const handleCustomize = () => {
    showModal();
  };

  /**
   * Handle "Save Preferences" button click in modal
   */
  const handleSavePreferences = () => {
    // Get checkbox values
    const analyticsCheckbox = modal?.querySelector('input[name="analytics"]');
    const marketingCheckbox = modal?.querySelector('input[name="marketing"]');

    preferences = {
      essential: true,
      analytics: analyticsCheckbox?.checked || false,
      marketing: marketingCheckbox?.checked || false
    };

    saveConsent();
    hideModal();
    hideBanner();
    loadScriptsBasedOnConsent();
  };

  /**
   * Handle modal close
   */
  const handleCloseModal = () => {
    hideModal();
  };

  /**
   * Save consent preferences to cookie
   */
  const saveConsent = () => {
    const consentData = JSON.stringify(preferences);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
    
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(consentData)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  };

  /**
   * Get consent preferences from cookie
   * @returns {Object|null} Consent preferences or null if not set
   */
  const getConsent = () => {
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === COOKIE_NAME) {
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (e) {
          console.error('Error parsing consent cookie:', e);
          return null;
        }
      }
    }
    
    return null;
  };

  /**
   * Load analytics and marketing scripts based on consent
   */
  const loadScriptsBasedOnConsent = () => {
    if (preferences.analytics) {
      loadAnalyticsScripts();
    }
    
    if (preferences.marketing) {
      loadMarketingScripts();
    }
  };

  /**
   * Load analytics scripts (e.g., Google Analytics)
   */
  const loadAnalyticsScripts = () => {
    // Example: Google Analytics
    // Uncomment and replace with your actual GA tracking ID
    /*
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);
    
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    };
    */
    
    console.log('Analytics scripts loaded');
  };

  /**
   * Load marketing scripts
   */
  const loadMarketingScripts = () => {
    // Add marketing/advertising scripts here
    console.log('Marketing scripts loaded');
  };

  /**
   * Public API to check if a specific cookie type is allowed
   * @param {string} type - Cookie type (essential, analytics, marketing)
   * @returns {boolean}
   */
  const isAllowed = (type) => {
    const consent = getConsent();
    return consent ? consent[type] === true : false;
  };

  /**
   * Public API to revoke consent (for privacy settings page)
   */
  const revokeConsent = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    preferences = {
      essential: true,
      analytics: false,
      marketing: false
    };
    showBanner();
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    isAllowed,
    revokeConsent,
    getConsent
  };
})();

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CookieConsent;
}

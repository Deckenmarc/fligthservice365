/**
 * Navigation Component
 * Handles mobile menu toggle, dropdown interactions, and keyboard navigation
 */

const Navigation = (() => {
  let mobileMenuToggle;
  let mainNavigation;
  let mobileOverlay;
  let dropdownButtons;
  let focusableElements;
  let firstFocusableElement;
  let lastFocusableElement;

  /**
   * Initialize navigation functionality
   */
  const init = () => {
    mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    mainNavigation = document.querySelector('.main-navigation');
    dropdownButtons = document.querySelectorAll('.has-submenu > button');

    if (!mobileMenuToggle || !mainNavigation) {
      console.warn('Navigation elements not found');
      return;
    }

    // Create mobile overlay
    createMobileOverlay();

    // Set up event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Dropdown interactions
    dropdownButtons.forEach(button => {
      // Desktop: hover behavior is handled by CSS
      // Mobile/Click: toggle on click
      button.addEventListener('click', handleDropdownClick);
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Click outside to close
    document.addEventListener('click', handleClickOutside);

    // Update focusable elements when menu opens
    updateFocusableElements();
  };

  /**
   * Create mobile overlay element
   */
  const createMobileOverlay = () => {
    mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    mobileOverlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(mobileOverlay);
  };

  /**
   * Toggle mobile menu open/close
   */
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  /**
   * Open mobile menu
   */
  const openMobileMenu = () => {
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenuToggle.setAttribute('aria-label', 'Close menu');
    mainNavigation.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update focusable elements and trap focus
    updateFocusableElements();
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  };

  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Open menu');
    mainNavigation.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Close all dropdowns
    closeAllDropdowns();
  };

  /**
   * Handle dropdown button clicks
   */
  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.currentTarget;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Close other dropdowns
    dropdownButtons.forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current dropdown
    button.setAttribute('aria-expanded', !isExpanded);
  };

  /**
   * Close all dropdown menus
   */
  const closeAllDropdowns = () => {
    dropdownButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
    });
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyboardNavigation = (e) => {
    const isMobileMenuOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

    // Escape key: close mobile menu or dropdowns
    if (e.key === 'Escape') {
      if (isMobileMenuOpen) {
        closeMobileMenu();
        mobileMenuToggle.focus();
      } else {
        closeAllDropdowns();
      }
    }

    // Tab key: trap focus in mobile menu when open
    if (e.key === 'Tab' && isMobileMenuOpen) {
      handleFocusTrap(e);
    }

    // Enter or Space: activate buttons
    if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'BUTTON') {
      e.preventDefault();
      e.target.click();
    }

    // Arrow key navigation in dropdowns
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      handleArrowKeyNavigation(e);
    }
  };

  /**
   * Handle arrow key navigation in dropdown menus
   */
  const handleArrowKeyNavigation = (e) => {
    const currentElement = e.target;
    const parentLi = currentElement.closest('.has-submenu');
    
    if (!parentLi) return;

    const submenu = parentLi.querySelector('.submenu');
    const dropdownButton = parentLi.querySelector('button');
    
    if (!submenu) return;

    const submenuLinks = Array.from(submenu.querySelectorAll('a'));
    
    if (submenuLinks.length === 0) return;

    // If dropdown button is focused and ArrowDown is pressed, open and focus first item
    if (currentElement === dropdownButton && e.key === 'ArrowDown') {
      e.preventDefault();
      dropdownButton.setAttribute('aria-expanded', 'true');
      submenuLinks[0].focus();
      return;
    }

    // If we're in the submenu, navigate between items
    const currentIndex = submenuLinks.indexOf(currentElement);
    
    if (currentIndex !== -1) {
      e.preventDefault();
      
      if (e.key === 'ArrowDown') {
        // Move to next item or wrap to first
        const nextIndex = (currentIndex + 1) % submenuLinks.length;
        submenuLinks[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        // Move to previous item or wrap to last
        const prevIndex = currentIndex === 0 ? submenuLinks.length - 1 : currentIndex - 1;
        submenuLinks[prevIndex].focus();
      }
    }
  };

  /**
   * Trap focus within mobile menu
   */
  const handleFocusTrap = (e) => {
    if (!focusableElements || focusableElements.length === 0) {
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  };

  /**
   * Update list of focusable elements in navigation
   */
  const updateFocusableElements = () => {
    if (!mainNavigation) return;

    focusableElements = mainNavigation.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
  };

  /**
   * Handle clicks outside navigation to close menus
   */
  const handleClickOutside = (e) => {
    const isMobileMenuOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    // Don't close if clicking inside navigation or on toggle button
    if (mainNavigation.contains(e.target) || mobileMenuToggle.contains(e.target)) {
      return;
    }

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }

    // Close dropdowns on desktop
    if (window.innerWidth > 767) {
      closeAllDropdowns();
    }
  };

  /**
   * Handle window resize
   */
  const handleResize = () => {
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 767) {
      const isMobileMenuOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
  };

  // Initialize on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });

  return {
    init
  };
})();

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Navigation.init);
} else {
  Navigation.init();
}

export default Navigation;

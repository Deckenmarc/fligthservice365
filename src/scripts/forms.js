/**
 * Form Handling System
 * Provides client-side validation, AJAX submission, and user feedback
 */

const FormHandler = (() => {
  // Language detection from page URL or data attribute
  const getLanguage = () => {
    const path = window.location.pathname;
    if (path.includes('/de/')) return 'de';
    if (path.includes('/en/')) return 'en';
    return document.documentElement.lang || 'en';
  };

  // Validation messages in both languages
  const messages = {
    de: {
      required: 'Dieses Feld ist erforderlich',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      minLength: 'Mindestens {min} Zeichen erforderlich',
      maxLength: 'Maximal {max} Zeichen erlaubt',
      success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      sending: 'Wird gesendet...',
      newsletterSuccess: 'Vielen Dank! Bitte überprüfen Sie Ihre E-Mail, um Ihr Abonnement zu bestätigen.',
      newsletterError: 'Fehler beim Anmelden. Bitte versuchen Sie es später erneut.'
    },
    en: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: 'Minimum {min} characters required',
      maxLength: 'Maximum {max} characters allowed',
      success: 'Thank you! Your message has been sent successfully.',
      error: 'An error occurred. Please try again later.',
      sending: 'Sending...',
      newsletterSuccess: 'Thank you! Please check your email to confirm your subscription.',
      newsletterError: 'Error subscribing. Please try again later.'
    }
  };

  const lang = getLanguage();

  // Email validation regex
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  /**
   * Validate a single field
   */
  const validateField = (field) => {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    const minLength = field.getAttribute('minlength');
    const maxLength = field.getAttribute('maxlength');
    
    let error = null;

    // Required field validation
    if (isRequired && !value) {
      error = messages[lang].required;
    }
    // Email validation
    else if (fieldType === 'email' && value && !emailRegex.test(value)) {
      error = messages[lang].email;
    }
    // Min length validation
    else if (minLength && value.length < parseInt(minLength)) {
      error = messages[lang].minLength.replace('{min}', minLength);
    }
    // Max length validation
    else if (maxLength && value.length > parseInt(maxLength)) {
      error = messages[lang].maxLength.replace('{max}', maxLength);
    }

    return error;
  };

  /**
   * Show field error state
   */
  const showFieldError = (field, errorMessage) => {
    const formGroup = field.closest('.form-group') || field.parentElement;
    
    // Remove any existing error
    removeFieldError(field);
    
    // Add error class
    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    
    // Create and append error message
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = errorMessage;
    errorEl.setAttribute('role', 'alert');
    formGroup.appendChild(errorEl);
    
    // Add aria-invalid
    field.setAttribute('aria-invalid', 'true');
  };

  /**
   * Show field success state
   */
  const showFieldSuccess = (field) => {
    const formGroup = field.closest('.form-group') || field.parentElement;
    
    // Remove error state
    removeFieldError(field);
    
    // Add success class
    formGroup.classList.add('has-success');
    formGroup.classList.remove('has-error');
    
    // Remove aria-invalid
    field.removeAttribute('aria-invalid');
  };

  /**
   * Remove field error state
   */
  const removeFieldError = (field) => {
    const formGroup = field.closest('.form-group') || field.parentElement;
    const existingError = formGroup.querySelector('.field-error');
    
    if (existingError) {
      existingError.remove();
    }
    
    formGroup.classList.remove('has-error');
  };

  /**
   * Validate field on blur
   */
  const handleFieldBlur = (e) => {
    const field = e.target;
    
    // Skip honeypot fields
    if (field.classList.contains('honeypot')) return;
    
    const error = validateField(field);
    
    if (error) {
      showFieldError(field, error);
    } else if (field.value.trim()) {
      showFieldSuccess(field);
    }
  };

  /**
   * Validate field on input (for real-time feedback after first blur)
   */
  const handleFieldInput = (e) => {
    const field = e.target;
    const formGroup = field.closest('.form-group') || field.parentElement;
    
    // Only provide real-time feedback if field has been touched (has error or success class)
    if (!formGroup.classList.contains('has-error') && !formGroup.classList.contains('has-success')) {
      return;
    }
    
    const error = validateField(field);
    
    if (error) {
      showFieldError(field, error);
    } else if (field.value.trim()) {
      showFieldSuccess(field);
    } else {
      removeFieldError(field);
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = (form) => {
    const fields = form.querySelectorAll('input:not(.honeypot), textarea, select');
    let isValid = true;
    let firstErrorField = null;

    fields.forEach(field => {
      const error = validateField(field);
      
      if (error) {
        showFieldError(field, error);
        isValid = false;
        
        if (!firstErrorField) {
          firstErrorField = field;
        }
      } else if (field.value.trim()) {
        showFieldSuccess(field);
      }
    });

    // Focus first error field
    if (firstErrorField) {
      firstErrorField.focus();
    }

    return isValid;
  };

  /**
   * Check honeypot field (spam prevention)
   */
  const checkHoneypot = (form) => {
    const honeypot = form.querySelector('.honeypot');
    return !honeypot || !honeypot.value;
  };

  /**
   * Show form message
   */
  const showFormMessage = (form, message, type = 'success') => {
    let messageEl = form.querySelector('.form-message');
    
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'form-message';
      messageEl.setAttribute('role', 'alert');
      messageEl.setAttribute('aria-live', 'polite');
      form.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
    
    // Scroll message into view
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  /**
   * Hide form message
   */
  const hideFormMessage = (form) => {
    const messageEl = form.querySelector('.form-message');
    if (messageEl) {
      messageEl.style.display = 'none';
    }
  };

  /**
   * Set form loading state
   */
  const setFormLoading = (form, isLoading) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = messages[lang].sending;
      form.classList.add('is-loading');
    } else {
      submitBtn.disabled = false;
      if (submitBtn.dataset.originalText) {
        submitBtn.textContent = submitBtn.dataset.originalText;
      }
      form.classList.remove('is-loading');
    }
  };

  /**
   * Initialize form validation
   */
  const initFormValidation = (form) => {
    const fields = form.querySelectorAll('input:not(.honeypot), textarea, select');
    
    fields.forEach(field => {
      // Validate on blur
      field.addEventListener('blur', handleFieldBlur);
      
      // Real-time validation on input (after first interaction)
      field.addEventListener('input', handleFieldInput);
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Hide any existing messages
    hideFormMessage(form);
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }
    
    // Check honeypot
    if (!checkHoneypot(form)) {
      console.warn('Honeypot triggered - possible spam');
      showFormMessage(form, messages[lang].error, 'error');
      return;
    }
    
    // Get form action URL
    const actionUrl = form.getAttribute('action') || form.dataset.action;
    if (!actionUrl) {
      console.error('Form action URL not specified');
      showFormMessage(form, messages[lang].error, 'error');
      return;
    }
    
    // Set loading state
    setFormLoading(form, true);
    
    try {
      // Prepare form data
      const formData = new FormData(form);
      
      // Remove honeypot from submission
      formData.delete('honeypot');
      
      // Submit form via fetch
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Handle response
      if (response.ok) {
        // Success
        const isNewsletter = form.classList.contains('newsletter-form');
        const successMessage = isNewsletter 
          ? messages[lang].newsletterSuccess 
          : messages[lang].success;
        
        showFormMessage(form, successMessage, 'success');
        
        // Reset form
        form.reset();
        
        // Remove all validation states
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
          group.classList.remove('has-error', 'has-success');
        });
        
        // Remove all field errors
        const fieldErrors = form.querySelectorAll('.field-error');
        fieldErrors.forEach(error => error.remove());
        
        // Remove aria-invalid attributes
        const fields = form.querySelectorAll('[aria-invalid]');
        fields.forEach(field => field.removeAttribute('aria-invalid'));
        
      } else {
        // Error response
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || messages[lang].error;
        showFormMessage(form, errorMessage, 'error');
      }
      
    } catch (error) {
      // Network or other error
      console.error('Form submission error:', error);
      const isNewsletter = form.classList.contains('newsletter-form');
      const errorMessage = isNewsletter 
        ? messages[lang].newsletterError 
        : messages[lang].error;
      showFormMessage(form, errorMessage, 'error');
    } finally {
      // Remove loading state
      setFormLoading(form, false);
    }
  };

  /**
   * Initialize all forms
   */
  const init = () => {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
      initFormValidation(form);
      
      // Add submit handler
      form.addEventListener('submit', handleSubmit);
    });
  };

  return {
    init,
    validateForm,
    checkHoneypot,
    showFormMessage,
    hideFormMessage,
    setFormLoading,
    handleSubmit,
    getLanguage,
    messages
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', FormHandler.init);
} else {
  FormHandler.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormHandler;
}

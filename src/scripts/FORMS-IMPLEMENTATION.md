# Form Handling System Implementation

This document describes the form handling system implemented for the Flight Service 365 website.

## Overview

The form handling system provides:
- Client-side validation with real-time feedback
- AJAX form submission without page reload
- Honeypot spam prevention
- Bilingual error messages (German/English)
- Server-side validation and rate limiting
- Email sending via serverless functions

## Components

### 1. Client-Side JavaScript (`src/scripts/forms.js`)

**Features:**
- Automatic language detection from URL path
- Real-time field validation on blur and input
- Visual feedback (error/success states)
- Form submission via Fetch API
- Loading states during submission
- Success/error message display

**Usage:**
Add `data-ajax` attribute to any form you want to handle with AJAX:

```html
<form data-ajax action="/.netlify/functions/contact" method="POST">
  <!-- form fields -->
</form>
```

### 2. Serverless Functions

#### Contact Form (`netlify/functions/contact.js`)
Handles contact form submissions with full validation and email sending.

**Endpoint:** `/.netlify/functions/contact`

#### Newsletter Signup (`netlify/functions/newsletter.js`)
Handles newsletter subscriptions with double opt-in confirmation.

**Endpoint:** `/.netlify/functions/newsletter`

## HTML Structure

### Contact Form Example

```html
<form data-ajax action="/.netlify/functions/contact" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Name *</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      required 
      minlength="2"
      maxlength="100"
    >
  </div>
  
  <div class="form-group">
    <label for="email">Email *</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
      maxlength="255"
    >
  </div>
  
  <div class="form-group">
    <label for="phone">Phone</label>
    <input 
      type="tel" 
      id="phone" 
      name="phone"
      maxlength="20"
    >
  </div>
  
  <div class="form-group">
    <label for="message">Message *</label>
    <textarea 
      id="message" 
      name="message" 
      required
      minlength="10"
      maxlength="5000"
      rows="5"
    ></textarea>
  </div>
  
  <!-- Honeypot field for spam prevention -->
  <input 
    type="text" 
    name="honeypot" 
    class="honeypot" 
    style="display:none" 
    tabindex="-1" 
    autocomplete="off"
  >
  
  <button type="submit">Send Message</button>
  
  <!-- Message container (created dynamically) -->
  <div class="form-message" role="alert" aria-live="polite"></div>
</form>
```

### Newsletter Form Example

```html
<form class="newsletter-form" data-ajax action="/.netlify/functions/newsletter" method="POST">
  <div class="form-group">
    <label for="newsletter-email" class="sr-only">Email Address</label>
    <input 
      type="email" 
      id="newsletter-email"
      name="email" 
      placeholder="Your email" 
      required
      maxlength="255"
    >
  </div>
  
  <!-- Honeypot field -->
  <input 
    type="text" 
    name="honeypot" 
    class="honeypot" 
    style="display:none" 
    tabindex="-1" 
    autocomplete="off"
  >
  
  <button type="submit">Subscribe</button>
  
  <p class="newsletter-privacy">
    By subscribing, you agree to our <a href="/privacy">Privacy Policy</a>
  </p>
</form>
```

## CSS Classes

The form handler adds these CSS classes for styling:

- `.has-error` - Added to form-group when field has validation error
- `.has-success` - Added to form-group when field is valid
- `.field-error` - Error message element
- `.form-message` - Success/error message container
- `.form-message.success` - Success message styling
- `.form-message.error` - Error message styling
- `.is-loading` - Added to form during submission

### Recommended CSS

```css
/* Form groups */
.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

/* Error state */
.form-group.has-error input,
.form-group.has-error textarea {
  border-color: #dc3545;
}

/* Success state */
.form-group.has-success input,
.form-group.has-success textarea {
  border-color: #28a745;
}

/* Field error message */
.field-error {
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Form message */
.form-message {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  display: none;
}

.form-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Loading state */
.is-loading button[type="submit"] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Honeypot field (must be hidden) */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
}
```

## Validation Rules

### Client-Side Validation
- **Required fields**: Checked for non-empty values
- **Email format**: Validated against regex pattern
- **Min/Max length**: Enforced based on HTML attributes
- **Real-time feedback**: Validation on blur and input events

### Server-Side Validation
- **Required fields**: name, email, message (contact form)
- **Email format**: Validated with regex
- **Field lengths**: 
  - Name: max 100 characters
  - Email: max 255 characters
  - Message: max 5000 characters
- **Honeypot check**: Rejects if honeypot field is filled

## Rate Limiting

Both serverless functions implement rate limiting:
- **Limit**: 5 submissions per IP address per hour
- **Storage**: In-memory (resets on cold start)
- **Response**: 429 status code when limit exceeded

## Environment Setup

1. Copy `.env.example` to `.env`
2. Configure email service credentials
3. Set email addresses for sending/receiving
4. Deploy to Netlify

See `netlify/functions/README.md` for detailed configuration instructions.

## Testing

### Local Testing
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify dev`
3. Test forms at `http://localhost:8888`

### Manual Testing Checklist
- [ ] Required field validation
- [ ] Email format validation
- [ ] Min/max length validation
- [ ] Real-time validation feedback
- [ ] Form submission success
- [ ] Form submission error handling
- [ ] Loading state during submission
- [ ] Form reset after success
- [ ] Error messages in correct language
- [ ] Honeypot spam prevention
- [ ] Rate limiting (submit 6 times quickly)

## Integration with Pages

Add the forms.js script to all pages with forms:

```html
<script src="/scripts/forms.js"></script>
```

The script automatically initializes when the DOM is ready.

## Troubleshooting

### Forms not submitting
- Check that `data-ajax` attribute is present
- Verify form action URL is correct
- Check browser console for errors

### Validation not working
- Ensure forms.js is loaded
- Check that form fields have proper attributes (required, type, etc.)
- Verify form-group wrapper exists

### Emails not sending
- Check environment variables are configured
- Verify email service credentials
- Check Netlify function logs for errors

### Rate limiting issues
- Rate limit store is in-memory and resets on cold start
- For production, consider persistent storage (Redis, DynamoDB)

## Future Enhancements

1. **Persistent Rate Limiting**: Use Redis or DynamoDB for rate limit storage
2. **Email Marketing Integration**: Connect newsletter to Mailchimp/SendGrid
3. **CAPTCHA**: Add reCAPTCHA for additional spam prevention
4. **File Uploads**: Support file attachments in contact form
5. **Form Analytics**: Track submission rates and conversion
6. **A/B Testing**: Test different form layouts and copy

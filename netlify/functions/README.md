# Serverless Functions

This directory contains Netlify serverless functions for handling form submissions.

## Functions

### 1. Contact Form (`contact.js`)
Handles contact form submissions with validation, rate limiting, and email sending.

**Endpoint:** `/.netlify/functions/contact`

**Features:**
- Server-side validation (required fields, email format, field lengths)
- Honeypot spam prevention
- Rate limiting (5 submissions per IP per hour)
- Email sending via SMTP or SendGrid
- JSON response with success/error status

### 2. Newsletter Signup (`newsletter.js`)
Handles newsletter subscription requests with double opt-in confirmation.

**Endpoint:** `/.netlify/functions/newsletter`

**Features:**
- Email validation
- Honeypot spam prevention
- Rate limiting (5 submissions per IP per hour)
- Double opt-in confirmation email
- Language detection from referrer
- Admin notification

## Environment Variables

Configure these environment variables in your Netlify dashboard or `.env` file:

### Email Configuration (Choose one method)

#### Option 1: SendGrid
```
SENDGRID_API_KEY=your_sendgrid_api_key
```

#### Option 2: Generic SMTP
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

### Email Addresses
```
EMAIL_FROM=noreply@flightservice365.com
EMAIL_TO=contact@flightservice365.com
```

### Site URL (for newsletter confirmation links)
```
URL=https://flightservice365.com
```

## Installation

1. Install dependencies:
```bash
cd netlify/functions
npm install
```

2. Configure environment variables in Netlify dashboard

3. Deploy to Netlify

## Local Testing

To test functions locally, install Netlify CLI:

```bash
npm install -g netlify-cli
```

Run the development server:

```bash
netlify dev
```

Functions will be available at:
- `http://localhost:8888/.netlify/functions/contact`
- `http://localhost:8888/.netlify/functions/newsletter`

## Rate Limiting

Both functions implement rate limiting to prevent abuse:
- Maximum 5 submissions per IP address per hour
- Rate limit store is in-memory (resets on function cold start)
- For production, consider using a persistent store (Redis, DynamoDB, etc.)

## Security Features

1. **Honeypot Field**: Hidden field that should remain empty (spam bots typically fill all fields)
2. **Server-side Validation**: All data is validated on the server
3. **Rate Limiting**: Prevents abuse and spam
4. **Email Validation**: Ensures valid email format
5. **Field Length Limits**: Prevents excessively long inputs

## Integration with Frontend

Forms should include the `data-ajax` attribute and point to the function endpoint:

```html
<!-- Contact Form -->
<form data-ajax action="/.netlify/functions/contact" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone">
  <textarea name="message" required></textarea>
  <input type="text" name="honeypot" class="honeypot" style="display:none">
  <button type="submit">Send</button>
</form>

<!-- Newsletter Form -->
<form class="newsletter-form" data-ajax action="/.netlify/functions/newsletter" method="POST">
  <input type="email" name="email" required>
  <input type="text" name="honeypot" class="honeypot" style="display:none">
  <button type="submit">Subscribe</button>
</form>
```

## Error Handling

Functions return appropriate HTTP status codes:
- `200`: Success
- `400`: Validation error
- `405`: Method not allowed (only POST is accepted)
- `429`: Rate limit exceeded
- `500`: Internal server error

Response format:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Or for errors:
```json
{
  "error": "Validation failed",
  "errors": ["Email is required", "Message is required"]
}
```

## Alternative: Formspree

If you prefer not to use serverless functions, you can use Formspree:

1. Sign up at https://formspree.io
2. Create a form endpoint
3. Update form action to point to Formspree endpoint:
   ```html
   <form data-ajax action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## Production Considerations

1. **Email Service**: Use a reliable email service (SendGrid, Mailgun, AWS SES)
2. **Rate Limiting**: Consider using a persistent store for rate limiting
3. **Newsletter Service**: Integrate with email marketing platform (Mailchimp, SendGrid Marketing)
4. **Monitoring**: Set up error monitoring and logging
5. **GDPR Compliance**: Ensure proper data handling and privacy policy
6. **Confirmation Tokens**: Use secure token generation for newsletter confirmations

/**
 * Netlify Serverless Function for Newsletter Signup
 * Handles newsletter subscriptions with validation and rate limiting
 */

const nodemailer = require('nodemailer');

// Rate limiting store (in-memory, resets on function cold start)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_SUBMISSIONS = 5;

/**
 * Check rate limit for IP address
 */
const checkRateLimit = (ip) => {
  const now = Date.now();
  const userSubmissions = rateLimitStore.get(ip) || [];
  
  // Filter out old submissions outside the time window
  const recentSubmissions = userSubmissions.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    return false;
  }
  
  // Add current submission
  recentSubmissions.push(now);
  rateLimitStore.set(ip, recentSubmissions);
  
  return true;
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validate form data
 */
const validateFormData = (data) => {
  const errors = [];
  
  // Check required fields
  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Check honeypot
  if (data.honeypot && data.honeypot.length > 0) {
    errors.push('Spam detected');
  }
  
  // Check field length
  if (data.email && data.email.length > 255) {
    errors.push('Email is too long (max 255 characters)');
  }
  
  return errors;
};

/**
 * Create email transporter
 */
const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }
};

/**
 * Send confirmation email
 */
const sendConfirmationEmail = async (email, language = 'en') => {
  const transporter = createTransporter();
  
  const subjects = {
    de: 'Bestätigen Sie Ihre Newsletter-Anmeldung',
    en: 'Confirm Your Newsletter Subscription'
  };
  
  const messages = {
    de: {
      greeting: 'Hallo',
      text: 'Vielen Dank für Ihr Interesse an unserem Newsletter!',
      instruction: 'Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den folgenden Link klicken:',
      button: 'E-Mail bestätigen',
      footer: 'Wenn Sie sich nicht für unseren Newsletter angemeldet haben, können Sie diese E-Mail ignorieren.'
    },
    en: {
      greeting: 'Hello',
      text: 'Thank you for your interest in our newsletter!',
      instruction: 'Please confirm your email address by clicking the link below:',
      button: 'Confirm Email',
      footer: 'If you did not sign up for our newsletter, you can ignore this email.'
    }
  };
  
  const lang = messages[language] || messages.en;
  const subject = subjects[language] || subjects.en;
  
  // Generate confirmation token (in production, use a proper token system)
  const confirmToken = Buffer.from(email).toString('base64');
  const confirmUrl = `${process.env.URL || 'https://flightservice365.com'}/newsletter-confirm?token=${confirmToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@flightservice365.com',
    to: email,
    subject: subject,
    text: `
${lang.greeting},

${lang.text}

${lang.instruction}

${confirmUrl}

${lang.footer}

Flight Service 365
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${lang.greeting},</h2>
        <p>${lang.text}</p>
        <p>${lang.instruction}</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${confirmUrl}" 
             style="background-color: #ffe928; color: #111111; padding: 12px 30px; 
                    text-decoration: none; border-radius: 4px; font-weight: bold;">
            ${lang.button}
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">${lang.footer}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">Flight Service 365</p>
      </div>
    `
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('Confirmation email sent:', info);
  }
  
  return info;
};

/**
 * Store newsletter subscription
 * In production, integrate with email marketing service (Mailchimp, SendGrid, etc.)
 */
const storeSubscription = async (email, language) => {
  // TODO: Integrate with email marketing service
  // For now, just send notification to admin
  
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@flightservice365.com',
    to: process.env.EMAIL_TO || 'contact@flightservice365.com',
    subject: 'New Newsletter Subscription',
    text: `
New newsletter subscription:

Email: ${email}
Language: ${language}
Date: ${new Date().toISOString()}
    `,
    html: `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Language:</strong> ${language}</p>
      <p><strong>Date:</strong> ${new Date().toISOString()}</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

/**
 * Parse form data from request
 */
const parseFormData = (body, contentType) => {
  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(body);
  }
  
  const params = new URLSearchParams(body);
  const data = {};
  for (const [key, value] of params) {
    data[key] = value;
  }
  return data;
};

/**
 * Detect language from referrer or default to English
 */
const detectLanguage = (event) => {
  const referer = event.headers.referer || event.headers.referrer || '';
  if (referer.includes('/de/')) return 'de';
  if (referer.includes('/en/')) return 'en';
  return 'en';
};

/**
 * Main handler
 */
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Get client IP for rate limiting
    const clientIp = event.headers['x-forwarded-for'] || 
                     event.headers['x-nf-client-connection-ip'] || 
                     'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          message: 'Rate limit exceeded'
        })
      };
    }
    
    // Parse form data
    const formData = parseFormData(event.body, event.headers['content-type']);
    
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Validation failed',
          errors: validationErrors
        })
      };
    }
    
    // Detect language
    const language = detectLanguage(event);
    
    // Send confirmation email
    await sendConfirmationEmail(formData.email, language);
    
    // Store subscription (notify admin)
    await storeSubscription(formData.email, language);
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Please check your email to confirm your subscription'
      })
    };
    
  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to process newsletter signup'
      })
    };
  }
};

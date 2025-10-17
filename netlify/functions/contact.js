/**
 * Netlify Serverless Function for Contact Form Processing
 * Handles form submissions with validation, rate limiting, and email sending
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
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }
  
  // Check honeypot
  if (data.honeypot && data.honeypot.length > 0) {
    errors.push('Spam detected');
  }
  
  // Check field lengths
  if (data.name && data.name.length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }
  
  if (data.email && data.email.length > 255) {
    errors.push('Email is too long (max 255 characters)');
  }
  
  if (data.message && data.message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }
  
  return errors;
};

/**
 * Create email transporter
 */
const createTransporter = () => {
  // Configure with environment variables
  // For production, use SendGrid, Mailgun, or SMTP credentials
  
  if (process.env.SENDGRID_API_KEY) {
    // SendGrid configuration
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else if (process.env.SMTP_HOST) {
    // Generic SMTP configuration
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
    // Development: log to console
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }
};

/**
 * Send email
 */
const sendEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@flightservice365.com',
    to: process.env.EMAIL_TO || 'contact@flightservice365.com',
    replyTo: formData.email,
    subject: `Contact Form Submission from ${formData.name}`,
    text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
    `,
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <h3>Message:</h3>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
    `
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email sent:', info);
  }
  
  return info;
};

/**
 * Parse form data from request
 */
const parseFormData = (body, contentType) => {
  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(body);
  }
  
  // Parse URL-encoded form data
  const params = new URLSearchParams(body);
  const data = {};
  for (const [key, value] of params) {
    data[key] = value;
  }
  return data;
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
    
    // Send email
    await sendEmail(formData);
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Message sent successfully'
      })
    };
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to process form submission'
      })
    };
  }
};

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Rate limiting configuration
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Specific rate limiters
const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes for auth
const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes for general API
const strictLimiter = createRateLimiter(15 * 60 * 1000, 10); // 10 requests per 15 minutes for sensitive endpoints

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

module.exports = {
  authLimiter,
  apiLimiter,
  strictLimiter,
  securityHeaders,
};

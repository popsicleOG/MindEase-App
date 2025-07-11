# CI/CD Setup Guide

## Overview

This guide covers the Continuous Integration/Continuous Deployment (CI/CD) setup for the MindEase Mental Health App.

## Workflows

### 1. Quick Test (`test.yml`)
- **Trigger**: Push to main/develop, Pull requests
- **Purpose**: Fast validation of code changes
- **Actions**: Install dependencies, run tests, linting, format check

### 2. Full CI/CD Pipeline (`ci.yml`)
- **Trigger**: Push to main/develop, Pull requests
- **Purpose**: Comprehensive testing and deployment
- **Jobs**:
  - **Test**: Backend and frontend tests
  - **Lint**: Code quality checks
  - **Security**: Vulnerability scanning
  - **Build**: Application building
  - **Deploy**: Environment-specific deployments
  - **Notify**: Team notifications

### 3. Deployment (`deploy.yml`)
- **Trigger**: Push to main/develop, Manual dispatch
- **Purpose**: Environment-specific deployments
- **Environments**: Staging, Production

## Setup Instructions

### 1. GitHub Repository Setup

1. **Enable GitHub Actions**:
   - Go to your repository settings
   - Navigate to "Actions" → "General"
   - Enable "Allow all actions and reusable workflows"

2. **Set up Environments**:
   - Go to Settings → Environments
   - Create `staging` and `production` environments
   - Add environment protection rules if needed

### 2. Environment Variables

Set up the following secrets in your GitHub repository:

#### Backend Secrets
```
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

#### Frontend Secrets
```
REACT_NATIVE_API_URL=your_api_url
REACT_NATIVE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Deployment Platforms

#### Option A: Heroku (Recommended for beginners)

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku apps**:
   ```bash
   # Staging
   heroku create mindease-staging
   
   # Production
   heroku create mindease-production
   ```

3. **Add buildpacks**:
   ```bash
   heroku buildpacks:add heroku/nodejs -a mindease-staging
   heroku buildpacks:add heroku/nodejs -a mindease-production
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri -a mindease-staging
   heroku config:set MONGODB_URI=your_mongodb_uri -a mindease-production
   # Add other environment variables...
   ```

#### Option B: Railway

1. **Connect your GitHub repository**
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on push to main

#### Option C: Vercel

1. **Import your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Set environment variables** in Vercel dashboard

### 4. Database Setup

#### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas account**
2. **Create cluster** (free tier available)
3. **Get connection string**
4. **Add to environment variables**

#### Redis Setup

1. **Redis Cloud** (free tier available)
2. **Or use Railway Redis add-on**
3. **Add connection string to environment variables**

### 5. Payment Integration

#### Stripe Setup

1. **Create Stripe account**
2. **Get API keys** from dashboard
3. **Set up webhooks** for payment events
4. **Add keys to environment variables**

## Workflow Customization

### Adding Notifications

#### Slack Integration

1. **Create Slack app** in your workspace
2. **Get webhook URL**
3. **Add to GitHub secrets** as `SLACK_WEBHOOK_URL`
4. **Update workflow** to send notifications

#### Email Notifications

1. **Set up email service** (SendGrid, Mailgun)
2. **Add API key** to GitHub secrets
3. **Update workflow** to send email notifications

### Adding Security Scanning

1. **Add CodeQL** for code security analysis
2. **Add Dependabot** for dependency updates
3. **Add Snyk** for vulnerability scanning

## Monitoring and Logging

### 1. Application Monitoring

#### Sentry Integration

1. **Create Sentry account**
2. **Add DSN** to environment variables
3. **Update error handling** to send to Sentry

#### Logging

1. **Set up structured logging** with Winston
2. **Add log aggregation** service (Papertrail, Loggly)
3. **Configure log levels** for different environments

### 2. Performance Monitoring

1. **Add New Relic** or **DataDog** for APM
2. **Set up health checks** endpoints
3. **Monitor database performance**

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Deployment Failures**:
   - Verify environment variables are set
   - Check database connectivity
   - Review application logs

3. **Test Failures**:
   - Run tests locally first
   - Check for environment-specific issues
   - Verify test data setup

### Debugging

1. **Enable debug logging** in workflows
2. **Check GitHub Actions logs** for detailed error messages
3. **Use `act`** to run workflows locally for testing

## Best Practices

### 1. Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/***: Feature development
- **hotfix/***: Emergency fixes

### 2. Commit Messages

Use conventional commits:
```
feat: add user authentication
fix: resolve login issue
docs: update API documentation
test: add unit tests for auth
```

### 3. Code Review

- Require pull request reviews
- Set up branch protection rules
- Use automated checks before merge

### 4. Security

- Regular dependency updates
- Security scanning in CI/CD
- Environment variable management
- Access control and permissions

## Next Steps

1. **Set up monitoring** and alerting
2. **Implement blue-green deployments**
3. **Add performance testing**
4. **Set up disaster recovery** procedures
5. **Document runbooks** for common issues

## Support

For issues with CI/CD setup:
1. Check GitHub Actions documentation
2. Review workflow logs for specific errors
3. Consult platform-specific documentation
4. Reach out to the development team 
# Production Deployment Guide

This guide covers deploying both the backend API and React Native frontend to production environments.

## Table of Contents

- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Security Considerations](#security-considerations)
- [Monitoring & Logging](#monitoring--logging)
- [CI/CD Pipeline](#cicd-pipeline)

## Backend Deployment

### Prerequisites

- Node.js 18+ installed on server
- MongoDB instance (Atlas or self-hosted)
- Redis instance (Cloud or self-hosted)
- Domain name and SSL certificate
- Environment variables configured

### Deployment Options

#### Option 1: Heroku

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set REDIS_URL=your_redis_url
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set STRIPE_SECRET_KEY=your_stripe_key
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

#### Option 2: DigitalOcean App Platform

1. **Connect repository** to DigitalOcean App Platform
2. **Configure environment variables** in the dashboard
3. **Set build command**: `npm install`
4. **Set run command**: `npm start`

#### Option 3: AWS EC2

1. **Launch EC2 instance** (Ubuntu recommended)
2. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone and deploy**:
   ```bash
   git clone your-repo
   cd backend
   npm install
   pm2 start start-server.js --name "mindease-backend"
   pm2 startup
   pm2 save
   ```

### Production Environment Variables

```bash
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindease
REDIS_URL=redis://user:pass@redis-host:6379
JWT_SECRET=your-super-secure-jwt-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Frontend Deployment

### React Native Build Process

#### Android

1. **Generate keystore** (if not exists):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing** in `android/app/build.gradle`:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('my-upload-key.keystore')
               storePassword 'your-store-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-key-password'
           }
       }
   }
   ```

3. **Build APK**:
   ```bash
   cd MindEaseFrontend
   npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
   cd android
   ./gradlew assembleRelease
   ```

4. **Build AAB** (for Google Play Store):
   ```bash
   ./gradlew bundleRelease
   ```

#### iOS

1. **Configure signing** in Xcode
2. **Archive and export**:
   ```bash
   cd MindEaseFrontend/ios
   xcodebuild -workspace MindEaseFrontend.xcworkspace -scheme MindEaseFrontend -configuration Release -archivePath MindEaseFrontend.xcarchive archive
   xcodebuild -exportArchive -archivePath MindEaseFrontend.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath ./build
   ```

### App Store Deployment

#### Google Play Store

1. **Create developer account** at Google Play Console
2. **Upload AAB file** to Play Console
3. **Configure store listing** with screenshots and descriptions
4. **Submit for review**

#### Apple App Store

1. **Create developer account** at Apple Developer
2. **Upload IPA file** via App Store Connect
3. **Configure app metadata** and screenshots
4. **Submit for review**

## Environment Configuration

### Production API Configuration

Update `MindEaseFrontend/src/config/api.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com' 
  : 'http://localhost:5000';
```

### Environment-Specific Builds

```bash
# Development
npm run start:frontend

# Production build
npm run build:android
npm run build:ios
```

## Database Setup

### MongoDB Production Setup

1. **Create MongoDB Atlas cluster** (recommended)
2. **Configure network access** (IP whitelist)
3. **Create database user** with appropriate permissions
4. **Get connection string** and add to environment variables

### Redis Production Setup

1. **Use Redis Cloud** or self-hosted Redis
2. **Configure authentication** and SSL
3. **Set up monitoring** and alerts
4. **Configure backup strategy**

## Security Considerations

### Backend Security

1. **HTTPS/SSL**: Ensure all endpoints use HTTPS
2. **Rate Limiting**: Implement rate limiting on all endpoints
3. **Input Validation**: Use Joi schemas for all inputs
4. **Security Headers**: Implement helmet.js
5. **CORS**: Configure CORS properly for production
6. **JWT Security**: Use strong secrets and proper expiration

### Frontend Security

1. **API Keys**: Never expose sensitive keys in client code
2. **Certificate Pinning**: Implement certificate pinning for API calls
3. **Secure Storage**: Use secure storage for sensitive data
4. **Code Obfuscation**: Enable code obfuscation in production builds

### Environment Variables Security

```bash
# Never commit .env files
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

## Monitoring & Logging

### Backend Monitoring

1. **PM2 Monitoring** (if using PM2):
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Application Logging**:
   ```javascript
   const winston = require('winston');
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

3. **Health Checks**:
   ```javascript
   app.get('/health', (req, res) => {
     res.json({ status: 'healthy', timestamp: new Date() });
   });
   ```

### Frontend Monitoring

1. **Crash Reporting**: Implement Sentry or similar
2. **Analytics**: Add analytics tracking
3. **Performance Monitoring**: Monitor app performance

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      # Add deployment steps for your platform
```

### Automated Testing

1. **Unit Tests**: Run on every commit
2. **Integration Tests**: Run before deployment
3. **E2E Tests**: Run on staging environment
4. **Security Tests**: Run vulnerability scans

## Performance Optimization

### Backend Optimization

1. **Database Indexing**: Add proper indexes
2. **Caching**: Implement Redis caching
3. **Compression**: Enable gzip compression
4. **CDN**: Use CDN for static assets

### Frontend Optimization

1. **Bundle Optimization**: Minimize bundle size
2. **Image Optimization**: Compress images
3. **Lazy Loading**: Implement lazy loading
4. **Caching**: Implement proper caching strategies

## Backup & Recovery

### Database Backups

1. **MongoDB**: Set up automated backups
2. **Redis**: Configure persistence and backups
3. **File Storage**: Backup uploaded files

### Disaster Recovery

1. **Document recovery procedures**
2. **Test recovery processes regularly**
3. **Maintain multiple environments**

## Maintenance

### Regular Tasks

1. **Security Updates**: Keep dependencies updated
2. **Performance Monitoring**: Monitor and optimize
3. **Backup Verification**: Test backup restoration
4. **SSL Certificate Renewal**: Monitor certificate expiration

### Monitoring Checklist

- [ ] Server uptime monitoring
- [ ] Database performance monitoring
- [ ] API response time monitoring
- [ ] Error rate monitoring
- [ ] User activity monitoring

## Support & Documentation

1. **API Documentation**: Maintain up-to-date API docs
2. **User Documentation**: Provide user guides
3. **Troubleshooting Guides**: Document common issues
4. **Contact Information**: Provide support contact details

---

**Remember**: Production deployment requires careful planning and testing. Always test in a staging environment before deploying to production. 
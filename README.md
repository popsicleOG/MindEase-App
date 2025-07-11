# MindEase Mental Health App

[![CI/CD Pipeline](https://github.com/your-username/mindease-mental-health-app/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/mindease-mental-health-app/actions/workflows/ci.yml)
[![Quick Tests](https://github.com/your-username/mindease-mental-health-app/actions/workflows/test.yml/badge.svg)](https://github.com/your-username/mindease-mental-health-app/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **production-ready, professional-grade** mental health application with mood tracking, mindfulness exercises, community support, and professional therapy integration. Built with modern development practices, comprehensive testing, and enterprise-level security.

## 🚀 Features

- **Mood Tracking**: Daily mood logging with journal entries and analytics
- **Mindfulness Exercises**: Guided meditation and breathing exercises
- **Community Support**: Peer support groups and forums
- **Professional Integration**: Connect with licensed therapists
- **Progress Analytics**: Detailed insights and progress tracking
- **Payment Processing**: Secure subscription management with Stripe
- **Accessibility**: WCAG compliant design for inclusive user experience
- **Real-time Monitoring**: Comprehensive logging and performance tracking

## 🏗️ Architecture

### Backend (Node.js/Express)
- **API**: RESTful endpoints with JWT authentication
- **Database**: MongoDB for data persistence
- **Caching**: Redis for session management and rate limiting
- **Payments**: Stripe integration for subscriptions
- **Security**: Helmet, rate limiting, input validation, CORS
- **Monitoring**: Winston logging, performance tracking, health checks
- **Validation**: Joi schemas for comprehensive input validation

### Frontend (React Native)
- **Cross-platform**: iOS and Android support
- **Navigation**: React Navigation with tab navigation
- **State Management**: Context API for global state
- **UI/UX**: Accessible design with modern components
- **Testing**: Jest and React Native Testing Library
- **Error Handling**: Global error boundary and user feedback
- **Loading States**: Professional loading indicators and toast notifications

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Redis (local or Cloud)
- Stripe account for payments
- React Native development environment

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mindease-mental-health-app.git
cd mindease-mental-health-app
```

### 2. Install Dependencies
```bash
# Install all dependencies (monorepo setup)
npm install
```

### 3. Environment Setup

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindease
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
LOG_LEVEL=info
```

#### Frontend Environment
```bash
cd MindEaseFrontend
cp env.example .env
```

Edit `.env` with your configuration:
```env
API_BASE_URL=http://localhost:5000
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Database Setup

#### MongoDB
```bash
# Start MongoDB (if local)
mongod

# Or use MongoDB Atlas (recommended)
# Create cluster and get connection string
```

#### Redis
```bash
# Start Redis (if local)
redis-server

# Or use Redis Cloud (recommended)
# Create account and get connection string
```

## 🚀 Development

### Available Scripts

#### Root Level (Monorepo)
```bash
# Start both backend and frontend
npm start

# Start backend only
npm run start:backend

# Start frontend only
npm run start:frontend

# Run all tests
npm test

# Lint all code
npm run lint

# Format all code
npm run format

# Check CI/CD status
npm run ci:status
```

#### Backend Only
```bash
cd backend

# Start development server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

#### Frontend Only
```bash
cd MindEaseFrontend

# Start React Native development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **Start Both Services**:
   ```bash
   npm start
   ```

2. **Individual Services**:
   ```bash
   # Backend only
   npm run start:backend
   
   # Frontend only
   npm run start:frontend
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

4. **Check Code Quality**:
   ```bash
   npm run lint
   npm run format
   ```

## 🧪 Testing

### Comprehensive Test Coverage
- **Backend Tests**: API endpoint testing with validation
- **Frontend Tests**: Component rendering and interaction tests
- **Accessibility Tests**: Screen reader and accessibility compliance
- **Integration Tests**: End-to-end functionality testing
- **UI Component Tests**: LoadingSpinner and ToastMessage components

### Running Tests
```bash
# All tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd MindEaseFrontend && npm test
```

## 📦 CI/CD Pipeline

The project includes comprehensive CI/CD workflows with automated testing, security scanning, and deployment:

### Workflows
- **Quick Test** (`test.yml`): Fast validation on every push
- **Full Pipeline** (`ci.yml`): Comprehensive testing and deployment
- **Deployment** (`deploy.yml`): Environment-specific deployments

### Features
- ✅ Automated testing (backend + frontend)
- ✅ Code quality checks (linting + formatting)
- ✅ Security vulnerability scanning
- ✅ Multi-environment deployment (staging + production)
- ✅ Team notifications
- ✅ Manual deployment triggers
- ✅ Performance monitoring

### Setup
See [CI/CD Setup Guide](CI_CD_SETUP.md) for detailed configuration instructions.

## 🔒 Security

### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Joi schemas for comprehensive validation
- **Rate Limiting**: Redis-based rate limiting with different limits per endpoint
- **Security Headers**: Helmet.js for comprehensive security headers
- **CORS Protection**: Proper CORS configuration for production
- **Environment Security**: Proper secret management
- **Request Monitoring**: Comprehensive request logging and monitoring

### Frontend Security
- **Secure API Communication**: HTTPS and proper error handling
- **Input Validation**: Client-side validation with server verification
- **Error Boundary**: Global error boundary for graceful error handling
- **Accessibility Compliance**: WCAG standards for inclusive design
- **Secure Payment Integration**: Stripe with proper security measures

## 📱 API Documentation

### Authentication
```
POST /auth - User login/registration
GET /user - Get user profile
PUT /user - Update user profile
```

### Mood Tracking
```
POST /mood - Log mood entry
GET /mood/history - Get mood history
PUT /mood/:id - Update mood entry
DELETE /mood/:id - Delete mood entry
```

### Goals & Suggestions
```
GET /goals - Get user goals
POST /goals - Create new goal
PUT /goals/:id - Update goal
PUT /goals/:id/feedback - Update goal feedback
DELETE /goals/:id - Delete goal
```

### Payments
```
POST /payment/create-checkout-session - Create Stripe checkout
POST /payment/create-portal-session - Create customer portal
POST /payment/cancel-subscription - Cancel subscription
POST /payment/webhook - Stripe webhook handler
```

### Monitoring
```
GET /health - Health check endpoint
GET /metrics - System metrics and performance data
```

## 🎯 Professional Features

### Enhanced User Experience
- **Loading States**: Professional loading indicators throughout the app
- **Toast Notifications**: Animated feedback for user actions
- **Error Handling**: User-friendly error messages with retry options
- **Accessibility**: Screen reader support and proper touch targets
- **Responsive Design**: Optimized for all device sizes

### Development Experience
- **Monorepo Setup**: NPM workspaces for efficient development
- **Automated Tooling**: ESLint, Prettier, and comprehensive testing
- **Conventional Commits**: Standardized commit messages
- **Documentation**: Complete documentation suite
- **CI/CD Integration**: Automated workflows and deployment

### Production Readiness
- **Monitoring**: Winston logging with structured logs
- **Performance**: Request timing and performance metrics
- **Health Checks**: Comprehensive health monitoring
- **Security**: Enterprise-level security measures
- **Deployment**: Multiple platform support (Heroku, AWS, DigitalOcean)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Check code quality: `npm run lint && npm run format`
6. Commit your changes: `git commit -m 'feat: add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards
- Follow ESLint and Prettier configurations
- Write comprehensive tests for new features
- Ensure accessibility compliance
- Follow conventional commit standards
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/your-username/mindease-mental-health-app/issues)
- 💬 [Discussions](https://github.com/your-username/mindease-mental-health-app/discussions)

### Community
- Join our [Discord server](https://discord.gg/mindease)
- Follow us on [Twitter](https://twitter.com/mindease)
- Subscribe to our [newsletter](https://mindease.app/newsletter)

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- ✅ Core mood tracking functionality
- ✅ Basic mindfulness exercises
- ✅ User authentication
- ✅ Payment integration
- ✅ Professional development workflow
- ✅ Comprehensive testing and CI/CD
- ✅ Production-ready security and monitoring

### Phase 2 (Next)
- 🔄 Advanced analytics and insights
- 🔄 AI-powered mood analysis
- 🔄 Community features
- 🔄 Therapist matching
- 🔄 Real-time notifications

### Phase 3 (Future)
- 📋 Group therapy sessions
- 📋 Crisis intervention tools
- 📋 Integration with health apps
- 📋 Multi-language support
- 📋 Advanced accessibility features

## 🙏 Acknowledgments

- React Native community for the excellent framework
- Stripe for secure payment processing
- MongoDB for reliable data storage
- Winston for comprehensive logging
- All contributors and supporters

---

**Made with ❤️ for mental health awareness and support**

*This project has been transformed into a production-ready, professional-grade application with comprehensive tooling, testing, and deployment capabilities.*

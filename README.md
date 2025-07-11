# Mental Health App - MindEase

---

## 🚨 Recent Changes & Local Development Notes (June 2025)

- **API Base URL for Local Development:**
  - All frontend and web code now uses `http://localhost:5000` as the API base URL for local development.
  - In `web-test.html`, a line was added at the top of the main script: `const API_BASE_URL = 'http://localhost:5000';`
  - If you run the frontend on a device/emulator, replace `localhost` with your computer's IP address.

- **Backend Startup:**
  - Always start the backend from the `backend` directory:
    ```sh
    cd backend
    npm run start:robust
    ```
  - Do NOT run backend commands from the project root, or you will get a `package.json` not found error.

- **Frontend/SPA Token Loading:**
  - On refresh, the app checks for a token in storage. If not found, it redirects to login, then back to the last tab.
  - For a smoother experience, consider adding a loading spinner while checking for the token.

- **Troubleshooting:**
  - If you see `net::ERR_CONNECTION_REFUSED`, ensure the backend is running and accessible at `http://localhost:5000`.
  - If you see `API_BASE_URL is not defined`, ensure it is declared at the top of your JS files before use.

---

This project is dedicated to creating a comprehensive Mental Health application. Our goal is to provide a supportive and accessible platform for users to manage their mental well-being.

## Project Status

### ✅ Completed Steps
- [x] **Step 1**: Project initialization and dependency setup
  - Backend: Node.js/Express with MongoDB, JWT, bcrypt, CORS, Helmet, Rate limiting, Redis, Stripe
  - Frontend: React Native with Navigation, AsyncStorage, Axios
  - Gitignore files configured for both directories

- [x] **Step 2**: MongoDB Configuration
  - Local MongoDB setup guide created
  - MongoDB Atlas setup guide created
  - Environment configuration file created
  - MongoDB connection test script created
  - ✅ MongoDB successfully installed and tested

- [x] **Step 3**: Redis Configuration
  - Redis setup guide created with multiple installation options
  - Redis connection test script created
  - Environment configuration updated
  - ✅ Redis Cloud successfully configured and tested

- [x] **Step 4**: Stripe Configuration
  - Stripe setup guide created with step-by-step instructions
  - Stripe test script created for API verification
  - Environment configuration updated with payment variables
  - Premium subscription product setup instructions
  - ✅ Stripe API key and product ID configured

- [x] **Step 5**: Backend API Development ✅ **COMPLETED**
  - Express server with MongoDB connection and JWT authentication
  - User registration and login endpoints with bcrypt password hashing
  - Mood logging system with journal entries and insights
  - Payment processing with Stripe integration
  - Rate limiting with Redis for security
  - Helmet security middleware
  - Comprehensive error handling and validation
  - All endpoints tested and working
  - Final comprehensive test script created

- [x] **Step 6**: Frontend Development ✅ **COMPLETED**
  - React Native app with bottom tab navigation
  - LoginScreen with authentication and registration
  - HomeScreen with daily tips and quick actions
  - MoodTrackerScreen with emoji mood selection and journal entries
  - MindfulnessScreen with exercises and premium content
  - CommunityHubScreen with groups and events
  - ProfileScreen with subscription management
  - Full API integration with backend
  - Stripe payment integration
  - Modern, accessible UI design
  - Error handling and rate limiting support

- [x] **Step 7**: Enhanced Profile Management ✅ **COMPLETED**
  - Comprehensive user profile fields (name, age, gender, emergency contact)
  - Phone number auto-formatting with validation
  - Timezone and language preferences
  - Privacy settings and notification preferences
  - Emergency contact management with relationship and phone
  - Profile data persistence and validation
  - Enhanced UI with proper form handling

- [x] **Step 8**: AI-Powered Goals & Suggestions ✅ **COMPLETED**
  - Goal input system on home screen
  - AI-like personalized suggestions based on user goals
  - Exercise recommendations tailored to mental health goals
  - App action suggestions for goal achievement
  - Motivational messages and guidance
  - Integration with existing mood tracking system

- [x] **Step 9**: Robust Server Management
  - Global error handlers for uncaught exceptions and unhandled rejections
  - Database connection retry logic with graceful failure handling
  - Port conflict resolution and automatic process management
  - Health monitoring endpoints and automatic recovery
  - Graceful shutdown handlers for SIGTERM/SIGINT signals
  - Request logging and performance tracking
  - Comprehensive fail-safes documentation

- [x] **Step 10**: Goal Tracking & AI Feedback System
  - Goal creation with AI-powered personalized suggestions
  - User feedback system with thumbs up/down ratings
  - Goal history tracking with completion status
  - Tag-based categorization (stress, sleep, depression, focus, confidence)
  - Goal statistics and progress monitoring
  - Notes and additional feedback collection
  - Goal completion marking and deletion functionality

### 🎯 Project Status: FULLY FUNCTIONAL WITH ENHANCED FEATURES

The MindEase mental health app is now complete with both backend and frontend fully implemented, enhanced with robust server management, comprehensive profile features, and AI-powered goal suggestions.

### 📋 Next Steps (Optional Enhancements)
- [ ] **Step 10**: App Store Deployment
- [ ] **Step 11**: Push Notifications
- [ ] **Step 12**: Analytics and Crash Reporting
- [ ] **Step 13**: Advanced AI Features (guided meditations, personalized insights)

## Features (Implemented)

### Core Features
-   [x] User authentication (register/login)
-   [x] Mood tracking with journal entries
-   [x] AI insights for mood analysis
-   [x] Payment processing and subscriptions
-   [x] Mindfulness exercises with premium content
-   [x] Community features with premium access
-   [x] Subscription management
-   [x] Premium subscription features
-   [x] Rate limiting and security
-   [x] Modern, accessible UI

### Enhanced Features
-   [x] Comprehensive user profiles with emergency contacts
-   [x] AI-powered goal suggestions and personalized recommendations
-   [x] Phone number auto-formatting and validation
-   [x] Privacy settings and notification preferences
-   [x] Robust server management with fail-safes
-   [x] Health monitoring and automatic recovery
-   [x] Request logging and performance tracking
-   [x] Graceful error handling and shutdown procedures

## Tech Stack

-   **Frontend:** React Native with Navigation, AsyncStorage, Axios
-   **Backend:** Node.js, Express, MongoDB, JWT, bcrypt, CORS, Helmet, Rate limiting, Redis, Stripe
-   **Database:** MongoDB (Local or Atlas)
-   **Cache:** Redis (Local or Cloud)
-   **Payments:** Stripe (Subscriptions, Customer Portal)
-   **Monitoring:** Custom health checks and process management

## Getting Started

### Prerequisites
1. Node.js and npm installed
2. MongoDB installed locally or MongoDB Atlas account
3. Redis installed locally or Redis Cloud account
4. Stripe account for payment processing
5. React Native development environment set up

### Installation
1. Clone the repository
2. Follow the MongoDB setup guide in `MONGODB_SETUP.md`
3. Follow the Redis setup guide in `REDIS_SETUP.md`
4. Follow the Stripe setup guide in `STRIPE_SETUP.md`
5. Update `backend/config.env` with your connection strings and API keys
6. Test connections:
   - MongoDB: `cd backend && node test-mongo.js`
   - Redis: `cd backend && node test-redis.js`
   - Stripe: `cd backend && node test-stripe.js`

### Running the Application

#### Backend (Multiple Options)

**Recommended - Robust Startup:**
```bash
cd backend && npm run start:robust
```
- Automatically handles port conflicts
- Kills existing processes if needed
- Provides clear error messages
- Better process management

**Development with Auto-Restart:**
```bash
cd backend && npm run dev:robust
```
- Combines nodemon with robust startup features
- Automatic restarts on file changes

**With Health Monitoring:**
```bash
cd backend && npm run monitor
```
- Continuously monitors server health
- Automatically restarts after failures
- Real-time status updates

**Basic Startup:**
```bash
cd backend && npm start
```
- Standard server startup with basic error handling

#### Frontend
1. Navigate to frontend: `cd MindEaseFrontend`
2. Start the React Native app:
   - Android: `npx react-native run-android`
   - iOS: `npx react-native run-ios`

## API Endpoints

### Authentication
- `POST /auth` - Combined login/register endpoint
- `POST /register` - User registration
- `POST /login` - User authentication

### User Management
- `GET /user` - Get user profile
- `PUT /user` - Update user profile
- `GET /health` - Server health check

### Mood Tracking
- `POST /mood` - Log mood entry with journal
- `GET /mood/history` - Get mood history
- `DELETE /mood/:id` - Delete mood entry

### Goals & Suggestions
- `POST /goals` - Create new goal with AI suggestions
- `GET /goals` - Get user goals and suggestions
- `PUT /goals/:id` - Update goal with feedback
- `DELETE /goals/:id` - Delete goal
- `POST /goals/:id/complete` - Mark goal as completed

## 🚀 Features

### Authentication & User Management
- Secure JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- Token-based session management
- Enhanced user profiles with comprehensive fields

### Mood Tracking & Journaling
- Daily mood logging with emoji selection
- Journal entry support
- Mood history with insights
- AI-powered mood analysis
- Integration with existing mood tracking system

### Goal Tracking & AI Feedback System
- **NEW**: Goal creation with AI-powered personalized suggestions
- **NEW**: User feedback system with thumbs up/down ratings for suggestions
- **NEW**: Goal history tracking with completion status
- **NEW**: Tag-based categorization (stress, sleep, depression, focus, confidence)
- **NEW**: Goal statistics and progress monitoring
- **NEW**: Notes and additional feedback collection
- **NEW**: Goal completion marking and deletion functionality
- **NEW**: AI learns from user feedback to improve future suggestions

### Mindfulness & CBT Exercises
- Guided meditation sessions
- Cognitive Behavioral Therapy exercises
- Premium content access control
- Exercise progress tracking
- Streak monitoring

### Community Features
- Support group connections
- Community chat functionality
- Premium group access
- Event scheduling and notifications

### Profile Management
- Comprehensive user profiles
- Emergency contact management with phone formatting
- Privacy settings and notification preferences
- Timezone and language preferences
- Age and gender fields with validation

### Payment Integration
- Stripe payment processing
- Subscription management
- Premium content access
- Customer portal integration
- Webhook handling for payment events

### Server Management & Fail-Safes
- Global error handlers for uncaught exceptions
- Database connection retry logic with graceful failure
- Port conflict resolution and automatic process management
- Health monitoring endpoints and automatic recovery
- Graceful shutdown handlers for SIGTERM/SIGINT signals
- Request logging and performance tracking
- Comprehensive fail-safes documentation

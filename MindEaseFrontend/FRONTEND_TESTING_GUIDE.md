# Frontend Testing Guide

## 🚀 React Native Setup Requirements

### Prerequisites for Android Development:

1. **Node.js** ✅ (Already installed)
2. **Java Development Kit (JDK)** - Version 17-20
3. **Android Studio** - For Android SDK and emulator
4. **Android SDK** - Required for building Android apps
5. **Android Emulator** - For testing on virtual device

### Prerequisites for iOS Development (macOS only):

1. **Xcode** - For iOS development
2. **iOS Simulator** - For testing on virtual device

## 📱 Quick Setup Instructions

### Option 1: Android Development (Recommended for Windows)

#### 1. Install Java Development Kit (JDK)

```bash
# Download and install JDK 17 or 20 from Oracle or OpenJDK
# Set JAVA_HOME environment variable
```

#### 2. Install Android Studio

- Download from: https://developer.android.com/studio
- Install Android SDK during setup
- Create an Android Virtual Device (AVD)

#### 3. Set Environment Variables

```bash
# Add to your system environment variables:
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-17
```

#### 4. Start Android Emulator

- Open Android Studio
- Go to AVD Manager
- Start your virtual device

#### 5. Run the App

```bash
cd MindEaseFrontend
npx react-native run-android
```

### Option 2: iOS Development (macOS only)

```bash
cd MindEaseFrontend
npx react-native run-ios
```

## 🧪 Testing Scenarios

### 1. Authentication Flow

- [ ] **Register new user**

  - Enter email and password
  - Verify success message
  - Check if redirected to login

- [ ] **Login with credentials**

  - Enter registered email/password
  - Verify token storage
  - Check navigation to Home screen

- [ ] **Login/Register toggle**
  - Switch between login and register modes
  - Verify form fields update correctly

### 2. Home Screen

- [ ] **Daily tip display**

  - Verify mindfulness tip is shown
  - Check styling and layout

- [ ] **Quick action buttons**

  - Test "Log Mood" navigation
  - Test "Meditate Now" navigation
  - Test "Join Community" navigation

- [ ] **Progress summary**
  - Verify weekly progress display
  - Check data formatting

### 3. Mood Tracker Screen

- [ ] **Emoji mood selection**

  - Test all 5 mood emojis
  - Verify selection highlighting
  - Check mood state management

- [ ] **Journal entry**

  - Enter text in journal field
  - Test multiline input
  - Verify text persistence

- [ ] **Save entry**

  - Submit mood and journal
  - Verify API call to backend
  - Check success message
  - Verify AI insights display

- [ ] **Mood history**
  - View previously logged moods
  - Test delete functionality
  - Verify real-time updates

### 4. Mindfulness Screen

- [ ] **Exercise list**

  - View available exercises
  - Verify free vs premium labeling
  - Test exercise selection

- [ ] **Premium content**

  - Try to access premium exercises
  - Verify upgrade prompts
  - Check locked content styling

- [ ] **Streak tracker**
  - Verify streak display
  - Check streak calculation

### 5. Community Hub Screen

- [ ] **Group listing**

  - View available groups
  - Verify free vs premium groups
  - Test group joining

- [ ] **Premium groups**

  - Try to join premium groups
  - Verify upgrade prompts

- [ ] **Events display**
  - Check upcoming events
  - Verify event information

### 6. Profile Screen

- [ ] **Subscription status**

  - Verify current status display
  - Check status updates

- [ ] **Upgrade functionality**

  - Test "Upgrade to Premium" button
  - Verify Stripe integration
  - Check error handling

- [ ] **Subscription management**
  - Test "Manage Subscription" (if premium)
  - Test "Cancel Subscription" (if premium)
  - Verify customer portal integration

### 7. Error Handling

- [ ] **Network errors**

  - Test with backend offline
  - Verify error messages
  - Check retry functionality

- [ ] **Rate limiting**

  - Trigger rate limiting (429 errors)
  - Verify user-friendly error messages
  - Check retry mechanisms

- [ ] **Invalid data**
  - Test with invalid email/password
  - Verify validation messages
  - Check form error handling

## 🔧 Debugging Tips

### Common Issues:

1. **Metro bundler not starting**

   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build failures**

   ```bash
   cd android && ./gradlew clean
   cd .. && npx react-native run-android
   ```

3. **iOS build failures**
   ```bash
   cd ios && pod install
   cd .. && npx react-native run-ios
   ```

### Debugging Tools:

- **React Native Debugger** - For debugging
- **Flipper** - For network inspection
- **Chrome DevTools** - For console debugging

## 📊 Test Checklist

### Core Functionality:

- [ ] User registration and login
- [ ] Mood tracking with journal entries
- [ ] Mood history and deletion
- [ ] AI insights generation
- [ ] Premium content access control
- [ ] Subscription management
- [ ] Navigation between screens
- [ ] Error handling and user feedback

### UI/UX:

- [ ] Responsive design on different screen sizes
- [ ] Consistent styling and branding
- [ ] Smooth animations and transitions
- [ ] Accessibility features
- [ ] Loading states and feedback

### Performance:

- [ ] App startup time
- [ ] Screen navigation speed
- [ ] API response handling
- [ ] Memory usage
- [ ] Battery consumption

## 🎯 Success Criteria

The frontend is considered successfully tested when:

1. ✅ All authentication flows work correctly
2. ✅ Mood tracking is fully functional
3. ✅ Premium content access is properly controlled
4. ✅ Payment integration works (with valid Stripe account)
5. ✅ Error handling provides good user experience
6. ✅ UI is responsive and accessible
7. ✅ Performance is acceptable on target devices

## 🚀 Next Steps After Testing

1. **Fix any bugs** found during testing
2. **Optimize performance** if needed
3. **Add additional features** (push notifications, etc.)
4. **Prepare for app store deployment**
5. **Set up production environment**
6. **Configure analytics and crash reporting**

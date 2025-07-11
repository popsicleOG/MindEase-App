# MindEase - Mental Health App

A comprehensive React Native application for mental health tracking, mindfulness exercises, and community support. Built with modern React Native practices and centralized API configuration.

## Features

- **Mood Tracking**: Log and visualize your daily moods
- **Mindfulness Exercises**: Guided meditation and CBT exercises
- **Community Support**: Connect with others in similar situations
- **Goal Setting**: Set and track mental health goals
- **Premium Features**: Advanced exercises and therapist-led support groups

## Project Structure

```
MindEaseFrontend/
├── src/
│   ├── screens/           # All screen components
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── MoodTrackerScreen.js
│   │   ├── MindfulnessScreen.js
│   │   ├── CommunityHubScreen.js
│   │   └── ProfileScreen.js
│   └── config/
│       └── api.js         # Centralized API configuration
├── __tests__/             # Comprehensive test suite
├── android/               # Android native code
├── ios/                   # iOS native code
└── package.json
```

## Getting Started

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Development

### API Configuration

The app uses centralized API configuration in `src/config/api.js`. This ensures consistent API endpoints across all screens and makes environment switching seamless.

### Testing

Run the comprehensive test suite:

```sh
npm test
```

The test suite includes:

- **API Configuration Tests**: Validate API endpoints and authentication
- **Screen Component Tests**: Test rendering and user interactions
- **Integration Tests**: Test API calls and data flow

### Code Quality

The project follows modern React Native best practices:

- Centralized API configuration
- Comprehensive test coverage
- Clean component structure
- Environment-based configuration

## API Integration

The backend API runs on `http://localhost:5000` in development. All API calls use the centralized configuration in `src/config/api.js` for consistency and maintainability.

## Development Workflow

1. **Start the backend server** (see backend README)
2. **Start Metro**: `npm start`
3. **Run on device/emulator**: `npm run android` or `npm run ios`
4. **Run tests**: `npm test`

## Congratulations! :tada:

You've successfully set up the MindEase React Native app! :partying_face:

### Next Steps

- Explore the screen components in `src/screens/`
- Review the API configuration in `src/config/api.js`
- Run the test suite to ensure everything works
- Check out the backend integration

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how to setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

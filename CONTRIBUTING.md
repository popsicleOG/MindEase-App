# Contributing to MindEase Mental Health App

Thank you for your interest in contributing to MindEase! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### 1. Fork and Clone
1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/your-feature-name`

### 2. Development Setup

#### Backend Setup
```bash
cd backend
npm install
# Set up your config.env file
npm run start:robust
```

#### Frontend Setup
```bash
cd MindEaseFrontend
npm install
# For Android
npx react-native run-android
# For iOS (macOS only)
npx react-native run-ios
```

### 3. Code Style Guidelines

#### JavaScript/TypeScript
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for components and classes

#### React Native Components
```javascript
// Good
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

// Bad
const myComponent = (props) => {
  return <View><Text>{props.prop1}</Text></View>
};
```

#### Backend Code
```javascript
// Good
const authenticateToken = (req, res, next) => {
  // Implementation
};

// Bad
const auth = (req,res,next) => {
  // Implementation
};
```

### 4. Testing

#### Backend Tests
```bash
cd backend
# Run comprehensive tests
node comprehensive-backend-test.js
# Run individual tests
node test-mongo.js
node test-redis.js
```

#### Frontend Tests
```bash
cd MindEaseFrontend
npm test
```

### 5. Commit Guidelines

Use conventional commit format:
```
type(scope): description

feat(auth): add JWT token refresh functionality
fix(mood): resolve timestamp field issue
docs(readme): update installation instructions
test(api): add comprehensive API tests
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 6. Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add comments to new code
   - Update API documentation

2. **Test Your Changes**
   - Run all tests
   - Test on both Android and iOS (if applicable)
   - Verify API endpoints work correctly

3. **Submit PR**
   - Use descriptive title
   - Include detailed description
   - Reference any related issues
   - Add screenshots for UI changes

### 7. Review Process

- All PRs require at least one review
- Address review comments promptly
- Maintainers may request changes
- PRs will be merged after approval

## 🐛 Reporting Issues

### Bug Reports
Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case and benefits
- Mockups or examples if applicable

## 📋 Development Priorities

### High Priority
- Security vulnerabilities
- Critical bugs affecting core functionality
- Performance issues

### Medium Priority
- New features aligned with mental health goals
- UI/UX improvements
- Documentation updates

### Low Priority
- Nice-to-have features
- Code refactoring
- Additional test coverage

## 🛠️ Development Environment

### Required Tools
- Node.js (v16 or higher)
- npm or yarn
- Git
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Recommended Tools
- VS Code with React Native extensions
- React Native Debugger
- Postman or similar for API testing

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Jest Testing Framework](https://jestjs.io/)

## 🎯 Mental Health Focus

Remember that this is a mental health application. When contributing:

- Consider the impact on users' mental well-being
- Ensure features promote positive mental health practices
- Test with accessibility in mind
- Consider privacy and data security implications

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Join our community discussions
- Check existing documentation first

Thank you for contributing to mental health technology! 🌟 
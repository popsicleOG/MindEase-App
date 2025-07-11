# Contributing to MindEase

Thank you for your interest in contributing to MindEase! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)

## Code of Conduct

This project is dedicated to providing a welcoming and inclusive environment for all contributors. We are committed to making participation in this project a harassment-free experience for everyone.

### Our Standards

- Be respectful and inclusive of all contributors
- Use welcoming and inclusive language
- Be collaborative and open to constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/your-username/mental-health-app.git`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)
- Redis (for backend)
- React Native development environment

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend
   cp MindEaseFrontend/env.example MindEaseFrontend/.env
   # Edit MindEaseFrontend/.env with your configuration
   ```

3. **Start the development servers**:
   ```bash
   # Start both backend and frontend
   npm start
   
   # Or start individually
   npm run start:backend
   npm run start:frontend
   ```

## Making Changes

### Project Structure

```
Mental Health App/
├── backend/                 # Node.js/Express backend
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   └── models/            # Database models
├── MindEaseFrontend/       # React Native frontend
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── components/    # Reusable components
│   │   └── config/        # Configuration files
│   └── __tests__/         # Test files
└── docs/                  # Documentation
```

### Backend Development

- **API Routes**: Add new routes in the appropriate route files
- **Middleware**: Create custom middleware in `backend/middleware/`
- **Validation**: Use Joi schemas for input validation
- **Security**: Implement rate limiting and security headers

### Frontend Development

- **Screens**: Add new screens in `MindEaseFrontend/src/screens/`
- **Components**: Create reusable components in `MindEaseFrontend/src/components/`
- **API Integration**: Use the centralized API configuration
- **Testing**: Write tests for new components

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend
```

### Writing Tests

- **Backend**: Use Jest for unit tests and integration tests
- **Frontend**: Use React Native Testing Library for component tests
- **Coverage**: Aim for at least 80% test coverage

### Test Guidelines

- Write tests for new features
- Ensure tests are fast and reliable
- Use descriptive test names
- Mock external dependencies

## Submitting Changes

### Pull Request Process

1. **Update your branch**: `git pull origin main`
2. **Run tests**: Ensure all tests pass
3. **Run linting**: `npm run lint`
4. **Format code**: `npm run format`
5. **Create a pull request** with a clear description

### Pull Request Guidelines

- **Title**: Use conventional commit format
- **Description**: Explain what and why, not how
- **Screenshots**: Include screenshots for UI changes
- **Tests**: Ensure all tests pass
- **Documentation**: Update documentation if needed

## Code Style

### JavaScript/TypeScript

- Use ESLint and Prettier for code formatting
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic

### React Native

- Use functional components with hooks
- Follow React Native best practices
- Use the centralized API configuration
- Implement proper error handling

### Backend

- Use async/await for asynchronous operations
- Implement proper error handling
- Use validation middleware
- Follow RESTful API conventions

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```
feat(auth): add JWT authentication middleware
fix(api): resolve CORS issues with frontend
docs(readme): update installation instructions
style(components): format code with prettier
refactor(api): simplify user route handlers
test(screens): add accessibility tests
```

## Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the README files for setup instructions

## Recognition

Contributors will be recognized in the project's README and release notes. We appreciate all contributions, big and small!

Thank you for contributing to MindEase! 🧠💙

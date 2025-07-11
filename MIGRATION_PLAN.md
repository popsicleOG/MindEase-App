# React Native Codebase Consolidation Plan

## 🎯 Goal
Consolidate scattered React Native files into a single, well-organized frontend structure.

## 📊 Current State Analysis

### Root Directory Files (To Migrate)
- `App.js` - Main app entry point
- `HomeScreen.js` - Home screen component
- `LoginScreen.js` - Authentication screen
- `MoodTrackerScreen.js` - Mood tracking functionality
- `MindfulnessScreen.js` - Mindfulness exercises
- `CommunityHubScreen.js` - Community features
- `ProfileScreen.js` - User profile management

### MindEaseFrontend Directory
- Complete React Native project structure
- Proper package.json and dependencies
- Android/iOS native configurations
- Test setup and documentation

## 🚀 Migration Strategy

### Phase 1: File Migration
1. **Move root screen files to MindEaseFrontend/src/screens/**
   ```bash
   # Create screens directory
   mkdir -p MindEaseFrontend/src/screens
   
   # Move files
   mv HomeScreen.js MindEaseFrontend/src/screens/
   mv LoginScreen.js MindEaseFrontend/src/screens/
   mv MoodTrackerScreen.js MindEaseFrontend/src/screens/
   mv MindfulnessScreen.js MindEaseFrontend/src/screens/
   mv CommunityHubScreen.js MindEaseFrontend/src/screens/
   mv ProfileScreen.js MindEaseFrontend/src/screens/
   ```

2. **Update App.js and move to MindEaseFrontend/**
   ```bash
   mv App.js MindEaseFrontend/App.js
   ```

### Phase 2: Import Path Updates
Update all import statements to use the new centralized API config:

**Before:**
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

**After:**
```javascript
import { API_BASE_URL, ENDPOINTS, buildURL } from './src/config/api';
```

### Phase 3: Directory Structure
```
MindEaseFrontend/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── MoodTrackerScreen.js
│   │   ├── MindfulnessScreen.js
│   │   ├── CommunityHubScreen.js
│   │   └── ProfileScreen.js
│   ├── config/
│   │   └── api.js
│   ├── components/
│   │   └── (shared components)
│   ├── utils/
│   │   └── (helper functions)
│   └── services/
│       └── (API services)
├── __tests__/
├── android/
├── ios/
└── package.json
```

### Phase 4: Cleanup
1. Remove duplicate files from root directory
2. Update documentation references
3. Update CI/CD configurations
4. Test all functionality

## ✅ Benefits of Consolidation

1. **Single Source of Truth** - All React Native code in one place
2. **Better Organization** - Clear directory structure
3. **Easier Maintenance** - No confusion about which files to edit
4. **Improved Collaboration** - Team knows where to find code
5. **Better Testing** - Centralized test structure
6. **Simplified Deployment** - One frontend to deploy

## 🛠️ Implementation Steps

### Step 1: Backup Current State
```bash
git add .
git commit -m "backup: current state before consolidation"
```

### Step 2: Create New Directory Structure
```bash
cd MindEaseFrontend
mkdir -p src/screens src/config src/components src/utils src/services
```

### Step 3: Migrate Files
```bash
# From project root
cp HomeScreen.js MindEaseFrontend/src/screens/
cp LoginScreen.js MindEaseFrontend/src/screens/
cp MoodTrackerScreen.js MindEaseFrontend/src/screens/
cp MindfulnessScreen.js MindEaseFrontend/src/screens/
cp CommunityHubScreen.js MindEaseFrontend/src/screens/
cp ProfileScreen.js MindEaseFrontend/src/screens/
cp App.js MindEaseFrontend/
```

### Step 4: Update Imports
Replace hard-coded API URLs with centralized config imports.

### Step 5: Test Everything
```bash
cd MindEaseFrontend
npm test
npx react-native run-android  # or run-ios
```

### Step 6: Cleanup
```bash
# From project root
rm HomeScreen.js LoginScreen.js MoodTrackerScreen.js MindfulnessScreen.js CommunityHubScreen.js ProfileScreen.js App.js
```

## 📋 Migration Checklist

- [ ] Create backup commit
- [ ] Set up new directory structure
- [ ] Migrate all screen files
- [ ] Update import statements
- [ ] Replace hard-coded API URLs
- [ ] Update App.js imports
- [ ] Test all screens
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Remove old files
- [ ] Commit consolidation changes

## 🎯 Success Criteria

1. All React Native code in `MindEaseFrontend/` directory
2. No duplicate files between root and frontend
3. All imports use centralized API configuration
4. All tests pass
5. App runs successfully on both platforms
6. Documentation updated to reflect new structure

This consolidation will eliminate confusion and create a maintainable, professional codebase structure. 
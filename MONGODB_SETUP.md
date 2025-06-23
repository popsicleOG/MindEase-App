# MongoDB Setup Guide

## Option 1: Local MongoDB Installation (Windows)

### Step 1: Download MongoDB Community Server
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0.x)
   - Platform: Windows
   - Package: MSI
3. Download the installer

### Step 2: Install MongoDB
1. Run the downloaded MSI installer
2. Choose "Complete" installation
3. Install MongoDB Compass (GUI tool) when prompted
4. Complete the installation

### Step 3: Start MongoDB Service
After installation, MongoDB should run as a Windows service automatically.

To verify installation:
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start MongoDB service if not running
Start-Service -Name MongoDB
```

### Step 4: Test Connection
```powershell
# Connect to MongoDB shell
mongosh

# Create and use mindease database
use mindease
db.createCollection('users')
exit
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Step 1: Create Atlas Account
1. Go to: https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new project

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Choose region closest to you
5. Click "Create"

### Step 3: Configure Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `mindease`
4. Password: `your-secure-password`
5. Role: "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" tab
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `mindease`

## Environment Configuration

### For Local MongoDB:
Update `backend/config.env`:
```
MONGO_URI=mongodb://localhost:27017/mindease
```

### For MongoDB Atlas:
Update `backend/config.env`:
```
MONGO_URI=mongodb+srv://mindease:<your-password>@cluster0.mongodb.net/mindease?retryWrites=true&w=majority
```

## Testing the Connection

### Using MongoDB Compass (GUI):
1. Open MongoDB Compass
2. Enter connection string
3. Click "Connect"
4. Verify you can see the `mindease` database

### Using Command Line:
```powershell
# For local MongoDB
mongosh mongodb://localhost:27017/mindease

# For Atlas (replace with your connection string)
mongosh "mongodb+srv://mindease:<password>@cluster0.mongodb.net/mindease"
```

## Next Steps
After MongoDB is configured:
1. Update the `MONGO_URI` in `backend/config.env`
2. Test the connection using the methods above
3. Proceed to Step 3 of the app development 
# Redis Setup Guide

## Option 1: Local Redis Installation (Windows)

### Method 1: Using Windows Subsystem for Linux (WSL) - Recommended
1. Install WSL2 if not already installed:
   ```powershell
   wsl --install
   ```
2. Restart your computer
3. Open WSL terminal and install Redis:
   ```bash
   sudo apt update
   sudo apt install redis-server
   sudo systemctl start redis-server
   sudo systemctl enable redis-server
   ```
4. Test Redis:
   ```bash
   redis-cli ping
   # Should return: PONG
   ```

### Method 2: Using Docker (Alternative)
1. Install Docker Desktop for Windows
2. Run Redis container:
   ```powershell
   docker run --name redis -p 6379:6379 -d redis:latest
   ```
3. Test Redis:
   ```powershell
   docker exec -it redis redis-cli ping
   ```

### Method 3: Manual Installation
1. Download Redis for Windows from: https://github.com/microsoftarchive/redis/releases
2. Extract and run `redis-server.exe`
3. Test with `redis-cli.exe ping`

## Option 2: Cloud Redis (Recommended for Production)

### Redis Cloud (Free Tier)
1. Go to: https://redis.com/try-free/
2. Sign up for a free account
3. Create a new database:
   - Choose "Free" plan
   - Select region closest to you
   - Click "Create Database"
4. Get connection details:
   - Host: Your Redis endpoint
   - Port: 6379 (usually)
   - Password: Your database password
5. Connection string format:
   ```
   redis://default:<password>@<host>:<port>
   ```

### Upstash Redis (Free Tier)
1. Go to: https://upstash.com/
2. Sign up and create a new Redis database
3. Get connection details from dashboard
4. Connection string format:
   ```
   redis://default:<password>@<host>:<port>
   ```

## Environment Configuration

### For Local Redis:
Update `backend/config.env`:
```
REDIS_URL=redis://localhost:6379
```

### For Cloud Redis:
Update `backend/config.env`:
```
REDIS_URL=redis://default:<password>@<host>:<port>
```

## Testing Redis Connection

### Using Redis CLI:
```powershell
# For local Redis
redis-cli ping

# For cloud Redis (replace with your connection details)
redis-cli -h <host> -p <port> -a <password> ping
```

### Using Node.js Test Script:
Run the Redis test script:
```powershell
cd backend
node test-redis.js
```

## Redis Usage in Our App

Redis will be used for:
- Rate limiting (express-rate-limit with Redis store)
- Session storage
- Caching frequently accessed data
- Real-time features

## Next Steps
After Redis is configured:
1. Update `REDIS_URL` in `backend/config.env`
2. Test the connection using the methods above
3. Proceed to Step 4: Backend API Development 
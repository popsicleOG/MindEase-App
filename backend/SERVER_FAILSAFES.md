# MindEase Backend Server Fail-Safes

This document explains the fail-safes and monitoring systems implemented to prevent server issues.

## 🛡️ Built-in Fail-Safes

### 1. Global Error Handlers

- **Uncaught Exception Handler**: Catches any unhandled exceptions and logs them before shutting down gracefully
- **Unhandled Rejection Handler**: Catches unhandled promise rejections and logs them
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals to close connections properly

### 2. Database Connection Retry Logic

- **Automatic Retries**: Attempts to connect to MongoDB up to 5 times with 5-second delays
- **Connection Timeouts**: Sets appropriate timeouts to prevent hanging connections
- **Graceful Failure**: Exits cleanly if database connection fails after all retries

### 3. Port Conflict Resolution

- **Port Check**: Automatically detects if port 5000 is already in use
- **Process Termination**: Automatically kills processes using the port
- **Clear Error Messages**: Provides helpful instructions when manual intervention is needed

### 4. Request Logging & Monitoring

- **Request Logging**: Logs all incoming requests with timestamps
- **Health Check Endpoint**: `/health` endpoint provides server status
- **Memory Monitoring**: Tracks memory usage and server uptime

### 5. CORS Configuration

- **Multiple Origins**: Supports localhost, file://, and other development URLs
- **Credentials Support**: Enables secure cookie handling

## 🚀 Startup Options

### Basic Startup

```bash
npm start
```

Standard server startup with basic error handling.

### Robust Startup (Recommended)

```bash
npm run start:robust
```

- Automatically handles port conflicts
- Kills existing processes if needed
- Provides clear error messages
- Better process management

### Development Mode

```bash
npm run dev
```

Uses nodemon for automatic restarts on file changes.

### Development with Robust Startup

```bash
npm run dev:robust
```

Combines nodemon with robust startup features.

## 🔍 Monitoring

### Health Check

```bash
curl http://localhost:5000/health
```

Returns server status including:

- Uptime
- Memory usage
- Database connection status
- Redis availability

### Server Monitor

```bash
npm run monitor
```

- Continuously monitors server health
- Automatically restarts server after 3 consecutive failures
- Checks health every 30 seconds
- Provides real-time status updates

## 🛠️ Troubleshooting

### Port Already in Use

If you see `EADDRINUSE` error:

1. **Automatic Fix** (Recommended):

   ```bash
   npm run start:robust
   ```

2. **Manual Fix**:

   ```bash
   # Find the process using port 5000
   netstat -ano | findstr :5000

   # Kill the process (replace <PID> with actual PID)
   taskkill /F /PID <PID>
   ```

### Server Not Responding

1. Check if server is running:

   ```bash
   curl http://localhost:5000/health
   ```

2. If not responding, restart with monitor:
   ```bash
   npm run monitor
   ```

### Database Connection Issues

1. Ensure MongoDB is running
2. Check `config.env` file for correct `MONGO_URI`
3. Server will automatically retry connections

## 📊 Monitoring Dashboard

The `/health` endpoint provides:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 12345678,
    "heapTotal": 9876543,
    "heapUsed": 5432109
  },
  "database": "connected",
  "redis": "available"
}
```

## 🔧 Environment Variables

Create a `config.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost/mindease
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
PORT=5000
```

## 🚨 Emergency Procedures

### Server Crashes Repeatedly

1. Check logs for specific error messages
2. Verify database connectivity
3. Check available memory and disk space
4. Restart with monitor: `npm run monitor`

### Database Issues

1. Verify MongoDB is running
2. Check network connectivity
3. Verify connection string in `config.env`
4. Server will automatically retry connections

### Port Conflicts

1. Use robust startup: `npm run start:robust`
2. Or manually kill processes and restart

## 📝 Best Practices

1. **Always use robust startup** for production-like environments
2. **Use the monitor** for long-running development sessions
3. **Check health endpoint** regularly during development
4. **Keep logs** for debugging issues
5. **Use environment variables** for configuration

## 🔄 Automatic Recovery

The server includes several automatic recovery mechanisms:

- **Database reconnection** with exponential backoff
- **Process restart** after multiple health check failures
- **Port conflict resolution** on startup
- **Graceful error handling** to prevent crashes

These fail-safes ensure the server remains stable and recoverable even when issues occur.

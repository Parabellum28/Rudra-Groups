# Troubleshooting 404 Error - Backend API

If you're getting a **404 error** when trying to access the backend API, follow these steps:

## Step 1: Verify Backend Server is Running

1. **Check if the backend server is running:**
   - Open a terminal/command prompt
   - Navigate to the `rudra_backend` folder
   - Run: `npm run dev`
   - You should see output like:
     ```
     ▲ Next.js 14.x.x
     - Local:        http://localhost:3000
     - Ready in X seconds
     ```

2. **If the server isn't running:**
   - Make sure you're in the correct directory: `cd rudra_backend`
   - Install dependencies: `npm install`
   - Start the server: `npm run dev`

## Step 2: Test the Health Endpoint

Before testing the submit endpoint, verify the backend is accessible:

1. **Open your browser** and go to: `http://localhost:3000/api/health`
   - You should see JSON response like:
     ```json
     {
       "status": "healthy" or "unhealthy",
       "timestamp": "...",
       "services": {...}
     }
     ```

2. **If you get 404 on `/api/health`:**
   - The backend server might not be running
   - Check the terminal for errors
   - Verify you're accessing the correct port (default: 3000)

## Step 3: Check for TypeScript/Compilation Errors

1. **Look at the terminal where `npm run dev` is running**
   - Check for any **red error messages**
   - Common errors:
     - Missing dependencies
     - TypeScript compilation errors
     - Import path errors

2. **If you see errors:**
   - Stop the server (Ctrl+C)
   - Run: `npm install` to ensure all dependencies are installed
   - Check if `node_modules` folder exists
   - Restart: `npm run dev`

## Step 4: Verify API Route File Structure

The file structure should be exactly:
```
rudra_backend/
  pages/
    api/
      leads/
        submit.ts    ← This file must exist
      health.ts
```

**Common mistakes:**
- File named `submit.tsx` instead of `submit.ts` (should be `.ts` for API routes)
- File in wrong location
- Missing `export default` in the handler function

## Step 5: Check the Frontend API URL

1. **Verify your frontend `.env` file:**
   - Location: `rudra-growth-platform-main/rudra-growth-platform-main2/.env`
   - Should contain: `VITE_API_URL=http://localhost:3000`
   - **Important:** After creating/editing `.env`, restart the frontend dev server

2. **Test the API URL directly:**
   - Open browser console (F12)
   - Check the Network tab when submitting the form
   - Look at the request URL - it should be: `http://localhost:3000/api/leads/submit`
   - If it shows a different URL, your `VITE_API_URL` might be wrong

## Step 6: Check Browser Console for Detailed Errors

1. **Open browser DevTools (F12)**
2. **Go to Console tab**
3. **Look for error messages** - they will tell you:
   - If it's a CORS error (different issue)
   - If the URL is wrong
   - If there's a network error

## Step 7: Verify Port Numbers

- **Backend default port:** 3000 (`http://localhost:3000`)
- **Frontend default port:** 8080 (`http://localhost:8080`)
- Make sure these don't conflict with other running applications

## Quick Diagnostic Commands

Run these commands in your terminal:

```bash
# 1. Check if backend is running (from rudra_backend folder)
npm run dev

# 2. In another terminal, test the health endpoint
curl http://localhost:3000/api/health

# 3. Test the submit endpoint (will fail validation, but should not be 404)
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890","companyName":"Test Co","description":"Test description here"}'
```

## Common Solutions

### Solution 1: Restart Both Servers
```bash
# Stop both servers (Ctrl+C)
# Then restart:
cd rudra_backend
npm run dev

# In another terminal:
cd rudra-growth-platform-main/rudra-growth-platform-main2
npm run dev
```

### Solution 2: Clear Next.js Cache
```bash
cd rudra_backend
rm -rf .next  # On Windows: rmdir /s .next
npm run dev
```

### Solution 3: Reinstall Dependencies
```bash
cd rudra_backend
rm -rf node_modules  # On Windows: rmdir /s node_modules
npm install
npm run dev
```

### Solution 4: Check for Port Conflicts
If port 3000 is already in use:
- Change the backend port in `package.json`: `"dev": "next dev -p 3001"`
- Update frontend `.env`: `VITE_API_URL=http://localhost:3001`

## Still Getting 404?

If none of the above works:

1. **Check the exact error message** - Is it:
   - "404 Not Found" (route doesn't exist)
   - "Cannot GET /api/leads/submit" (wrong HTTP method)
   - CORS error (different issue)

2. **Verify the request is reaching the backend:**
   - Check backend terminal logs when you submit the form
   - If you see no logs, the request isn't reaching the backend

3. **Share the error details:**
   - Browser console error
   - Network tab request details
   - Backend terminal output


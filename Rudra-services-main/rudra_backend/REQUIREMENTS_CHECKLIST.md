# Complete Requirements Checklist - Rudra Groups Backend

This document lists **everything** you need to get the backend running.

## ✅ System Requirements

### 1. Software Prerequisites

- [ ] **Node.js** (version 18.0.0 or higher)
  - Check version: `node --version`
  - Download: [nodejs.org](https://nodejs.org/)
  
- [ ] **npm** (comes with Node.js)
  - Check version: `npm --version`

- [ ] **Code Editor** (optional but recommended)
  - VS Code, WebStorm, or any editor with TypeScript support

### 2. Google Account & Services

- [ ] **Google Account** with access to:
  - Google Cloud Console
  - Google Sheets

- [ ] **Google Cloud Project**
  - Create at: [console.cloud.google.com](https://console.cloud.google.com/)
  - Note your Project ID

- [ ] **Google Sheets API Enabled**
  - Enable in: APIs & Services > Library > Google Sheets API

- [ ] **Service Account Created**
  - Location: APIs & Services > Credentials
  - Name: `rudra-leads-service` (or any name)
  - No roles needed

- [ ] **Service Account JSON Key**
  - Download from: Service Account > Keys tab
  - Format: JSON
  - **Keep this file secure!**

- [ ] **Google Spreadsheet Created**
  - Create at: [sheets.google.com](https://sheets.google.com)
  - Copy the Spreadsheet ID from URL
  - Share with service account email (Editor permission)

## ✅ Project Setup

### 3. Install Dependencies

- [ ] Run: `npm install`
  - This installs all required packages:
    - next
    - react
    - react-dom
    - googleapis
    - zod
    - TypeScript and type definitions

### 4. Environment Variables Configuration

Create a `.env` file in the project root with these **7 required variables**:

- [ ] `GOOGLE_SHEETS_SPREADSHEET_ID`
  - From: Google Spreadsheet URL
  - Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

- [ ] `GOOGLE_PROJECT_ID`
  - From: Service Account JSON file → `project_id`
  - Example: `my-project-123456`

- [ ] `GOOGLE_PRIVATE_KEY_ID`
  - From: Service Account JSON file → `private_key_id`
  - Example: `abc123def456...`

- [ ] `GOOGLE_PRIVATE_KEY`
  - From: Service Account JSON file → `private_key`
  - **IMPORTANT**: Must be wrapped in quotes with `\n` for newlines
  - Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"`

- [ ] `GOOGLE_CLIENT_EMAIL`
  - From: Service Account JSON file → `client_email`
  - Example: `rudra-leads-service@my-project.iam.gserviceaccount.com`

- [ ] `GOOGLE_CLIENT_ID`
  - From: Service Account JSON file → `client_id`
  - Example: `123456789012345678901`

- [ ] `GOOGLE_CLIENT_X509_CERT_URL`
  - From: Service Account JSON file → `client_x509_cert_url`
  - Example: `https://www.googleapis.com/robot/v1/metadata/x509/...`

### 5. Optional Environment Variables

- [ ] `GOOGLE_SHEETS_RANGE` (optional)
  - Default: `Leads!A:G`
  - Customize if you want a different sheet name or range

- [ ] `ALLOWED_ORIGINS` (optional, for production)
  - Comma-separated list of allowed origins for CORS
  - Example: `https://yourdomain.com,https://www.yourdomain.com`

## ✅ Verification Steps

### 6. Verify Installation

- [ ] Dependencies installed successfully
  - Check: `node_modules` folder exists
  - No errors during `npm install`

- [ ] Environment variables set correctly
  - All 7 required variables present in `.env`
  - `.env` file is in project root (same level as `package.json`)
  - No typos in variable names

### 7. Test the Backend

- [ ] Start development server
  ```bash
  npm run dev
  ```
  - Should start on `http://localhost:3000`
  - No errors in console

- [ ] Test health endpoint
  - Visit: `http://localhost:3000/api/health`
  - Should return JSON with `"status": "healthy"`
  - Google Sheets should show as `"operational"`

- [ ] Test lead submission
  - Use curl or Postman to POST to `/api/leads/submit`
  - Check Google Sheet for new row
  - Should see headers: Timestamp, Name, Email, Phone, Company Name, Service Category, Description

## 📋 Quick Reference: All Required Items

### Files You Need

1. ✅ Service Account JSON key file (downloaded from Google Cloud)
2. ✅ `.env` file (created by you in project root)
3. ✅ Google Spreadsheet (created and shared)

### Information You Need

1. ✅ Spreadsheet ID (from Google Sheets URL)
2. ✅ All 7 values from Service Account JSON file:
   - `project_id`
   - `private_key_id`
   - `private_key`
   - `client_email`
   - `client_id`
   - `client_x509_cert_url`

### Commands to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. (Optional) Verify setup
npx ts-node scripts/verify-setup.ts
```

## 🔍 Common Issues & Quick Fixes

### Issue: "Cannot find module"
**Fix**: Run `npm install` again

### Issue: "Environment variables not found"
**Fix**: 
- Ensure `.env` file exists in project root
- Restart the dev server after creating/editing `.env`
- Check variable names match exactly (case-sensitive)

### Issue: "Failed to save lead to Google Sheets"
**Fix**:
- Verify spreadsheet is shared with service account email
- Check Spreadsheet ID is correct
- Ensure Google Sheets API is enabled

### Issue: "Health check shows Google Sheets as down"
**Fix**:
- Verify all environment variables are set
- Check service account credentials are correct
- Ensure spreadsheet is shared with service account

## 📝 Minimum Viable Setup

To get the backend running with minimal setup:

1. ✅ Node.js 18+ installed
2. ✅ Run `npm install`
3. ✅ Create `.env` with all 7 required variables
4. ✅ Google Cloud project with Sheets API enabled
5. ✅ Service account with JSON key downloaded
6. ✅ Google Spreadsheet created and shared
7. ✅ Run `npm run dev`

## 🚀 Production Deployment Requirements

For production deployment, you also need:

- [ ] Production hosting platform (Vercel, AWS, etc.)
- [ ] Environment variables set in hosting platform
- [ ] Custom domain (optional)
- [ ] SSL certificate (usually automatic)
- [ ] CORS configured for your frontend domain
- [ ] Monitoring/alerting setup (optional)

## 📚 Documentation Files

All setup details are in:
- `SETUP_GUIDE.md` - Detailed step-by-step instructions
- `QUICK_START.md` - Quick reference for experienced developers
- `README.md` - Complete project documentation
- `API_DOCUMENTATION.md` - API endpoint reference

---

**Total Required Items**: 
- 1 Software (Node.js)
- 1 Google Account
- 1 Google Cloud Project
- 1 Service Account
- 1 JSON Key File
- 1 Google Spreadsheet
- 1 `.env` file with 7 variables
- 1 `npm install` command

**Estimated Setup Time**: 15-30 minutes (first time)


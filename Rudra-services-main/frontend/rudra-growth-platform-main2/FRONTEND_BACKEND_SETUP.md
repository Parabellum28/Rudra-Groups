# Frontend-Backend Integration Setup Guide

This guide explains how to connect the frontend contact form with the backend API for storing leads in Google Sheets.

## Prerequisites

1. Backend server running (see `rudra_backend/README.md` for backend setup)
2. Google Sheets API configured with service account credentials
3. Environment variables configured

## Frontend Configuration

### 1. Environment Variables

Create a `.env` file in the frontend root directory (`rudra-growth-platform-main/rudra-growth-platform-main2/`) with the following:

```env
# Backend API URL
# For local development:
VITE_API_URL=http://localhost:3000

# For production, replace with your actual backend URL:
# VITE_API_URL=https://your-backend-domain.com
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

### 2. Form Fields

The contact form collects the following fields:
- **Name** (required, 2-100 characters)
- **Email** (required, valid email format)
- **Phone** (required, valid phone format)
- **Company Name** (required, 2-200 characters)
- **Description** (required, 10-1000 characters)

### 3. API Endpoint

The form submits to: `POST {VITE_API_URL}/api/leads/submit`

## Backend Configuration

### 1. Environment Variables

Ensure your backend `.env` file in `rudra_backend/` contains:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_PROJECT_ID=from_service_account_json
GOOGLE_PRIVATE_KEY_ID=from_service_account_json
GOOGLE_PRIVATE_KEY="from_service_account_json"
GOOGLE_CLIENT_EMAIL=from_service_account_json
GOOGLE_CLIENT_ID=from_service_account_json
GOOGLE_CLIENT_X509_CERT_URL=from_service_account_json
GOOGLE_SHEETS_RANGE=Leads!A:F
```

### 2. Google Sheets Setup

1. Create a Google Spreadsheet
2. Share it with the service account email (from your JSON credentials) with "Editor" permissions
3. The backend will automatically create headers in the first row:
   - Timestamp
   - Name
   - Email
   - Phone
   - Company Name
   - Description

## Running the Application

### Development

1. **Start the backend server:**
   ```bash
   cd rudra_backend
   npm install
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend server:**
   ```bash
   cd rudra-growth-platform-main/rudra-growth-platform-main2
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:8080` (or the port configured in `vite.config.ts`)

3. **Test the integration:**
   - Navigate to the Contact page (`http://localhost:8080/contact`)
   - Fill out and submit the form
   - Check your Google Sheet for the new entry

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend has CORS enabled. The backend should allow requests from your frontend origin.

### API Connection Errors

1. Verify `VITE_API_URL` is set correctly in your `.env` file
2. Ensure the backend server is running
3. Check browser console for detailed error messages
4. Verify the backend endpoint is accessible: `http://localhost:3000/api/health`

### Form Validation Errors

- Ensure all required fields are filled
- Check field length requirements:
  - Name: 2-100 characters
  - Company Name: 2-200 characters
  - Description: 10-1000 characters
- Verify email format is valid
- Verify phone number format matches the backend regex pattern

### Google Sheets Errors

1. Verify service account credentials are correct
2. Ensure the spreadsheet is shared with the service account email
3. Check that the Google Sheets API is enabled in Google Cloud Console
4. Verify the spreadsheet ID is correct

## Production Deployment

### Frontend

1. Set `VITE_API_URL` to your production backend URL
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to your hosting service

### Backend

1. Set all environment variables in your production environment
2. Build the backend: `npm run build`
3. Start the production server: `npm start`

Ensure your production backend URL matches the `VITE_API_URL` in your frontend environment variables.


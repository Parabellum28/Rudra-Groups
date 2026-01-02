# Rudra Website - Complete Setup Guide

This guide will help you set up the Rudra Groups website on your system. Follow these steps carefully.

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. **Node.js** installed (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open terminal and run `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: Run `npm --version`

3. **A Google Account** (for Google Sheets integration)

4. **A code editor** (optional but recommended: VS Code)

---

## 🔧 Step 1: Google Cloud & Sheets Setup

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: `rudra-website` (or any name you prefer)
5. Click "Create"
6. Wait for the project to be created and select it

### 1.2 Enable Google Sheets API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"
4. Wait for it to enable (may take a few seconds)

### 1.3 Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in:
   - **Service account name**: `rudra-leads-service`
   - **Description**: `Service account for Rudra Groups lead capture`
4. Click "Create and Continue"
5. Skip "Grant this service account access to project" (click "Continue")
6. Skip "Grant users access" (click "Done")

### 1.4 Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" format
5. Click "Create"
6. **IMPORTANT**: The JSON file will download automatically - **SAVE THIS FILE SECURELY!**
7. Note the email address shown (e.g., `rudra-leads-service@your-project.iam.gserviceaccount.com`)

### 1.5 Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Rudra Leads" (or any name you prefer)
4. **Copy the Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
   - Example: `1J9SAGLS-fC0nHn3jvF2FcAZut2jrOY1BLjRr8B9VwKM`

### 1.6 Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click the "Share" button (top right)
2. In the "Add people" field, paste the **service account email** (from step 1.4)
3. Make sure it says **"Editor"** (not Viewer)
4. **Uncheck** "Notify people" (optional)
5. Click "Share"
6. The service account now has access to write to your spreadsheet

---

## 💻 Step 2: Backend Setup

### 2.1 Navigate to Backend Folder

Open terminal/command prompt and navigate to the backend folder:

```bash
cd rudra_backend
```

### 2.2 Install Dependencies

```bash
npm install
```

Wait for all packages to install (this may take 1-2 minutes).

### 2.3 Create .env File

1. In the `rudra_backend` folder, create a new file named `.env`
   - **Important**: The file must be named exactly `.env` (with the dot at the beginning)
   - On Windows: You may need to create it as `.env.` (with dot at end) or use a code editor

2. Open the `.env` file and add the following content:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=YOUR_SPREADSHEET_ID_HERE

# From your Service Account JSON file:
GOOGLE_PROJECT_ID=your_project_id_from_json
GOOGLE_PRIVATE_KEY_ID=your_private_key_id_from_json
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_FULL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id_from_json
GOOGLE_CLIENT_X509_CERT_URL=your_client_x509_cert_url_from_json

# Optional (you can leave these as default)
GOOGLE_SHEETS_RANGE=Leads!A:G
ALLOWED_ORIGINS=*
```

3. **Fill in the values**:
   - Replace `YOUR_SPREADSHEET_ID_HERE` with the Spreadsheet ID from Step 1.5
   - Open the downloaded JSON file from Step 1.4
   - Copy each value from the JSON file to the corresponding `.env` variable:
     - `project_id` → `GOOGLE_PROJECT_ID`
     - `private_key_id` → `GOOGLE_PRIVATE_KEY_ID`
     - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the quotes and `\n` characters)
     - `client_email` → `GOOGLE_CLIENT_EMAIL`
     - `client_id` → `GOOGLE_CLIENT_ID`
     - `client_x509_cert_url` → `GOOGLE_CLIENT_X509_CERT_URL`

**Important Notes:**
- For `GOOGLE_PRIVATE_KEY`, copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep the quotes around the private key
- Keep the `\n` characters (they represent newlines)

### 2.4 Alternative: Use JSON Credentials File

Instead of using environment variables, you can:

1. Copy the downloaded JSON file to the `rudra_backend` folder
2. Rename it to `credentials.json` OR keep the original name
3. The system will automatically detect and use it
4. You still need `GOOGLE_SHEETS_SPREADSHEET_ID` in your `.env` file

### 2.5 Test Backend

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   ▲ Next.js 14.2.35
   - Local:        http://localhost:3000
   ```

3. Open your browser and go to: `http://localhost:3000/api/health`
   - You should see a JSON response with `"status": "healthy"`

4. If you see errors, check:
   - All environment variables are filled correctly
   - The spreadsheet is shared with the service account email
   - Google Sheets API is enabled

5. **Keep this terminal window open** - the backend needs to keep running

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open a New Terminal Window

Keep the backend running, and open a **new terminal window/tab**.

### 3.2 Navigate to Frontend Folder

```bash
cd frontend/rudra-growth-platform-main2
```

### 3.3 Install Dependencies

```bash
npm install
```

Wait for all packages to install (this may take 2-3 minutes).

### 3.4 Create .env File

1. In the `frontend/rudra-growth-platform-main2` folder, create a new file named `.env`

2. Add the following content:

```env
# Backend API URL
# For local development:
VITE_API_URL=http://localhost:3000

# For production (after deploying backend), use:
# VITE_API_URL=https://your-backend-domain.com
```

**Note**: For now, use `http://localhost:3000`. When you deploy to production, change this to your actual backend URL.

### 3.5 Start Frontend

```bash
npm run dev
```

You should see:
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### 3.6 Open Website

Open your browser and go to: `http://localhost:5173`

You should see the Rudra Groups website!

---

## ✅ Step 4: Testing

### 4.1 Test Contact Form

1. Go to the Contact page (click "Contact" in navigation)
2. Fill out the form with test data
3. Submit the form
4. You should see a success message

### 4.2 Verify Data in Google Sheets

1. Go to your Google Spreadsheet
2. Look for a tab named "Leads" (it will be created automatically)
3. You should see your test submission with:
   - Timestamp
   - Name
   - Email
   - Phone
   - Company Name
   - Service Category
   - Description

If the data appears, **everything is working correctly!** 🎉

---

## 🚀 Step 5: Running the Project Daily

Every time you want to work on or use the website:

1. **Start Backend**:
   ```bash
   cd rudra_backend
   npm run dev
   ```
   Keep this terminal open.

2. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend/rudra-growth-platform-main2
   npm run dev
   ```

3. **Open Browser**: Go to `http://localhost:5173`

4. **To Stop**: Press `Ctrl+C` in each terminal window

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "Missing environment variables"**
- Check that your `.env` file exists in `rudra_backend` folder
- Verify all required variables are filled in
- Make sure there are no extra spaces or quotes around values (except for `GOOGLE_PRIVATE_KEY`)

**Error: "Spreadsheet not found" or "Access denied"**
- Verify the Spreadsheet ID is correct
- Make sure you shared the spreadsheet with the service account email
- Check that the service account has "Editor" permissions

**Error: "Failed to initialize Google Sheets service"**
- Check that Google Sheets API is enabled in Google Cloud Console
- Verify all credentials in `.env` are correct
- Try using the JSON credentials file method instead

### Frontend won't start

**Error: "Cannot find module"**
- Run `npm install` again in the frontend folder
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

**Form submission fails**
- Make sure the backend is running on `http://localhost:3000`
- Check the browser console (F12) for error messages
- Verify `VITE_API_URL` in frontend `.env` matches your backend URL

### Data not appearing in Google Sheets

1. Check backend terminal for error messages
2. Verify spreadsheet is shared with service account
3. Check that the "Leads" tab exists (it should be created automatically)
4. Try submitting the form again

### Port already in use

**Error: "Port 3000 is already in use"**
- Another application is using port 3000
- Close other applications or change the port in `package.json`

**Error: "Port 5173 is already in use"**
- Another Vite server is running
- Close it or Vite will automatically use the next available port

---

## 📦 Project Structure

```
rudra-website/
├── rudra_backend/          # Backend API (Next.js)
│   ├── .env               # Backend environment variables (YOU CREATE THIS)
│   ├── pages/
│   │   └── api/
│   │       └── leads/
│   │           └── submit.ts  # API endpoint for form submissions
│   └── lib/
│       └── googleSheets.ts    # Google Sheets integration
│
└── frontend/
    └── rudra-growth-platform-main2/  # Frontend website (React)
        ├── .env            # Frontend environment variables (YOU CREATE THIS)
        └── src/
            ├── pages/      # Website pages
            └── components/ # Reusable components
```

---

## 🔒 Security Notes

1. **Never commit `.env` files to Git** - They contain sensitive credentials
2. **Never share your service account JSON file publicly**
3. **Keep your Google Cloud credentials secure**
4. The `.env` files should already be in `.gitignore` - don't remove them

---

## 📞 Need Help?

If you encounter issues:

1. Check the error messages in the terminal
2. Verify all steps were followed correctly
3. Check that all environment variables are set
4. Ensure Google Sheets API is enabled
5. Verify spreadsheet sharing permissions

---

## 🎯 Quick Checklist

Before you start, make sure you have:
- [ ] Node.js installed (v18+)
- [ ] Google Cloud account
- [ ] Google Spreadsheet created
- [ ] Service account created and JSON file downloaded
- [ ] Spreadsheet shared with service account email

Setup steps:
- [ ] Backend dependencies installed (`npm install` in `rudra_backend`)
- [ ] Backend `.env` file created with all credentials
- [ ] Backend running successfully (`npm run dev`)
- [ ] Frontend dependencies installed (`npm install` in `frontend/rudra-growth-platform-main2`)
- [ ] Frontend `.env` file created with API URL
- [ ] Frontend running successfully (`npm run dev`)
- [ ] Test form submission works
- [ ] Data appears in Google Sheets

---

**Congratulations!** Your Rudra Groups website is now set up and ready to use! 🎉


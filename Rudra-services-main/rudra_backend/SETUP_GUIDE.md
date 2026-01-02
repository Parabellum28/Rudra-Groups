# Quick Setup Guide - Rudra Groups Lead Capture Backend

This guide will walk you through setting up the backend system step by step.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Google account with access to Google Cloud Console
- [ ] Basic understanding of environment variables

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Google Cloud Console Setup

#### 2.1 Create or Select a Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project" or select an existing one
4. Note your Project ID

#### 2.2 Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

#### 2.3 Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in:
   - **Service account name**: `rudra-leads-service`
   - **Service account ID**: (auto-generated)
   - **Description**: `Service account for Rudra Groups lead capture`
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

#### 2.4 Generate Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** - the JSON file will download automatically
6. **IMPORTANT**: Keep this file secure! It contains sensitive credentials.

### Step 3: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Rudra Groups Leads" (or any name you prefer)
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```
5. Share the spreadsheet:
   - Click the **Share** button (top right)
   - In the "Add people and groups" field, paste the **client_email** from your downloaded JSON file
   - Set permission to **Editor**
   - Uncheck "Notify people" (optional)
   - Click **Share**

### Step 4: Configure Environment Variables

1. Create a `.env` file in the project root:

```bash
# Copy from .env.example if it exists, or create new
touch .env
```

2. Open the downloaded JSON file from Step 2.4 and your `.env` file

3. Fill in `.env` with the following values:

```env
# From your Google Spreadsheet URL
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# Optional: Customize the range (default: Leads!A:G)
GOOGLE_SHEETS_RANGE=Leads!A:G

# From the downloaded JSON file (project_id)
GOOGLE_PROJECT_ID=your-project-id

# From the downloaded JSON file (private_key_id)
GOOGLE_PRIVATE_KEY_ID=your_private_key_id

# From the downloaded JSON file (private_key)
# IMPORTANT: Keep the quotes and \n characters exactly as shown
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# From the downloaded JSON file (client_email)
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# From the downloaded JSON file (client_id)
GOOGLE_CLIENT_ID=your_client_id

# From the downloaded JSON file (client_x509_cert_url)
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
```

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` must be wrapped in quotes and include `\n` characters
- Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Replace all actual newlines in the key with `\n`

### Step 5: Verify Setup

Run the verification script:

```bash
npx ts-node scripts/verify-setup.ts
```

Or test manually by starting the server:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/health`

You should see:
```json
{
  "status": "healthy",
  "services": {
    "api": "operational",
    "googleSheets": "operational"
  }
}
```

### Step 6: Test Form Submission

You can test the API endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "companyName": "Test Company",
    "serviceCategory": "Consulting",
    "description": "This is a test submission to verify the system works correctly."
  }'
```

Check your Google Spreadsheet - you should see a new row with the test data!

## Troubleshooting

### "Failed to save lead to Google Sheets"

**Possible causes:**
1. Service account doesn't have access to the spreadsheet
   - **Solution**: Re-share the spreadsheet with the service account email
2. Spreadsheet ID is incorrect
   - **Solution**: Double-check the ID in the spreadsheet URL
3. Google Sheets API not enabled
   - **Solution**: Enable it in Google Cloud Console

### "Validation failed"

**Possible causes:**
1. Missing required fields
   - **Solution**: Ensure all fields are provided
2. Invalid email format
   - **Solution**: Check email format (must contain @ and domain)
3. Invalid phone format
   - **Solution**: Phone can contain digits, spaces, dashes, parentheses, and +

### Environment variables not loading

**Solution:**
- Ensure `.env` file is in the project root
- Restart the development server after changing `.env`
- Check for typos in variable names
- Ensure `GOOGLE_PRIVATE_KEY` is properly quoted

## Next Steps

1. Integrate the form into your frontend (see `pages/api/leads/example-form.tsx`)
2. Customize validation rules if needed (in `lib/validation.ts`)
3. Set up production environment variables
4. Deploy to your hosting platform (Vercel, AWS, etc.)

## Security Reminders

- ✅ Never commit `.env` file to version control
- ✅ Keep service account JSON file secure
- ✅ Regularly rotate service account keys
- ✅ Use environment variables in production
- ✅ Monitor API usage for suspicious activity

## Support

If you encounter issues not covered here, check:
1. The main [README.md](./README.md) for detailed documentation
2. Google Sheets API documentation
3. Next.js API routes documentation


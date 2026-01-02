# Google Sheets Setup Check

## Current Configuration

**Spreadsheet ID:** `1Qran17uEozz6vkw4KrFDdfifHJQTI4bYhFdYuOez0x8`

**Service Account Email:** `rudra-leads-service-185@united-tempest-482312-u9.iam.gserviceaccount.com`

## ⚠️ IMPORTANT: Share Your Spreadsheet

The error "Failed to initialize Google Sheet" means the service account doesn't have access to your spreadsheet.

### Steps to Fix:

1. **Open your Google Spreadsheet:**
   - Go to: https://docs.google.com/spreadsheets/d/1Qran17uEozz6vkw4KrFDdfifHJQTI4bYhFdYuOez0x8/edit

2. **Click the "Share" button** (top right corner)

3. **Add the service account email:**
   - Email: `rudra-leads-service-185@united-tempest-482312-u9.iam.gserviceaccount.com`
   - Permission: **Editor** (must be Editor, not Viewer)
   - **Uncheck** "Notify people" (optional)
   - Click **Share**

4. **Verify:**
   - The service account email should appear in the sharing list
   - Make sure it has "Editor" permission

5. **Test again:**
   - Submit the form from your website
   - Check if data appears in the spreadsheet

## After Sharing:

Once you've shared the spreadsheet with the service account, restart the backend server:

```bash
cd rudra_backend
npm run dev
```

Then test the form submission again.


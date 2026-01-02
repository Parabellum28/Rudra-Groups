# Quick Start Guide

Get your Rudra Groups lead capture backend up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Google account

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up Google Cloud (see detailed guide below)
# 3. Configure .env file
# 4. Start the server
npm run dev
```

## Google Cloud Quick Setup

### 1. Enable Google Sheets API
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create/select project → APIs & Services → Library
- Search "Google Sheets API" → Enable

### 2. Create Service Account
- APIs & Services → Credentials → Create Credentials → Service Account
- Name: `rudra-leads-service` → Create → Skip roles → Done

### 3. Generate Key
- Click service account → Keys tab → Add Key → Create new key → JSON
- Download the JSON file

### 4. Create Spreadsheet
- Create new Google Sheet
- Copy Spreadsheet ID from URL
- Share with service account email (from JSON) as Editor

## Environment Setup

Create `.env` file:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_PROJECT_ID=from_json_file
GOOGLE_PRIVATE_KEY_ID=from_json_file
GOOGLE_PRIVATE_KEY="from_json_file_with_quotes"
GOOGLE_CLIENT_EMAIL=from_json_file
GOOGLE_CLIENT_ID=from_json_file
GOOGLE_CLIENT_X509_CERT_URL=from_json_file
```

## Test It

```bash
# Health check
curl http://localhost:3000/api/health

# Submit test lead
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "companyName": "Test Co",
    "serviceCategory": "Consulting",
    "description": "Test submission"
  }'
```

Check your Google Sheet - you should see the new row!

## Need Help?

- Detailed setup: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- API docs: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Architecture: See [ARCHITECTURE.md](./ARCHITECTURE.md)


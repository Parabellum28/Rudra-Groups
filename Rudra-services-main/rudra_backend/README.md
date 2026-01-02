# Rudra Groups - Lead Capture Backend System

A premium, enterprise-ready backend system for capturing and storing business leads from the Rudra Groups corporate website. This system automatically stores form submissions in Google Sheets, providing a reliable, cost-effective solution for lead management.

## Features

- ✅ **Secure Form Validation**: Robust input validation using Zod schema validation
- ✅ **Google Sheets Integration**: Automatic storage of leads in structured Google Sheets
- ✅ **RESTful API**: Clean Next.js API routes for form submissions
- ✅ **Type Safety**: Full TypeScript support for type-safe development
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Health Monitoring**: Built-in health check endpoint for system monitoring
- ✅ **Scalable Architecture**: Designed for easy maintenance and future enhancements

## Tech Stack

- **Framework**: Next.js 14 (API Routes)
- **Language**: TypeScript
- **Validation**: Zod
- **Google Sheets API**: googleapis
- **Runtime**: Node.js 18+

## Prerequisites

Before setting up the project, ensure you have:

1. **Node.js** (v18 or higher) installed
2. **Google Cloud Project** with Sheets API enabled
3. **Google Service Account** with credentials
4. **Google Spreadsheet** created and shared with the service account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Google Cloud Setup

#### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Step 2: Create a Service Account

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `rudra-leads-service`
   - Description: `Service account for Rudra Groups lead capture system`
4. Click "Create and Continue"
5. Skip role assignment (optional)
6. Click "Done"

#### Step 3: Generate Service Account Key

1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Download the JSON file (keep it secure!)

#### Step 4: Create and Configure Google Spreadsheet

1. Create a new Google Spreadsheet
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
3. Share the spreadsheet with your service account email:
   - Click "Share" button
   - Add the service account email (from the JSON file: `client_email`)
   - Give it "Editor" permissions
   - Click "Send"

### 3. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in the values:

   **From the Service Account JSON file:**
   - `GOOGLE_PROJECT_ID` → `project_id`
   - `GOOGLE_PRIVATE_KEY_ID` → `private_key_id`
   - `GOOGLE_PRIVATE_KEY` → `private_key` (keep the quotes and `\n` characters)
   - `GOOGLE_CLIENT_EMAIL` → `client_email`
   - `GOOGLE_CLIENT_ID` → `client_id`
   - `GOOGLE_CLIENT_X509_CERT_URL` → `client_x509_cert_url`

   **From your Google Spreadsheet:**
   - `GOOGLE_SHEETS_SPREADSHEET_ID` → The Spreadsheet ID from the URL

   **Optional:**
   - `GOOGLE_SHEETS_RANGE` → Default: `Leads!A:G` (you can customize this)

### 4. Run the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### POST `/api/leads/submit`

Submit a new lead form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "companyName": "Acme Corp",
  "serviceCategory": "Consulting",
  "description": "Looking for premium consulting services for our enterprise needs."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": {
      "_errors": ["Please provide a valid email address"]
    }
  }
}
```

### GET `/api/health`

Health check endpoint for monitoring system status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "api": "operational",
    "googleSheets": "operational"
  }
}
```

## Google Sheets Structure

The system automatically creates a sheet named "Leads" with the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | ISO 8601 timestamp of submission |
| Name | Lead's full name |
| Email | Lead's email address |
| Phone | Lead's phone number |
| Company Name | Lead's company name |
| Service Category | Selected service category |
| Description | Lead's requirements description |

## Frontend Integration Example

Here's a simple example of how to integrate the form in your frontend:

```typescript
async function submitLead(formData: LeadFormData) {
  try {
    const response = await fetch('/api/leads/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('Lead submitted successfully!');
      // Handle success (e.g., show success message, reset form)
    } else {
      console.error('Submission failed:', result.message);
      // Handle error (e.g., show error message)
    }
  } catch (error) {
    console.error('Network error:', error);
    // Handle network error
  }
}
```

## Production Deployment

### Environment Variables

Ensure all environment variables are set in your production environment (Vercel, AWS, etc.).

### Build and Deploy

```bash
npm run build
npm start
```

### Security Best Practices

1. **Never commit `.env` files** to version control
2. **Restrict API access** using CORS if needed
3. **Use environment variables** for all sensitive data
4. **Monitor API usage** and set up rate limiting if needed
5. **Regular backups** of your Google Spreadsheet

## Troubleshooting

### Common Issues

1. **"Failed to save lead to Google Sheets"**
   - Verify service account has access to the spreadsheet
   - Check that the Spreadsheet ID is correct
   - Ensure Google Sheets API is enabled

2. **"Validation failed"**
   - Check that all required fields are provided
   - Verify email and phone formats are correct
   - Ensure field lengths are within limits

3. **"Health check shows Google Sheets as down"**
   - Verify environment variables are set correctly
   - Check service account credentials
   - Ensure spreadsheet is shared with service account

## Future Enhancements

The system is designed to be easily extensible. Potential future enhancements:

- Rate limiting and request throttling
- Duplicate lead detection
- Lead status tracking
- Analytics and reporting endpoints
- Webhook support for external integrations
- Database backup option
- Admin dashboard for lead management

## Support

For issues or questions, please contact the development team.

## License

Proprietary - Rudra Groups


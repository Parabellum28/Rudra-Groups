# System Architecture - Rudra Groups Lead Capture Backend

## Overview

The Rudra Groups lead capture backend is a lightweight, scalable system designed to capture and store business leads from the corporate website. The system uses Next.js API routes for the backend and Google Sheets as the data storage layer.

## Architecture Diagram

```
┌─────────────────┐
│   Frontend      │
│   (Website)     │
└────────┬────────┘
         │
         │ HTTP POST
         │ /api/leads/submit
         ▼
┌─────────────────┐
│  Next.js API    │
│  Route Handler  │
└────────┬────────┘
         │
         │ 1. Validate Input
         │ 2. Process Data
         │
         ▼
┌─────────────────┐
│  Validation     │
│  (Zod Schema)   │
└────────┬────────┘
         │
         │ Valid Data
         │
         ▼
┌─────────────────┐
│ Google Sheets   │
│ Service Layer   │
└────────┬────────┘
         │
         │ Google Sheets API
         │
         ▼
┌─────────────────┐
│  Google Sheets  │
│  (Data Store)   │
└─────────────────┘
```

## Component Breakdown

### 1. API Layer (`pages/api/`)

#### `/api/leads/submit`
- **Purpose**: Primary endpoint for lead form submissions
- **Method**: POST
- **Responsibilities**:
  - Accept form data
  - Validate input using Zod schema
  - Process and format data
  - Store in Google Sheets
  - Return appropriate responses

#### `/api/health`
- **Purpose**: System health monitoring
- **Method**: GET
- **Responsibilities**:
  - Check API availability
  - Verify Google Sheets connection
  - Return system status

### 2. Validation Layer (`lib/validation.ts`)

- **Technology**: Zod schema validation
- **Purpose**: Ensure data integrity and security
- **Features**:
  - Type-safe validation
  - Custom error messages
  - Input sanitization
  - Length constraints
  - Format validation (email, phone)

### 3. Google Sheets Service (`lib/googleSheets.ts`)

- **Purpose**: Abstract Google Sheets API interactions
- **Responsibilities**:
  - Authenticate with Google Sheets API
  - Initialize sheet structure
  - Append new leads
  - Handle errors gracefully
  - Test connections

### 4. Type Definitions (`types/lead.ts`)

- **Purpose**: TypeScript type safety
- **Exports**:
  - `LeadFormData`: Input form structure
  - `LeadSubmission`: Complete submission with timestamp
  - `GoogleSheetsConfig`: Configuration interface

### 5. Utilities (`lib/utils.ts`)

- **Purpose**: Reusable helper functions
- **Functions**:
  - Phone number formatting
  - Input sanitization
  - Email validation
  - Timestamp formatting
  - ID generation

### 6. Middleware (`middleware.ts`)

- **Purpose**: Request preprocessing
- **Features**:
  - CORS handling
  - Preflight request support
  - Origin validation

## Data Flow

### Lead Submission Flow

1. **Frontend Submission**
   - User fills out form
   - Frontend validates basic requirements
   - POST request to `/api/leads/submit`

2. **API Processing**
   - Middleware handles CORS
   - Route handler receives request
   - Zod schema validates input
   - Timestamp added to data

3. **Storage**
   - Google Sheets service authenticates
   - Sheet structure verified/initialized
   - New row appended with lead data
   - Success response returned

4. **Response**
   - Success: 201 with timestamp
   - Validation Error: 400 with error details
   - Server Error: 500 with error message

## Security Considerations

### Current Implementation

1. **Input Validation**
   - All inputs validated and sanitized
   - Type checking prevents injection attacks
   - Length limits prevent DoS

2. **Authentication**
   - Service account authentication for Google Sheets
   - Credentials stored in environment variables
   - No user-facing authentication (can be added)

3. **Error Handling**
   - Generic error messages to prevent information leakage
   - Detailed logging for debugging (server-side only)

### Recommended Enhancements

1. **Rate Limiting**
   - Prevent abuse and spam
   - Implement per-IP limits
   - Consider using Upstash Redis

2. **API Authentication**
   - API key authentication
   - JWT tokens for authorized access
   - IP whitelisting for production

3. **Data Encryption**
   - Encrypt sensitive data at rest (if storing in database)
   - HTTPS only in production
   - Secure environment variable storage

## Scalability

### Current Capacity

- **Google Sheets Limits**:
  - 10 million cells per spreadsheet
  - ~1.4 million rows (with 7 columns)
  - Sufficient for most lead capture scenarios

### Scaling Strategies

1. **Horizontal Scaling**
   - Next.js API routes scale automatically
   - Stateless design allows multiple instances
   - Load balancer compatible

2. **Data Migration**
   - When Google Sheets limit approaches:
     - Archive old data to separate sheets
     - Migrate to database (PostgreSQL, MongoDB)
     - Implement data retention policies

3. **Performance Optimization**
   - Batch processing for bulk operations
   - Caching for frequently accessed data
   - Connection pooling for database (if migrated)

## Error Handling Strategy

### Error Types

1. **Validation Errors** (400)
   - User input issues
   - Returned to user with specific field errors

2. **Authentication Errors** (401/403)
   - Service account issues
   - Logged server-side, generic message to user

3. **Server Errors** (500)
   - Google Sheets API failures
   - Network issues
   - Logged with full details, generic message to user

### Logging

- Console logging for development
- Structured logging recommended for production
- Consider services like:
  - Winston
  - Pino
  - CloudWatch (AWS)
  - LogRocket

## Environment Configuration

### Required Variables

- `GOOGLE_SHEETS_SPREADSHEET_ID`: Target spreadsheet
- `GOOGLE_PROJECT_ID`: Google Cloud project ID
- `GOOGLE_PRIVATE_KEY_ID`: Service account key ID
- `GOOGLE_PRIVATE_KEY`: Service account private key
- `GOOGLE_CLIENT_EMAIL`: Service account email
- `GOOGLE_CLIENT_ID`: Service account client ID
- `GOOGLE_CLIENT_X509_CERT_URL`: Certificate URL

### Optional Variables

- `GOOGLE_SHEETS_RANGE`: Custom sheet range (default: `Leads!A:G`)
- `ALLOWED_ORIGINS`: CORS allowed origins (comma-separated)

## Deployment Considerations

### Platform Options

1. **Vercel** (Recommended for Next.js)
   - Zero-config deployment
   - Automatic HTTPS
   - Environment variable management
   - Serverless functions

2. **AWS Lambda + API Gateway**
   - Serverless architecture
   - Pay-per-use pricing
   - Requires more configuration

3. **Traditional VPS/Server**
   - Full control
   - Requires server management
   - More cost-effective at scale

### Deployment Checklist

- [ ] Set all environment variables
- [ ] Verify Google Sheets access
- [ ] Test health endpoint
- [ ] Configure CORS for production domain
- [ ] Set up monitoring/alerting
- [ ] Configure backup strategy
- [ ] Document API endpoints
- [ ] Set up error tracking (Sentry, etc.)

## Monitoring & Maintenance

### Health Monitoring

- Use `/api/health` endpoint
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Alert on service degradation

### Data Management

- Regular backups of Google Sheets
- Monitor sheet size and performance
- Archive old leads periodically
- Review and clean duplicate entries

### Performance Metrics

- Track API response times
- Monitor error rates
- Track submission volume
- Google Sheets API quota usage

## Future Enhancements

### Phase 1 (Current)
- ✅ Basic lead capture
- ✅ Google Sheets storage
- ✅ Validation and error handling

### Phase 2 (Recommended)
- [ ] Rate limiting
- [ ] Duplicate detection
- [ ] Email notifications (optional)
- [ ] Admin dashboard

### Phase 3 (Advanced)
- [ ] Database migration option
- [ ] Lead status tracking
- [ ] Analytics and reporting
- [ ] Webhook integrations
- [ ] Multi-form support

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 | API routes and server-side logic |
| Language | TypeScript | Type safety and developer experience |
| Validation | Zod | Schema validation |
| Storage | Google Sheets API | Data persistence |
| Authentication | Google Service Account | Secure API access |
| Runtime | Node.js 18+ | JavaScript execution |

## Conclusion

This architecture provides a solid foundation for lead capture while maintaining simplicity and cost-effectiveness. The system is designed to be easily maintainable and scalable as business needs grow.


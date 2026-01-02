# API Documentation - Rudra Groups Lead Capture Backend

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## Authentication

Currently, no authentication is required. For production use, consider implementing:
- API key authentication
- Rate limiting
- IP whitelisting

## Endpoints

### 1. Submit Lead

Submit a new lead form submission.

**Endpoint:** `POST /api/leads/submit`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, valid phone format)",
  "companyName": "string (required, 2-200 chars)",
  "serviceCategory": "string (required, 1-100 chars)",
  "description": "string (required, 10-1000 chars)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-234-567-8900",
    "companyName": "Acme Corporation",
    "serviceCategory": "Consulting",
    "description": "We are looking for premium consulting services for our enterprise transformation project."
  }'
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": {
      "_errors": ["Please provide a valid email address"]
    },
    "phone": {
      "_errors": ["Please provide a valid phone number"]
    }
  }
}
```

**Server Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to save lead to Google Sheets: [error details]"
}
```

**Field Validation Rules:**

| Field | Rules |
|-------|-------|
| `name` | Required, 2-100 characters, trimmed |
| `email` | Required, valid email format, lowercase, trimmed |
| `phone` | Required, valid phone format (digits, spaces, dashes, parentheses, + allowed) |
| `companyName` | Required, 2-200 characters, trimmed |
| `serviceCategory` | Required, 1-100 characters, trimmed |
| `description` | Required, 10-1000 characters, trimmed |

### 2. Health Check

Check the health status of the API and connected services.

**Endpoint:** `GET /api/health`

**Request:** No body required

**Example Request:**
```bash
curl http://localhost:3000/api/health
```

**Success Response (200 OK):**
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

**Unhealthy Response (503 Service Unavailable):**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "api": "operational",
    "googleSheets": "down"
  }
}
```

**Service Status Values:**
- `operational`: Service is working correctly
- `down`: Service is not responding
- `not_configured`: Service is not configured (missing environment variables)

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    // Optional: Field-specific validation errors
  }
}
```

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider:
- Implementing rate limiting (e.g., 10 requests per minute per IP)
- Using middleware or a service like Upstash Redis
- Setting appropriate headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

## CORS

CORS is configured via middleware. To restrict origins, set the `ALLOWED_ORIGINS` environment variable:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

If not set, all origins are allowed (development only - not recommended for production).

## Data Storage

All leads are stored in Google Sheets with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| Timestamp | ISO 8601 | Submission timestamp |
| Name | String | Lead's full name |
| Email | String | Lead's email address |
| Phone | String | Lead's phone number |
| Company Name | String | Lead's company name |
| Service Category | String | Selected service category |
| Description | String | Lead's requirements description |

## Best Practices

1. **Always validate on the frontend** before submitting to reduce unnecessary requests
2. **Handle errors gracefully** - show user-friendly messages
3. **Implement retry logic** for network failures
4. **Sanitize user input** (handled automatically by the backend)
5. **Monitor API usage** for unusual patterns
6. **Keep API keys secure** - never expose in client-side code

## Example Frontend Integration

```typescript
interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceCategory: string;
  description: string;
}

async function submitLead(data: LeadFormData) {
  try {
    const response = await fetch('/api/leads/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Submission failed');
    }

    return result;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
}

// Usage
try {
  const result = await submitLead({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    companyName: 'Acme Corp',
    serviceCategory: 'Consulting',
    description: 'Looking for premium services...',
  });
  console.log('Success:', result.message);
} catch (error) {
  console.error('Failed:', error.message);
}
```

## Testing

### Using cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Submit lead
curl -X POST http://localhost:3000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "companyName": "Test Company",
    "serviceCategory": "Consulting",
    "description": "This is a test submission."
  }'
```

### Using Postman

1. Create a new POST request to `http://localhost:3000/api/leads/submit`
2. Set header: `Content-Type: application/json`
3. Add JSON body with required fields
4. Send request

## Versioning

Current API version: **v1**

Future versions will be accessible via URL path (e.g., `/api/v2/leads/submit`).


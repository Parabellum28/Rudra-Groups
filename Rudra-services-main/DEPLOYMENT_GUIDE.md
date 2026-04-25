# Vercel Deployment Guide for Rudra Groups

## 🚀 Quick Setup Commands

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Frontend (React/Vite)
```bash
cd frontend/rudra-growth-platform-main2
vercel --prod
```

### 4. Deploy Backend (Next.js API)
```bash
cd ../../rudra_backend
vercel --prod
```

---

## 📋 Environment Variables Setup

### Backend Environment Variables (Required)
Set these in your Vercel dashboard under Project Settings > Environment Variables:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_RANGE=Leads!A:G

# Google Service Account Credentials
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email@project-id.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_service_account_email%40project-id.iam.gserviceaccount.com

# Optional: Google Cloud Credentials File Path
GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
```

### Frontend Environment Variables (Optional)
```bash
# API URL (if backend is on different domain)
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 🔧 Step-by-Step Deployment

### Frontend Deployment

1. **Navigate to frontend directory**
```bash
cd c:\Users\tanc2\OneDrive\Pictures\Rudra-Groups\Rudra-services-main\frontend\rudra-growth-platform-main2
```

2. **Install dependencies**
```bash
npm install
```

3. **Build locally (test)**
```bash
npm run build
npm run preview
```

4. **Deploy to Vercel**
```bash
vercel link
vercel --prod
```

### Backend Deployment

1. **Navigate to backend directory**
```bash
cd c:\Users\tanc2\OneDrive\Pictures\Rudra-Groups\Rudra-services-main\rudra_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file locally for testing
cp .env.example .env
# Edit .env with your Google Sheets credentials
```

4. **Test locally**
```bash
npm run dev
# Test: curl http://localhost:3000/api/health
```

5. **Deploy to Vercel**
```bash
vercel link
vercel --prod
```

---

## ⚙️ Vercel Configuration Files

### Frontend vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## 🔍 Post-Deployment Verification

### 1. Frontend Checks
```bash
# Check if frontend is live
curl https://your-frontend-url.vercel.app

# Check static assets
curl https://your-frontend-url.vercel.app/robots.txt
curl https://your-frontend-url.vercel.app/sitemap.xml
```

### 2. Backend Checks
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Test lead submission
curl -X POST https://your-backend-url.vercel.app/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "companyName": "Test Company",
    "serviceCategory": "Consulting",
    "description": "Test submission"
  }'
```

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. Build Failures
```bash
# Clear local build cache
rm -rf .next node_modules
npm install
npm run build

# Clear Vercel cache
vercel build --clear-cache
```

#### 2. Environment Variable Issues
```bash
# Check if variables are set
vercel env ls

# Pull environment variables locally
vercel env pull .env.production
```

#### 3. Google Sheets Connection Issues
- Verify spreadsheet ID is correct
- Ensure service account has Editor permissions
- Check that Google Sheets API is enabled
- Validate private key format (include \n for line breaks)

#### 4. CORS Issues
The backend vercel.json includes CORS headers. If you still get CORS errors:
```bash
# Check API response headers
curl -I https://your-backend-url.vercel.app/api/health
```

---

## 🔄 Continuous Deployment

### Automatic Deployments
1. Connect your GitHub repository to Vercel
2. Configure build settings in Vercel dashboard
3. Set up environment variables in Vercel
4. Enable automatic deployments on push to main branch

### Manual Deployments
```bash
# Deploy specific branch
vercel --prod --branch feature-branch

# Deploy with custom build command
vercel --prod --build-command "npm run build:custom"
```

---

## 📊 Monitoring & Logs

### View Deployment Logs
```bash
vercel logs
```

### Monitor Functions
```bash
vercel functions ls
vercel logs --follow
```

### Performance Monitoring
- Enable Vercel Analytics in dashboard
- Monitor API response times
- Set up alerts for errors

---

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **API Security**: Backend includes CORS headers
3. **Rate Limiting**: Consider adding rate limiting for API endpoints
4. **HTTPS**: Vercel automatically provides SSL certificates
5. **Domain**: Configure custom domain in Vercel dashboard

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test Google Sheets connection
4. Review this troubleshooting guide
5. Contact Vercel support for platform-specific issues

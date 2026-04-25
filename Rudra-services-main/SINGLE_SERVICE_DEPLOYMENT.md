# Single Service Deployment Options for Rudra Groups

Since you want to deploy both frontend and backend as a single service, here are the best approaches:

## 🎯 **Recommended: Vercel Monorepo**

### **Option 1: Vercel Monorepo Structure**
```
Rudra-services-main/
├── package.json (root)
├── vercel.json
├── frontend/ (React/Vite app)
├── backend/ (Next.js API)
└── shared/ (shared types/utils)
```

### **Setup Commands:**
```bash
# Create root package.json
npm init -y

# Install Vercel CLI
npm install -g vercel

# Deploy as monorepo
vercel --prod
```

### **Root vercel.json:**
```json
{
  "projects": {
    "frontend": {
      "root": "frontend/rudra-growth-platform-main2",
      "framework": "vite"
    },
    "backend": {
      "root": "rudra_backend", 
      "framework": "nextjs"
    }
  }
}
```

---

## 🚀 **Alternative Solutions**

### **Option 2: Next.js Full-Stack App**
Convert frontend to Next.js pages:
- Move React components to Next.js pages/
- Use Next.js API routes for backend
- Single deployment target

### **Option 3: Vite + Express Server**
- Use Vite for frontend
- Add Express.js for API routes
- Deploy as single Node.js app

### **Option 4: Docker Container**
- Containerize both frontend and backend
- Deploy to Vercel, AWS, or Railway
- Single service with internal routing

---

## 📋 **Quick Monorepo Setup**

### **1. Root Package.json:**
```json
{
  "name": "rudra-groups-monorepo",
  "private": true,
  "workspaces": [
    "frontend/rudra-growth-platform-main2",
    "rudra_backend"
  ]
}
```

### **2. Root vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/rudra-growth-platform-main2/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "rudra_backend/package.json", 
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/rudra_backend/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/rudra-growth-platform-main2/$1"
    }
  ]
}
```

### **3. Deploy Commands:**
```bash
# From root directory
vercel link
vercel --prod
```

---

## 🔧 **Environment Variables**

Set these in Vercel dashboard:
```bash
# Backend variables
GOOGLE_SHEETS_SPREADSHEET_ID=your_id
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_CLIENT_EMAIL=your_email

# Frontend variables  
VITE_API_URL=/api
```

---

## 📊 **Benefits of Monorepo Approach**

✅ **Single Deployment** - One command deploys both  
✅ **Shared Types** - Reuse TypeScript definitions  
✅ **Unified CI/CD** - Single pipeline for both apps  
✅ **Cost Effective** - One Vercel project  
✅ **Easy Development** - Local development with both apps  

---

## 🚨 **Current Status**

I've reverted the unified app changes. Your original structure remains:
```
Rudra-services-main/
├── frontend/rudra-growth-platform-main2/ (React/Vite)
└── rudra_backend/ (Next.js API)
```

**Next Steps:**
1. Choose deployment option (recommend monorepo)
2. I'll help set up the configuration
3. Deploy with single Vercel command

Which approach would you prefer?

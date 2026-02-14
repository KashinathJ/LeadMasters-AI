# 📖 QuickTask - Complete Setup Guide

## Step-by-Step Installation & Setup

---

## Step 1: Install Prerequisites

### 1.1 Install Node.js

**If you see "npm is not recognized" error:**

1. Download Node.js: https://nodejs.org/
2. Download **LTS version** (recommended)
3. Run installer and follow wizard
4. **Important:** Make sure "Add to PATH" is checked ✅
5. Restart PowerShell after installation

**Verify installation:**
```powershell
node --version
npm --version
```

### 1.2 Install MongoDB

**Option A: Local MongoDB**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Start MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env` files

### 1.3 Verify Python

```powershell
python --version
# Should show Python 3.8 or higher
```

---

## Step 2: Setup Backend

```powershell
# Navigate to backend
cd QuickTask\backend

# Install dependencies
npm install

# Create .env file
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quicktask
JWT_SECRET=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
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
```

**Expected Output:**
```
added 150 packages in 30s
```

---

## Step 3: Setup Analytics Service

```powershell
# Navigate to analytics service
cd QuickTask\analytics_service

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install fastapi uvicorn[standard] pymongo python-dotenv pydantic python-multipart

# Create .env file
@"
MONGODB_URI=mongodb://localhost:27017/quicktask
ANALYTICS_PORT=8000
"@ | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
```

**Expected Output:**
```
Successfully installed fastapi-0.129.0 uvicorn-0.40.0 pymongo-4.16.0 ...
```

---

## Step 4: Setup Frontend

```powershell
# Navigate to frontend
cd QuickTask\frontend

# Install dependencies
npm install

# Create .env file (optional)
@"
VITE_API_URL=http://localhost:5000/api
VITE_ANALYTICS_URL=http://localhost:8000
"@ | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
```

**Expected Output:**
```
added 200 packages in 45s
```

---

## Step 5: Start All Services

### Option A: Automated (Recommended)

```powershell
cd QuickTask
.\start-all.ps1
```

This opens 3 separate terminal windows automatically.

### Option B: Manual (3 Terminals)

**Terminal 1 - Backend:**
```powershell
cd QuickTask\backend
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
✓ Server running on port 5000
✓ API Base URL: http://localhost:5000/api
```

**Terminal 2 - Analytics:**
```powershell
cd QuickTask\analytics_service
.\venv\Scripts\Activate.ps1
python main.py
```

**Expected Output:**
```
✓ Connected to MongoDB: mongodb://localhost:27017/quicktask
Starting QuickTask Analytics Service on port 8000...
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 3 - Frontend:**
```powershell
cd QuickTask\frontend
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms
  ➜  Local:   http://localhost:3000/
```

---

## Step 6: Verify Everything Works

```powershell
# Test Backend
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Test Analytics
Invoke-RestMethod -Uri "http://localhost:8000/health"

# Open Frontend
Start-Process "http://localhost:3000"
```

**Expected Output:**
```
message                : QuickTask API is running
status                 : OK

status   : healthy
service  : analytics
```

---

## Step 7: Use the Application

1. **Open Browser:** http://localhost:3000
2. **Register:** Click "Sign up" and create account
3. **Login:** Use your credentials
4. **Dashboard:** View statistics and charts
5. **Tasks:** Create, edit, delete tasks
6. **Filter & Search:** Use filters to organize tasks

---

## 🛑 Stop Services

Press `Ctrl+C` in each terminal window to stop the services.

---

## 🔧 Common Issues

### npm is not recognized
- **Fix:** Install Node.js - See [INSTALL_NODEJS.md](INSTALL_NODEJS.md)

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env` files
- For Atlas, check IP whitelist

### Port Already in Use
- Change ports in `.env` files
- Or kill process using the port:
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Python Virtual Environment Issues
```powershell
cd QuickTask\analytics_service
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## ✅ Success Checklist

- [ ] Node.js installed and verified
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Analytics dependencies installed
- [ ] Frontend dependencies installed
- [ ] All `.env` files created
- [ ] Backend running on port 5000
- [ ] Analytics running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register/login
- [ ] Can create tasks
- [ ] Dashboard shows charts

---

**You're all set! The application is ready to use! 🎉**

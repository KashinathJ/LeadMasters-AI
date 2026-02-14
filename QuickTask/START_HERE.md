# 🚀 QuickTask - START HERE

## ⚡ Quick Start (3 Steps)

### Step 1: Navigate to QuickTask Directory

```powershell
cd C:\Users\Kashinath\Desktop\folder\QuickTask
```

### Step 2: Run Setup (One Time)

```powershell
.\setup_all.ps1
```

**Expected Output:**
```
========================================
  QuickTask - Complete Setup
========================================

[1/4] Creating .env files...
  [OK] Created backend/.env
  [OK] Created analytics_service/.env

[2/4] Setting up Python virtual environment...
  [OK] Python dependencies installed

[3/4] Setting up Node.js backend...
  [OK] Node.js dependencies installed

[4/4] Setup Complete!
```

### Step 3: Start All Services

```powershell
.\start-all.ps1
```

This opens 3 terminal windows automatically:
- Backend: http://localhost:5000
- Analytics: http://localhost:8000
- Frontend: http://localhost:3000

---

## 📖 Documentation

- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **INSTALL_NODEJS.md** - Fix "npm is not recognized" error

---

## ✅ Verify Everything Works

```powershell
# Test Backend
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Test Analytics
Invoke-RestMethod -Uri "http://localhost:8000/health"

# Open Frontend
Start-Process "http://localhost:3000"
```

---

## 🔧 Troubleshooting

### Node.js is not installed (Error on line 19-20)
**If you see:** `[ERROR] Node.js is not installed or not in PATH`

**Solution:**
1. See **INSTALL_NODEJS.md** for complete instructions
2. Download Node.js from: https://nodejs.org/
3. Install with "Add to PATH" checked
4. Restart PowerShell
5. Run `.\setup_all.ps1` again

### Script not found
- Make sure you're in `QuickTask` directory
- Run: `cd C:\Users\Kashinath\Desktop\folder\QuickTask`

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` files

---

**Ready to go? Run the commands above! 🎉**

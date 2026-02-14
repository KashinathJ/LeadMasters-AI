# 🔧 Install Node.js - Fix "Node.js is not installed" Error

## ❌ Error You're Seeing

```
[ERROR] Node.js is not installed or not in PATH
  Please install Node.js from https://nodejs.org/
```

## ✅ Solution: Install Node.js

### Step 1: Download Node.js

1. **Go to:** https://nodejs.org/
2. **Click:** "Download Node.js (LTS)" - This is the recommended version
3. **Download:** Windows Installer (.msi) - 64-bit

**Quick Download Link:**  
https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

### Step 2: Install Node.js

1. **Run the installer** you downloaded
2. **Click "Next"** through the installation wizard
3. **Accept the license agreement**
4. **Keep default installation path** (usually `C:\Program Files\nodejs\`)
5. **⚠️ IMPORTANT:** Make sure **"Add to PATH"** is checked ✅
6. **Click "Install"**
7. **Wait for installation to complete**
8. **Click "Finish"**

### Step 3: Restart PowerShell

**Close and reopen PowerShell** - This is required for PATH to update.

### Step 4: Verify Installation

**Open a NEW PowerShell window and run:**

```powershell
node --version
```

**Expected Output:**
```
v20.11.0
```
(or similar version number)

**Also verify npm:**
```powershell
npm --version
```

**Expected Output:**
```
10.2.4
```
(or similar version number)

### Step 5: Run Setup Again

```powershell
cd C:\Users\Kashinath\Desktop\folder\QuickTask
.\setup_all.ps1
```

---

## 🔧 If Still Not Working

### Option 1: Restart Computer

Sometimes a full restart is needed for PATH to update.

### Option 2: Manually Add to PATH

1. Press `Win + R`
2. Type: `sysdm.cpl` and press Enter
3. Go to **"Advanced"** tab
4. Click **"Environment Variables"**
5. Under **"System variables"**, find **"Path"**
6. Click **"Edit"**
7. Click **"New"**
8. Add: `C:\Program Files\nodejs\`
9. Click **"OK"** on all dialogs
10. **Restart PowerShell**

### Option 3: Verify Installation Location

```powershell
# Check if Node.js is installed
Test-Path "C:\Program Files\nodejs\node.exe"

# If true, add to PATH manually (see Option 2)
```

---

## ✅ After Installation

Once Node.js is installed, you can:

```powershell
# Navigate to QuickTask
cd C:\Users\Kashinath\Desktop\folder\QuickTask

# Run setup (will now work)
.\setup_all.ps1

# Start services
.\start-all.ps1
```

---

## 📋 Quick Checklist

- [ ] Downloaded Node.js from https://nodejs.org/
- [ ] Installed Node.js with "Add to PATH" checked
- [ ] Restarted PowerShell
- [ ] Verified with `node --version`
- [ ] Verified with `npm --version`
- [ ] Ran `.\setup_all.ps1` again

---

**After installing Node.js, run the setup script again and it will work! 🎉**

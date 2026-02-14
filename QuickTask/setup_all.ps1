# QuickTask - Complete Setup Script
# This script sets up both backend and analytics service

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QuickTask - Complete Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "backend"
$analyticsDir = Join-Path $scriptDir "analytics_service"

# Step 1: Create .env files
Write-Host "[1/4] Creating .env files..." -ForegroundColor Yellow

# Backend .env
$backendEnvPath = Join-Path $backendDir ".env"
if (-Not (Test-Path $backendEnvPath)) {
    $backendEnv = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quicktask
JWT_SECRET=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
NODE_ENV=development
"@
    $backendEnv | Out-File -FilePath $backendEnvPath -Encoding utf8 -NoNewline
    Write-Host "  [OK] Created backend/.env" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] backend/.env already exists" -ForegroundColor Cyan
}

# Analytics .env
$analyticsEnvPath = Join-Path $analyticsDir ".env"
if (-Not (Test-Path $analyticsEnvPath)) {
    $analyticsEnv = @"
MONGODB_URI=mongodb://localhost:27017/quicktask
ANALYTICS_PORT=8000
"@
    $analyticsEnv | Out-File -FilePath $analyticsEnvPath -Encoding utf8 -NoNewline
    Write-Host "  [OK] Created analytics_service/.env" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] analytics_service/.env already exists" -ForegroundColor Cyan
}

# Step 2: Setup Python Virtual Environment
Write-Host ""
Write-Host "[2/4] Setting up Python virtual environment..." -ForegroundColor Yellow

Set-Location $analyticsDir

if (-Not (Test-Path "venv")) {
    Write-Host "  Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    Write-Host "  [OK] Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] Virtual environment already exists" -ForegroundColor Cyan
}

Write-Host "  Activating virtual environment..." -ForegroundColor Cyan
& .\venv\Scripts\Activate.ps1

Write-Host "  Upgrading pip..." -ForegroundColor Cyan
python -m pip install --upgrade pip --quiet

Write-Host "  Installing Python dependencies..." -ForegroundColor Cyan
pip install fastapi uvicorn[standard] pymongo python-dotenv pydantic python-multipart --quiet

Write-Host "  [OK] Python dependencies installed" -ForegroundColor Green

# Step 3: Setup Node.js Backend
Write-Host ""
Write-Host "[3/4] Setting up Node.js backend..." -ForegroundColor Yellow

Set-Location $backendDir

# Check if Node.js is installed - Try multiple methods
$nodeFound = $false

# Method 1: Try direct command (if in PATH)
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "  Found Node.js: $nodeVersion" -ForegroundColor Cyan
        $nodeFound = $true
    }
} catch {
    # Continue to other methods
}

# Method 2: Check common installation paths (if not in PATH)
if (-not $nodeFound) {
    $commonPaths = @(
        "${env:ProgramFiles}\nodejs\node.exe",
        "${env:ProgramFiles(x86)}\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
    )
    
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            $nodeVersion = & $path --version 2>$null
            if ($nodeVersion) {
                Write-Host "  Found Node.js: $nodeVersion" -ForegroundColor Cyan
                Write-Host "  [INFO] Adding Node.js to PATH for this session..." -ForegroundColor Yellow
                $nodeDir = Split-Path $path
                $env:PATH = "$nodeDir;$env:PATH"
                $nodeFound = $true
                break
            }
        }
    }
}

# If still not found, show error
if (-not $nodeFound) {
    Write-Host ""
    Write-Host "  [ERROR] Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "  SOLUTION:" -ForegroundColor Yellow
    Write-Host "  1. Download Node.js from: https://nodejs.org/" -ForegroundColor White
    Write-Host "  2. Install the LTS version (recommended)" -ForegroundColor White
    Write-Host "  3. Make sure 'Add to PATH' is checked during installation" -ForegroundColor White
    Write-Host "  4. Restart PowerShell after installation" -ForegroundColor White
    Write-Host ""
    Write-Host "  If Node.js is already installed, restart PowerShell to refresh PATH" -ForegroundColor Yellow
    Write-Host ""
    Set-Location $scriptDir
    exit 1
}

Write-Host "  Installing Node.js dependencies..." -ForegroundColor Cyan
npm install --silent

Write-Host "  [OK] Node.js dependencies installed" -ForegroundColor Green

# Step 4: Summary
Write-Host ""
Write-Host "[4/4] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure MongoDB is running" -ForegroundColor Yellow
Write-Host "   - Local: mongodb://localhost:27017/quicktask" -ForegroundColor White
Write-Host "   - Or update MONGODB_URI in .env files" -ForegroundColor White
Write-Host ""
Write-Host "2. Start Backend (Terminal 1):" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Start Analytics Service (Terminal 2):" -ForegroundColor Yellow
Write-Host "   cd analytics_service" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "   python main.py" -ForegroundColor White
Write-Host ""
Write-Host "4. Test Services:" -ForegroundColor Yellow
Write-Host "   Backend: http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   Analytics: http://localhost:8000/health" -ForegroundColor White
Write-Host ""

Set-Location $scriptDir

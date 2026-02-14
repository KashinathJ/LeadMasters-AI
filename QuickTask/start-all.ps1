# QuickTask - Start All Services Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QuickTask - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "backend"
$analyticsDir = Join-Path $scriptDir "analytics_service"
$frontendDir = Join-Path $scriptDir "frontend"

# Check if MongoDB is accessible (basic check)
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    # Try to connect (this is a basic check)
    Write-Host "  Assuming MongoDB is running..." -ForegroundColor Cyan
} catch {
    Write-Host "  Warning: Could not verify MongoDB connection" -ForegroundColor Yellow
    Write-Host "  Make sure MongoDB is running before starting services" -ForegroundColor Yellow
}

Write-Host ""

# Start Backend Service
Write-Host "[1/3] Starting Backend Service (Node.js)..." -ForegroundColor Yellow
if (Test-Path (Join-Path $backendDir ".env")) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; Write-Host 'Backend Service' -ForegroundColor Green; Write-Host '================' -ForegroundColor Green; npm run dev"
    Write-Host "  [OK] Backend starting in new window" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] .env file not found in backend directory!" -ForegroundColor Red
    Write-Host "    Please create .env file with MONGODB_URI, PORT, and JWT_SECRET" -ForegroundColor Yellow
}

Start-Sleep -Seconds 3

# Start Analytics Service
Write-Host "[2/3] Starting Analytics Service (Python FastAPI)..." -ForegroundColor Yellow
if (Test-Path (Join-Path $analyticsDir "venv\Scripts\Activate.ps1")) {
    if (Test-Path (Join-Path $analyticsDir ".env")) {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$analyticsDir'; Write-Host 'Analytics Service' -ForegroundColor Green; Write-Host '==================' -ForegroundColor Green; .\venv\Scripts\Activate.ps1; python main.py"
        Write-Host "  [OK] Analytics starting in new window" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] .env file not found in analytics_service directory!" -ForegroundColor Red
        Write-Host "    Please create .env file with MONGODB_URI and ANALYTICS_PORT" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [ERROR] Virtual environment not found!" -ForegroundColor Red
    Write-Host "    Please run: cd analytics_service && python -m venv venv && .\venv\Scripts\Activate.ps1 && pip install -r requirements.txt" -ForegroundColor Yellow
}

Start-Sleep -Seconds 3

# Start Frontend Service
Write-Host "[3/3] Starting Frontend Service (React)..." -ForegroundColor Yellow
if (Test-Path (Join-Path $frontendDir "node_modules")) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; Write-Host 'Frontend Service' -ForegroundColor Green; Write-Host '=================' -ForegroundColor Green; npm run dev"
    Write-Host "  [OK] Frontend starting in new window" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] node_modules not found!" -ForegroundColor Red
    Write-Host "    Please run: cd frontend && npm install" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Services Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API:     http://localhost:5000" -ForegroundColor Green
Write-Host "Analytics API:   http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend App:    http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Three new terminal windows have opened." -ForegroundColor Cyan
Write-Host "Wait for all services to start, then open:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this script (services will continue running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

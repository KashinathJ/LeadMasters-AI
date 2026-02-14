# QuickTask - Service Test Script
# Tests both backend and analytics services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QuickTask - Service Tests" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$backendUrl = "http://localhost:5000"
$analyticsUrl = "http://localhost:8000"

# Test Backend
Write-Host "Testing Backend Service..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$backendUrl/api/health" -Method GET -ErrorAction Stop
    Write-Host "  ✓ Backend is running" -ForegroundColor Green
    Write-Host "    Response: $($response.message)" -ForegroundColor Cyan
} catch {
    Write-Host "  ✗ Backend is not running or not accessible" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "    Make sure to start: cd backend && npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Test Analytics Service
Write-Host "Testing Analytics Service..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$analyticsUrl/health" -Method GET -ErrorAction Stop
    Write-Host "  ✓ Analytics Service is running" -ForegroundColor Green
    Write-Host "    Response: $($response.status)" -ForegroundColor Cyan
} catch {
    Write-Host "  ✗ Analytics Service is not running or not accessible" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "    Make sure to start: cd analytics_service && .\venv\Scripts\Activate.ps1 && python main.py" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

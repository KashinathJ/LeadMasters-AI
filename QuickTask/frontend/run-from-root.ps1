# Helper script - Run from frontend directory
# This will navigate to root and run the setup script

Write-Host "Navigating to QuickTask root directory..." -ForegroundColor Yellow
Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host "Running setup script..." -ForegroundColor Yellow
.\setup_all.ps1

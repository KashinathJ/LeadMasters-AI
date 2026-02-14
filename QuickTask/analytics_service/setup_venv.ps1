# PowerShell script to set up Python virtual environment
Write-Host "Setting up Python virtual environment..." -ForegroundColor Green

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "Found: $pythonVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Create virtual environment if it doesn't exist
if (-Not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Virtual environment created successfully!" -ForegroundColor Green
} else {
    Write-Host "Virtual environment already exists." -ForegroundColor Cyan
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install dependencies
Write-Host "Installing dependencies from requirements.txt..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host "`nSetup completed successfully!" -ForegroundColor Green
Write-Host "To activate the virtual environment in the future, run:" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor White

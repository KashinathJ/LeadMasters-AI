# PowerShell script to set up React frontend
Write-Host "Setting up QuickTask Frontend..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Found Node.js: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "Found npm: $npmVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Frontend setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "The app will be available at http://localhost:3000" -ForegroundColor Cyan

# PowerShell script to set up Node.js backend
Write-Host "Setting up Node.js backend..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Found Node.js: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
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
Write-Host "Installing dependencies from package.json..." -ForegroundColor Yellow
npm install

Write-Host "`nBackend setup completed successfully!" -ForegroundColor Green
Write-Host "Make sure to create a .env file with your configuration." -ForegroundColor Yellow

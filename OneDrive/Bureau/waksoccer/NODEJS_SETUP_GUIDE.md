# Node.js Installation and Setup Guide

## 🔧 Troubleshooting Node.js Installation

If you see "node is not recognized" errors, try these steps:

### Step 1: Restart Terminal
Close all terminal windows and reopen PowerShell as Administrator:
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Navigate back to your project: `cd "C:\Users\haylton ilonga\OneDrive\Bureau\waksoccer"`

### Step 2: Verify Installation Location
Check if Node.js is installed in the default location:
```powershell
# Check Program Files
dir "C:\Program Files\nodejs"

# Check Program Files (x86)
dir "C:\Program Files (x86)\nodejs"
```

### Step 3: Add to PATH Manually (if needed)
If Node.js is installed but not in PATH:
```powershell
# Add to current session
$env:PATH += ";C:\Program Files\nodejs"

# Test
node --version
npm --version
```

### Step 4: Permanent PATH Fix
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click "Environment Variables"
3. Under "System Variables", find "Path" and click "Edit"
4. Click "New" and add: `C:\Program Files\nodejs`
5. Click OK, restart terminal

## 🚀 Alternative: Use Chocolatey (Recommended)

If you have issues with the manual install, use Chocolatey package manager:

### Install Chocolatey
```powershell
# Run as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Install Node.js via Chocolatey
```powershell
choco install nodejs
```

## 🔍 Verification Commands
Once Node.js is working, run these to verify:
```powershell
node --version    # Should show v18.x.x or v20.x.x
npm --version     # Should show 9.x.x or 10.x.x
```
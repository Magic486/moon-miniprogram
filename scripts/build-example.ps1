# 构建示范小程序：
# 1. 以 release 模式构建 engine 包（CommonJS）
# 2. 拷贝产物到 examples/invoice-helper/miniprogram/engine/moon-engine.js
# 3. 运行无头冒烟测试（node 模拟微信运行时）
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

Push-Location $root
try {
  Write-Host "==> moon build --target js (release)" -ForegroundColor Cyan
  moon build --target js --release
  if ($LASTEXITCODE -ne 0) { throw "moon build failed" }

  $artifact = Join-Path $root "_build\js\release\build\engine-export\engine-export.js"
  if (!(Test-Path $artifact)) { throw "engine-export.js not found at $artifact" }

  $destDir = Join-Path $root "examples\invoice-helper\miniprogram\engine"
  New-Item -ItemType Directory -Force $destDir | Out-Null
  $dest = Join-Path $destDir "moon-engine.js"
  Copy-Item $artifact $dest -Force

  $size = (Get-Item $dest).Length
  Write-Host ("==> copied moon-engine.js ({0:N1} KB)" -f ($size / 1KB)) -ForegroundColor Green

  Write-Host "==> headless smoke test" -ForegroundColor Cyan
  node (Join-Path $PSScriptRoot "smoke.js") $dest
  if ($LASTEXITCODE -ne 0) { throw "smoke test failed" }
  Write-Host "==> OK" -ForegroundColor Green
}
finally {
  Pop-Location
}

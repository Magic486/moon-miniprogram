# 构建并验证示例引擎：
# 1. 以 release 模式构建 engine 包（CommonJS）
# 2. 运行无头冒烟测试（node 模拟微信运行时，针对 _build 产物）
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

Push-Location $root
try {
  Write-Host "==> moon build --target js (release)" -ForegroundColor Cyan
  moon build --target js --release
  if ($LASTEXITCODE -ne 0) { throw "moon build failed" }

  $artifact = Join-Path $root "_build\js\release\build\engine-export\engine-export.js"
  if (!(Test-Path $artifact)) { throw "engine-export.js not found at $artifact" }
  Write-Host ("==> artifact {0:N1} KB" -f ((Get-Item $artifact).Length / 1KB)) -ForegroundColor Green

  Write-Host "==> headless smoke test" -ForegroundColor Cyan
  node (Join-Path $PSScriptRoot "smoke.js") $artifact
  if ($LASTEXITCODE -ne 0) { throw "smoke test failed" }
  Write-Host "==> OK" -ForegroundColor Green
}
finally {
  Pop-Location
}

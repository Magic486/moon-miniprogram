# 构建并验证示例引擎：
# 1. 以 release 模式构建 engine 包并复制到可导入的小程序目录
# 2. 运行无头冒烟测试（node 模拟微信运行时，针对实际交付产物）
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

Push-Location $root
try {
  Write-Host "==> mmp release" -ForegroundColor Cyan
  node scripts/mmp.cjs release
  if ($LASTEXITCODE -ne 0) { throw "mmp release failed" }

  $artifact = Join-Path $root "miniprogram\engine\moon-engine.js"
  if (!(Test-Path $artifact)) { throw "moon-engine.js not found at $artifact" }
  Write-Host ("==> artifact {0:N1} KB" -f ((Get-Item $artifact).Length / 1KB)) -ForegroundColor Green

  Write-Host "==> headless smoke test" -ForegroundColor Cyan
  node (Join-Path $PSScriptRoot "smoke.js") $artifact
  if ($LASTEXITCODE -ne 0) { throw "smoke test failed" }
  Write-Host "==> OK" -ForegroundColor Green
}
finally {
  Pop-Location
}

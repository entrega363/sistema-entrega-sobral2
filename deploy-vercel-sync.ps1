# Script para sincronizar e fazer deploy na Vercel
Write-Host "🔄 Sincronizando Sistema Entrega Sobral com Vercel..." -ForegroundColor Green

# 1. Fazer commit das mudanças locais
Write-Host "📝 Fazendo commit das mudanças..." -ForegroundColor Blue
git add -A
git commit -m "Update: Sincronização com Vercel - $(Get-Date -Format 'dd/MM/yyyy HH:mm')"

# 2. Enviar para GitHub
Write-Host "📤 Enviando para GitHub..." -ForegroundColor Blue
git push origin main

# 3. Fazer deploy na Vercel
Write-Host "🚀 Fazendo deploy na Vercel..." -ForegroundColor Yellow

# Verificar se está logado na Vercel
$loginCheck = vercel whoami 2>&1
if ($loginCheck -match "Error") {
    Write-Host "❌ Não está logado na Vercel. Fazendo login..." -ForegroundColor Red
    vercel login
}

# Deploy para produção
Write-Host "🌟 Deploy de produção..." -ForegroundColor Green
vercel --prod

Write-Host "✅ Sincronização completa!" -ForegroundColor Green
Write-Host "🌐 URLs atualizadas:" -ForegroundColor Cyan
Write-Host "   Vercel: https://sistema-entrega-sobral2-6.vercel.app/" -ForegroundColor White
Write-Host "   GitHub: https://entrega363.github.io/sistema-entrega-sobral2/" -ForegroundColor White

# Perguntar se quer abrir no navegador
$openBrowser = Read-Host "Deseja abrir a Vercel no navegador? (s/n) [s]"
if ([string]::IsNullOrEmpty($openBrowser) -or $openBrowser.ToLower() -eq "s") {
    Start-Process "https://sistema-entrega-sobral2-6.vercel.app/delivery-app-complete-secure-v2.html"
}

Write-Host "🎉 Processo finalizado!" -ForegroundColor Green
# Script de Deploy para Vercel - Sistema Entrega Sobral
# PowerShell Script

Write-Host "🚀 Iniciando deploy do Sistema Entrega Sobral..." -ForegroundColor Green

# Verificar se o Vercel CLI está instalado
if (!(Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
}

# Verificar se está logado no Vercel
Write-Host "🔐 Verificando login no Vercel..." -ForegroundColor Blue
$loginCheck = vercel whoami 2>&1
if ($loginCheck -match "Error") {
    Write-Host "❌ Não está logado no Vercel. Fazendo login..." -ForegroundColor Yellow
    vercel login
}

# Mostrar informações do projeto
Write-Host "📋 Informações do projeto:" -ForegroundColor Cyan
Write-Host "   Nome: sistema-entrega-sobral" -ForegroundColor White
Write-Host "   Versão: 4.0.0" -ForegroundColor White
Write-Host "   Arquivo principal: delivery-app-complete-secure-v2.html" -ForegroundColor White

# Perguntar tipo de deploy
$deployType = Read-Host "Escolha o tipo de deploy (1=Desenvolvimento, 2=Produção) [2]"
if ([string]::IsNullOrEmpty($deployType)) { $deployType = "2" }

Write-Host "🔧 Verificando arquivos necessários..." -ForegroundColor Blue

# Verificar arquivos essenciais
$requiredFiles = @(
    "vercel.json",
    "package.json", 
    "delivery-app-complete-secure-v2.html",
    "index.html"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (FALTANDO)" -ForegroundColor Red
    }
}

# Fazer o deploy
Write-Host "🚀 Iniciando deploy..." -ForegroundColor Green

if ($deployType -eq "1") {
    Write-Host "📦 Deploy de desenvolvimento..." -ForegroundColor Yellow
    vercel
} else {
    Write-Host "🌟 Deploy de produção..." -ForegroundColor Yellow
    vercel --prod
}

# Mostrar URLs disponíveis
Write-Host "🌐 URLs disponíveis após o deploy:" -ForegroundColor Cyan
Write-Host "   Principal: https://sistema-entrega-sobral.vercel.app/" -ForegroundColor White
Write-Host "   Admin: https://sistema-entrega-sobral.vercel.app/admin" -ForegroundColor White
Write-Host "   App Seguro V2: https://sistema-entrega-sobral.vercel.app/secure-v2" -ForegroundColor Green
Write-Host "   PWA: https://sistema-entrega-sobral.vercel.app/pwa" -ForegroundColor White

Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "💡 Para ver logs: vercel logs" -ForegroundColor Blue
Write-Host "💡 Para ver projetos: vercel ls" -ForegroundColor Blue

# Perguntar se quer abrir no navegador
$openBrowser = Read-Host "Deseja abrir o site no navegador? (s/n) [s]"
if ([string]::IsNullOrEmpty($openBrowser) -or $openBrowser.ToLower() -eq "s") {
    Start-Process "https://sistema-entrega-sobral.vercel.app/secure-v2"
}

Write-Host "🎉 Processo finalizado!" -ForegroundColor Green
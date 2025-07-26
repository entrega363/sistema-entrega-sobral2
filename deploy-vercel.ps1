# 🚀 Script de Deploy Automático para Vercel (PowerShell)
# Sistema Entrega Sobral v4.0 PWA

Write-Host "🚚 Sistema Entrega Sobral - Deploy Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Instale em: https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar se o Vercel CLI está instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Verificar se está logado no Vercel
try {
    $vercelUser = vercel whoami 2>$null
    if ($vercelUser) {
        Write-Host "✅ Logado no Vercel como: $vercelUser" -ForegroundColor Green
    } else {
        throw "Not logged in"
    }
} catch {
    Write-Host "🔑 Faça login no Vercel:" -ForegroundColor Yellow
    vercel login
}

# Verificar mudanças no Git
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Mudanças detectadas. Fazendo commit..." -ForegroundColor Yellow
    
    git add .
    git commit -m "🚀 Deploy: Configuração Vercel + arquivos de deploy

✨ Arquivos adicionados:
- vercel.json (configuração principal)
- package.json (metadados do projeto)
- deploy-vercel.md (documentação)
- _headers (headers de segurança)
- netlify.toml (compatibilidade)

🔧 Configurações:
- Rotas personalizadas (/v1, /v2, /v3, /v4, /pwa)
- Headers de segurança para PWA
- Cache otimizado
- Deploy automático configurado

Pronto para deploy no Vercel! 🚀"
    
    Write-Host "📤 Enviando para GitHub..." -ForegroundColor Yellow
    git push origin main
}

# Deploy no Vercel
Write-Host ""
Write-Host "🚀 Iniciando deploy no Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Opções de deploy:" -ForegroundColor Yellow
Write-Host "1. Deploy de teste (preview)" -ForegroundColor White
Write-Host "2. Deploy de produção" -ForegroundColor White
Write-Host ""

$opcao = Read-Host "Escolha uma opção (1 ou 2)"

switch ($opcao) {
    "1" {
        Write-Host "🧪 Fazendo deploy de teste..." -ForegroundColor Yellow
        vercel
    }
    "2" {
        Write-Host "🏭 Fazendo deploy de produção..." -ForegroundColor Green
        vercel --prod
    }
    default {
        Write-Host "❌ Opção inválida. Fazendo deploy de teste..." -ForegroundColor Red
        vercel
    }
}

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs disponíveis:" -ForegroundColor Cyan
Write-Host "├── Home: https://sistema-entrega-sobral.vercel.app" -ForegroundColor White
Write-Host "├── Admin: https://sistema-entrega-sobral.vercel.app/admin" -ForegroundColor White
Write-Host "├── v1.0: https://sistema-entrega-sobral.vercel.app/v1" -ForegroundColor White
Write-Host "├── v2.0: https://sistema-entrega-sobral.vercel.app/v2" -ForegroundColor White
Write-Host "├── v3.0: https://sistema-entrega-sobral.vercel.app/v3" -ForegroundColor White
Write-Host "├── v4.0: https://sistema-entrega-sobral.vercel.app/v4" -ForegroundColor White
Write-Host "└── PWA: https://sistema-entrega-sobral.vercel.app/pwa" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Teste recomendado:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://sistema-entrega-sobral.vercel.app/pwa" -ForegroundColor White
Write-Host "2. Login: maria@teste.com / 123456" -ForegroundColor White
Write-Host "3. Instale como PWA" -ForegroundColor White
Write-Host "4. Teste pagamentos com cupom: BEMVINDO10" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Sistema online com performance global!" -ForegroundColor Green

# Abrir o site no navegador
$abrirSite = Read-Host "Deseja abrir o site no navegador? (s/n)"
if ($abrirSite -eq "s" -or $abrirSite -eq "S") {
    Start-Process "https://sistema-entrega-sobral.vercel.app/pwa"
}
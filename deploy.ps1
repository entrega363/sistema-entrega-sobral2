# Script PowerShell para Deploy no GitHub
# Sistema Entrega Sobral

Write-Host "🚚 Sistema Entrega Sobral - Deploy Script" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Verificar se git está instalado
try {
    git --version | Out-Null
    Write-Host "✅ Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado. Instale o Git primeiro." -ForegroundColor Red
    Write-Host "Download: https://git-scm.com/download/windows" -ForegroundColor Yellow
    exit 1
}

# Verificar se está em um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositório Git inicializado" -ForegroundColor Green
}

# Adicionar arquivos
Write-Host "📦 Adicionando arquivos ao Git..." -ForegroundColor Yellow
git add .

# Commit
$commitMsg = Read-Host "Digite a mensagem do commit (ou pressione Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Deploy: Sistema Entrega Sobral atualizado"
}
git commit -m $commitMsg

# Verificar se remote origin existe
try {
    git remote get-url origin | Out-Null
    Write-Host "✅ Remote já configurado" -ForegroundColor Green
} catch {
    Write-Host "🔗 Configure o remote do GitHub:" -ForegroundColor Yellow
    $repoUrl = Read-Host "Digite a URL do seu repositório GitHub"
    git remote add origin $repoUrl
    Write-Host "✅ Remote configurado" -ForegroundColor Green
}

# Push para GitHub
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Vá para seu repositório no GitHub" -ForegroundColor White
Write-Host "2. Clique em 'Settings'" -ForegroundColor White
Write-Host "3. Role até 'Pages'" -ForegroundColor White
Write-Host "4. Selecione 'Deploy from a branch'" -ForegroundColor White
Write-Host "5. Escolha 'main' branch" -ForegroundColor White
Write-Host "6. Clique em 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Seu site estará disponível em:" -ForegroundColor Cyan
Write-Host "https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Obrigado por usar o Sistema Entrega Sobral!" -ForegroundColor Green

# Pausar para o usuário ler
Read-Host "Pressione Enter para continuar..."
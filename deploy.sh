#!/bin/bash

# Script de deploy para GitHub Pages
# Sistema Entrega Sobral

echo "🚚 Sistema Entrega Sobral - Deploy Script"
echo "========================================="

# Verificar se git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Instale o Git primeiro."
    exit 1
fi

# Verificar se está em um repositório git
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositório Git..."
    git init
    echo "✅ Repositório Git inicializado"
fi

# Adicionar arquivos
echo "📦 Adicionando arquivos ao Git..."
git add .

# Commit
echo "💾 Fazendo commit..."
read -p "Digite a mensagem do commit (ou pressione Enter para usar padrão): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy: Sistema Entrega Sobral atualizado"
fi
git commit -m "$commit_msg"

# Verificar se remote origin existe
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Configure o remote do GitHub:"
    read -p "Digite a URL do seu repositório GitHub: " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote configurado"
fi

# Push para GitHub
echo "🚀 Enviando para GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Vá para seu repositório no GitHub"
echo "2. Clique em 'Settings'"
echo "3. Role até 'Pages'"
echo "4. Selecione 'Deploy from a branch'"
echo "5. Escolha 'main' branch"
echo "6. Clique em 'Save'"
echo ""
echo "🌐 Seu site estará disponível em:"
echo "https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO"
echo ""
echo "🎉 Obrigado por usar o Sistema Entrega Sobral!"
#!/bin/bash

# 🚀 Script de Deploy Automático para Vercel
# Sistema Entrega Sobral v4.0 PWA

echo "🚚 Sistema Entrega Sobral - Deploy Vercel"
echo "========================================"

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Verificar se está logado no Vercel
echo "🔐 Verificando login no Vercel..."
if ! vercel whoami &> /dev/null; then
    echo "🔑 Faça login no Vercel:"
    vercel login
fi

# Fazer commit das mudanças se houver
echo "📝 Verificando mudanças no Git..."
if [[ -n $(git status --porcelain) ]]; then
    echo "💾 Fazendo commit das mudanças..."
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
    
    echo "📤 Enviando para GitHub..."
    git push origin main
fi

# Deploy no Vercel
echo "🚀 Iniciando deploy no Vercel..."
echo ""
echo "🎯 Opções de deploy:"
echo "1. Deploy de teste (preview)"
echo "2. Deploy de produção"
echo ""
read -p "Escolha uma opção (1 ou 2): " opcao

case $opcao in
    1)
        echo "🧪 Fazendo deploy de teste..."
        vercel
        ;;
    2)
        echo "🏭 Fazendo deploy de produção..."
        vercel --prod
        ;;
    *)
        echo "❌ Opção inválida. Fazendo deploy de teste..."
        vercel
        ;;
esac

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "🌐 URLs disponíveis:"
echo "├── Home: https://sistema-entrega-sobral.vercel.app"
echo "├── Admin: https://sistema-entrega-sobral.vercel.app/admin"
echo "├── v1.0: https://sistema-entrega-sobral.vercel.app/v1"
echo "├── v2.0: https://sistema-entrega-sobral.vercel.app/v2"
echo "├── v3.0: https://sistema-entrega-sobral.vercel.app/v3"
echo "├── v4.0: https://sistema-entrega-sobral.vercel.app/v4"
echo "└── PWA: https://sistema-entrega-sobral.vercel.app/pwa"
echo ""
echo "🎯 Teste recomendado:"
echo "1. Acesse: https://sistema-entrega-sobral.vercel.app/pwa"
echo "2. Login: maria@teste.com / 123456"
echo "3. Instale como PWA"
echo "4. Teste pagamentos com cupom: BEMVINDO10"
echo ""
echo "🚀 Sistema online com performance global!"
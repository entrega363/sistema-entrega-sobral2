# Deploy Manual no Vercel - Sistema Entrega Sobral

## 🚀 Como Fazer Deploy via Dashboard Web (Recomendado)

Como o login via CLI está com conflito, vamos usar o método mais simples:

### Passo 1: Acesse o Vercel Dashboard
1. Abra o Chrome
2. Vá para: **https://vercel.com**
3. Faça login com a conta que você quer usar

### Passo 2: Criar Novo Projeto
1. Clique em **"New Project"**
2. Selecione **"Import Git Repository"**
3. Conecte sua conta GitHub (se necessário)
4. Procure por: **entrega363/sistema-entrega-sobral2**
5. Clique em **"Import"**

### Passo 3: Configurar Deploy
1. **Project Name**: `sistema-entrega-sobral`
2. **Framework Preset**: `Other` (deixe como está)
3. **Root Directory**: `./` (padrão)
4. **Build Command**: deixe vazio (projeto estático)
5. **Output Directory**: deixe vazio
6. **Install Command**: deixe vazio

### Passo 4: Variáveis de Ambiente (Opcional)
Se precisar, adicione:
- `NODE_ENV` = `production`

### Passo 5: Deploy
1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. Seu site estará disponível!

## 🌐 URLs que serão geradas:
- **Principal**: `https://sistema-entrega-sobral.vercel.app/`
- **App Seguro**: `https://sistema-entrega-sobral.vercel.app/secure-v2`
- **Admin**: `https://sistema-entrega-sobral.vercel.app/admin`

## ⚡ Alternativa: Deploy via GitHub Integration

1. No Vercel Dashboard, vá em **Settings > Git**
2. Conecte o repositório: `entrega363/sistema-entrega-sobral2`
3. Configure auto-deploy na branch `main`
4. Cada push no GitHub fará deploy automático!

## 📋 Arquivos já configurados:
- ✅ `vercel.json` - Configuração de rotas
- ✅ `package.json` - Scripts de deploy
- ✅ `index.html` - Página principal
- ✅ `delivery-app-complete-secure-v2.html` - App principal

## 🔧 Se der erro:
1. Verifique se o repositório está público
2. Confirme se os arquivos estão na branch `main`
3. Tente fazer um novo push:
   ```bash
   git add .
   git commit -m "Deploy Vercel"
   git push origin main
   ```

---
**✅ Método mais simples e confiável!**
**Acesse: https://vercel.com e importe o repositório**
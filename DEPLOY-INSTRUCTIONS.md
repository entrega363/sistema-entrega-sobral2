# 🚀 Instruções de Deploy - Sistema Entrega Sobral

## ⚡ Deploy Rápido (Recomendado)

### Opção 1: Script PowerShell (Windows)
```powershell
# Execute no PowerShell (como administrador)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\deploy.ps1
```

### Opção 2: Comandos Manuais
Abra o **Git Bash** ou **Command Prompt** na pasta do projeto:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar arquivos
git add .

# 3. Primeiro commit
git commit -m "Initial commit: Sistema Entrega Sobral"

# 4. Criar repositório no GitHub primeiro, depois:
git remote add origin https://github.com/SEU-USUARIO/sistema-entrega-sobral.git

# 5. Enviar para GitHub
git branch -M main
git push -u origin main
```

## 📋 Passo a Passo Detalhado

### 1️⃣ Preparar o Ambiente
- ✅ Instale o [Git](https://git-scm.com/download/windows) se não tiver
- ✅ Crie uma conta no [GitHub](https://github.com) se não tiver
- ✅ Abra o terminal na pasta do projeto

### 2️⃣ Criar Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. **Repository name**: `sistema-entrega-sobral`
3. **Description**: `Sistema completo de delivery para Sobral-CE`
4. Marque como **Public**
5. **NÃO** adicione README, .gitignore ou license (já temos)
6. Clique **"Create repository"**

### 3️⃣ Conectar e Enviar
Execute os comandos acima ou use o script PowerShell.

### 4️⃣ Configurar GitHub Pages
1. No repositório, vá em **Settings**
2. Menu lateral → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: / (root)
6. Clique **Save**

### 5️⃣ Aguardar Deploy
- ⏱️ Aguarde 2-5 minutos
- 🌐 Site disponível em: `https://SEU-USUARIO.github.io/sistema-entrega-sobral`

## 🔧 Configurações Pós-Deploy

### Atualizar URLs no Código
Após o deploy, atualize as URLs nos meta tags do `index.html`:
```html
<!-- Substitua "seu-usuario" pelo seu username do GitHub -->
<meta property="og:url" content="https://SEU-USUARIO.github.io/sistema-entrega-sobral/">
```

### Configurar Banco de Dados
1. Crie conta no [Supabase](https://supabase.com)
2. Crie novo projeto
3. Atualize credenciais em `database-config.js`
4. Configure as tabelas necessárias

## 📱 Teste o Sistema

Após o deploy, teste:
- ✅ Login como admin: `admin` / `tenderbr0`
- ✅ Login como entregador: `joao@teste.com` / `123456`
- ✅ Login como empresa: `pizza@teste.com` / `123456`

## 🔄 Atualizações Futuras

Para atualizar o site:
```bash
git add .
git commit -m "Descrição da atualização"
git push origin main
```

## ⚠️ Solução de Problemas

### Git não reconhecido
- Instale o Git: https://git-scm.com/download/windows
- Reinicie o terminal após instalação

### Erro de permissão
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Site não carrega
- Aguarde alguns minutos
- Verifique se GitHub Pages está habilitado
- Confirme que o repositório é público

### Erro 404
- Verifique se `index.html` está na raiz
- Confirme que os arquivos foram enviados
- Aguarde o processamento do GitHub

## 🎯 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código enviado com sucesso
- [ ] GitHub Pages configurado
- [ ] Site acessível online
- [ ] Todas as funcionalidades testadas
- [ ] Banco de dados configurado (opcional)

## 🌟 Recursos Adicionais

### Domínio Personalizado
Para usar domínio próprio:
1. Compre um domínio
2. Configure DNS para apontar para GitHub Pages
3. Adicione arquivo `CNAME` com seu domínio

### HTTPS Automático
- GitHub Pages fornece HTTPS automaticamente
- Certificado SSL renovado automaticamente

### Analytics
Adicione Google Analytics no `delivery-app.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

## 📞 Suporte

- 📖 [Documentação GitHub Pages](https://docs.github.com/en/pages)
- 🎥 [Tutorial em vídeo](https://www.youtube.com/results?search_query=github+pages+tutorial)
- 💬 [Comunidade GitHub](https://github.community/)

---

🎉 **Parabéns! Seu sistema de delivery está pronto para uso!**

**URL do seu site**: `https://SEU-USUARIO.github.io/sistema-entrega-sobral`
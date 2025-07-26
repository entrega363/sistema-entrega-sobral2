# 🚀 Guia de Deploy - GitHub Pages

## Passo a Passo para Subir o Site

### 1️⃣ Preparar o Repositório Local

Abra o terminal/prompt de comando na pasta do projeto e execute:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Sistema Entrega Sobral"
```

### 2️⃣ Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com)
2. Clique em **"New repository"** (botão verde)
3. Preencha:
   - **Repository name**: `sistema-entrega-sobral`
   - **Description**: `Sistema completo de delivery para Sobral-CE`
   - Marque como **Public**
   - **NÃO** marque "Add a README file" (já temos um)
4. Clique em **"Create repository"**

### 3️⃣ Conectar Local com GitHub

No terminal, execute (substitua `SEU-USUARIO` pelo seu username do GitHub):

```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/sistema-entrega-sobral.git

# Renomear branch para main
git branch -M main

# Enviar para GitHub
git push -u origin main
```

### 4️⃣ Configurar GitHub Pages

1. No seu repositório no GitHub, clique em **"Settings"**
2. Role para baixo até encontrar **"Pages"** no menu lateral
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"main"**
5. Deixe a pasta como **"/ (root)"**
6. Clique em **"Save"**

### 5️⃣ Aguardar Deploy

- O GitHub levará alguns minutos para processar
- Você verá uma mensagem verde quando estiver pronto
- Seu site estará disponível em: `https://SEU-USUARIO.github.io/sistema-entrega-sobral`

## 🔧 Comandos Úteis

### Atualizar o Site
```bash
# Adicionar mudanças
git add .

# Commit
git commit -m "Atualização do sistema"

# Enviar para GitHub
git push origin main
```

### Verificar Status
```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline
```

## 🌐 URLs Importantes

Após o deploy, você terá:

- **Repositório**: `https://github.com/SEU-USUARIO/sistema-entrega-sobral`
- **Site**: `https://SEU-USUARIO.github.io/sistema-entrega-sobral`

## ⚠️ Problemas Comuns

### Erro de Permissão
Se der erro de permissão, configure seu Git:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Site não Carrega
- Aguarde alguns minutos após o deploy
- Verifique se o arquivo `index.html` está na raiz
- Verifique as configurações do Pages

### Erro 404
- Certifique-se que o repositório é público
- Verifique se o GitHub Pages está habilitado
- Confirme que os arquivos foram enviados corretamente

## 🎯 Próximos Passos

Após o deploy:

1. ✅ Teste todas as funcionalidades
2. ✅ Configure o banco de dados Supabase
3. ✅ Personalize as informações da empresa
4. ✅ Adicione produtos de teste
5. ✅ Compartilhe o link com os usuários

## 📞 Suporte

Se tiver problemas:
1. Verifique a documentação do GitHub Pages
2. Consulte o arquivo `README.md`
3. Verifique os logs no Actions do GitHub

---

🎉 **Parabéns! Seu sistema de delivery está online!**
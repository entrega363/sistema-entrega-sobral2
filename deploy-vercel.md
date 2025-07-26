# 🚀 Deploy no Vercel - Sistema Entrega Sobral

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Vercel CLI** (opcional): `npm i -g vercel`
3. **Git** configurado

## 🌐 Método 1: Deploy via Interface Web (Recomendado)

### Passo 1: Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Conecte sua conta GitHub
4. Selecione o repositório: `sistema-entrega-sobral2`
5. Clique em **"Import"**

### Passo 2: Configurar Projeto
```json
Project Name: sistema-entrega-sobral
Framework Preset: Other
Root Directory: ./
Build Command: (deixe vazio)
Output Directory: (deixe vazio)
Install Command: (deixe vazio)
```

### Passo 3: Variáveis de Ambiente (Opcional)
```
NODE_ENV=production
```

### Passo 4: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Acesse sua URL: `https://sistema-entrega-sobral.vercel.app`

## 💻 Método 2: Deploy via CLI

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Login
```bash
vercel login
```

### Passo 3: Deploy
```bash
# Deploy de teste
vercel

# Deploy de produção
vercel --prod
```

## 🔗 URLs Personalizadas

Após o deploy, suas URLs serão:

### 🏠 URLs Principais
- **Home**: https://sistema-entrega-sobral.vercel.app
- **Admin**: https://sistema-entrega-sobral.vercel.app/admin
- **App Base**: https://sistema-entrega-sobral.vercel.app/app

### 📱 URLs das Versões Enhanced
- **v1.0**: https://sistema-entrega-sobral.vercel.app/v1
- **v2.0**: https://sistema-entrega-sobral.vercel.app/v2
- **v3.0**: https://sistema-entrega-sobral.vercel.app/v3
- **v4.0 PWA**: https://sistema-entrega-sobral.vercel.app/v4
- **PWA Direct**: https://sistema-entrega-sobral.vercel.app/pwa

## ⚙️ Configurações Avançadas

### Custom Domain (Opcional)
1. No painel Vercel, vá em **Settings > Domains**
2. Adicione seu domínio: `entregasobral.com.br`
3. Configure DNS conforme instruções

### Environment Variables
```
VERCEL_ENV=production
NEXT_PUBLIC_APP_NAME=Sistema Entrega Sobral
NEXT_PUBLIC_VERSION=4.0.0
```

## 🔧 Troubleshooting

### Problema: PWA não funciona
**Solução**: Certifique-se que o site está em HTTPS (Vercel faz automaticamente)

### Problema: Service Worker não carrega
**Solução**: Verifique os headers no `vercel.json`

### Problema: 404 em rotas
**Solução**: Verifique as rotas no `vercel.json`

## 📊 Monitoramento

### Analytics (Opcional)
1. Ative Vercel Analytics no painel
2. Monitore performance e acessos
3. Veja métricas de PWA

### Logs
```bash
vercel logs [deployment-url]
```

## 🚀 Deploy Automático

### GitHub Integration
- **Push para main** → Deploy automático
- **Pull Request** → Preview deploy
- **Merge** → Deploy de produção

### Webhook (Opcional)
Configure webhooks para deploy em eventos específicos.

## 📱 Testando o PWA

Após deploy, teste:

1. **Acesse**: https://sistema-entrega-sobral.vercel.app/pwa
2. **Login**: maria@teste.com / 123456
3. **Instale PWA** quando aparecer o banner
4. **Teste offline** desconectando internet
5. **Teste pagamentos** com cupons: BEMVINDO10

## 🎯 Vantagens do Vercel

- ✅ **Deploy automático** via Git
- ✅ **HTTPS gratuito** (necessário para PWA)
- ✅ **CDN global** para performance
- ✅ **Preview deploys** para PRs
- ✅ **Analytics integrado**
- ✅ **Domínio personalizado** gratuito
- ✅ **Rollback fácil** de versões

## 📞 Suporte

- **Documentação**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel](https://github.com/vercel/vercel)
- **Discord**: [vercel.com/discord](https://vercel.com/discord)

---

🚀 **Seu sistema estará online em minutos com performance global!**
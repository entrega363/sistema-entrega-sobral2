# 🚚 Sistema Entrega Sobral

Sistema completo de delivery para gerenciamento de entregadores, empresas e pedidos em Sobral-CE.

## 📋 Sobre o Projeto

O **Sistema Entrega Sobral** é uma plataforma web completa para gerenciamento de delivery que conecta empresas, entregadores e clientes em um sistema integrado e eficiente.

### ✨ Funcionalidades Principais

- **👨‍💼 Painel Administrativo**: Aprovação de usuários, gerenciamento completo do sistema
- **🏢 Gestão Empresarial**: Cadastro de produtos, gerenciamento de pedidos
- **🏍️ Sistema de Entrega**: Interface para entregadores, controle de rotas
- **🛒 Marketplace**: Catálogo de produtos, carrinho de compras, avaliações

### 🎯 Usuários do Sistema

1. **Administradores**: Controle total do sistema
2. **Empresas**: Restaurantes e estabelecimentos
3. **Entregadores**: Profissionais de delivery
4. **Clientes**: Consumidores finais

## 🚀 Como Usar

### Acesso Rápido
1. Abra o arquivo `index.html` no navegador
2. Ou acesse: [Sistema Entrega Sobral](https://seu-usuario.github.io/sistema-entrega-sobral2)

### Contas de Teste

| Tipo | Usuário | Senha |
|------|---------|-------|
| 👨‍💼 Admin | `admin` | `tenderbr0` |
| 🏍️ Entregador | `joao@teste.com` | `123456` |
| 🏢 Empresa | `pizza@teste.com` | `123456` |

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18.2.0 (via CDN)
- **Styling**: Tailwind CSS
- **Estado**: localStorage + React Hooks
- **Banco**: Supabase (configurável)
- **Deploy**: GitHub Pages

## 📱 Funcionalidades por Usuário

### 👨‍💼 Administrador
- Aprovação de empresas e entregadores
- Gerenciamento de usuários
- Estatísticas do sistema
- Controle de pedidos

### 🏢 Empresas
- Cadastro de produtos
- Gerenciamento de pedidos
- Controle de estoque
- Relatórios de vendas

### 🏍️ Entregadores
- Visualização de pedidos disponíveis
- Aceitar/rejeitar entregas
- Controle de status
- Histórico de entregas

### 🛒 Clientes
- Navegação no marketplace
- Carrinho de compras
- Acompanhamento de pedidos
- Sistema de avaliações

## 🔧 Configuração do Banco de Dados

O sistema suporta múltiplos bancos de dados:

- MySQL
- PostgreSQL
- MongoDB
- SQLite
- **Supabase** (recomendado)

### Configuração Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Configure as tabelas necessárias
4. Atualize as credenciais em `database-config.js`

## 📦 Estrutura do Projeto

```
sistema-entrega-sobral/
├── index.html              # Página inicial com redirecionamento
├── delivery-app.html       # Aplicação principal
├── database-config.js      # Configuração do banco
├── component.js           # Componente React compilado
├── component.jsx          # Componente React fonte
├── README.md              # Documentação
└── .gitignore            # Arquivos ignorados pelo Git
```

## 🌐 Deploy

### GitHub Pages
1. Faça fork do repositório
2. Vá em Settings > Pages
3. Selecione a branch `main`
4. Acesse via: `https://seu-usuario.github.io/sistema-entrega-sobral2`

### Servidor Local
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Projeto**: Sistema Entrega Sobral
- **Localização**: Sobral - CE, Brasil
- **Tipo**: Sistema de Delivery

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

## 🔄 Atualizações Recentes

- ✅ Sistema de autenticação multi-usuário
- ✅ Interface responsiva
- ✅ Integração com Supabase
- ✅ Sistema de avaliações
- ✅ Controle de estoque
- ✅ Relatórios em tempo real

## 🎨 Screenshots

*Em breve: capturas de tela das principais funcionalidades*

## 🚧 Roadmap

- [ ] App mobile (React Native)
- [ ] Notificações push
- [ ] Integração com pagamentos
- [ ] Sistema de cupons
- [ ] Chat em tempo real
- [ ] Rastreamento GPS
# Documento de Requisitos - Sistema de Delivery Completo

## Introdução

O Sistema de Delivery Completo é uma plataforma abrangente que conecta restaurantes, entregadores e clientes em um ecossistema integrado de entrega de comida. O sistema deve gerenciar todo o ciclo de vida de pedidos, desde a navegação do cliente até a entrega final, incluindo painéis administrativos para diferentes tipos de usuários.

## Requisitos

### Requisito 1 - Gestão de Usuários Multi-perfil

**História do Usuário:** Como administrador do sistema, eu quero gerenciar diferentes tipos de usuários (clientes, restaurantes, entregadores, administradores), para que cada um tenha acesso às funcionalidades apropriadas ao seu papel.

#### Critérios de Aceitação

1. QUANDO um usuário se registra ENTÃO o sistema DEVE permitir seleção entre os tipos: cliente, restaurante, entregador
2. QUANDO um administrador acessa o painel ENTÃO o sistema DEVE exibir lista de usuários pendentes de aprovação
3. QUANDO um usuário faz login ENTÃO o sistema DEVE redirecionar para o painel apropriado baseado no seu tipo
4. SE um usuário não está aprovado ENTÃO o sistema DEVE bloquear acesso às funcionalidades principais

### Requisito 2 - Catálogo de Produtos e Restaurantes

**História do Usuário:** Como cliente, eu quero navegar por restaurantes e seus produtos, para que eu possa escolher o que desejo pedir.

#### Critérios de Aceitação

1. QUANDO um cliente acessa o marketplace ENTÃO o sistema DEVE exibir lista de restaurantes disponíveis
2. QUANDO um cliente seleciona um restaurante ENTÃO o sistema DEVE mostrar o cardápio com produtos, preços e descrições
3. QUANDO um restaurante adiciona um produto ENTÃO o sistema DEVE permitir upload de imagem, definição de preço, categoria e disponibilidade
4. SE um produto está indisponível ENTÃO o sistema DEVE exibir status visual claro para o cliente

### Requisito 3 - Gestão de Pedidos

**História do Usuário:** Como cliente, eu quero fazer pedidos e acompanhar seu status, para que eu saiba quando minha comida chegará.

#### Critérios de Aceitação

1. QUANDO um cliente adiciona itens ao carrinho ENTÃO o sistema DEVE calcular subtotal, taxas e total automaticamente
2. QUANDO um cliente finaliza pedido ENTÃO o sistema DEVE gerar número único de pedido e notificar o restaurante
3. QUANDO o status do pedido muda ENTÃO o sistema DEVE notificar cliente e entregador em tempo real
4. QUANDO um pedido é criado ENTÃO o sistema DEVE armazenar endereço de entrega, itens, valores e horário

### Requisito 4 - Sistema de Entrega

**História do Usuário:** Como entregador, eu quero receber e gerenciar pedidos de entrega, para que eu possa completar as entregas de forma eficiente.

#### Critérios de Aceitação

1. QUANDO um pedido está pronto ENTÃO o sistema DEVE notificar entregadores disponíveis na região
2. QUANDO um entregador aceita um pedido ENTÃO o sistema DEVE atualizar status e remover da lista de disponíveis
3. QUANDO um entregador inicia entrega ENTÃO o sistema DEVE permitir atualização de status (saiu para entrega, entregue)
4. SE um entregador não responde em tempo determinado ENTÃO o sistema DEVE realocar pedido para outro entregador

### Requisito 5 - Painel Administrativo para Restaurantes

**História do Usuário:** Como dono de restaurante, eu quero gerenciar meus produtos e pedidos, para que eu possa operar meu negócio eficientemente.

#### Critérios de Aceitação

1. QUANDO um restaurante acessa seu painel ENTÃO o sistema DEVE exibir pedidos pendentes, em preparo e prontos
2. QUANDO um restaurante recebe novo pedido ENTÃO o sistema DEVE notificar com som e exibir detalhes completos
3. QUANDO um restaurante atualiza status do pedido ENTÃO o sistema DEVE sincronizar com cliente e entregador
4. QUANDO um restaurante gerencia cardápio ENTÃO o sistema DEVE permitir adicionar, editar, remover e alterar disponibilidade de produtos

### Requisito 6 - Sistema de Avaliações

**História do Usuário:** Como cliente, eu quero avaliar restaurantes e entregadores, para que outros usuários tenham referência de qualidade.

#### Critérios de Aceitação

1. QUANDO um pedido é entregue ENTÃO o sistema DEVE solicitar avaliação do restaurante e entregador
2. QUANDO um cliente submete avaliação ENTÃO o sistema DEVE armazenar nota (1-5 estrelas) e comentário opcional
3. QUANDO um usuário visualiza restaurante ENTÃO o sistema DEVE exibir média de avaliações e comentários recentes
4. SE uma avaliação é muito negativa ENTÃO o sistema DEVE alertar administradores para revisão

### Requisito 7 - Configuração de Banco de Dados

**História do Usuário:** Como administrador técnico, eu quero configurar diferentes tipos de banco de dados, para que o sistema possa se adaptar a diferentes ambientes de implantação.

#### Critérios de Aceitação

1. QUANDO o sistema é configurado ENTÃO o sistema DEVE suportar MySQL, PostgreSQL, MongoDB, SQLite e Supabase
2. QUANDO Supabase é selecionado ENTÃO o sistema DEVE validar URL e chave de API fornecidas
3. QUANDO a configuração é salva ENTÃO o sistema DEVE testar conexão antes de confirmar
4. SE a conexão falha ENTÃO o sistema DEVE exibir mensagem de erro específica e manter configuração anterior

### Requisito 8 - Persistência de Estado

**História do Usuário:** Como usuário do sistema, eu quero que meus dados sejam mantidos entre sessões, para que eu não perca informações importantes.

#### Critérios de Aceitação

1. QUANDO um usuário faz alterações ENTÃO o sistema DEVE salvar automaticamente no localStorage
2. QUANDO um usuário recarrega a página ENTÃO o sistema DEVE restaurar estado anterior usando useStoredState
3. QUANDO dados são alterados em uma aba ENTÃO o sistema DEVE sincronizar com outras abas abertas via eventos customizados
4. SE localStorage está cheio ENTÃO o sistema DEVE limpar dados antigos automaticamente
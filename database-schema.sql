-- Schema do banco de dados para Sistema Entrega Sobral

-- Tabela de usuários (entregadores)
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'entregador',
    status VARCHAR(50) DEFAULT 'pendente',
    telefone VARCHAR(20),
    cpf VARCHAR(14),
    veiculo VARCHAR(255),
    placa VARCHAR(10),
    disponivel BOOLEAN DEFAULT true,
    total_entregas INTEGER DEFAULT 0,
    cadastrado_em TIMESTAMP DEFAULT NOW(),
    aprovado_em TIMESTAMP,
    alterado_em TIMESTAMP
);

-- Tabela de empresas
CREATE TABLE empresas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'empresa',
    status VARCHAR(50) DEFAULT 'pendente',
    cnpj VARCHAR(18),
    telefone VARCHAR(20),
    categoria VARCHAR(100),
    endereco TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    cadastrado_em TIMESTAMP DEFAULT NOW(),
    aprovado_em TIMESTAMP,
    alterado_em TIMESTAMP
);

-- Tabela de administradores
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'admin',
    status VARCHAR(50) DEFAULT 'ativo',
    cadastrado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    telefone VARCHAR(20),
    whatsapp_cliente VARCHAR(20),
    valor DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'disponivel',
    items TEXT NOT NULL,
    observacoes TEXT,
    bairro VARCHAR(100),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    empresa_id UUID REFERENCES empresas(id),
    empresa_nome VARCHAR(255),
    entregador_id UUID REFERENCES users(id),
    criado_em TIMESTAMP DEFAULT NOW(),
    aceito_em TIMESTAMP,
    entregue_em TIMESTAMP
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(50) DEFAULT 'pendente',
    metodo_pagamento VARCHAR(50),
    comprovante TEXT,
    criado_em TIMESTAMP DEFAULT NOW(),
    processado_em TIMESTAMP
);

-- Inserir admin padrão
INSERT INTO admins (nome, email, senha, tipo, status) 
VALUES ('Administrador', 'admin', 'tenderbr0', 'admin', 'ativo');

-- Inserir dados de exemplo
INSERT INTO users (nome, email, senha, telefone, cpf, veiculo, placa, status, total_entregas) 
VALUES 
('João Entregador', 'joao@teste.com', '123456', '(88) 99999-1234', '123.456.789-00', 'Moto Honda CG 160', 'ABC-1234', 'ativo', 15),
('Maria Entregadora', 'maria@teste.com', '123456', '(88) 98888-5678', '987.654.321-00', 'Moto Yamaha Factor', 'XYZ-5678', 'pendente', 0);

INSERT INTO empresas (nome, email, senha, cnpj, telefone, categoria, endereco, status) 
VALUES 
('Pizza do Zé', 'pizza@teste.com', '123456', '12.345.678/0001-90', '(88) 3611-1234', 'Pizzaria', 'Rua Coronel Mont''Alverne, 500 - Centro', 'ativo'),
('Lanchonete do João', 'lanche@teste.com', '123456', '98.765.432/0001-10', '(88) 3622-5678', 'Lanchonete', 'Av. Dom José, 200 - Dom Expedito', 'pendente');

-- Inserir pedidos de exemplo
INSERT INTO pedidos (cliente, endereco, telefone, valor, status, items, empresa_id, empresa_nome) 
VALUES 
('Maria Silva', 'Rua das Flores, 123 - Centro', '(88) 99999-5678', 45.90, 'disponivel', 'Pizza Margherita, Coca-Cola 2L', (SELECT id FROM empresas WHERE email = 'pizza@teste.com'), 'Pizza do Zé'),
('João Santos', 'Av. Dom José, 456 - Dom Expedito', '(88) 98888-1234', 32.50, 'aceito', 'Pizza Calabresa, Guaraná', (SELECT id FROM empresas WHERE email = 'pizza@teste.com'), 'Pizza do Zé'),
('Ana Costa', 'Rua Travessa da Sé, 789 - Centro', '(88) 97777-9999', 28.75, 'entregue', 'X-Burger, Batata Frita, Refrigerante', (SELECT id FROM empresas WHERE email = 'lanche@teste.com'), 'Lanchonete do João');

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_empresas_email ON empresas(email);
CREATE INDEX idx_empresas_status ON empresas(status);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_empresa ON pedidos(empresa_id);
CREATE INDEX idx_pedidos_entregador ON pedidos(entregador_id);
CREATE INDEX idx_pagamentos_usuario ON pagamentos(usuario_id, tipo_usuario);
CREATE INDEX idx_pagamentos_status ON pagamentos(status);
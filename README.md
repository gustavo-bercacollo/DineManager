# API Restaurant

Este projeto é uma API RESTful desenvolvida para gerenciar o funcionamento de um restaurante. A API permite a criação, atualização, visualização e exclusão de pedidos, produtos e sessões de mesas, facilitando a organização e automação das operações internas do restaurante.

## Funcionalidades

A API oferece as seguintes funcionalidades:

- **Gerenciamento de Pedidos (Orders):**
  - Listar todos os pedidos.
  - Criar um novo pedido.
  - Visualizar detalhes de um pedido específico.

- **Gerenciamento de Produtos (Products):**
  - Listar todos os produtos disponíveis.
  - Adicionar novos produtos ao sistema.

- **Gerenciamento de Mesas (Tables):**
  - Criar sessões para mesas.
  - Gerenciar o estado das mesas, incluindo abertura e fechamento de sessões.

## Estrutura do Projeto

A estrutura de pastas foi organizada para facilitar o desenvolvimento e manutenção da API:

```plaintext
API-RESTAURANT
├── src
│   ├── controllers              # Controladores para cada entidade (Pedidos, Produtos e Mesas)
│   │   ├── orders-controller.ts       # Lógica de negócios para pedidos
│   │   ├── products-controller.ts     # Lógica de negócios para produtos
│   │   ├── tables-controller.ts       # Lógica de negócios para mesas
│   │   └── tables-sessions-controller.ts # Lógica para sessões de mesas
│   │
│   ├── database                 # Configurações e scripts do banco de dados
│   │   ├── migrations                 # Arquivos de migração para criação de tabelas
│   │   │   ├── YYYYMMDDHHMMSS_create-products.ts        # Migração para criar a tabela de produtos
│   │   │   ├── YYYYMMDDHHMMSS_create-tables.ts          # Migração para criar a tabela de mesas
│   │   │   ├── YYYYMMDDHHMMSS_create-tables-sessions.ts # Migração para criar sessões de mesas
│   │   │   └── YYYYMMDDHHMMSS_create-orders.ts          # Migração para criar a tabela de pedidos
│   │   ├── seeds                     # Scripts de sementes para popular o banco de dados com dados iniciais
│   │   │   ├── insert-products.ts        # Seed para adicionar produtos iniciais
│   │   │   ├── insert-tables.ts          # Seed para adicionar mesas iniciais
│   │   ├── types                     # Definições de tipos (TypeScript)
│   │   │   ├── order-repository.d.ts         # Tipos para o repositório de pedidos
│   │   │   ├── products-repository.d.ts      # Tipos para o repositório de produtos
│   │   │   ├── table-repository.d.ts         # Tipos para o repositório de mesas
│   │   │   └── tables-sessions-repository.d.ts # Tipos para o repositório de sessões de mesas
│   │   ├── database.db               # Arquivo do banco de dados SQLite
│   │   └── databaseConfig.ts         # Configuração da conexão com o banco de dados
│   │
│   ├── middlewares              # Middlewares para tratamento de erros
│   │   └── error-handling.ts         # Middleware para tratamento de erros
│   │
│   ├── routes                   # Definição das rotas da API
│   │   ├── index.ts                   # Rota principal para organização das subrotas
│   │   ├── orders-routes.ts           # Rotas para pedidos
│   │   ├── products-routes.ts         # Rotas para produtos
│   │   ├── tables-routes.ts           # Rotas para mesas
│   │   └── tables-sessions-routes.ts  # Rotas para sessões de mesas
│   │
│   ├── utils                    # Utilitários e helpers
│   │   └── AppError.ts               # Classe de tratamento de erros personalizados
│   │
│   ├── server.ts                # Arquivo principal para inicialização do servidor
│
├── .gitignore                   # Arquivos e pastas ignorados pelo Git
├── knexfile.ts                  # Configuração do Knex.js
├── package.json                 # Dependências e scripts do projeto
├── tsconfig.json                # Configuração do TypeScript
└── README.md                    # Documentação do projeto 
```

## Configuração do Banco de Dados
Este projeto utiliza o Knex.js como query builder e um banco de dados SQLite para armazenar os dados. A configuração do banco de dados pode ser ajustada no arquivo knexfile.ts e databaseConfig.ts.

```
npx knex migrate:latest     # Executa as migrações
npx knex seed:run           # Executa as sementes
```

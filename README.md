
# DineManager


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

Este projeto utiliza o [Knex.js](http://knexjs.org/) como query builder e um banco de dados SQLite para armazenar os dados. A configuração do banco de dados pode ser ajustada no arquivo `knexfile.ts` e `databaseConfig.ts`.

Para criar as tabelas e popular o banco com dados iniciais, execute:

```bash
npx knex migrate:latest     # Executa as migrações
npx knex seed:run           # Executa as sementes
```

## Scripts Disponíveis
Este projeto inclui os seguintes scripts para facilitar o desenvolvimento e a gestão da API:

-`dev`: Inicia o servidor em modo de desenvolvimento, utilizando tsx para monitoramento de mudanças (hot-reload). Isso permite que você veja as atualizações no código em tempo real, sem a necessidade de reiniciar o servidor manualmente.
```bash 
npm run dev
```
- `knex`: Executa o CLI do Knex.js, permitindo que você utilize comandos relacionados à migração e manipulação do banco de dados diretamente do terminal.
```bash 
npm run knex <comando>
```

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/gustavo-bercacollo/first-code-HTML-CSS.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados e execute as migrações:

   ```bash
   npx knex migrate:latest
   npx knex seed:run
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

5. A API estará disponível em `http://localhost:3000`.

## Rotas da API

#### Produtos (`/products`)
- **GET `/products`**  
  Retorna todos os produtos disponíveis.

- **POST `/products`**  
  Cria um novo produto.  
  

- **PUT `/products/{id}`**  
  Atualiza um produto existente.  


- **DELETE `/products/{id}`**  
  Remove um produto pelo seu ID.

#### Mesas (`/tables`)
- **GET `/tables`**  
  Retorna todas as mesas disponíveis.específica.

#### Sessões de Mesas (`/table-sessions`)
- **GET `/table-sessions`**  
  Retorna todas as sessões de mesas.

- **POST `/table-sessions`**  
  Abre uma nova sessão para uma mesa específica.  

- **PATCH `/table-sessions/{id}`**  
  Fecha uma sessão específica de mesa.

#### Pedidos (`/orders`)
- **GET `/orders/table-session/{table_session_id}`**  
  Retorna todos os pedidos para uma sessão de mesa específica, ordenados por data de criação (descendente).

- **POST `/orders`**  
  Cria um novo pedido para uma sessão de mesa.  

- **GET `/orders/table-session/{table_session_id}/total`**  
  Retorna o total dos pedidos de uma sessão de mesa específica.

## Configuração de Testes com Insomnia

Este projeto inclui um arquivo de requests do Insomnia que pode ser usado para testar as rotas da API de forma simples e intuitiva. O arquivo contém exemplos de chamadas de API para cada uma das funcionalidades disponíveis, facilitando o teste e a validação do comportamento da aplicação.

- **Arquivo de Requests**: `requests_insomnia.json`

Para usar o arquivo:

**1**. Abra o Insomnia.
**2**. Importe o arquivo `requests_insomnia.json` através da opção de importação.
**3**. Utilize os requests disponíveis para testar as funcionalidades da API, como listar produtos, criar pedidos e gerenciar mesas.

## Tratamento de Erros

O projeto utiliza uma classe personalizada `AppError` para gerenciar erros, e um middleware em `middlewares/error-handling.ts` para capturar e formatar os erros antes de enviá-los como resposta ao cliente.

## Tecnologias Utilizadas

- **Node.js** e **Express**: Plataforma e framework para construção da API.
- **TypeScript**: Para tipagem estática e maior segurança no código.
- **Knex.js**: Query builder para manipulação do banco de dados SQLite.
- **SQLite**: Banco de dados relacional leve para armazenamento dos dados.
- **Zod**: Biblioteca de validação para garantir integridade dos dados recebidos.

## Próximos Passos

- Implementar autenticação e autorização de usuários.
- Adicionar testes automatizados para a API.
- Melhorar o tratamento de erros e validações de entrada.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Envie um pull request ou abra uma issue para reportar problemas e sugerir melhorias.

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

- **Gustavo Berçacollo Vilela** - [GitHub](https://github.com/gustavo-bercacollo)

## Contato
Para dúvidas ou sugestões, entre em contato:   
📩 Email: gustavovilela802@gmail.com. 
💼 Linkedin: https://www.linkedin.com/in/gustavo-ber%C3%A7acollo-vilela-1b899125b/

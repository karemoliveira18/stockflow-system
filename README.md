# StockFlow

Sistema web full stack para gestão de estoque de pequenos e médios comércios.

## Objetivo

Controlar produtos, categorias, entradas e saídas de mercadorias, com autenticação, autorização e histórico de movimentações.

## Problema solucionado

Organizar o estoque em tempo real, evitar erros de registro e manter a consistência do inventário.

## Público-alvo

Lojas, varejistas, pequenos negócios e empresas com operações de estoque e controle de itens.

## Funcionalidades

- Cadastro e login de usuários
- Autenticação JWT
- CRUD de produtos
- CRUD de categorias
- Registro de entradas e saídas
- Validação de estoque na saída
- Dashboard com indicadores
- Histórico de movimentações
- Interface responsiva em React + Tailwind

## Tecnologias e versões

- Node.js
- Express
- Prisma ORM 7.10.0
- @prisma/client 7.10.0
- MySQL
- React
- Vite
- Tailwind CSS 4.3.0
- JWT
- bcryptjs

## Estrutura de diretórios

```text
stockflow-system/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── README.md
├── .gitignore
└── .env.example
```

## Instalação

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Configuração do banco

Crie um banco MySQL e configure a variável DATABASE_URL no arquivo backend/.env.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/stockflow"
JWT_SECRET="trocar-por-valor-seguro"
PORT=4000
CLIENT_URL="http://localhost:5173"
```

## Migrações

```bash
cd backend
npx prisma migrate dev --name init
```

## Execução

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Endpoints principais

- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/categories
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id
- GET /api/movements
- POST /api/movements/entry
- POST /api/movements/exit

## Aplicação publicada

A aplicação deve ser publicada com backend em Render, frontend em Vercel e banco MySQL em ambiente de produção.

## Licenças de componentes externos

- React: MIT
- Vite: MIT
- Tailwind CSS: MIT
- Prisma: Apache 2.0
- Express: MIT
- Lucide React: ISC

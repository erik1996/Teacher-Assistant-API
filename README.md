```md
# Teacher-Assistant-API

A backend application built with [NestJS](https://nestjs.com/) and TypeScript.

## 📁 Project Structure

Teacher-Assistant-API/
├── src/ # Main source code
│ ├── modules/ # Feature modules
│ └── db/data-source.ts # TypeORM data source configuration
├── dist/ # Compiled output
├── .env # Environment variables
├── Dockerfile # Docker container definition
├── docker-compose.yml # Docker Compose setup
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v18+ recommended) – if running locally without Docker
- PostgreSQL – included via Docker

### Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL=postgres://postgres:postgres@db:5432/teacher_assitant_api
JWT_SECRET=your_jwt_secret
...
```

## 🐳 Running with Docker

```bash
docker-compose up --build
```

This will:

- Start the NestJS app (`Teacher-Assitant-API`)
- Start PostgreSQL database (`db`)
- Use the `DATABASE_URL` from `.env` to connect the app to the DB

## 🛠 Local Development (Optional)

If you prefer running locally (outside Docker):

```bash
# Install dependencies
yarn install

# Start in dev mode
yarn start:dev
```

## 🏗 Build

```bash
yarn build
```

## 🚀 Run in Production

```bash
yarn start:prod
```

## 🔧 Useful Commands

```bash
# Format code
yarn format

# Lint and auto-fix
yarn lint

# Seed the database
yarn seed:all

# Run database migrations
yarn migration:run

# Generate a new migration
yarn migration:generate src/db/migrations/AddUserTable
```

> 🔍 Make sure `src/lib/data-source.ts` is correctly configured for your migration context.

## 🔐 Authentication

Supports:

- JWT-based authentication for protected routes

## 🧰 Tech Stack

- **NestJS** – Node.js framework
- **TypeORM** – ORM for PostgreSQL
- **Passport.js** – Authentication
- **JWT** – Token-based authentication
- **Docker** – Containerization
- **Prettier + ESLint** – Code formatting and linting

# 🛍️ Jala Sales API

A simplified marketplace API for Jala Sales.

## ✨ Features

- 🔐 Auth with Credentials and Google
- 👥 RBAC (Role-based access control)
- 💰 Sales and purchases
- 💬 Real-time chatting
- 🛒 Checkout process
- 📦 Logistic features

## 🔧 Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Docker](https://www.docker.com/)
- [Socket.io](https://socket.io/)

## 💻 Software Requirements

To run this project, you'll need:

- Docker
- Docker Compose

## 🚀 Run Locally

### Prerequisites

- Ensure all software requirements listed above are installed on your machine.
- A `.env.local` and `.env.docker` file containing the necessary environment variables for the application. This file should be located in the project root directory (or in the current directory when running the command). See more below.

### Initial Setup

1. Create a folder for the project

    ```bash
    mkdir jala-sales-api
    ```

2. Navigate to project directory

    ```bash
    cd jala-sales-api
    ```

3. Create environment files

    Copy and paste the following code into the `.env.local` file:

    ```markdown
    # env.local
    DATABASE_URL=postgresql://docker:docker@jala-sales-db:5432/jala_sales_db

    AUTH_SECRET=super_secret
    AUTH_EXPIRES_IN=2m

    PORT=3333
    HOST=0.0.0.0
    NODE_ENV=development
    ```

    Copy and paste the following code into the `.env.docker` file:

    ```markdown
    # env.docker
    POSTGRESQL_USERNAME=docker
    POSTGRESQL_PASSWORD=docker
    POSTGRESQL_DATABASE=jala_sales_db
    ```

### Docker Setup

Follow the steps below to set up and run the application in a Docker container using the image hosted in the GitLab Registry.

#### 1. Create Docker Network

```bash
docker network create jala-sales-network
```

#### 2. Start Database Container

> Note: Make sure that you are running this command from the project root directory.

```bash
docker run -d --name jala-sales-db --env-file .env.docker --network jala-sales-network -p 5432:5432 bitnami/postgresql:16
```

#### 3. Steps to Run the Backend Container

1. **Pull the Image from the GitLab Registry**

   First, log in to the GitLab Registry. This is required to pull the image from a private repository.

   ```bash
   docker login registry.gitlab.com
   ```

2. **Run the Container with Environment Variables and Network**

    > Note: Make sure that you are running this command from the project root directory.

   ```bash
   docker run -d --name jala-sales-api --env-file .env.local --network jala-sales-network -p 3333:3333 registry.gitlab.com/jala-university1/cohort-1/oficial-pt-desenvolvimento-de-software-4-iso-223.ga.t2.24.m2/se-o-b/capybara-coders/jala-sales-api:latest
   ```

   This command does the following:
   - Loads environment variables from the `.env.local` file into the container.
   - Maps port `3333` on the host to port `3333` on the container (adjust if needed).
   - Starts the container using the specified image.

3. **Access the Application**

   Once started, the application should be available at `http://localhost:3333/docs`.

#### Verify network connections

```bash
docker network inspect jala-sales-network
```

#### Note

Ensure that your `.env.local` file is up-to-date and contains all necessary environment variables required for the application to function correctly.

### 🔍 Verifying Setup

To verify everything is working correctly:

1. Server should be running on port 3333
2. Visit `http://localhost:3333/docs` to check API documentation
3. All Docker containers should be active (check with `docker container ls`)

### 🛠️ Useful Commands

```bash
# Stop all containers
docker-compose down

# Run tests
pnpm test

# Check code quality
pnpm lint

# Format code
pnpm format
```

## 🗺️ Roadmap

- [x] Main documentation
- [x] Authentication & Authorization
- [x] Data model
- [ ] Admin actions
- [ ] Seller actions
- [ ] Checkout order
- [ ] Implementing chat

## 🤝 Contributions

This project uses **Lefthook**, **Commitlint**, and **Commitizen** to maintain code and commit message consistency.

### Commit Process

1. **Lefthook**:
   - When running `git commit` without a message, **Commitizen** will guide you
   - **Commitlint** will validate the message format
   - **Biome** will automatically format code before commit

2. **How to Commit**:
   - Add files with `git add`
   - Run `git commit` (without message)
   - Fill in **type** and **message** in **Commitizen**
   - Everything else is automated!

## 👥 Authors

- [@patrick-ts](https://gitlab.com/patrick-ts)
- [@Iure_Lima](https://gitlab.com/Iure_Lima)
- [@lazaroclaudino](https://gitlab.com/lazaroclaudino)
- [@HadjaLorena](https://gitlab.com/HadjaLorena)
- [@ElisaDrumond](https://gitlab.com/ElisaDrumond)

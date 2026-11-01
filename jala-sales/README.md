# 🛍️ Jala Sales Front-end

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## 📋 Requirements

Before you begin, ensure you have the following installed:

- 💻 Node.js (v20 or higher)
- ⚡ pnpm (v9.0.0 or higher)

## 🔥 Features

- ⚡ Next.js 14 with App Router
- 💅 TailwindCSS for styling
- 🔒 NextAuth v5
- 📱 Responsive design
- 🌐 Server Actions

### Development Tools

- 🎨 TailwindCSS (v3.0.0 or higher)
- 🔧 TypeScript (v5.0.0 or higher)
- 📝 Editor with TypeScript support recommended (VS Code, WebStorm, etc.)

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd <your-project-name>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result** 🌐

### Docker Setup

Follow the steps below to set up and run the application in a Docker container using the image hosted in the GitLab Registry.

#### 1. Create Docker Network

```bash
docker network create jala-sales-network
```

#### 2. Steps to Run the Backend Container

1. **Pull the Image from the GitLab Registry**

   First, log in to the GitLab Registry. This is required to pull the image from a private repository.

   ```bash
   docker login registry.gitlab.com
   ```

2. **Run the Container with Environment Variables and Network**

   ```bash
   docker run -d --name jala-sales --env-file .env.local --network jala-sales-network -p 3333:3333 registry.gitlab.com/jala-university1/cohort-1/oficial-pt-desenvolvimento-de-software-4-iso-223.ga.t2.24.m2/se-o-b/capybara-coders/jala-sales:latest
   ```

   This command does the following:
  - Loads environment variables from the `.env.local` file into the container.
  - Maps port `3000` on the host to port `3000` on the container (adjust if needed).
  - Starts the container using the specified image.

3. **Access the Application**

   Once started, the application should be available at `http://localhost:3000`.

#### Verify network connections

```bash
docker network inspect jala-sales-network
```

#### Note

Ensure that your `.env.local` file is up-to-date and contains all necessary environment variables required for the application to function correctly.

## 📦 Project Structure

```
src/
├── app/          # App router pages
├── components/   # Reusable UI components
├── lib/         # Utility functions and libraries
└── types/       # TypeScript type definitions
```

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run Biome Linter
- `npm run format` - Format code with Biome

## 🎓 Learn More

To learn more about Next.js, take a look at the following resources:

- 📚 [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- 👨‍💻 [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

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

## 📤 Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 👥 Authors

- [@patrick-ts](https://gitlab.com/patrick-ts)
- [@Iure_Lima](https://gitlab.com/Iure_Lima)
- [@lazaroclaudino](https://gitlab.com/lazaroclaudino)
- [@HadjaLorena](https://gitlab.com/HadjaLorena)
- [@ElisaDrumond](https://gitlab.com/ElisaDrumond)

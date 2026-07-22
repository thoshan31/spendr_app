# Spendr

Spendr is a full-stack expense management application built with **Vite**, **React**, **Tailwind CSS**, **Bun**, and **Prisma**. It features a modern frontend, a Bun-powered backend, and a Prisma-based database layer designed for scalability and maintainability.

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- TypeScript

### Backend
- Bun

### Database
- Prisma ORM

---

## Project Structure

```
Spendr/
│
├── src/
│   ├── components/          # Feature-specific React components
│   ├── components/ui/       # Reusable UI components
│   ├── generated/           # Auto-generated SDKs, routes, and types
│   ├── lib/                 # Shared utilities and helper functions
│   ├── App.tsx              # Root application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
│
├── prisma/
│   └── schema.prisma        # Database schema
│
├── scripts/                 # Internal automation and generation scripts
│
├── server.tsx               # Bun server entry point
├── custom-routes.ts         # Custom server routes
│
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # Tailwind/PostCSS configuration
├── prisma.config.ts         # Prisma configuration
└── shogo.config.json        # Shogo generation settings
```

---

## Folder Overview

### `src/`
Contains the frontend application.

| File/Folder | Description |
|-------------|-------------|
| `App.tsx` | Main application component |
| `main.tsx` | React application entry point |
| `index.css` | Global styles |
| `components/` | Feature-specific React components |
| `components/ui/` | Reusable UI primitives |
| `generated/` | Auto-generated SDKs, routes, and TypeScript types |
| `lib/` | Shared helper functions, constants, and utilities |

### `prisma/`

| File | Description |
|------|-------------|
| `schema.prisma` | Defines the application's database models and relationships |

### `scripts/`

Contains internal scripts used for automation and code generation.

---

## Server

| File | Description |
|------|-------------|
| `server.tsx` | Runtime server entry point |
| `custom-routes.ts` | Custom server routes mounted alongside generated routes |

---

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, dependencies, and npm scripts |
| `vite.config.ts` | Vite development and build configuration |
| `tsconfig.json` | TypeScript compiler configuration |
| `postcss.config.mjs` | Tailwind CSS and PostCSS configuration |
| `prisma.config.ts` | Prisma runtime configuration |
| `shogo.config.json` | Shogo code generation settings |

---

## Cleanup Performed

The project was cleaned to improve maintainability by:

- Removing legacy and unused artifacts from the previous `files/` directory.
- Preserving all runtime, generated, and configuration files required by the current application.

---

## Installation

Install project dependencies:

```bash
npm install
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the frontend development server |
| `npm run dev:full` | Starts the full development environment |
| `npm run build` | Builds the project for production |
| `npm run start` | Starts the production server |

---

## Running the Project

Start the development server:

```bash
npm run dev
```

Run the complete development environment:

```bash
npm run dev:full
```

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Features

- Modern React + Vite architecture
- Responsive UI built with Tailwind CSS
- Bun-powered backend
- Prisma ORM for database management
- TypeScript support
- Modular and reusable component structure
- Auto-generated SDKs, routes, and types
- Clean and maintainable project organization

---

## License

This project is intended for educational and development purposes.

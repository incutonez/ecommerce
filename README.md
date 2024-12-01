# ecommerce
I wanted to try out React, and I decided to build an example ecommerce site just to get a feel for it.

This repo uses [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces), so installation is done by running `npm i` from the root dir.

## Running App

1. `npm run api` in dedicated terminal
2. `npm run ui` in dedicated terminal
3. Navigate to http://localhost:5173

## Architecture

- SQLite DB
- NestJS back-end
  - [Swagger Module](https://docs.nestjs.com/openapi/introduction)
  - Sequelize ORM
- [typescript-axios](https://openapi-generator.tech/docs/generators/typescript-axios/) OpenAPI generator
  - Used to generate API client for UI
- React 18 front-end
  - TanStack Query
  - TanStack Router
  - TailwindCSS
  - [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) instead of Zustand

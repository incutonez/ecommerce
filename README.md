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

## Thoughts

- I like React's TypeScript support... it feels more natural than Vue
- I dislike that hooks MUST be inside a component or other hook... like I can't use a hook inside of TanStack's loader function... this is helpful if my queryOptions depend on global state
- I dislike how you need to keep track of every single render, and if you have a mutation somewhere, it can keep looping infinitely
  - It's really hard to understand where the multiple renders are occurring, especially with StrictMode, as it causes double rendering by definition
  - Vue gets around this because it mostly uses Proxies under the hood
  - e.g. calling state setters in TanStack's select function causes an initial loop render

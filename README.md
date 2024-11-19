# ecommerce
I wanted to try out React, and I decided to build an example ecommerce site just to get a feel for it.  The back-end is in NestJS, which uses [Swagger](https://docs.nestjs.com/openapi/introduction) to generate the OpenAPI document in the spec dir.  The [Axios TypeScript Generator](https://openapi-generator.tech/docs/generators/typescript-axios/) is used against the spec dir to generate the UI APIs.

This repo uses [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces), so installation is done by running `npm i` from the root dir.

## Running App
1. `npm run api` in dedicated terminal
2. `npm run ui` in dedicated terminal
3. Navigate to http://localhost:5173

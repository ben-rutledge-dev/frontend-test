# Project Overview

This is a mock Point-Of-Sale (POS) application designed to be used as the basis for your frontend technical test. It is a monorepo with 2 projects:

**Frontend**: The frontend is located in the `/app` directory. It is a React+TypeScript application built using Vite.

**BFF**: The Backend-for-Frontend (BFF) API is located in the `/api` directory. It is an Express application built in TypeScript. It contains a set of mocked external services in the `external_services_mock` folder, which are designed to simulate a set of external microservices that the BFF depends on.

## Running the Application

1. open a terminal at the root of the monorepo
2. run `pnpm install` to install all dependencies
3. run `pnpm dev` to start the application
4. go to [http://localhost:3000](http://localhost:3000) to view the application

## Notes

- The simulated backend stores all of its data in-memory - if you accidentally break data integrity, just restart the dev server to reset the database.
- You shouldn't need to modify the `external_services_mock` folder to complete your tasks. If you believe that your solution would be improved by doing so, please mention the changes you'd like to see as part of your test submission.

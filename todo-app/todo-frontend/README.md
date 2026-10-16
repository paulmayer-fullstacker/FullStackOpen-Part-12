# React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is


# Exercises

## Exercise-14:
To complete this exercise, we need to:

- Install testing dependencies:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

- Add a test script to the package.json file:
```json
"test": "vitest run"
```
- Add a test environment configuration to the vite.config.js (so Vitest knows to use jsdom):
```js
test: {
    environment: 'jsdom',
    globals: true,
  },
```
- Extract a todo component into its own file. Todo render script lifted from `src/Todos/List.jsx`, and implemented, for a single todo, in `src/Todos/Todo.jsx`. Refactor the `List.jsx` to exploit the new `Todo.jsx` component. Also, modify `TododView.jsx` to remove cascading synchronous renders linting warnings.

- Write a test for the single todo component, in `src/Todos/Todo.test.jsx`.

- Test stage added to the `todo-frontend` Dockerfile.

- Test:

  - Locally:
  ```bash
  npm test
  ```

  - Within the image build process:
  ```bash
   docker build --no-cache --progress=plain --build-arg VITE_BACKEND_URL=http://localhost:3000 -t todo-frontend .
  ```

   Note:

   `--no-cache` to build image a new.

    `--progress=plain` to view console log messages.


  - View images with timestamp (to confirm build success):
   ```bash
   docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}\t{{.Size}}"
   ```


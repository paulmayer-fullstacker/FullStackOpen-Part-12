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

## Exercise 15

### Challenges

Encountered magor problems implementing this solution. Due to my historic drive selection for development code. On one laptop with plenty of free hard drive space, I used the C: drive to host my development code. On the other laptop, where drive space is at a premium, I employed an external (E:) drive. Here, Docker struggled to bridge the file system across a virtual boundary (C:/E:), and was prone to misinterpreting path translations coming from Windows terminals like Git Bash.

The C: drive is the native home directory for Windows and the Docker daemon. So, volume mounting works seemlessley, because the Docker engine has direct, native access to the file system structure without secondary-drive translation overheads.

### Prep:

- Build image:
  ```bash
  docker build -f ./dev.Dockerfile --no-cache -t hello-front-dev .
  ```
- Run image container with volume mapping:
  ```bash
  MSYS_NO_PATHCONV=1 docker run -p 5173:5173 -v "${PWD}:/usr/src/app" -v /usr/src/app/node_modules --name my_vite_container hello-front-dev
  ```
- View files within container:
  ```bash
  docker exec -it my_vite_container cat src/Todos/TodoView.jsx
  ```
- View rendered page and dynamic content updates:

  http://localhost:5173

- Terminate container:

  ```bash
  docker stop my_vite_container
  docker rm my_vite_container
  ```

  - NOTE:
    - `MSYS_NO_PATHCONV=1` forces the Windows-to-Linux volume bridge to map our C: drive working directory into the container instead of falling back to the baked-in image files. Prevents Git Bash from modifying (correcting) Windows-style file directory paths.
    - `-p 5173:5173` Maps port 5173 on our host machine : port 5173 from inside the container.
    - ` -v "${PWD}:/usr/src/app"` Git Bash translates ${PWD} into a Unix-style path (like /c/FullStackOpen/...) This bind mount then takes the live source code folder from the PWD and overrides /usr/src/app inside the container. This is what allows the real-time edits in VS Code to instantly affect what the container runs, and the browser renders.
    - `-v /usr/src/app/node_modules` Creates an anonymous volume specifically for the node_modules directory.
    - `--name my_vite_container` Gives the container a predictable, easy-to-reference name so you can stop and remove it easily.

    Final:
    MSYS_NO_PATHCONV=1 docker run -p 5173:5173 -v "${PWD}:/usr/src/app" -v /usr/src/app/node_modules --name my_vite_container hello-front-dev

### Solution

The challenges faced in exercise-15 were all of my own making. With a little prior knowledge and understanding of Docker, the hard drive issue (C:/E:) could have been entirely avoided. The issue did not present itself until I switched development platforms. The complex run directivewas only necessary because I chose to develop on a Windows platform via WSL-2. If running the development from a Linux platform (i.e., Ubuntu or Fedora), a simpler command would probably suffice:
`docker run -p 5173:5173 -v "${PWD}:/usr/src/app" -v /usr/src/app/node_modules --name my_vite_container hello-front-dev`.

In hindsight, a native Linux environment may have proved a better option. However, at the time of implementation, I did not realise that there was an easy/difficult option.

### Docker Compose

With the addition of the `docker-compose.dev.yml` file, we can now build and run the image with a sigle command:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Because we have no shell variable expansions (`${PWD}`), with the docker compose file, we nolonger need the `MSYS_NO_PATHCONV=1` environment variable.

To stop the container, run:

```bash
docker compose -f docker-compose.dev.yml down
```

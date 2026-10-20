# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`

# Added Notes on Running and Testing The Updated App:

Stop and delete current container and volumes:

```bash
docker compose -f docker-compose.dev.yml down -v
```

Start fresh service with new user credentials:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Test:

```bash
docker ps
```

Run Node backend locally:

````bash
npm install
MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev
```bash

Test:
The visit counter:
http://localhost:3000/
Db seed:
http://localhost:3000/todos
Data persistence:
```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d
````

http://localhost:3000/todos

Get todo by Id:
http://localhost:3000/todos/6acce37438d2a19b34877134

Test all routes:
Use requests.http via RESTClient.

Terminate service:

```bash
docker compose -f docker-compose.dev.yml down
```

Startup and connect to Mongo and redis:

```bash
 docker compose -f docker-compose.dev.yml down
 docker compose -f docker-compose.dev.yml up -d
 MONGO_URL=mongodb://root:example@127.0.0.1:3456/the_database?authSource=admin REDIS_URL=redis://127.0.0.1:6379 npm run dev
```

Access redis container:

```bash
docker exec -it todo-backend-redis-1 redis-cli
```

## Ex-16

With a new `dev.Docker` file and an updated `docker-compose.dev.yml`, we can view changes to the backend development code in real time. To run the new development environment:
Run & Test:

- Stop any running containers and clear old volumes to start fresh:
  ```bash
  docker compose -f docker-compose.dev.yml down -v
  ```
- Build and start the services in detached mode:
  ```bash
  docker compose -f docker-compose.dev.yml up --build -d
  ```
- Check the logs to verify that nodemon successfully started and connected to MongoDB and Redis:
  ```bash
  docker compose -f docker-compose.dev.yml logs -f server
  ```
- Test the app and view in the browser:

  From the browser, visit http://localhost:3000/ or http://localhost:3000/todos

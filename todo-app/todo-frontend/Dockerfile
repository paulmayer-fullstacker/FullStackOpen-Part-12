# Dockerfile (multi-stage):

# Test stage: If this testing stage fails, the whole build process will also fail.
FROM node:24 AS test-stage
# Set /usr/src/app as working directory. If the directory doesn't exist in the base image, it will be created.
WORKDIR /usr/src/app
# Copy package configuration files first to enable Docker layer caching for dependencies.
COPY package*.json ./
# Install dependencies (cached unless package.json changes).
RUN npm ci
# Copy the remaining project source code into the container.
COPY . .
# Run test: If this test fails, the test stage fails, and the build process fails.
# Thus, preventing a broken app from progressing to a production image.
RUN npm test -- --run

# Build Stage: Build the static assets using Node.js.
FROM node:24 AS build-stage
# Set /usr/src/app as working directory.
WORKDIR /usr/src/app
# Copy tested code from the test stage (satisfies Docker optimization & ensures tested code is built).
COPY --from=test-stage /usr/src/app /usr/src/app
# Declare the build argument. Make it available to Vite during build, as an env var.
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# Compile the application into static production files inside the /dist directory.
RUN npm run build

# Release Stage: Serve the static files using an Nginx server.
FROM nginx:1.29-alpine AS release-stage
# COPY the directory dist from the build-stage into Nginx's public folder (/usr/share/nginx/html)
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html


# Build:
# # docker build --build-arg VITE_BACKEND_URL=http://localhost:3000 -t todo-frontend .
# Run:
# # docker run -p 8000:80 todo-frontend
# Test:
# # http://localhost:8000

## Notes:
## COPY package*.json ./
# Separating dependency installation from the source code copy allows Docker to cache the 'npm ci' layer. 
# Dependencies rarely change, while the source code is likely to change frequently.
# So, Docker can reuse the cached dependencies modules and skip reinstalling them on minor code edits.
#
## ARG VITE_BACKEND_URL
# Vite compiles environment variables directly into the static files during the build process. 
# 'ARG' captures the URL passed externally from our 'docker build' command, 
# and 'ENV' promotes it into an actual environment variable so Vite can read and inject it.
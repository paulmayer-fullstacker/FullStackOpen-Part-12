# dev.Dockerfile

# Set base image to Node.js v24.
FROM node:24

# Set the working directory to be used inside the container.
WORKDIR /usr/src/app

# Copy package configuration files first, to leverage Docker layer caching.
COPY package*.json ./

# Install all dependencies (including devDependencies like nodemon), defined in the package.json.
RUN npm install

# Copy the rest of the application code, assigning ownership to the non-root 'node' user.
COPY --chown=node:node . .

# Switch from 'root' to the unprivileged 'node' user who is now owner of the container code. Adds security.
USER node

# Default command to run the backend in development mode (using nodemon from package.json)
CMD ["npm", "run", "dev"]
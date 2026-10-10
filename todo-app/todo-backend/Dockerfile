# Dockerfile

# Set the base for the image as node:24.
FROM node:24
# Set /usr/src/app as working directory. If the directory doesn't exist in the base image, it will be created.
WORKDIR /usr/src/app
# Copy everything from the local directory into the image.
# COPY . .
# --chown=node:node: Changes file ownership of everything being copied toy belong to User named node and Group named node inside the container.
COPY --chown=node:node . .
# Install dependancies.
RUN npm install
# Switch user context inside the container from the default root user to the built-in (unprivileged), node user.
USER node
# CMD specifies default command that runs when we start a container with docker run (can be overwritten).
# ["npm", "start"]: # Start the app, per the package.json script 'start'.
CMD ["npm", "start"]

#
# Build image: docker build -t todo-backend .
# Run as container: docker run -p 3000:3000 todo-backend
#
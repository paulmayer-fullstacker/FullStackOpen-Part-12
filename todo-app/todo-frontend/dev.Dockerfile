# dev.Dockerfile:

FROM node:24

WORKDIR /usr/src/app

COPY . .

# Run npm install(rather than npm ci) as we are in development mode.
RUN npm install

# npm run dev is the comd to start the app in development mode.
CMD ["npm", "run", "dev", "--", "--host"]
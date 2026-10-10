FROM node:24

WORKDIR /usr/src/app
# Copy everything from the local directory (1st .) into the WORKDIR (2nd .) of the image. 
# COPY . .
# --chown=node:node: Changes file ownership of everything being copied toy belong to User named node and Group named node inside the container.
COPY --chown=node:node . .

RUN npm ci --omit=dev

ENV DEBUG=fullstackopen-part-12:*

USER node

CMD ["npm", "start"]
FROM node:16-alpine

EXPOSE 4001

ENV NODE_ENV=development
WORKDIR /src
CMD ["./node_modules/.bin/nodemon", "src/index.mjs"]

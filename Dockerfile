FROM node:16-bullseye-slim AS build-env

WORKDIR /app

COPY ./src/package*.json ./
COPY ./src/tsconfig.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:16-bullseye-slim AS runtime-env

WORKDIR /app

COPY ./src/package* ./

RUN npm install --omit=dev

COPY --from=build-env ./app/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]
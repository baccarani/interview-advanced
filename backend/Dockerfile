# Commands to build docker image
# docker build -t backend/dev:development --target development . for dev stage
# docker build -t backend/prod:production --target production . for production stage

# Commands to run docker container
# docker run -d --restart=always -p 80:3000 backend/dev:development for dev stage
# docker run -d --restart=always -p 80:3000 backend/prod:production for production stage

# Stage 1: Builder
FROM node:slim AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build

# Stage 2: Development
FROM node:slim as development
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run","dev:linux"]

# Stage 3: Production
FROM node:slim as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json .
RUN npm install --production
EXPOSE ${PORT}
CMD ["npm", "run","start:linux"]
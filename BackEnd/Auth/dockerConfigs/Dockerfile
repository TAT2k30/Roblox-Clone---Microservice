# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION}-alpine

# Set the environment to development for ts-node and nodemon
ENV NODE_ENV development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both production and development dependencies
RUN npm install

# Copy the rest of the source files
COPY . .

# Expose the application port
EXPOSE 3000

# Use nodemon to run the app with ts-node in development mode
CMD ["npx", "nodemon", "--exec", "ts-node", "src/app.ts"]

# Step 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm
RUN npm install

COPY . .
RUN npm run build

EXPOSE 80

CMD ["npm","start","--","--host","http://0.0.0.0"]



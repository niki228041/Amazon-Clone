FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm
RUN npm install
COPY . .
RUN npm run build

EXPOSE 80
CMD ["npm","start","--","--host","http://0.0.0.0"]
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@9.7.2
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","start","--", "--host","0.0.0.0"]
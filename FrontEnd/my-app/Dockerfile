# Step 1: Build the application
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm
RUN npm install

COPY . .
RUN npm run build

# Step 2: Set up the production environment
# FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
CMD ["npm","start","--","--host","http://0.0.0.0"]



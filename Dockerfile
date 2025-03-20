# Étape 1 : Construction de l'application Angular
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

# Étape 2 : Serveur Web Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/fund-match-project /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 83
CMD ["nginx", "-g", "daemon off;"]

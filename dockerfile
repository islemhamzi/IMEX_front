# Étape 1 : Utiliser Node.js pour builder l'application
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Construire l'application Angular
RUN npm run build -- --configuration production --project Authentification

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/authentification /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

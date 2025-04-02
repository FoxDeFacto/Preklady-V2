FROM node:18-alpine3.18

# Instalace závislostí
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

# Nastavení proměnných prostředí
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Nastavení pracovního adresáře
WORKDIR /opt/

# Instalace závislostí
COPY package.json package-lock.json ./
RUN npm install -g node-gyp && npm config set fetch-retry-maxtimeout 600000 -g && npm install

# Přidání binárek do PATH
ENV PATH=/opt/node_modules/.bin:$PATH

# Nastavení pracovního adresáře pro aplikaci
WORKDIR /opt/app
COPY . .

# Oprávnění pro složky používané během buildu
RUN mkdir -p /opt/app/.tmp /opt/app/dist /opt/app/.strapi && \
    chown -R node:node /opt/app

# Přepnutí na neprivilegovaného uživatele
USER node

# Sestavení aplikace
RUN npm run build

# Exponování portu
EXPOSE 1337

# Spuštění aplikace
CMD ["npm", "run", "develop"]

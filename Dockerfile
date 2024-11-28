###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Set WORKDIR untuk aplikasi
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Salin seluruh kode sumber
COPY --chown=node:node . .

# Install TypeScript dependencies (optional, jika tidak ada di package.json)
RUN npm install -g typescript ts-node

# Gunakan user "node"
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

# Set WORKDIR untuk build
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY --chown=node:node package*.json ./

# Salin node_modules dari stage development
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Salin seluruh source code
COPY --chown=node:node . .

# Kompilasi TypeScript menjadi JavaScript
RUN npm run build

# Set environment variable untuk production
ENV NODE_ENV production

# Install hanya dependencies production
RUN npm ci --only=production && npm cache clean --force

# Gunakan user "node"
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

# Set WORKDIR untuk production
WORKDIR /usr/src/app

# Salin hasil build dan dependencies dari stage build
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi di production menggunakan Node.js
CMD ["node", "dist/main"]

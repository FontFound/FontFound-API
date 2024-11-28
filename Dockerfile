
###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

# Set WORKDIR
WORKDIR /usr/src/app

# Salin file .env
COPY .env .env

# Salin file package.json dan package-lock.json
COPY --chown=node:node package*.json ./

# Salin node_modules dari stage development
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Salin semua source code
COPY --chown=node:node . .

# Jalankan build
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

FROM node:18-alpine As production

# Set WORKDIR
WORKDIR /usr/src/app

# Salin file .env
COPY .env .env

# Salin hasil build dan dependencies dari stage build
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 8080

# Jalankan aplikasi
CMD [ "node", "dist/main.js" ]

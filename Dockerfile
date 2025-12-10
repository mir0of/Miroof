# Utiliser une image Node.js officielle comme base
FROM node:18-alpine

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production

# Copier le reste du code de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Créer un utilisateur non-root pour plus de sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Changer le propriétaire des fichiers
RUN chown -R nodejs:nodejs /app

# Basculer vers l'utilisateur non-root
USER nodejs

# Commande pour démarrer l'application
CMD ["node", "server.js"]

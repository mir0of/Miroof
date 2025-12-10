# 🔒 Chat Sécurisé et Chiffré

Application de chat en temps réel avec chiffrement de bout en bout (E2E). Les messages sont chiffrés côté client avec l'API Web Crypto avant d'être envoyés au serveur.

## ✨ Fonctionnalités

- 💬 **Chat en temps réel** : Communication instantanée via WebSocket
- 🔐 **Chiffrement E2E** : Messages chiffrés avec AES-GCM 256 bits
- 🎨 **Avatars personnalisés** : Choix de couleur pour votre avatar
- 👥 **Liste des utilisateurs** : Voir qui est connecté en temps réel
- 🚫 **Pas d'historique** : Les messages ne sont pas sauvegardés, confidentialité totale
- 🎯 **Interface moderne** : Design épuré et responsive

## 🚀 Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. Cloner le repository :
```bash
git clone <url-du-repo>
cd Miroof
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur :
```bash
npm start
```

4. Ouvrir votre navigateur sur :
```
http://localhost:3000
```

## 🔧 Mode développement

Pour le développement avec rechargement automatique :
```bash
npm run dev
```

## 🔐 Sécurité

- **Chiffrement AES-GCM** : Algorithme de chiffrement authentifié
- **Clé de 256 bits** : Dérivée avec PBKDF2 et 100 000 itérations
- **Pas de stockage** : Aucun message n'est sauvegardé sur le serveur
- **Session éphémère** : L'historique est perdu à la déconnexion

## 📝 Utilisation

1. Entrez votre pseudo
2. Choisissez une couleur pour votre avatar
3. Cliquez sur "Rejoindre le chat"
4. Commencez à discuter en toute sécurité !

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express, Socket.IO
- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Chiffrement** : Web Crypto API
- **Communication** : WebSocket

## 📦 Structure du projet

```
Miroof/
├── server.js           # Serveur Node.js avec Socket.IO
├── package.json        # Dépendances et scripts
├── public/
│   ├── index.html     # Interface utilisateur
│   ├── style.css      # Styles CSS
│   └── app.js         # Logique client et chiffrement
└── README.md          # Documentation
```

## ⚠️ Note importante

Cette application utilise une clé de chiffrement partagée pour la simplicité. Pour une sécurité maximale en production, il faudrait implémenter un échange de clés Diffie-Hellman pour que chaque session ait sa propre clé unique.

## 📄 Licence

MIT

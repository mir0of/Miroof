# 💬 Application de Chat en Temps Réel

Application de chat en temps réel simple et moderne. Les messages sont transmis instantanément via WebSocket.

## ✨ Fonctionnalités

- 💬 **Chat en temps réel** : Communication instantanée via WebSocket
- 🎨 **Avatars personnalisés** : Choix de couleur pour votre avatar
- 👥 **Liste des utilisateurs** : Voir qui est connecté en temps réel
- 🚫 **Pas d'historique** : Les messages ne sont pas sauvegardés sur le serveur
- 🎯 **Interface moderne** : Design épuré et responsive

## 🚀 Installation

### Option 1 : Avec Docker (Recommandé) 🐳

#### Prérequis
- Docker
- Docker Compose

#### Étapes d'installation

1. Cloner le repository :
```bash
git clone <url-du-repo>
cd Miroof
```

2. Démarrer l'application avec Docker Compose :
```bash
docker-compose up -d
```

3. Ouvrir votre navigateur sur :
```
http://localhost:3000
```

#### Commandes Docker utiles

**Arrêter l'application :**
```bash
docker-compose down
```

**Voir les logs :**
```bash
docker-compose logs -f
```

**Rebuild l'image après des modifications :**
```bash
docker-compose up -d --build
```

### Option 2 : Installation traditionnelle

#### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

#### Étapes d'installation

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

## 📝 Utilisation

1. Entrez votre pseudo
2. Choisissez une couleur pour votre avatar
3. Cliquez sur "Rejoindre le chat"
4. Commencez à discuter !

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express, Socket.IO
- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Communication** : WebSocket en temps réel

## 📦 Structure du projet

```
Miroof/
├── server.js           # Serveur Node.js avec Socket.IO
├── package.json        # Dépendances et scripts
├── Dockerfile          # Configuration Docker
├── docker-compose.yml  # Orchestration Docker
├── public/
│   ├── index.html     # Interface utilisateur
│   ├── style.css      # Styles CSS
│   └── app.js         # Logique client JavaScript
└── README.md          # Documentation
```

## 📄 Licence

MIT

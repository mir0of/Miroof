const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);

  socket.on('user_join', (userData) => {
    connectedUsers.set(socket.id, {
      id: socket.id,
      username: userData.username,
      color: userData.color
    });

    io.emit('user_joined', {
      id: socket.id,
      username: userData.username,
      color: userData.color
    });

    socket.emit('users_list', Array.from(connectedUsers.values()));

    socket.broadcast.emit('system_message', {
      text: `${userData.username} a rejoint le chat`,
      timestamp: Date.now()
    });
  });

  socket.on('send_message', (messageData) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      io.emit('new_message', {
        id: socket.id,
        username: user.username,
        color: user.color,
        message: messageData.message,
        timestamp: Date.now()
      });
    }
  });

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);

      io.emit('user_left', {
        id: socket.id
      });

      io.emit('system_message', {
        text: `${user.username} a quitté le chat`,
        timestamp: Date.now()
      });
    }
    console.log('Déconnexion:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Accédez au chat sur http://localhost:${PORT}`);
});

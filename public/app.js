const socket = io();

let currentUser = null;
let connectedUsers = [];

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginForm = document.getElementById('login-form');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const usersList = document.getElementById('users-list');
const userCount = document.getElementById('user-count');
const userInfo = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');

class SimpleCrypto {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }

    async generateKey(password) {
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            this.encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: this.encoder.encode('secure-chat-salt-2024'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    async encrypt(text, key) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedText = this.encoder.encode(text);

        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encodedText
        );

        const encryptedArray = new Uint8Array(encryptedData);
        const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
        combinedArray.set(iv);
        combinedArray.set(encryptedArray, iv.length);

        return btoa(String.fromCharCode(...combinedArray));
    }

    async decrypt(encryptedText, key) {
        try {
            const combinedArray = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
            const iv = combinedArray.slice(0, 12);
            const data = combinedArray.slice(12);

            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                data
            );

            return this.decoder.decode(decryptedData);
        } catch (error) {
            console.error('Erreur de déchiffrement:', error);
            return '[Message chiffré]';
        }
    }
}

const crypto_handler = new SimpleCrypto();
let encryptionKey = null;

async function initEncryption() {
    encryptionKey = await crypto_handler.generateKey('shared-room-key-2024');
}

initEncryption();

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const colorInput = document.querySelector('input[name="color"]:checked');

    if (!username || !colorInput) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    currentUser = {
        username: username,
        color: colorInput.value
    };

    socket.emit('user_join', currentUser);

    loginContainer.style.display = 'none';
    chatContainer.style.display = 'flex';

    updateUserInfo();
});

logoutBtn.addEventListener('click', () => {
    socket.disconnect();
    location.reload();
});

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    const encryptedMessage = await crypto_handler.encrypt(message, encryptionKey);

    socket.emit('send_message', {
        message: encryptedMessage
    });

    messageInput.value = '';
});

socket.on('users_list', (users) => {
    connectedUsers = users;
    updateUsersList();
});

socket.on('user_joined', (user) => {
    if (!connectedUsers.find(u => u.id === user.id)) {
        connectedUsers.push(user);
        updateUsersList();
    }
});

socket.on('user_left', (data) => {
    connectedUsers = connectedUsers.filter(u => u.id !== data.id);
    updateUsersList();
});

socket.on('new_message', async (data) => {
    const decryptedMessage = await crypto_handler.decrypt(data.message, encryptionKey);
    displayMessage(data, decryptedMessage);
});

socket.on('system_message', (data) => {
    displaySystemMessage(data.text);
});

function updateUserInfo() {
    const avatar = document.createElement('div');
    avatar.className = 'user-avatar';
    avatar.style.backgroundColor = currentUser.color;
    avatar.textContent = currentUser.username.charAt(0).toUpperCase();

    userInfo.innerHTML = '';
    userInfo.appendChild(avatar);
    userInfo.appendChild(document.createTextNode(currentUser.username));
}

function updateUsersList() {
    usersList.innerHTML = '';
    userCount.textContent = connectedUsers.length;

    connectedUsers.forEach(user => {
        const li = document.createElement('li');

        const avatar = document.createElement('div');
        avatar.className = 'user-avatar';
        avatar.style.backgroundColor = user.color;
        avatar.textContent = user.username.charAt(0).toUpperCase();

        const username = document.createElement('span');
        username.textContent = user.username;

        li.appendChild(avatar);
        li.appendChild(username);
        usersList.appendChild(li);
    });
}

function displayMessage(data, decryptedMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.style.backgroundColor = data.color;
    avatar.textContent = data.username.charAt(0).toUpperCase();

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';

    const usernameSpan = document.createElement('span');
    usernameSpan.className = 'message-username';
    usernameSpan.textContent = data.username;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    const time = new Date(data.timestamp);
    timeSpan.textContent = time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    headerDiv.appendChild(usernameSpan);
    headerDiv.appendChild(timeSpan);

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = decryptedMessage;

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(textDiv);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displaySystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = text;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

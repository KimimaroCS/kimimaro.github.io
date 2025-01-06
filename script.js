const streamers = []; // Liste des streamers à suivre
const clientId = '06uq2i3sml8j4y4cmlor85eqdbytj6';  // Remplace par ton client ID Twitch
const accessToken = 'hfflsli9s96lcr0qii9qnyh2mb6ucf';  // Remplace par ton access token Twitch (en mode "client credentials")

// Fonction pour vérifier si un streamer est en ligne ou hors ligne
function checkStreamerStatus(username) {
    return fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        const isOnline = data.data.length > 0; // Si la réponse contient des données, le streamer est en ligne
        displayStreamer(username, isOnline);
    })
    .catch(err => console.error('Erreur de récupération des données :', err));
}

// Fonction pour afficher un streamer sur la page
function displayStreamer(username, isOnline) {
    const streamerDiv = document.createElement('div');
    streamerDiv.classList.add('streamer');
    const led = document.createElement('div');
    led.classList.add('led');
    led.style.backgroundColor = isOnline ? 'green' : 'red';
    streamerDiv.appendChild(led);
    streamerDiv.innerHTML += `<span>${username} - ${isOnline ? 'Online' : 'Offline'}</span>`;
    document.getElementById('streamers-list').appendChild(streamerDiv);

    // Si le streamer est en ligne, ajouter son flux en direct
    if (isOnline) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://player.twitch.tv/?channel=${username}&autoplay=true`;
        iframe.width = 400;
        iframe.height = 300;
        iframe.frameBorder = 0;
        iframe.allowFullscreen = true;
        streamerDiv.appendChild(iframe);
    }
}

// Ajouter un streamer
function addStreamer() {
    const username = document.getElementById('username').value.trim();
    if (username && !streamers.includes(username)) {
        streamers.push(username);
        checkStreamerStatus(username);
        document.getElementById('username').value = ''; // Réinitialiser le champ
    }
}

// Afficher les streamers à l'initialisation
streamers.forEach(username => {
    checkStreamerStatus(username);
});

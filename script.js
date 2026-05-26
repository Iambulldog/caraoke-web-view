// Mock Song Data with Categories
const songs = [
    {
        id: "1",
        title: "Never Gonna Give You Up (Test)",
        artist: "Rick Astley",
        category: "pop",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        videoId: "dQw4w9WgXcQ" // YouTube Video ID
    },
    {
        id: "2",
        title: "Despacito (Test)",
        artist: "Luis Fonsi",
        category: "latin",
        thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
        videoId: "kJQP7kiw5Fk"
    },
    {
        id: "3",
        title: "Bohemian Rhapsody (Test)",
        artist: "Queen",
        category: "90s",
        thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
        videoId: "fJ9rUzIMcZQ"
    },
    {
        id: "4",
        title: "Hello (Test)",
        artist: "Adele",
        category: "2000s",
        thumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/mqdefault.jpg",
        videoId: "YQHsXMglC9A"
    },
    {
        id: "5",
        title: "Roar (Test)",
        artist: "Katy Perry",
        category: "pop",
        thumbnail: "https://img.youtube.com/vi/CevxZvSJLk8/mqdefault.jpg",
        videoId: "CevxZvSJLk8"
    },
    {
        id: "6",
        title: "Sugar (Test)",
        artist: "Maroon 5",
        category: "pop",
        thumbnail: "https://img.youtube.com/vi/09R8_2nJtjg/mqdefault.jpg",
        videoId: "09R8_2nJtjg"
    },
    {
        id: "7",
        title: "See You Again (Test)",
        artist: "Wiz Khalifa",
        category: "hiphop",
        thumbnail: "https://img.youtube.com/vi/RgKAFK5djSk/mqdefault.jpg",
        videoId: "RgKAFK5djSk"
    },
    {
        id: "8",
        title: "Blank Space (Test)",
        artist: "Taylor Swift",
        category: "pop",
        thumbnail: "https://img.youtube.com/vi/e-ORhEE9VVg/mqdefault.jpg",
        videoId: "e-ORhEE9VVg"
    }
];

// DOM Elements
const listView = document.getElementById('list-view');
const playerView = document.getElementById('player-view');
const songGrid = document.getElementById('song-grid');
const searchInput = document.getElementById('search-input');
const backBtn = document.getElementById('back-btn');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingArtist = document.getElementById('now-playing-artist');
const videoWrapper = document.getElementById('video-wrapper');
const categoryBtns = document.querySelectorAll('.category-btn');

let currentCategory = 'all';

// Function to render song list
function renderSongs(songsToRender) {
    songGrid.innerHTML = '';
    
    if (songsToRender.length === 0) {
        songGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); font-size: 1.2rem; margin-top: 2rem;">ไม่พบเพลงในหมวดหมู่นี้ หรือ ไม่พบชื่อเพลงที่ค้นหา</p>';
        return;
    }

    songsToRender.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.onclick = () => playSong(song);

        card.innerHTML = `
            <img src="${song.thumbnail}" alt="${song.title}" class="song-thumb" loading="lazy">
            <div class="song-info">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-artist">${song.artist}</p>
            </div>
        `;
        songGrid.appendChild(card);
    });
}

// Function to handle playing a song
function playSong(song) {
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;

    videoWrapper.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${song.videoId}?autoplay=1&rel=0" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
    `;

    listView.classList.remove('active');
    listView.classList.add('hidden');
    
    setTimeout(() => {
        playerView.classList.remove('hidden');
        playerView.classList.add('active');
    }, 50);
}

// Function to handle returning to list
function backToList() {
    videoWrapper.innerHTML = '';

    playerView.classList.remove('active');
    playerView.classList.add('hidden');
    
    setTimeout(() => {
        listView.classList.remove('hidden');
        listView.classList.add('active');
    }, 50);
}

// Function to filter and render
function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredSongs = songs.filter(song => {
        const matchSearch = song.title.toLowerCase().includes(searchTerm) || 
                            song.artist.toLowerCase().includes(searchTerm);
        const matchCategory = currentCategory === 'all' || song.category === currentCategory;
        
        return matchSearch && matchCategory;
    });
    
    renderSongs(filteredSongs);
}

// Event Listeners
searchInput.addEventListener('input', filterAndRender);

categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        const clickedBtn = e.currentTarget;
        clickedBtn.classList.add('active');
        
        // Update category and re-render
        currentCategory = clickedBtn.dataset.category;
        filterAndRender();
    });
});

backBtn.addEventListener('click', backToList);

// Initial Render
renderSongs(songs);

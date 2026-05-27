// Mock Song Data
const songs = [

    {
        id: "1",
        title: "ซ่อน(ไม่)หา",
        artist: "เจฟ ชาเตอร์",
        category: "pop",
        thumbnail: "thumbnail/2.png",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "2",
        title: "รักแรก",
        artist: "นนท์ ธนนท์",
        category: "pop",
        thumbnail: "thumbnail/3.png",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "3",
        title: "วาดไว้",
        artist: "โบกี้ไลอ้อน",
        category: "pop",
        thumbnail: "thumbnail/4.png",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "4",
        title: "จังหวะตกหลุมรัก",
        artist: "ดีดี ดาด้า",
        category: "pop",
        thumbnail: "thumbnail/5.png",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "5",
        title: "ถ้าเธอรักฉันจริง",
        artist: "ทรี แมนดาวน์",
        category: "rock",
        thumbnail: "thumbnail/6.png",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
        {
        id: "6",
        title: "ซ่อนกลิ่น",
        artist: "ปาล์มมี่",
        category: "pop",
        thumbnail: "thumbnail/1.png",
        videoUrl: "video1.mp4" // Direct MP4 video URL
    },

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
        songGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">ไม่พบเพลงที่ค้นหา</p>';
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
    // Update player info
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;

    // Use <video> tag instead of YouTube iframe
    videoWrapper.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; border: none; background: #000; outline: none;">
            <source src="${song.videoUrl}" type="video/mp4">
            เบราว์เซอร์ของคุณไม่รองรับการเล่นวีดีโอ
        </video>
    `;

    // Switch views
    listView.classList.remove('active');
    listView.classList.add('hidden');

    // Small delay to allow CSS transition
    setTimeout(() => {
        playerView.classList.remove('hidden');
        playerView.classList.add('active');
        
        // Request fullscreen on the video element
        const video = videoWrapper.querySelector('video');
        if (video) {
            if (video.requestFullscreen) {
                video.requestFullscreen().catch(err => console.log("Fullscreen Error:", err));
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen().catch(err => console.log("Fullscreen Error:", err));
            }
        }
    }, 50);
}

// Function to handle returning to list
function backToList() {
    // Stop video by clearing wrapper
    videoWrapper.innerHTML = '';

    // Switch views
    playerView.classList.remove('active');
    playerView.classList.add('hidden');

    // Small delay to allow CSS transition
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

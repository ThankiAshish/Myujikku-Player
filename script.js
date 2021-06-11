const container = document.querySelector('.container')
const musicInfo = document.querySelector('.music-info')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song Titles
const songs = [
    'KDA - Drum Go Dum',
    'KDA - I\'ll Show You',
    'KDA - More',
    'KDA - PopStars',
    'KDA - The Baddest',
    'KDA - Villain'
]

// Keep Track of songs
let songIndex = 0

// Initially Load Songs
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `Songs/${song}.mp3`
    cover.src = `Images/defaultCover.png`
}

function playSong() {
    container.classList.add('play')
    musicInfo.classList.add('play')
    cover.src = `Images/${songs[songIndex]}.png`
    playBtn.querySelector('i.fas').classList.remove('fa-play-circle')
    playBtn.querySelector('i.fas').classList.add('fa-pause-circle')

    audio.play()
}

function pauseSong() {
    container.classList.remove('play')
    musicInfo.classList.remove('play')
    cover.src = `Images/defaultCover.png`
    playBtn.querySelector('i.fas').classList.remove('fa-pause-circle')
    playBtn.querySelector('i.fas').classList.add('fa-play-circle')

    audio.pause()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)

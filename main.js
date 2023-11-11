const track_art = document.querySelector('.track-art');
const track_name = document.querySelector('.track-name');
const track_artist = document.querySelector('.track-artist');
const bg = document.querySelector('.background');

const playpause_btn = document.querySelector('.playpause-track');
const next_btn = document.querySelector('.next');
const prev_btn = document.querySelector('.prev');

const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const randomIcon = document.querySelector('.fa-random');
const curr_track = document.createElement('audio');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

let track_index = 0;
let isPlaying = false;
let updateTimer;

let musicList = [
    {
        img : 'albumart/Aidan.jpg',
        name : 'Aidan',
        artist : 'Jonathan Ceaser',
        music : 'songs/Aidan.mp3',
        color1 : '3d5375',
        color2 : '3d5375'
    },
    {
        img : 'albumart/autumn_sun.png',
        name : 'Autumn Sun',
        artist : 'Bryce Greene',
        music : 'songs/autumn_sun.mp3',
        color1 : 'BA5333',
        color2 : 'BA5333'
    },
    {
        img : 'albumart/BestPart.jpg',
        name : 'Best Part of Me',
        artist : 'The Dunwells',
        music : 'songs/best_part_of_me.mp3',
        color1 : '5178B4',
        color2 : '7B9FD7'
    },
    {
        img : 'albumart/i_cant_make_you_love_me_cover.jpeg',
        name : 'I cant make you love me',
        artist : 'Bryce Greene',
        music : 'songs/i_cant_make_you_love_me_cover.mp3',
        color1 : 'C9BEC8',
        color2 : 'C9BEC8'
    },
    {
        img : 'albumart/justRelax_img.jpeg',
        name : 'Just Relax',
        artist : 'Purrple Cat',
        music : 'songs/just_relax.mp3',
        color1 : 'D85B7B',
        color2 : '814C9C'
    },
    {
        img : 'albumart/paranormal_real_500.jpg',
        name : 'Paranormal is Real',
        artist : 'Leonell Cassio',
        music : 'songs/paranormal_is_real_leonell_cassio.mp3',
        color1 : '75663e',
        color2 : '75663e'
    },
    {
        img : 'albumart/perfect.jpg',
        name : 'Perfect',
        artist : 'Ed Sheeran',
        music : 'songs/perfect.mp3',
        color1 : 'DEE4EC',
        color2 : '277EB5'
    },
    {
        img : 'albumart/Polarity.jpg',
        name : 'Polarity',
        artist : 'Ethos',
        music : 'songs/Polarity.mp3',
        color1 : '101115ff',
        color2 : '101115ff'
    },
    {
        img : 'albumart/Your_Shoulder_Album_Art.jpg',
        name : 'Your Shoulder',
        artist : 'Kaitlyn Thompson',
        music : 'songs/Your_Shoulder.mp3',
        color1 : 'A463FF',
        color2 : 'E591FF'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    // clearInterval(updateTimer);
    // reset();

    curr_track.src = musicList[track_index].music;
    curr_track.load();
    track_art.src = musicList[track_index].img;
    track_name.textContent = musicList[track_index].name;
    track_artist.textContent = musicList[track_index].artist;
    bg.background.style = "linear-gradient(to bottom," + "#" + musicList[track_index].color1 + "," + "#" + musicList[track_index].color2 + ")";
    

    updateTimer = setInterval(setUpdate, 1000)

    curr_track.addEventListener('ended', nextTrack)
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause text-6xl text-white px-8 hover:font-bold active:text-white/75 focus:outline-none focus:ring focus:ring-white"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play text-6xl text-white px-8 hover:font-bold active:text-white/75 focus:outline-none focus:ring focus:ring-white"></i>';
}
function nextTrack(){
    if(track_index < musicList.length - 1){
        track_index += 1;
    }else {
        track_index = 0;
    }
    loadTrack(track_index);
    playtrack(curr_track);
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = musicList.length - 1;
    }
    loadTrack(track_index);
    playtrack(curr_track);
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = curr_track.duration;

    audio.currentTime = (clickX / width) * duration;
}

function Durtime(e) {
    const {duration, currentTime} = e.srcElement;
    var sec;
    var sec_d;

    let min = (currentTime == null)? 0:
        Math.floor(currentTime / 60)
        min = min < 10 ? '0' + min:min;

    function get_sec (x) {
        if(Math.floor(x) >= 60){
            for(var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec:sec;
                }

            }

        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec:sec;
        }
    }

    get_sec(currentTime,sec);

    currTime.innerHTML = min + ':' + sec;

    let min_d = (isNaN(duration) === true)? '0':
        Math.floor(duration/60);
        min_d = min_d <10 ? '0' + min_d:min_d;

    function get_sec_d(x){
        if(Math.floor(x) >= 60){
            for(var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60(i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d:sec_d;
                }

            }

        } else {
            sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d < 10 ? '0' + sec_d:sec_d;
        }
    }

    get_sec_d (duration);

	durTime.innerHTML = min_d +':'+ sec_d;
		
    
}

playpause_btn.addEventListener('click', () => {
    playpauseTrack();
});

prev_btn.addEventListener('click', () => {
    prevTrack();
});

next_btn.addEventListener('click', () => {
    nextTrack();
});

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('timeupdate',Durtime);



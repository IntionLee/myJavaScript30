const player = document.querySelector('player');
const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const progress__filled = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const slider = document.querySelectorAll('.player__slider');
const skip = document.querySelectorAll('[data-skip]');
const fullscreen = document.querySelector('.fullscreen');

function togglePlay() {
	if (video.paused) {
		video.play();
		toggle.textContent = '❚ ❚';
	} else {
		video.pause();
		toggle.textContent ='►';
	}
}

function skipTo() {
	let skipVal = parseFloat(this.dataset.skip);
	video.currentTime += skipVal; 
}

function changeVal(e) {
	if (this.name === 'volume') {
		video.volume = this.value;
	} else if (this.name === 'playbackRate') {
		video.playbackRate = this.value;
	}
}

function updateProgress() {
	let basis = (video.currentTime/video.duration)*100;
	progress__filled.style.flexBasis = basis+'%';
}

function chageCurrentTime(e) {
	let time = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = time;
}

function fullScreen() {
	if (video.requestFullscreen) {
  		video.requestFullscreen();
	} else if (video.msRequestFullscreen) {
		//IE
  		video.msRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
		// Firefox
  		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		// Safari & Google
  		video.webkitRequestFullscreen();
	}
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', togglePlay);
window.addEventListener('keydown', (e) => {
	if(e.keyCode === 32) {
		togglePlay();
	}
});
skip.forEach((btn) => {
	btn.addEventListener('click', skipTo);
});
slider.forEach((sld) => {
	sld.addEventListener('click', changeVal);
	sld.addEventListener('mousemove', changeVal)
});
let mousedown = false;
progress.addEventListener('mousedown', () => {
	mousedown = true;
});
progress.addEventListener('mouseup', () => {
	mousedown = false;
});
progress.addEventListener('click',chageCurrentTime);
progress.addEventListener('mousemove',(e) => {
	if(mousedown) {
		chageCurrentTime(e);
	}
});
fullscreen.addEventListener('click', fullScreen);
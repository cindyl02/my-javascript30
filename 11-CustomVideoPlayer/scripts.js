const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const toggleButton = document.querySelector(".toggle");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const sliders = document.querySelectorAll(".player__slider");
const skipButtons = document.querySelectorAll("[data-skip]");
const fullscreenButton = document.querySelector(".toggle__fullscreen");

const playVideo = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggleButton.textContent = icon;
}

function updateRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}

toggleButton.addEventListener("click", playVideo);

video.addEventListener("click", playVideo);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => button.addEventListener("click", skip));

sliders.forEach((slider) => slider.addEventListener("change", updateRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreenButton.addEventListener("click", handleFullscreen);

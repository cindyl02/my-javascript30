const keyCodes = {
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};

const soundCodes = {
  CLAP: 65,
  HIHAT: 83,
  KICK: 68,
  OPENHAT: 70,
  BOOM: 71,
  RIDE: 72,
  SNARE: 74,
  TOM: 75,
  TINK: 76,
};

const play = (keyCode) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
};

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", function (e) {
    this.classList.remove("playing");
  });
  key.addEventListener("click", function (e) {
    const text = e.path[0].innerText;
    const keyCode = keyCodes[text] || soundCodes[text];
    play(keyCode);
  });
});

window.addEventListener("keydown", (e) => play(e.keyCode));

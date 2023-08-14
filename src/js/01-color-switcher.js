const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStart);

stopBtn.addEventListener('click', onStop);
let timerId = null;

function onStart() {
  timerId = setInterval(() => {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
    }
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function onStop() {
  startBtn.disabled = false;
  clearInterval(timerId);
}

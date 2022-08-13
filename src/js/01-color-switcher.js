const refs = {
  bodyEl: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;
//console.log(refs.startBtn);
//console.log(refs.stopBtn);

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

function onClickStart(evt) {
  timerId = setInterval(() => {
    const hexColor = getRandomHexColor();
    inputBodyBackgroundColor(hexColor);
    //console.log('start');
  }, 1000);
  refs.startBtn.removeEventListener('click', onClickStart);
}

function onClickStop(evt) {
  clearInterval(timerId);
  refs.startBtn.addEventListener('click', onClickStart);
  //console.log('stop');
}

function inputBodyBackgroundColor(color) {
  refs.bodyEl.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const validButtons = [
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
];

let activeButtons = [];
let musicSheets = [];
let recording = false;
let start;

function onButtonPress(e) {
  if (!validButtons.includes(e.code) || activeButtons.includes(e.code)) { return; }
  activeButtons = [...activeButtons, e.code];

  if (recording) {
    musicSheets[musicSheets.length-1].time = Date.now() - start;
    musicSheets.push({
      name: activeButtons
    });
    start = Date.now();
  }
  document.querySelector(`#${e.code}`).classList.add('pressed');
}

function onButtonUp(e) {
  if (!validButtons.includes(e.code)) { return; }
  activeButtons = activeButtons.filter(btn => btn !== e.code);

  // gui ki hieu tat nut (low) tuong ung toi ESP8266
  // ... vidu: 'lKeyA', 'lKeyS', ...
  document.querySelector(`#${e.code}`).classList.remove('pressed');
  if (recording) {
    musicSheets[musicSheets.length-1].time = Date.now() - start;
    if (!activeButtons.length) {
      musicSheets.push({
        name: 'silent'
      })
    }
    else {
      musicSheets.push({
        name: activeButtons
      });
    }
    start = Date.now();
  }
}

function changeRecordStatus() {
  recording = !recording;
  if (recording) {
    start = Date.now();
    musicSheets = [{name: 'silent'}];
    document.querySelector('#record-btn').textContent = 'Dừng ghi âm...';
    let playBtn = document.querySelector('.play-btn');
    if (playBtn) {
      document.querySelector('#record').removeChild(playBtn);
    }
  }
  else {
    musicSheets[musicSheets.length-1].time = Date.now() - start;
    console.log('sheets', musicSheets);
    document.querySelector('#record-btn').textContent = 'Ghi âm';
    let playButton = document.createElement('button');
    let text = document.createTextNode('Phát lại bản ghi');
    playButton.appendChild(text);
    playButton.classList.add('play-btn');
    playButton.setAttribute('onclick', 'playRecord()');
    document.querySelector('#record').appendChild(playButton);
  }
}

function playRecord() {
  console.log('playing record...', musicSheets);
  // do something
}

document.addEventListener('keydown', onButtonPress);
document.addEventListener('keyup', onButtonUp);

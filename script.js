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

function onButtonPress(e) {
  if (!validButtons.includes(e.code) || activeButtons.includes(e.code)) { return; }
  activeButtons.push(e.code);
  console.log('ping', activeButtons);
  document.querySelector(`#${e.code}`).classList.add('pressed');
  if (recording) {
    musicSheets.push(e.code);
  }
}

function onButtonUp(e) {
  if (!validButtons.includes(e.code)) { return; }
  activeButtons = activeButtons.filter(btn => btn != e.code);
  // gui ki hieu tat nut (low) tuong ung toi ESP8266
  // ... vidu: 'lKeyA', 'lKeyS', ...
  console.log('low', `l${e.code}`);
  document.querySelector(`#${e.code}`).classList.remove('pressed');
  if (recording) {
    musicSheets.push(`l${e.code}`); // push in the stop point to music sheet
  }
}

function changeRecordStatus() {
  recording = !recording;
  if (recording) {
    musicSheets = []; // khoi tao lai ban ghi am
    document.querySelector('#record-btn').textContent = 'Dừng ghi âm...';
    let playBtn = document.querySelector('.play-btn');
    document.querySelector('#record').removeChild(playBtn);
  }
  else {
    document.querySelector('#record-btn').textContent = 'Ghi âm';
    let playButton = document.createElement('button');
    let text = document.createTextNode('Phát lại bản ghi');
    playButton.appendChild(text);
    playButton.classList.add('play-btn');
    playButton.setAttribute('onclick', 'playRecord()');
    document.querySelector('#record').appendChild(playButton);
  }

  console.log('record', recording);
}

function playRecord() {
  console.log('playing record...', musicSheets);
  // do something
}

document.addEventListener('keydown', onButtonPress);
document.addEventListener('keyup', onButtonUp);

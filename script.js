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

function onButtonPress(e) {
  console.log(e.code);
  if (!validButtons.includes(e.code)) { return; }
  document.querySelector(`#${e.code}`).classList.add('pressed');
}

function onButtonUp(e) {
  console.log(`Button ${e.code} upped`);
  if (!validButtons.includes(e.code)) { return; }
  document.querySelector(`#${e.code}`).classList.remove('pressed');
}

document.addEventListener('keydown', onButtonPress);
document.addEventListener('keyup', onButtonUp);

import { el, setText, setMessage } from './ui.js';

const MIN = 1;
const MAX = 100;
const STORAGE_KEY = 'guess_game_best';

let secret;
let attempts = 0;
let best = localStorage.getItem(STORAGE_KEY) ? Number(localStorage.getItem(STORAGE_KEY)) : null;

function newGame() {
  secret = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  attempts = 0;
  setText('attempts', attempts);
  setText('min', MIN);
  setText('max', MAX);
  setText('best', best ?? '—');
  setMessage('New number generated. Good luck!');
  el('guessInput').value = '';
}

function checkGuess() {
  const value = Number(el('guessInput').value);
  if (!value || value < MIN || value > MAX) {
    setMessage("Please enter a number between ${MIN} and ${MAX}.", 'error');
    return;
  }

  attempts++;
  setText('attempts', attempts);

  if (value === secret) {
    setMessage("🎉 Correct! You guessed it in ${attempts} attempt${attempts > 1 ? 's' : ''}.", 'success');

    if (!best || attempts < best) {
      best = attempts;
      localStorage.setItem(STORAGE_KEY, best);
      setText('best', best);
    }
  } else if (value < secret) {
    setMessage('Too low — try a higher number.');
  } else {
    setMessage('Too high — try a lower number.');
  }
}

function bind() {
  el('checkBtn').addEventListener('click', checkGuess);
  el('newBtn').addEventListener('click', newGame);

  el('guessInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkGuess();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bind();
  newGame();
});
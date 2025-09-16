import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './style.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive'); // class selector

  if (!interBubble) return; // safety check

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px) translate(-50%, -50%)`;
    requestAnimationFrame(move);
  }

  move(); // start animation loop

  window.addEventListener('mousemove', (e) => {
    tgX = e.clientX;
    tgY = e.clientY;
  });
});

let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];
const timerDisplay = document.getElementById('timer');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 60000) % 60);
  const hours = Math.floor(ms / 3600000);
  return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(milliseconds).padStart(2, '0')}`;
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    isRunning = true;
  }
});

document.getElementById('pause').addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

document.getElementById('lap').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = elapsedTime;
    laps.push(lapTime);
    const lapRow = document.createElement('tr');
    lapRow.innerHTML = `
      <td>Lap ${laps.length}</td>
      <td>${formatTime(lapTime - (laps[laps.length - 2] || 0))}</td>
      <td>${formatTime(lapTime)}</td>
    `;
    lapsContainer.appendChild(lapRow);
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  laps = [];
  timerDisplay.textContent = '00 : 00 : 00 : 00';
  lapsContainer.innerHTML = '';
});

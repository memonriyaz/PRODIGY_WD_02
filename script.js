let startTime = 0; // Initialize the startTime to 0
let intervalId;
let isRunning = false;
let pausedTime = 0; // Initialize the pausedTime to 0

const timeDisplay = document.querySelector('.time');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function toggleStartPause() {
    if (isRunning) {
        clearInterval(intervalId);
        startPauseButton.textContent = 'Start';
        pausedTime = Date.now() - startTime; // Store the paused time
    } else {
        startTime = Date.now() - (pausedTime || 0); // Use pausedTime
        intervalId = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    timeDisplay.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    return date.toISOString().substr(11, 8);
}

function reset() {
    clearInterval(intervalId);
    timeDisplay.textContent = '00:00:00';
    startPauseButton.textContent = 'Start';
    isRunning = false;
    startTime = 0; // Reset the startTime
    pausedTime = 0; // Reset the pausedTime
    lapsList.innerHTML = '';
}

function lap() {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

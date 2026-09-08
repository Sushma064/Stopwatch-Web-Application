let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startButton.addEventListener("click", function () {

    if (!running) {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(updateDisplay, 10);

        running = true;
        startButton.disabled = true;
    }
});

pauseButton.addEventListener("click", function () {

    if (running) {
        clearInterval(timerInterval);

        elapsedTime = Date.now() - startTime;

        display.textContent = formatTime(elapsedTime);

        running = false;
        startButton.disabled = false;
    }
});

resetButton.addEventListener("click", function () {

    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    running = false;

    display.textContent = "00:00:00:00";

    startButton.disabled = false;

    lapList.innerHTML = "";
});

lapButton.addEventListener("click", function () {

    if (running || elapsedTime > 0) {

        const li = document.createElement("li");

        const lapNumber = lapList.children.length + 1;

        li.innerHTML = `
            <span>Lap ${lapNumber}</span>
            <span>${formatTime(elapsedTime)}</span>
        `;

        lapList.appendChild(li);
    }
});
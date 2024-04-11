
"use strict";
let startTime = 0, timerInterval = 0, runningTime = 0
let secondsDegree = 0, minutesDegree = 0, hoursDegree = 0, milliSecondsDegree =  0
    
const pauseIcon= document.getElementsByClassName("pause-icon")[0]
const playIcon= document.getElementsByClassName("play-icon")[0]
const toggleResetButton = document.getElementsByClassName("reset")[0].classList

const hoursCircle = document.getElementsByClassName("hour-circle")[0].style
const minutesCircle = document.getElementsByClassName("minutes-circle")[0].style
const secondsCircle = document.getElementsByClassName("seconds-circle")[0].style

const progressBar = function() {
    secondsCircle.setProperty("--milliseconds-progress-degree", `${milliSecondsDegree}deg`)
    secondsCircle.setProperty('--seconds-progress-degree', `${secondsDegree}deg`)
    minutesCircle.setProperty('--minutes-progress-degree', `${minutesDegree}deg`)
    hoursCircle.setProperty('--hours-progress-degree', `${hoursDegree}deg`)
}

const displayTime = function() {
    const seconds = Math.floor((runningTime / 1000) % 60);
    const minutes = Math.floor((runningTime / (1000 * 60)) % 60);
    const hours = Math.floor((runningTime / (1000 * 60 * 60)) % 24);

    const milliSecondsDegree = ((runningTime % 1000) / 1000) * 6;
    secondsDegree = milliSecondsDegree  + seconds * 6;
    minutesDegree = minutes * 6
    hoursDegree = hours * 15

    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
    document.getElementById("hours").textContent =  String(hours).padStart(2, "0")
    progressBar();
}

const startStopWatch = function() {
    startTime = Date.now() - runningTime;
    updateStopwatch();
    timerInterval = setInterval(updateStopwatch, 16); //To achieve 60fps(1000ms / 60 = 16.67milli sec approax)
}

const updateStopwatch = function() {
    const currentTime = Date.now();
    runningTime = currentTime - startTime
    displayTime();
}

document.getElementsByClassName("pause-play-buttons")[0].addEventListener('click', function() { 
    toggleResetButton.add("visible-icon");
    if(playIcon.classList.contains("visible-icon")) {
        startStopWatch();
        pauseIcon.classList.add("visible-icon")
        playIcon.classList.remove("visible-icon")
    } else if(pauseIcon.classList.contains("visible-icon")) {
        clearInterval(timerInterval)
        pauseIcon.classList.remove("visible-icon")
        playIcon.classList.add("visible-icon")
    }
});

document.getElementsByClassName("reset-btn")[0].addEventListener('click', function() { 
    clearInterval(timerInterval);
    runningTime = 0;
    displayTime();

    //When user resets the stop watch, change pause button to play button in case, and remove reset button as well
    toggleResetButton.remove("visible-icon")
    pauseIcon.classList.remove("visible-icon")
    playIcon.classList.add("visible-icon")
});






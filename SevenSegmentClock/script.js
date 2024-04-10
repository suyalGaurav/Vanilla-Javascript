"use strict";

const fullscreen = document.getElementsByClassName("fullscreen-icon")[0].classList;
const compress = document.getElementsByClassName("compress-icon")[0].classList;

//segmentsToTurnOn represents all segments to turn on for digit 0
const segmentsToTurnOn = {
  0: [
    "segment-1",
    "segment-2",
    "segment-3",
    "segment-5",
    "segment-6",
    "segment-7",
  ],
  1: ["segment-3", "segment-6"],
  2: ["segment-1", "segment-3", "segment-4", "segment-5", "segment-7"],
  3: ["segment-1", "segment-3", "segment-4", "segment-6", "segment-7"],
  4: ["segment-2", "segment-3", "segment-4", "segment-6"],
  5: ["segment-1", "segment-2", "segment-4", "segment-6", "segment-7"],
  6: [
    "segment-1",
    "segment-2",
    "segment-4",
    "segment-5",
    "segment-6",
    "segment-7",
  ],
  7: ["segment-1", "segment-3", "segment-6"],
  8: [
    "segment-1",
    "segment-2",
    "segment-3",
    "segment-4",
    "segment-5",
    "segment-6",
    "segment-7",
  ],
  9: ["segment-1", "segment-2", "segment-3", "segment-4", "segment-6"],
};

document
  .getElementsByClassName("fullscreen-compress-btn")[0]
  .addEventListener("click", function () {
  if(fullscreen.contains("visible") 
    ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      fullscreen.remove("visible");
      compress.add("visible");
    } else if(compress.contains("visible"))  {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen && document.msFullscreenElement) {
        document.msExitFullscreen();
      } else if (document.mozFullScreenElement && document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      compress.remove("visible");
      fullscreen.add("visible");
    }
  });


//It will return an array of time in single digits
const getCurrentTime = function () {
  const currentDate = new Date();
  const time = [
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
  ];
  const currentTimeInDigits = [];
  for (let i = 0; i < 3; i++) {
    currentTimeInDigits.push(
      Math.trunc(time[i] / 10),
      Math.trunc(time[i] % 10)
    );
  }

  return currentTimeInDigits;
};

const resetClock = function () {
  for (let i = 0; i <= 5; i++) {
    //represents no of digits
    for (let j = 1; j <= 7; j++) {
      //represents no of segments in each digit
      const segment = document.getElementsByClassName(`segment-${j}`)[i]
        .classList;
      if (segment.contains("on")) {
        segment.remove("on");
      }
    }
  }
};

function updateSegments() {
  resetClock();

  const timeInDigits = getCurrentTime();

  for (let i = 0; i < timeInDigits.length; i++) {
    const segments = segmentsToTurnOn[timeInDigits[i]];
    for (let j = 0; j < segments.length; j++) {
      const segment = document.getElementsByClassName(segments[j])[i].classList;
      if (!segment.contains("on")) {
        segment.add("on");
      }
    }
  }
}

//Initial Call
setInterval(updateSegments, 1000); //Will call showTime every 1000ms.

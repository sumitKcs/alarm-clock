import { startPersistentVibrate } from "./vibration.js";

const alarmButton = document.getElementById("alarm-button");
const digitalClock = document.getElementById("digital-clock");

export default function setAlarm(
  hourVal,
  minuteVal,
  meridiemVal,
  flag,
  interval
) {
  if (flag === 1) {
    console.log("alarm on");
    const currentTIme = new Date();
    let currentHour = currentTIme.getHours();
    let currentMinute = currentTIme.getMinutes();

    if (meridiemVal === "PM") {
      currentHour = currentHour - 12;
    }

    //ring when time matches
    if (hourVal == currentHour && minuteVal == currentMinute) {
      //clear interval time
      clearInterval(interval);
      //play sound
      console.log("playing...");
      theme.play();
      //start vibration
      startPersistentVibrate(500, 100);
      //add shaking animation to digital clock
      digitalClock.classList.add("animate-up");
      //remove locastorage data
      localStorage.removeItem("alarm");
      return;
    }
  }
  return;
}

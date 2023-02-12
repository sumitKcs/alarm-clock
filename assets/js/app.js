import setAlarm from "./alarm.js";
import { setLocalStorage, deleteLocalStorage } from "./localstorage.js";
import consoleText from "./console.js";
import { stopVibrate } from "./vibration.js";

//setClock function will keep executing at every 1ms to move the analog clock hands
setInterval(setClock, 100);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const hourTime = document.querySelector("[data-hour-time]");
const minuteTime = document.querySelector("[data-minute-time]");
const secondTime = document.querySelector("[data-second-time]");
const meridiemTime = document.querySelector("[data-meridiem-time]");
const alarmHour = document.getElementById("select-alarm-hour");
const alarmMinute = document.getElementById("select-alarm-minute");
const alarmMeridian = document.getElementById("select-alarm-meridiem");
const alarmButton = document.getElementById("alarm-button");
const cancelAlarmButton = document.getElementById("alarm-cancel-button");
const selectContainer = document.getElementById("select-container");
const alarmContainer = document.getElementById("alarm-container");
const modal = document.getElementById("modal");
const modalTime = document.getElementById("modal-time");
const modalStop = document.getElementById("modal-stop-button");
const modalKeep = document.getElementById("modal-keep-button");
const digitalClock = document.getElementById("digital-clock");

//variable
let meridiem;
//flag will decided whether alarm check will execute or not inside SetAlarm function
// 1 will execute setAlarm() and 0 will not
let flag = 1;
let interval;
//localstorage alarmData
let alarmData;

// generating options for hour selector, minute seletor and meridiem selector.
//hours options
for (let i = 0; i < 13; i++) {
  i < 10 ? "0" + i : i;
  alarmHour.innerHTML += `<option value="${i}">${i}</option>`;
}
//minutes options
for (let i = 0; i <= 60; i++) {
  i < 10 ? "0" + i : i;
  alarmMinute.innerHTML += `<option value="${i}">${i}</option>`;
}

//meridian AM/PM options
for (let i = 1; i <= 2; i++) {
  let meridian = i == 1 ? "AM" : "PM";
  alarmMeridian.innerHTML += `<option value="${meridian}">${meridian}</option>`;
}

//checking for localstorage alarm data on window load
window.onload = () => {
  //getting alarm data from localstorage
  alarmData = JSON.parse(localStorage.getItem("alarm"));
  if (alarmData) {
    //setting time text which appears on modal content
    modalTime.innerText =
      alarmData.hour + " : " + alarmData.minute + " " + alarmData.meridiem;
    //displaying modal
    modal.style.display = "flex";
  }
};
//onclick event for modal stop button
modalStop.addEventListener("click", () => {
  //setting flag to zero in order to stop executing setAlarm function
  flag = 0;
  //deleting localstorage alarm data
  deleteLocalStorage("alarm");
  //hiding modal
  modal.style.display = "none";
});
//onclick event for modal keep button
modalKeep.addEventListener("click", () => {
  //setting flag to one in order to keep executing setAlarm function
  flag = 1;
  //getting alarm data from local storage
  alarmData = JSON.parse(localStorage.getItem("alarm"));
  if (alarmData) {
    //hiding modal
    modal.style.display = "none";
    //keep executing setAlarm function every 9ms until alarm time matches
    interval = setInterval(() => {
      setAlarm(
        alarmData.hour,
        alarmData.minute,
        alarmData.meridiem,
        1,
        interval
      );
    }, 900);
    //setting flag to zero as we have already called setAlarm()
    //and currently we don't need to run again setAlarm()
    flag = 0;

    //applying set alarm button onclick effect
    setAlarmButtonEffect(alarmData.hour, alarmData.minute, alarmData.meridiem);
  }
});

//set alarm button onClick event
alarmButton.addEventListener("click", () => {
  //setting flag as 1 as we need to execute setAlarm() on set alarm button click
  flag = 1;
  //getting select values
  //hours value
  let hourVal = alarmHour.value;
  // minutes value
  let minuteVal = alarmMinute.value;
  // merideim value
  let meridiemVal = alarmMeridian.value;
  //getting current time
  const currentTIme = new Date();
  //getting current hour
  let currentHour = currentTIme.getHours();
  //getting curent minute
  let currentMinute = currentTIme.getMinutes();
  //creating alarm object for localstorage
  let alarm = {
    hour: hourVal,
    minute: minuteVal,
    meridiem: meridiemVal,
  };
  //checking if merideiemVal is 'PM' or 'AM'
  //if 'PM' them subtract 12 from current hours(because it has 24 hours format)
  if (meridiemVal === "PM") {
    currentHour = currentHour - 12;
  }
  //checking if alarm time options are selected
  if (hourVal && minuteVal && meridiemVal) {
    if (flag == 1) {
      //storing alarm data in localstorage
      setLocalStorage("alarm", alarm);
      //keep executing setAlarm function every 9ms until alarm time matches
      interval = setInterval(() => {
        setAlarm(hourVal, minuteVal, meridiemVal, 1, interval);
      }, 900);
      //setting flag to zero as we have already called setAlarm()
      //and curerently we don't need to run again setAlarm()
      flag = 0;
    }

    //applying set alarm button onclick effect
    setAlarmButtonEffect(hourVal, minuteVal, meridiemVal);
  }
});

cancelAlarmButton.addEventListener("click", () => {
  //pause the alarm tune
  theme.pause();
  //stop vibration
  stopVibrate();
  //remove shaking animation to digital clock
  digitalClock.classList.remove("animate-up");
  //hiding stop alarm button
  cancelAlarmButton.style.display = "none";
  //hiding alarm details container
  selectContainer.style.display = "flex";
  //displaying set alarm button
  alarmButton.style.display = "";
  //displaying alarm time selectors
  alarmContainer.style.display = "none";
  //remove localStorage data
  deleteLocalStorage("alarm");
  //setting flag to zero as we have already called setAlarm()
  //and currently we don't need to run again setAlarm()
  flag = 0;
});

//analog clock hands rotation function
function setClock() {
  const currentTIme = new Date();
  const secondsRatio = currentTIme.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentTIme.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentTIme.getHours()) / 12;

  let hours = currentTIme.getHours();
  let minutes = currentTIme.getMinutes();
  let seconds = currentTIme.getSeconds();
  meridiem = hours < 12 ? "AM" : "PM";
  hours = hours > 12 ? hours - 12 : hours;
  hourTime.innerHTML = hours < 10 ? "0" + hours : hours;
  minuteTime.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secondTime.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  meridiemTime.innerHTML = meridiem;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

//setClock() helper function
function setRotation(element, rotationRatio) {
  const rotationDegree = rotationRatio * 360 + "deg";
  element.style.setProperty("--rotation", rotationDegree);
}

function setAlarmButtonEffect(hour, minute, meridiem) {
  //hiding set alarm button
  alarmButton.style.display = "none";
  //hiding alarm time select option dowpdowns
  selectContainer.style.display = "none";
  //displaying stop alarm button
  cancelAlarmButton.style.display = "flex";
  //displaying alarm time text container
  alarmContainer.style.display = "flex";
  //setting alarm time text conatiner data
  const alarmContainerChild = alarmContainer.children;
  alarmContainerChild[1].innerHTML = hour;
  alarmContainerChild[2].innerHTML = minute;
  alarmContainerChild[3].innerHTML = meridiem;
}

function swRegistration() {
  const heart = [
    "font-size: 20px",
    "padding: 12px",
    "margin: 4px 0 4px 4px",
    "color: rgba(238,58,136,1)",
  ].join(";");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((registration) => {
        console.log("%c❤️", heart);
      })
      .catch((err) => console.log(err));
  }
}

swRegistration();
consoleText();

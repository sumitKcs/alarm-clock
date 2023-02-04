import setAlarm from "./alarm.js";
import { setLocalStorage, deleteLocalStorage } from "./localstorage.js";
setInterval(setClock, 100);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const hourTime = document.querySelector("[data-hour-time]");
const minuteTime = document.querySelector("[data-minute-time]");
const secondTime = document.querySelector("[data-second-time]");
const meridiemTime = document.querySelector("[data-meridiem-time]");
const alarmHour = document.getElementById("alarm-hour");
const alarmMinute = document.getElementById("alarm-minute");
const alarmMeridian = document.getElementById("alarm-meridiem");
const alarmButton = document.getElementById("alarm-button");
const cancelAlarmButton = document.getElementById("alarm-cancel-button");
const selectContainer = document.getElementById("select-container");
const alarmContainer = document.getElementById("alarm-container");
const modal = document.getElementById("modal");
const modalStop = document.getElementById("modal-stop-button");
const modalKeep = document.getElementById("modal-keep-button");

//variable
let meridiem;
let flag = 1;
let interval;
//get alarm data localstorage

window.onload = () => {
  const alarmData = JSON.parse(localStorage.getItem("alarm"));
  console.log(alarmData);
  if (alarmData) {
    modal.style.display = "flex";
  }
};
modalStop.addEventListener("click", () => {
  flag = 0;
  deleteLocalStorage("alarm");
  modal.style.display = "none";
});
modalKeep.addEventListener("click", () => {
  flag = 1;
  const alarmData = JSON.parse(localStorage.getItem("alarm"));
  if (alarmData) {
    modal.style.display = "none";
    interval = setInterval(() => {
      setAlarm(
        alarmData.hour,
        alarmData.minute,
        alarmData.meridiem,
        1,
        interval
      );
    }, 900);
    flag = 0;
    console.log(alarmData.hour, alarmData.minute, alarmData.meridiem, 1);
  }
});
// alarm code
//hours
for (let i = 0; i < 13; i++) {
  i < 10 ? "0" + i : i;
  alarmHour.innerHTML += `<option value="${i}">${i}</option>`;
}
//minutes
for (let i = 0; i <= 60; i++) {
  i < 10 ? "0" + i : i;
  alarmMinute.innerHTML += `<option value="${i}">${i}</option>`;
}

//meridian AM/PM
for (let i = 1; i <= 2; i++) {
  let meridian = i == 1 ? "AM" : "PM";
  alarmMeridian.innerHTML += `<option value="${meridian}">${meridian}</option>`;
}

alarmButton.addEventListener("click", () => {
  flag = 1;
  let hourVal = alarmHour.value;
  let minuteVal = alarmMinute.value;
  let meridiemVal = alarmMeridian.value;
  const currentTIme = new Date();
  let currentHour = currentTIme.getHours();
  let currentMinute = currentTIme.getMinutes();
  let alarm = {
    hour: hourVal,
    minute: minuteVal,
    meridiem: meridiemVal,
  };
  if (meridiemVal === "PM") {
    currentHour = currentHour - 12;
  }
  //checking if value is selected
  if (hourVal && minuteVal && meridiemVal) {
    if (flag == 1) {
      setLocalStorage("alarm", alarm);
      interval = setInterval(() => {
        setAlarm(hourVal, minuteVal, meridiemVal, 1, interval);
      }, 900);
      flag = 0;
    }

    //apply onclick button effect
    alarmButton.style.display = "none";
    cancelAlarmButton.style.display = "flex";
    cancelAlarmButton.style.justifyContent = "center";
    cancelAlarmButton.style.alignItems = "center";
    selectContainer.style.display = "none";
    alarmContainer.style.display = "flex";
    const alarmContainerChild = alarmContainer.children;
    alarmContainerChild[1].innerHTML = hourVal;
    alarmContainerChild[2].innerHTML = minuteVal;
    alarmContainerChild[3].innerHTML = meridiemVal;
  }
});

cancelAlarmButton.addEventListener("click", () => {
  flag = 0;
  setAlarm("", "", "", 0);
  cancelAlarmButton.style.display = "none";
  selectContainer.style.display = "flex";
  alarmButton.style.display = "";
  alarmContainer.style.display = "none";
  //remove localStorage data
  deleteLocalStorage("alarm");
  theme.pause();
  clearInterval(interval);
});

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

function setRotation(element, rotationRatio) {
  const rotationDegree = rotationRatio * 360 + "deg";
  element.style.setProperty("--rotation", rotationDegree);
}

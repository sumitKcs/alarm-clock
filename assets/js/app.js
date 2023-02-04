import setAlarm from "./alarm.js";
import setLocalStorage from "./localstorage.js";
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
//variable
let meridiem;
//get alarm data localstorage

window.onload = () => {
  const alarmData = JSON.parse(localStorage.getItem("alarm"));
  console.log(alarmData);
  if (alarmData) {
    
    setAlarm(alarmData.hour, alarmData.minute, alarmData.meridiem);
    console.log(alarmData.hour, alarmData.minute, alarmData.meridiem);
  }
};

// alarm code
//hours
for (let i = 1; i < 13; i++) {
  i < 10 ? "0" + i : i;
  alarmHour.innerHTML += `<option value="${i}">${i}</option>`;
}
//minutes
for (let i = 1; i <= 60; i++) {
  i < 10 ? "0" + i : i;
  alarmMinute.innerHTML += `<option value="${i}">${i}</option>`;
}

//meridian AM/PM
for (let i = 1; i <= 2; i++) {
  let meridian = i == 1 ? "AM" : "PM";
  alarmMeridian.innerHTML += `<option value="${meridian}">${meridian}</option>`;
}

alarmButton.addEventListener("click", () => {
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
    setAlarm(hourVal, minuteVal, meridiemVal);
    setLocalStorage("alarm", alarm);
    //apply onclick button effect
    alarmButton.style.opacity = "0.5";
    setTimeout(() => {
      alarmButton.style.opacity = "1";
      console.log("timeout called");
    }, 1000);
  }
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

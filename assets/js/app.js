setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const hourTime = document.querySelector("[data-hour-time]");
const minuteTime = document.querySelector("[data-minute-time]");
const secondTime = document.querySelector("[data-second-time]");

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  hourTime.innerHTML = currentDate.getHours();
  minuteTime.innerHTML = currentDate.getMinutes();
  secondTime.innerHTML = currentDate.getSeconds();
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  const rotationDegree = rotationRatio * 360 + "deg";
  element.style.setProperty("--rotation", rotationDegree);
}

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
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  hourTime.innerHTML = hours.toString().length == 1 ? "0" + hours : hours;
  minuteTime.innerHTML =
    minutes.toString().length == 1 ? "0" + minutes : minutes;
  secondTime.innerHTML =
    seconds.toString().length == 1 ? "0" + seconds : seconds;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  const rotationDegree = rotationRatio * 360 + "deg";
  element.style.setProperty("--rotation", rotationDegree);
}

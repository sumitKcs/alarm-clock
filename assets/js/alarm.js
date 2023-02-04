const alarmButton = document.getElementById("alarm-button");

export default function setAlarm(hourVal, minuteVal, meridiemVal) {
  const currentTIme = new Date();
  let currentHour = currentTIme.getHours();
  let currentMinute = currentTIme.getMinutes();

  if (meridiemVal === "PM") {
    currentHour = currentHour - 12;
  }

  //ring when time matches
  if (hourVal == currentHour && minuteVal == currentMinute) {
    //play sound
    console.log("playing...");
    theme.play();
    //remove locastorage data
    localStorage.removeItem("alarm");
  }
}

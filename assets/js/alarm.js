const alarmButton = document.getElementById("alarm-button");

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
      clearInterval(interval);
      //play sound
      console.log("playing...");
      theme.play();
      //remove locastorage data
      localStorage.removeItem("alarm");
    }
  } else {
    clearInterval(interval);
    console.log("alarm off");
  }
}

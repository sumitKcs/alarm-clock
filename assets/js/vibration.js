let vibrateInterval;

// Starts vibration at passed in level
function startVibrate(duration) {
  navigator.vibrate(duration);
}

// Stops vibration
function stopVibrate() {
  // Clear interval and stop persistent vibrating
  if (vibrateInterval) clearInterval(vibrateInterval);
  navigator.vibrate(0);
}

// Start persistent vibration at given duration and interval
// Assumes a number value is given
function startPersistentVibrate(duration, interval) {
  console.log("vibrating....");
  vibrateInterval = setInterval(() => {
    startVibrate(duration);
  }, interval);
}

export { startVibrate, stopVibrate, startPersistentVibrate };

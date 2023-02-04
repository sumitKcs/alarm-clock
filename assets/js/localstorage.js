function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}

export { setLocalStorage, deleteLocalStorage };

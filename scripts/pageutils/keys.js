var keys = {};
document.addEventListener("keydown", function(event) {
  keys[event.key.toLowerCase()] = keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
  keys[event.key.toLowerCase()] = keys[event.keyCode] = false;
});

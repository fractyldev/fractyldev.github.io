var canvas, ctx;

document.addEventListener("DOMContentLoaded", function(event) { 
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  resize();
});

function resize() {
  if(window.innerWidth/window.innerHeight < 1.2) {//If the aspect ratio is less than 1.2
    canvas.width  = window.innerWidth;
    canvas.height = 5/6 * window.innerWidth;
  }//Set the size based on the window's width. Otherwise...
  else {
    canvas.width  = 6/5 * window.innerHeight;
    canvas.height = window.innerHeight;
  }//Set the size based on the window's height.
};

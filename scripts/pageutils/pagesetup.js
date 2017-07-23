var canvas, ctx, mouseX, mouseY, mouseIsPressed;

document.addEventListener("DOMContentLoaded", function(event) { 
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  pageResize();
  
  canvas.onmousemove = mouseUpdate;
  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  
  window.onresize = pageResize;
});

function mouseUpdate(mouseEvent) {
  var canvasBoundingRect = canvas.getBoundingClientRect()
  mouseX = mouseEvent.clientX - canvasBoundingRect.left;
  mouseY = mouseEvent.clientY - canvasBoundingRect.top;
}

function mouseDown(mouseEvent) {
  mouseIsPressed = true;
};
function mouseUp(mouseEvent) {
  mouseIsPressed = false;
};

function pageResize() {
  if(window.innerWidth/window.innerHeight < 1.2) {
    canvas.width  = window.innerWidth;
    canvas.height = 5/6 * window.innerWidth;
  }
  else {
    canvas.width  = 6/5 * window.innerHeight;
    canvas.height = window.innerHeight;
  }
};

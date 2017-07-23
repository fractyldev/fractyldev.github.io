var circles = [], lines = [], constraints = [];

var selected;

function update() {
  ctx.lineCap = "round";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  
  for(var i = 0; i < lines.length; i++) {
    for(var j = 0; j < circles.length; j++) {
      circles[j].collideLine(lines[i]);
    }
    lines[i].draw();
  }
  
  for(var i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  
  for(var i = 0; i < constraints.length; i++) {
    constraints[i].display();
  }
  
  drag();
};

function onLoad() {
  circles.push(new Circle({
    x: 100,
    y: 25,
    rad: 25,
    bcf: 0.95,
    mass: 2
  }));
  
  circles.push(new Circle({
    x: 200,
    y: 50,
    rad: 15,
    bcf: 0.95,
    mass: 1
  }));
  
  circles.push(new Circle({
    x: 150,
    y: 150,
    rad: 15,
    bcf: 0.95,
    mass: 1
  }));
  
  constraints.push(new Rod({
    one: circles[0],
    two: circles[1],
    length: 110,
    rigidity: 15,
  }));
  constraints.push(new Rod({
    one: circles[0],
    two: circles[2],
    length: 110,
    rigidity: 15,
  }));
  constraints.push(new Rod({
    one: circles[1],
    two: circles[2],
    length: 110,
    rigidity: 15
  }));
  
  lines.push(new Line({
    one: [50, 150],
    two: [150, 200],
    bcf: 0.95,
  }));
  lines.push(new Line({
    one: [250, 175],
    two: [150, 200],
    bcf: 0.95,
  }));
  
  setInterval(update, 16);
}

function drag() {
  if(mouseIsPressed && !selected) {
    for(var i = 0; i < circles.length; i++) {
      if(vectDist([mouseX * 600/canvas.width, mouseY * 500/canvas.height], circles[i].pos) < circles[i].rad * 2) {
        selected = circles[i];
      }
    }
  }
  else {
    selected = undefined;
  }
  
  if(selected) {
    selected.moveTowards([mouseX * 600/canvas.width, mouseY * 500/canvas.height], 10);
  }
}

document.addEventListener("mousemove", mouseUpdate);


document.addEventListener("DOMContentLoaded", onLoad);



var circles = [], lines = [], constraints = [];

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
};

function onLoad() {
  circles.push(new Circle({
    x: 200,
    y: 50,
    rad: 50,
    bcf: 0.95,
  }));
  
  circles.push(new Circle({
    x: 400,
    y: 100,
    rad: 30,
    bcf: 0.95,
  }));
  
  circles.push(new Circle({
    x: 300,
    y: 300,
    rad: 30,
    bcf: 0.95,
  }));
  
  constraints.push(new Cord({
    one: circles[0],
    two: circles[1],
    length: 220,
    rigidity: 30,
  }));
  constraints.push(new Cord({
    one: circles[0],
    two: circles[2],
    length: 220,
    rigidity: 30,
  }));
  constraints.push(new Cord({
    one: circles[1],
    two: circles[2],
    length: 220,
    rigidity: 30
  }));
  
  lines.push(new Line({
    one: [100, 300],
    two: [300, 400],
    bcf: 0.95,
  }));
  lines.push(new Line({
    one: [500, 350],
    two: [300, 400],
    bcf: 0.95,
  }));
  
  setInterval(update, 16);
}

document.addEventListener("DOMContentLoaded", onLoad);



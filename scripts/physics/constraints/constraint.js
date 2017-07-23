var Constraint = function(config) {
  this.one = config.one;
  this.two = config.two;
  
  this.rigidity = config.rigidity || config.ridg || 1/3;
  this.length = config.length || 100;
  
  this.one.constraints.push(this);
  this.two.constraints.push(this);
};
Constraint.prototype.springEffect = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  var difference = vectMult(vectNorm(vectSub(this.one.pos, this.two.pos)), this.rigidity * (distance/this.length - 1));
  
  this.one.vel = vectSub(this.one.vel, difference);
  this.two.vel = vectAdd(this.two.vel, difference);
};
Constraint.prototype.forceCompensate = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  var difference = vectMult(vectNorm(vectSub(this.one.pos, this.two.pos)), this.length/2);
  var mid = vectMid(this.one.pos, this.two.pos);
  
  this.one.posAdjustments.push(vectAdd(mid, difference));
  this.two.posAdjustments.push(vectSub(mid, difference));
  this.one.pos = vectLerp(this.one.pos, vectAdd(mid, difference), 0.2);
  this.two.pos = vectLerp(this.two.pos, vectSub(mid, difference), 0.2);
};
Constraint.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 5;
  ctx.moveTo(this.one.pos[0] * canvas.width/600, this.one.pos[1] * canvas.height/500);
  ctx.lineTo(this.two.pos[0] * canvas.width/600, this.two.pos[1] * canvas.height/500);
  ctx.stroke();
};
Constraint.prototype.display = function() {
  if(this.update) {
    this.update();
  }
  this.draw();
};


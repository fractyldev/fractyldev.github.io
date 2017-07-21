var Constraint = function(config) {
  this.one = config.one;
  this.two = config.two;
  
  this.rigidity = config.rigidity || config.ridg || 1/3;
  this.length = config.length || 100;
  
  this.one.constraints.push(this);
  this.two.constraints.push(this);
};
Constraint.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  var difference = vectMult(vectNorm(vectSub(this.one.pos, this.two.pos)), this.rigidity * (distance/this.length - 1));
  
  this.one.vel = vectSub(this.one.vel, difference);
  this.two.vel = vectAdd(this.two.vel, difference);
};
Constraint.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = this.rad * 2;
  ctx.moveTo(this.one.pos[0], this.one.pos[1]);
  ctx.lineTo(this.two.pos[0], this.two.pos[1]);
  ctx.stroke();
};
Constraint.prototype.display = function() {
  this.update();
  this.draw();
};

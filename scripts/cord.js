var Cord = function(config) {
  this.one = config.one;
  this.two = config.two;
  
  this.rigidity = config.rigidity || 1;
  
  this.length = config.length || 100;
  
  this.one.constraints.push(this);
  this.two.constraints.push(this);
};
Cord.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  var difference = vectMult(vectNorm(vectSub(this.one.pos, this.two.pos)), this.length/2);
  var mid = vectMid(this.one.pos, this.two.pos);
  
    this.one.pos = vectLerp(this.one.pos, vectAdd(mid, difference), 0.2);
    this.two.pos = vectLerp(this.two.pos, vectSub(mid, difference), 0.2);
  
  
  var difference = vectMult(vectNorm(vectSub(this.one.pos, this.two.pos)), this.rigidity * (distance/this.length - 1));
  
  this.one.vel = vectSub(this.one.vel, difference);
  this.two.vel = vectAdd(this.two.vel, difference);
};
Cord.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 5;
  ctx.moveTo(this.one.pos[0], this.one.pos[1]);
  ctx.lineTo(this.two.pos[0], this.two.pos[1]);
  ctx.stroke();
};
Cord.prototype.display = function() {
  this.update();
  this.draw();
};

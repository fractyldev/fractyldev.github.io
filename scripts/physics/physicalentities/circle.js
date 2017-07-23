var Circle = function(config) {
  /** Position and Velocity **/
  this.pos = config.pos || [config.x, config.y];
  this.vel = config.vel || [0, 0];
  
  /** Bounciness **/
  this.bcf = config.bcf || 0.75;
  
  /** Radius **/
  this.rad = config.rad || 15;
  
  /** Array of Constraints **/
  this.constraints = [];
  
  /** Physical Sleep **/
  this.asleep = false;
  
  /** Array of Position Adjustments **/
  this.posAdjustments = [];
  
  /** Mass **/
  this.mass = config.mass || 1;
};
Circle.prototype.update = function() {
  if(vectMag(this.vel) > 1) {
    this.asleep = false;
  }
  this.pos = vectAdd(vectDiv(this.vel, this.mass), this.pos);//Add velocity to position
  
  this.vel[1] += 0.5;//Gravity
  
  this.vel = vectMult(this.vel, (this.asleep ? 0.9 : 0.99));//Air resistance
  
  this.manageAdjustments();
};
Circle.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.ellipse(this.pos[0] * canvas.width/600, this.pos[1] * canvas.height/500, this.rad * canvas.width/600, this.rad * canvas.height/500, 0, 0, 6.279);
  ctx.fill();
};
Circle.prototype.display = function() {
  if(this.move) {
    this.move();
  }
  this.update();
  this.draw();
};

Circle.prototype.moveTowards = function(target, force) {
  this.vel = vectAdd(this.vel, vectMult(vectNorm(vectSub(target, this.pos)), force));
};
Circle.prototype.manageAdjustments = function() {
  if(this.posAdjustments.length === 0) {
    return;
  }
  
  var adjustmentAvg = [0, 0];
  for(var i = 0; i < this.posAdjustments.length; i++) {
    adjustmentAvg = vectAdd(adjustmentAvg, this.posAdjustments[i]);
  }
  this.pos = vectLerp(this.pos, vectDiv(adjustmentAvg, this.posAdjustments.length), 0.3);
  
  this.posAdjustments = [];
};
Circle.prototype.trySleep = function() {
  if(vectMag(this.vel) < 1.5) {
    this.asleep = true;
    this.vel = vectMult(this.vel, 0.8);
  }
};
Circle.prototype.collideLine = function(line) {
  if(line.one[0] === line.two[0] ||
     line.one[1] === line.two[1]) { return; }
  
  if(circleCollidingLine(line.one, line.two, this.pos, this.rad + line.rad)) {
    if(!intersecting(this.pos, vectRefl(this.pos, line.one, line.two), line.one, line.two)) {
      var n = (vectDist(this.pos, line.one) < vectDist(this.pos, line.two)) ? line.one : line.two;
      this.vel = vectMult(vectSub(vectRefl(vectSub(this.pos, this.vel), n, this.pos), this.pos), line.bcf * this.bcf);
      this.pos = vectSub(n, vectMult(vectNorm(vectSub(n, this.pos)), this.rad + line.rad));
    }
    else{
      var n = intersection(this.pos, vectRefl(this.pos, line.one, line.two), line.one, line.two);
      this.vel = vectMult(vectSub(n, vectRefl(vectSub(n, this.vel), n, vectAdd(n, [1, PM(line.one, line.two)]))), -line.bcf * this.bcf);
      this.pos = vectAdd(n, vectMult(vectNorm([1, PM(line.one, line.two)]), (this.rad + line.rad) * (this.pos[1] > n[1] ? -1 : 1) * (line.one[0] > line.two[0] ? -1 : 1) * (line.one[1] > line.two[1] ? -1 : 1)));
    }
    this.trySleep();
  }
};

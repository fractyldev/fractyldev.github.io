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
};
Circle.prototype.update = function() {
  if(vectMag(this.vel) > 3 * 0.8) {
    this.asleep = false;
  }
  if(!this.asleep) {
    this.pos = vectAdd(this.vel, this.pos);//Add velocity to position
  
    this.vel[1] += 0.5;//Gravity
  }
  this.vel = vectMult(this.vel, 0.99);//Air resistance
};
Circle.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.ellipse(this.pos[0], this.pos[1], this.rad, this.rad, 0, 0, 6.279);
  ctx.fill();
};
Circle.prototype.moveTowards = function(target, force) {
  this.vel = vectAdd(this.vel, vectMult(vectNorm(vectSub(target, this.pos)), force));
};
Circle.prototype.display = function() {
  if(this.move) {
    this.move();
  }
  this.update();
  this.draw();
};
Circle.prototype.trySleep = function() {
  if(vectMag(this.vel) < 3) {
    this.asleep = true;
    this.vel = vectMult(this.vel, 0.8);
  }
};
Circle.prototype.collideLine = function(line) {
  if(line.one[0] === line.two[0] ||
     line.one[1] === line.two[1]) { return; }
  
  if(circleCollidingLine(line.one, line.two, this.pos, this.rad + line.rad - 1)) {
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



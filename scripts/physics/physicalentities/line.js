var Line = function(config) {
  this.one = config.one || [0, 0];
  this.two = config.two || [0, 0];
  
  /** Bounce Coefficient **/
  this.bcf = config.bcf || 0.75;
  
  /** Radius **/
  this.rad = config.rad || 4;
  
  /** Health Variables **/
  this.healthCap = config.health || 100;
  this.healthNow = this.healthCap;
  this.armor = config.armor || 0;
};
Line.prototype.damage = function() {
  this.healthNow -= damageDealt > this.armor ? (damageDealt - this.armor) : 0;
  
  //This is so that, if healthNow is under (or equal to) zero, the entity can't regenerate to above zero before it's caught.
  if(this.healthNow <= 0) {
    this.health = -Infinity;
  }
};
Line.prototype.heal = function(healBy) {
  this.healthNow += healBy;
  if(this.healthNow > this.healthCap) {
    this.healthNow = this.healthCap;
  }
};
Line.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = this.rad * 2;
  ctx.moveTo(this.one[0] * canvas.width/600, this.one[1] * canvas.height/500);
  ctx.lineTo(this.two[0] * canvas.width/600, this.two[1] * canvas.height/500);
  ctx.stroke();
};


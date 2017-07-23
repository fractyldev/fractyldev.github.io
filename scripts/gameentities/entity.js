var Entity = function(config) {
  Circle.call(this, config);
  
  /** Movement Variables **/
  this.speed = config.speed || 0.35;
  
  /** Health Variables **/
  this.healthCap = config.health || 100;
  this.healthNow = this.healthCap;
  this.armor = config.armor || 0;
  
  this.statusEffects = [];
};
Entity.prototype = Object.create(Circle.prototype);
Entity.prototype.damage = function(damageDealt) {
  this.healthNow -= damageDealt > this.armor ? (damageDealt - this.armor) : 1;
  
  //This is so that, if healthNow is under (or equal to) zero, the entity can't regenerate to above zero before it's caught.
  if(this.healthNow <= 0) {
    this.health = -Infinity;
  }
};
Entity.prototype.heal = function() {
  this.healthNow += healBy;
  if(this.healthNow > this.healthCap) {
    this.healthNow = this.healthCap;
  }
};
Entity.prototype.moveLeft = function() {
  this.vel[0] -= this.speed;
};
Entity.prototype.moveRight = function() {
  this.vel[0] += this.speed;
};



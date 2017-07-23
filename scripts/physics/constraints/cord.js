var Cord = function(config) {
  Constraint.call(this, config);
};
Cord.prototype = Object.create(Constraint.prototype);
Cord.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  if(distance > this.length) {
    this.springEffect();
    this.forceCompensate();
  }
};

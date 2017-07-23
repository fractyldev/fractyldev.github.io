var Extender = function(config) {
  Constraint.call(this, config);
};
Extender.prototype = Object.create(Constraint.prototype);
Extender.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  if(distance < this.length) {
    this.springEffect();
    this.forceCompensate();
  }
};

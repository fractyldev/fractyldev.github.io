var Rod = function(config) {
  Constraint.call(this, config);
};
Rod.prototype = Object.create(Constraint.prototype);
Rod.prototype.update = function() {
  this.springEffect();
  this.forceCompensate();
};

var Spring = function(config) {
  Constraint.call(this, config);
};
Spring.prototype = Object.create(Constraint.prototype);
Spring.prototype.update = function() {
  this.springEffect();
};

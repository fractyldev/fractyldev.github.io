var Bungee = function(config) {
  Constraint.call(this, config);
};
Bungee.prototype = Object.create(Constraint.prototype);
Bungee.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  if(distance > this.length) {
    this.springEffect();
  }
};

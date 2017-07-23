var Compressor = function(config) {
  Constraint.call(this, config);
};
Compressor.prototype = Object.create(Constraint.prototype);
Compressor.prototype.update = function() {
  var distance = vectDist(this.one.pos, this.two.pos);
  if(distance < this.length) {
    this.springEffect();
  }
};

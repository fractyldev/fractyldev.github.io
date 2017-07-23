var Player = function(config) {
  Entity.call(this, config);
  
  this.move = function() {
    if(keys.a) {
      this.moveLeft();
    }
    if(keys.d) {
      this.moveRight();
    }
  };
};
Player.prototype = Object.create(Entity.prototype);

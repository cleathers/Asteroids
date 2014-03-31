(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, 0, 0, Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'black';

  Ship.prototype.power = function(impulse){

    this.direction += impulse[0];

    if (Math.abs(this.speed + impulse[1]) <= 5){
      this.speed += impulse[1];
    }
  }

  Ship.prototype.fireBullet = function() {
    return new Asteroids.Bullet([this.posX, this.posY],
                                this.speed*2, this.direction);
  }

  Ship.prototype.move = function(dimX, dimY) {
    Asteroids.MovingObject.prototype.move.call(this, dimX, dimY);
    this.speed *= 0.98;
  }


})(this);

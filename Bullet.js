(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Bullet = Asteroids.Bullet = function(pos, speed, direction) {
    Asteroids.MovingObject.call(this, pos, speed, direction, Bullet.RADIUS, randomColor());
    if (this.speed === 0) {
      this.speed = 10;
    }
    this.moves = 0;
  }

  Bullet.inherits(Asteroids.MovingObject);

  var randomColor = function() {
        // rip-off from:
        //     http://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
      return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  };

  Bullet.RADIUS = 2;

  Bullet.prototype.move = function(dimX, dimY) {
    Asteroids.MovingObject.prototype.move.call(this, dimX, dimY);

    // VVVVVVVVVVVVVVVV  adds one to moves. removes after moves === something
    this.moves += 1;
  }




})(this);



(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function(pos,  speed, direction, radius, color) {
    Asteroids.MovingObject.call(this, pos, speed, direction, radius, color);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // Asteroid Properties
  var randomColor = function () {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 2;
  Asteroid.randomDir = function(){
    return Math.random() * Math.PI*2
  }

  Asteroid.randomSpeed = function() {
    return Math.random() * Asteroid.SPEED;
  }

  Asteroid.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.lineWidth = 2;

    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.stroke();
  }


  Asteroid.randomAsteroid = function(dimX, dimY) {
    var randX = Math.floor(Math.random() * dimX);
    var randY = Math.floor(Math.random() * dimY);
    var color = randomColor();
    var radius = Math.floor(Math.random() * Asteroid.RADIUS + 10);
    return new Asteroid([randX, randY], Asteroid.randomSpeed(),
                                Asteroid.randomDir(), radius, color);
  }

})(this)

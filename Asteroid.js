

(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function(pos,  speed, direction, radius, color) {
    Asteroids.MovingObject.call(this, pos, speed, direction, radius, color);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // Asteroid Properties
  Asteroid.COLORS = ['pink', 'blue', 'green', 'red'];
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 2;
  Asteroid.randomDir = function(){
    return Math.random() * Math.PI*2
  }

  Asteroid.randomSpeed = function() {
    return Math.random() * Asteroid.SPEED;
  }


  Asteroid.randomAsteroid = function(dimX, dimY) {
    var randX = Math.floor(Math.random() * dimX);
    var randY = Math.floor(Math.random() * dimY);
    var color = Asteroid.COLORS[Math.floor(Math.random() * Asteroid.COLORS.length)];
    var radius = Math.floor(Math.random() * Asteroid.RADIUS + 10);
    return new Asteroid([randX, randY], Asteroid.randomSpeed(),
                                Asteroid.randomDir(), radius, color);
  }

})(this)
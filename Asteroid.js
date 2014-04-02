

(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function(pos,  speed, direction, radius, color) {
    Asteroids.MovingObject.call(this, pos, speed, direction, radius, color);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // Asteroid Properties
<<<<<<< HEAD
  Asteroid.COLORS = ['pink', 'blue', 'green', 'red'];
=======
  var randomColor = function () {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }
>>>>>>> gh-pages
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
<<<<<<< HEAD
    var color = Asteroid.COLORS[Math.floor(Math.random() * Asteroid.COLORS.length)];
=======
    var color = randomColor();
>>>>>>> gh-pages
    var radius = Math.floor(Math.random() * Asteroid.RADIUS + 10);
    return new Asteroid([randX, randY], Asteroid.randomSpeed(),
                                Asteroid.randomDir(), radius, color);
  }

<<<<<<< HEAD
})(this)
=======
})(this)
>>>>>>> gh-pages

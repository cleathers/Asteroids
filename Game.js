(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Game = Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIMX/2, Game.DIMY/2]);
    this.level = 1;
  };

  Game.DIMX = 700;
  Game.DIMY = 700;
  Game.FPS = 60;
  var randomColor = function () {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIMX, Game.DIMY, this.ship));
    }
  };

  Game.prototype.shipKeyHandlers = function(){
    var that = this;
    var x = 0;
    var y = 0;

    if (key.isPressed('up'))
      y -= .25;
    if (key.isPressed('left'))
      x -= .1;
    if (key.isPressed('down'))
      y += .25;
    if (key.isPressed('right'))
      x += .1;


    this.ship.power([x, y]);
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('space', function(){
            var bullet = that.ship.fireBullet();
            if (bullet){ that.bullets.push(bullet) };
    });
  };


  Game.prototype.checkCollisions = function(){
    var that = this;
    var result = true;
    this.asteroids.forEach(function(asteroid){
      if (that.ship.isCollidedWith(asteroid)){
        result = false;
      }

    })
    return result;
  };

  Game.prototype.checkLevel = function () {
    if (this.asteroids.length == 0) {
      this.level += 1;
      $('#level').html('Level: ' + this.level);
      this.addAsteroids(15 + (this.level * 2));
    }
  };


  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIMX, Game.DIMY);

    var that = this;
    this.checkLevel();

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx);
    })

    this.ship.draw(that.ctx);

    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    });
  };

  Game.prototype.hitAsteroids = function() {
    var that = this;

    this.asteroids.forEach(function(asteroid){
      that.bullets.forEach(function(bullet){
        if(bullet.isCollidedWith(asteroid)){
          that.removeOrSplitAsteroid(asteroid);
          that.removeBullet(bullet);
        }
      });
    });
  };

  Game.prototype.move = function() {
    var that = this;

    this.asteroids.forEach(function(asteroid) {
      asteroid.move(Game.DIMX, Game.DIMY);
    });

    this.ship.move(Game.DIMX, Game.DIMY);

    this.bullets.forEach(function(bullet) {
      bullet.move(Game.DIMX, Game.DIMY);
      if (bullet.moves == 100){
        that.removeBullet(bullet);
      }
    });
  };

  Game.prototype.removeOrSplitAsteroid = function(asteroid){
    debugger

    var index = this.asteroids.indexOf(asteroid);
    if(index !== -1){
      this.asteroids.splice(index, 1);
    }

    var splitSize = 15 - this.level;

    if ( asteroid.radius > 15 ) {
      var pos = [asteroid.posX, asteroid.posY];
      var speed = asteroid.speed * .8;
      var dir1 = asteroid.direction + Math.PI/3;
      var dir2 = asteroid.direction - Math.PI/3;
      var radius = asteroid.radius * .6;

      this.asteroids.push(new Asteroids.Asteroid(pos, speed, dir1, radius, randomColor()));
      this.asteroids.push(new Asteroids.Asteroid(pos, speed, dir2, radius, randomColor()));

    }


  };

  Game.prototype.removeBullet = function(bullet){
    var index = this.bullets.indexOf(bullet);
    if(index !== -1){
      this.bullets.splice(index, 1);
    }
  };

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    this.addAsteroids(10);
    this.interval = setInterval(this.step.bind(this), 1000 / Game.FPS);
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    var collision = this.checkCollisions();
    if ( collision == false ) {
      this.restart();
    }
    this.hitAsteroids();
    this.shipKeyHandlers();
  };

  Game.prototype.restart = function () {
    window.clearInterval(this.interval);
    $('canvas').remove();
    var $p = $('<p>');
    $p.addClass('white');
    $p.html("Would you like to play again?");
    var $button = $('<button>');
    $button.addClass('btn btn-teal');

    $button.html('More please').attr('id', 'play-again');

    $('#game-area').append($p).append($button);
  };

})(this);

(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, Ship.VEL, 2, Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  var vel = Math.random() * 1;
  Ship.VEL = vel;
  if (Math.random() > 0.5) {
    Ship.VEL *= -1; 
  }

  Ship.RADIUS = 10;
  Ship.COLOR = 'black';

  Ship.prototype.power = function(impulse){

    this.direction += impulse[0];

    if (Math.abs(this.speed + impulse[1]) <= 5){
      this.speed += impulse[1];
    }
  }

  Ship.prototype.draw = function (ctx) {
    
    ctx.fillStyle = this.color;
    ctx.save()

    ctx.translate( this.posX, this.posY );
    ctx.rotate(this.direction);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(10, -10);
    ctx.fill();

    ctx.closePath();
    ctx.restore();
  },

  Ship.prototype.fireBullet = function() {
    var bulletDirection = this.direction;    
    return new Asteroids.Bullet([this.posX, this.posY],
                                5, bulletDirection);
  }

  Ship.prototype.move = function(dimX, dimY) {
    Asteroids.MovingObject.prototype.move.call(this, dimX, dimY);
    this.speed *= 0.98;
  }


})(this);

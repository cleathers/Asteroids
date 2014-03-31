(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var MovingObject = Asteroids.MovingObject = function(pos, speed, direction, radius, color){
    this.posX = pos[0];
    this.posY = pos[1];
    this.direction = direction;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function(dimX, dimY) {
    var vector = [Math.cos(this.direction) * this.speed,
                  Math.sin(this.direction) * this.speed]

    this.posX = (this.posX + vector[0] + dimX) % dimX;
    this.posY = (this.posY + vector[1] + dimY) % dimY;
  };

  MovingObject.prototype.draw = function(ctx){

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var otherX = otherObject.posX;
    var otherY = otherObject.posY;

    var dist = Math.sqrt(Math.pow((this.posX - otherX), 2) +
                         Math.pow((this.posY - otherY), 2));


    return (dist <= this.radius + otherObject.radius)
  };





})(this);
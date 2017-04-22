var Ship = function (object) {
  this.planet = object.planet;
  this.pos = {
    x: this.planet.pos.x + 1,
    y: this.planet.pos.y,
    z: this.planet.pos.z,
  };
  this.orbitAngle = 45;
};

Ship.prototype.draw = function () {
  if (this.previousFrame) {
    this.previousFrame.parentNode.removeChild(this.previousFrame);
  }
  this.previousFrame = drawObject('ship', this.pos.x, this.pos.y, this.pos.z, '#fff');
};

Ship.prototype.act = function () {
  this.orbit();
  this.draw();
};

Ship.prototype.orbit = function () {
  this.orbitAngle += 1;
  this.orbitAngle = this.orbitAngle < 360 ? this.orbitAngle : 0;
  this.orbitAngle = this.orbitAngle >= 0 ? this.orbitAngle : 359;
  this.pos.y = this.planet.pos.y;
  // xP2=xP1+rsinθ;
  this.pos.x = (this.planet.pos.x) + Math.sin(this.orbitAngle * (Math.PI / 180));
  // yP2=yP1−r(1−cosθ);
  this.pos.z = (this.planet.pos.z - 1) + (1 - Math.cos(this.orbitAngle * (Math.PI / 180)));
};

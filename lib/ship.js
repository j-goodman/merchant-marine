var Ship = function (object) {
  this.planet = object.planet;
  this.pos = {
    x: this.planet.pos.x + 1,
    y: this.planet.pos.y,
    z: this.planet.pos.z,
  };
  this.orbitAngle = 45;
  this.type = 'ship';
};

Ship.prototype.draw = function (visibles) {
  if (Math.round(this.pos.z * 5) / 5 !== this.visibilityCoord) {
    visibles[this.visibilityCoord][this.visibilityCoordDepth] = false;
    visibles.push(this);
  }
  if (this.previousFrame) {
    this.previousFrame.parentNode.removeChild(this.previousFrame);
  }
  this.previousFrame = drawObject('ship', this.pos.x, this.pos.y, this.pos.z, '#fff');
};

Ship.prototype.act = function () {
  this.orbit();
};

Ship.prototype.orbit = function () {
  this.orbitAngle += 2;
  this.orbitAngle = this.orbitAngle < 360 ? this.orbitAngle : 0;
  this.orbitAngle = this.orbitAngle >= 0 ? this.orbitAngle : 359;
  this.pos.y = this.planet.pos.y;
  this.pos.x = (this.planet.pos.x) + Math.sin(this.orbitAngle * (Math.PI / 180));
  this.pos.z = (this.planet.pos.z - 1) + (1 - Math.cos(this.orbitAngle * (Math.PI / 180)));
};

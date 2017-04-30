var Ship = function (object) {
  this.planet = object.planet;
  this.planets = object.planets;
  this.pos = {
    x: this.planet.pos.x + 1,
    y: this.planet.pos.y,
    z: this.planet.pos.z,
  };
  this.orbitAngle = 0;
  this.traveling = false;
  this.display = new Display (this);
  this.travelProgress = 0;
  this.type = 'ship';
  this.range = 3;
  this.inventory = {
    silver: 11,
    steel: 0,
    grain: 0,
    ore: 0,
    minerals: 0,
    fuel: 0,
  };
};

Ship.prototype.draw = function (visibles) {
  if (Math.round(this.pos.z * 5) / 5 !== this.visibilityCoord) {
    visibles[this.visibilityCoord][this.visibilityCoordDepth] = false;
    visibles.push(this);
  }
  if (this.previousFrame) {
    this.previousFrame.parentNode.removeChild(this.previousFrame);
  }
  this.previousFrame = drawObject('ship', this.name, this.label, this.pos.x, this.pos.y, this.pos.z, '#fff');
};

Ship.prototype.act = function () {
  if (this.traveling) {
    this.travel();
  } else {
    this.orbit();
  }
};

Ship.prototype.orbit = function () {
  this.orbitAngle += 2;
  this.orbitAngle = this.orbitAngle < 360 ? this.orbitAngle : 0;
  this.orbitAngle = this.orbitAngle >= 0 ? this.orbitAngle : 359;
  this.pos.y = this.planet.pos.y;
  this.pos.x = (this.planet.pos.x) + Math.sin(this.orbitAngle * (Math.PI / 180));
  this.pos.z = (this.planet.pos.z - 1) + (1 - Math.cos(this.orbitAngle * (Math.PI / 180)));
};

Ship.prototype.goTo = function (planet) {
  this.traveling = true;
  this.orbitAngle = 0;
  this.travelProgress = 0;
  this.destination = planet;
  this.updateEconomy();
  this.startPos = {
    x: this.pos.x,
    y: this.pos.y,
    z: this.pos.z,
  };
};

Ship.prototype.travel = function () {
  this.travelProgress += 2;
  this.pos.x = ((this.startPos.x * (100 - this.travelProgress)) + (this.destination.pos.x * this.travelProgress)) / 100;
  this.pos.y = ((this.startPos.y * (100 - this.travelProgress)) + (this.destination.pos.y * this.travelProgress)) / 100;
  this.pos.z = ((this.startPos.z * (100 - this.travelProgress)) + ((this.destination.pos.z - 1) * this.travelProgress)) / 100;
  if (this.travelProgress >= 100) {
    this.planet = this.destination;
    this.display.updateLocation();
    this.display.updateCommerce();
    this.destination = false;
    this.traveling = false;
  }
};

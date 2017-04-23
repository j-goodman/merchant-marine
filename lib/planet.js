var Planet = function (object) {
  this.pos = {
    x: object.x,
    y: object.y,
    z: object.z,
  };
  this.class = object.class;
  this.color = color();
  switch (this.class) {
    case 'desert':
      this.color = '#db1';
      this.resource = 'steel';
      this.resourceSymbol = '🜝';
      break;
    case 'ocean':
      this.color = '#348';
      this.resource = 'minerals';
      this.resourceSymbol = '🜘';
      break;
    case 'gas':
      this.color = '#70f';
      this.resource = 'fuel';
      this.resourceSymbol = '☲';
      break;
    case 'mining':
      this.color = '#9ab';
      this.resource = 'ore';
      this.resourceSymbol = '🜃';
      break;
    case 'garden':
      this.color = '#351';
      this.resource = 'grain';
      this.resourceSymbol = 'ϔ';
      break;
    // silver: 🜛
  }
  this.type = 'planet';
};

Planet.prototype.draw = function () {
  if (this.previousFrame) {
    this.previousFrame.parentNode.removeChild(this.previousFrame);
  }
  this.previousFrame = drawObject(this.type, this.pos.x, this.pos.y, this.pos.z, this.color);
};

var earth = new Planet ({
  x: 5,
  y: 5,
  z: 5,
});

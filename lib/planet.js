var Planet = function (object) {
  this.pos = {
    x: object.x,
    y: object.y,
    z: object.z,
  };
  this.color = object.color;
};

Planet.prototype.draw = function () {
  drawObject('planet', this.pos.x, this.pos.y, this.pos.z, this.color);
};

// var earth = new Planet ({
//   heat: 2, // 0-4
//   weight: 2, // 0-4
//   land: {
//     arable: 30, // 0-100, production multiplied by weight
//     hostile: 60, // 0-100
//     barren: 10, // 0-100
//   },
//   position: {
//     x: -1,
//     y: Math.floor(Math.random() * 95) / 10,
//     z: Math.floor(Math.random() * 100) / 10,
//   }
// });

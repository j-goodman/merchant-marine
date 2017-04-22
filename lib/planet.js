var Planet = function (object) {
  this.heat = object.heat,
  this.weight = object.weight,
  this.land = {
    arable: object.arable,
    hostile: object.hostile,
    barren: object.barren,
  },
};

var earth = new Planet ({
  heat: 2, // 0-4
  weight: 2, // 0-4
  land: {
    arable: 30, // 0-100, production multiplied by weight
    hostile: 60, // 0-100
    barren: 10, // 0-100
  },
  position: {
    x: -1,
    y: Math.floor(Math.random() * 95) / 10,
    z: Math.floor(Math.random() * 100) / 10,
  }
});

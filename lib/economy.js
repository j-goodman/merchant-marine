var Economy = function (object) {
  this.planets = object.planets;
  this.player = object.player;
  this.player.updateEconomy = function () {
    this.updateEconomy();
  }.bind(this);
};

Economy.prototype.updateEconomy = function () {
  /*
  --> Sometimes creates booms or busts of random resources at random planets
  --> Called from the ship object on moving between worlds.
  */
  var i;
  var disruption;
  var keyPlanet;
  var keyResource;
  var magnitude;

  if ( !Math.floor(Math.random() * 1.5) ) {
    return false;
  } else {
    disruption = ['boom', 'bust'][Math.floor(Math.random() * 2)];
  }

  keyPlanet = this.planets[Math.floor(Math.random() * this.planets.length)];
  keyResource = keyPlanet.market.items[Math.floor(Math.random() * keyPlanet.market.items.length)];

  console.log(keyPlanet.name, keyResource, disruption);

  for (i=0 ; i<this.planets.length ; i++) {
    magnitude = Math.ceil((4 - this.planets[i].distanceTo(keyPlanet))) * 2;
    magnitude = magnitude <= 0 ? 0 : magnitude;
    console.log(this.planets[i].name, magnitude);
    if (magnitude > 0) { console.log(this.planets[i].market.values); }
    this.planets[i].market.values[keyResource] += (disruption==='boom' ? 1 : -1) * magnitude;
    if (keyResource === this.planets[i].resource) {
      this.planets[i].market.values[keyResource] /= 2;
    }
    if (this.planets[i].market.values[keyResource] <= 1) {
      this.planets[i].market.values[keyResource] = 1;
    }
    if (magnitude > 0) { console.log(this.planets[i].market.values); }
  }
};

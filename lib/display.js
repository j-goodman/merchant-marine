var Display = function (player) {
  this.ship = player;
  console.log('New display.');
  this.navDisplay = {
    locationDescription: document.getElementById('current-location'),
  };
  this.navDisplay.locationDescription.innerText =
  'Your ship is in orbit around the ' + this.ship.planet.class +
  ' planet of ' + this.ship.planet.name + '.';
};

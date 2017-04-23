var Display = function (player) {
  this.ship = player;
  this.menu = {
    locationName: document.getElementById('current-planet-name'),
    locationDescription: document.getElementById('current-location'),
    buyablesList: document.getElementById('buyable-commodities'),
  };
};

Display.prototype.updateLocation = function () {
  this.menu.locationName.innerText = this.ship.planet.name;
  this.menu.locationDescription.innerText =
  'Your ship is in orbit around the ' + this.ship.planet.class +
  ' world of ' + this.ship.planet.name + '. You have 🜛' + this.ship.inventory.silver + ' to spend.';
};

Display.prototype.updateCommerce = function () {
  this.updateBuyables();
  this.updateSellables();
};

Display.prototype.updateBuyables = function () {
  var commodities;
  var selector;
  var i;
  commodities = ['steel', 'grain', 'ore', 'minerals', 'fuel'];
  for (i=0 ; i<commodities.length ; i++) {
    selector = document.createElement('SELECTOR');
    selector.innerText = commodities[i];
    selector.innerText += ': 10 for 🜛';
    selector.innerText += this.ship.planet.market.values[commodities[i]];
    this.menu.buyablesList.appendChild(selector);
  }
};

Display.prototype.updateSellables = function () {

};

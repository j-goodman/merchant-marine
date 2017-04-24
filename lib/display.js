var Display = function (player) {
  this.ship = player;
  this.menu = {
    locationName: document.getElementById('current-planet-name'),
    locationDescription: document.getElementById('current-location'),
    buyablesList: document.getElementById('buyable-commodities'),
    sellablesList: document.getElementById('sellable-commodities'),
    navigablesList: document.getElementById('navigable-worlds'),
  };
};

Display.prototype.updateLocation = function () {
  this.menu.locationName.innerText = this.ship.planet.name;
  this.menu.locationDescription.innerText =
  'Your ship is in orbit around the ' + this.ship.planet.class +
  ' world of ' + this.ship.planet.name + '. You have 🜛' + this.ship.inventory.silver + ' to spend.';
  this.updateNavigation();
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
  var commodities;
  var selector;
  var i;
  commodities = ['steel', 'grain', 'ore', 'minerals', 'fuel'];
  for (i=0 ; i<commodities.length ; i++) {
    selector = document.createElement('SELECTOR');
    selector.innerText = commodities[i];
    selector.innerText += ': 10 for 🜛';
    selector.innerText += this.ship.planet.market.values[commodities[i]];
    this.menu.sellablesList.appendChild(selector);
  }
};

Display.prototype.updateNavigation = function () {
  var i;
  var selector;
  this.menu.navigablesList.innerHTML = '';
  for (i=0 ; i<this.ship.planets.length ; i++) {
    if (this.ship.planets[i].name !== this.ship.planet.name) {
      if (this.ship.planets[i].distanceTo(this.ship.planet) < 8) {
        selector = document.createElement('SELECTOR');
        selector.innerText = this.ship.planets[i].name;
        selector.onclick = function () {
          this.ship.goTo(this.destination);
          this.menu.innerHTML = 'Navigating...';
        }.bind({ship: this.ship, destination: this.ship.planets[i], menu: this.menu.navigablesList});
        this.menu.navigablesList.appendChild(selector);
      }
    }
  }
};

var Display = function (player) {
  this.ship = player;
  this.menu = {
    locationName: document.getElementById('current-planet-name'),
    locationDescription: document.getElementById('current-location'),
    buyablesList: document.getElementById('buyable-commodities'),
    sellablesList: document.getElementById('sellable-commodities'),
    navigablesList: document.getElementById('navigable-worlds'),
    inventory: document.getElementById('player-inventory'),
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
  this.updateInventory();
};

Display.prototype.updateBuyables = function () {
  var commodities;
  var selector;
  var i;
  commodities = ['steel', 'grain', 'ore', 'minerals', 'fuel'];
  this.menu.buyablesList.innerHTML = '';
  for (i=0 ; i<commodities.length ; i++) {
    selector = document.createElement('SELECTOR');
    selector.innerText = commodities[i];
    selector.innerText += ': 10 for 🜛';
    selector.innerText += this.ship.planet.market.values[commodities[i]];

    if (this.ship.inventory.silver < this.ship.planet.market.values[commodities[i]]) {
      selector.style.opacity = '.4';
    }

    selector.onclick = function () {
      if (this.ship.inventory.silver >= this.planet.market.values[this.commodity]) {
        this.ship.inventory.silver -= this.planet.market.values[this.commodity];
        this.planet.market.values[this.commodity] += 1;
        this.ship.inventory[this.commodity] += 10;
      }
      this.display.updateCommerce();
      this.display.updateLocation();
    }.bind({ship: this.ship, planet: this.ship.planet, commodity: commodities[i], display: this});

    this.menu.buyablesList.appendChild(selector);
  }
};

Display.prototype.updateSellables = function () {
  var commodities;
  var selector;
  var i;
  commodities = ['steel', 'grain', 'ore', 'minerals', 'fuel'];
  this.menu.sellablesList.innerHTML = '';
  for (i=0 ; i<commodities.length ; i++) {
    selector = document.createElement('SELECTOR');
    selector.innerText = commodities[i];
    selector.innerText += ': 10 for 🜛';
    selector.innerText += this.ship.planet.market.values[commodities[i]] - 1;

    if (this.ship.inventory[commodities[i]] < 10) {
      selector.style.opacity = '.4';
    }

    selector.onclick = function () {
      if (this.ship.inventory[this.commodity] >= 10) {
        this.ship.inventory.silver += this.planet.market.values[this.commodity] - 1;
        this.ship.inventory[this.commodity] -= 10;
        if (this.planet.market.values[this.commodity] > 2) {
          this.planet.market.values[this.commodity] -= 1;
        }
      }
      this.display.updateCommerce();
      this.display.updateLocation();
    }.bind({ship: this.ship, planet: this.ship.planet, commodity: commodities[i], display: this});

    this.menu.sellablesList.appendChild(selector);
  }
};

Display.prototype.updateInventory = function () {
  var selector;
  var items;
  var i;
  items = ['silver', 'steel', 'grain', 'ore', 'minerals', 'fuel'];
  this.menu.inventory.innerHTML = '';
  for (i=0 ; i<items.length ; i++) {
    selector = document.createElement('NONSELECTOR');
    selector.innerText = items[i] + ': ' + this.ship.inventory[items[i]];
    this.menu.inventory.appendChild(selector);
  }
};

Display.prototype.updateNavigation = function () {
  var i;
  var selector;
  this.menu.navigablesList.innerHTML = '';
  for (i=0 ; i<this.ship.planets.length ; i++) {
    if (this.ship.planets[i].name !== this.ship.planet.name) {
      if (this.ship.planets[i].distanceTo(this.ship.planet) <= this.ship.range) {
        selector = document.createElement('SELECTOR');
        selector.innerText = this.ship.planets[i].name;
        selector.planet = this.ship.planets[i];

        selector.onclick = function () {
          this.ship.goTo(this.destination);
          this.destination.label = false;
          this.menu.innerHTML = '<br>Navigating...';
        }.bind({ship: this.ship, destination: this.ship.planets[i], menu: this.menu.navigablesList});

        selector.onmouseenter = function () {
          this.planet.label = true;
        };

        selector.onmouseleave = function () {
          this.planet.label = false;
        };

        this.menu.navigablesList.appendChild(selector);
      }
    }
  }
};

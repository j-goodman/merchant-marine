onload = function () {
  var game = {};
  setupMap(game);
  game.start = startGame;
  game.start();
};

// Map.js
var setupMap = function (game) {
  var base = document.getElementById('map-base');
  var ctx = base.getContext('2d');
  ctx.beginPath();
  var x; var y;
  for (x=0 ; x<10 ; x++) {
    ctx.moveTo(x * 50, 0);
    ctx.lineTo(x * 50, 500);
  }
  for (y=0 ; y<10 ; y++) {
    ctx.moveTo(0, y * 50);
    ctx.lineTo(500, y * 50);
  }
  ctx.strokeStyle = '#0ac';
  ctx.stroke();

  // drawPlanet (
  //  x: 1-8,
  //  y: 1-9,
  //  z: 1-9
  //  color: 3-digit hex value,e
  // )
  game.drawObject = drawObject;
};

var planetClasses = ['desert', 'garden', 'mining', 'ocean', 'gas'];
var planetClass = function () {
  return planetClasses[Math.floor(Math.random() * planetClasses.length)];
};

drawObject = function (type, name, label, x, y, z, color) {
  var base = document.getElementById('map-base');
  var panel = document.getElementById('map-panel');
  var plane = document.createElement('CANVAS');
  var ctx = plane.getContext('2d');

  plane.style.display = 'inline';
  plane.style.position = 'absolute';
  plane.style.transform = 'translateZ(' + (-86) * z + 'px)';
  plane.height = 500;
  plane.width = 920;
  plane.style.height = '500px';
  plane.style.width = '920px';

  color = (type === 'ship') ? '#fff' : color;

  ctx.moveTo(86 * x + 30, 500);
  ctx.lineTo(86 * x + 30, 540 - 50 * y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(86 * x + 30, 500 - 50 * y, 40, 1.15 * 2*Math.PI, 0.6 * 2*Math.PI);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = '24px monospace';

  if (label) {
    ctx.fillStyle = color;
    ctx.fillText(name, 86 * x + 30, (520 - 50 * y) - 56);
  }

  switch (type) {
    case 'planet':
      ctx.beginPath();
      ctx.arc(86 * x + 30, 500 - 50 * y, 24, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      break;
    case 'ship':
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(86 * x + 21, 500 - 50 * y - 4, 16, 16);
      break;
  }

  panel.appendChild(plane);
  return plane;
};

var startGame = function () {
  var coords;
  var i;
  var planet;

  this.planets = [];

  assignVisibles.bind(this)();

  this.spawn = new Planet ({
    class: planetClass(),
    x: 3,
    y: 8,
    z: 4,
  });

  nameWorld(this.spawn);

  coords = [
    {x: 5, y: 8, z: 3},
    {x: 6, y: 6, z: 1},
    {x: 7, y: 4, z: 1},
    {x: 8, y: 5, z: 2},
    {x: 2, y: 6, z: 4},
    {x: 2, y: 4, z: 2},
    {x: 3, y: 3, z: 1},
    {x: 1, y: 2, z: 2},
  ];

  for (i=0 ; i<coords.length ; i++) {
    planet = new Planet ({
      class: planetClass(),
      x: coords[i].x,
      y: coords[i].y,
      z: coords[i].z,
    });
    nameWorld(planet);
    this.planets.push(planet);
    this.visibles.push(planet);
  }

  this.player = new Ship ({
    planet: this.spawn,
    planets: this.planets,
  });

  this.economy = new Economy ({
    planets: this.planets,
    player: this.player,
  });

  this.player.display.updateLocation();
  this.player.display.updateCommerce();

  this.planets.push(this.spawn);
  this.visibles.push(this.spawn);
  this.visibles.push(this.player);

  this.interval = setInterval(function () {
    this.visibles.draw();
    this.player.act();
  }.bind(this), 32);
};

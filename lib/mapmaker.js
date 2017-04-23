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

drawObject = function (type, x, y, z, color) {
  var panel = document.getElementById('map-panel');
  var base = document.getElementById('map-base');
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
  var planet;

  assignVisibles.bind(this)();

  this.spawn = new Planet ({
    class: planetClass(),
    x: 3,
    y: 8,
    z: 4,
  });

  nameWorld(this.spawn);

  planet = new Planet ({
    class: planetClass(),
    x: 8,
    y: 2,
    z: 1,
  });

  nameWorld(planet);

  this.visibles.push(planet);

  planet = new Planet ({
    class: planetClass(),
    x: 6,
    y: 5,
    z: 7,
  });

  nameWorld(planet);

  this.visibles.push(planet);

  this.player = new Ship ({
    planet: this.spawn,
  });

  this.visibles.push(this.spawn);
  this.visibles.push(this.player);

  this.interval = setInterval(function () {
    this.visibles.draw();
    this.player.act();
  }.bind(this), 32);
};

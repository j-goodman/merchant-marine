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

var colors = ['#db1', '#348', '#70f', '#9ab', '#351'];
var color = function () {
  return colors[Math.floor(Math.random() * colors.length)];
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
  this.spawn = new Planet ({
    color: color(),
    x: 3,
    y: 8,
    z: 4,
  });

  this.second = new Planet ({
    color: color(),
    x: 8,
    y: 2,
    z: 1,
  });

  this.third = new Planet ({
    color: color(),
    x: 6,
    y: 5,
    z: 7,
  });

  this.player = new Ship ({
    planet: this.spawn,
  });

  this.visibles = {};
  this.visibles.push = function (object) {
    if (!this[Math.round(object.pos.z * 5) / 5]) {
      this[Math.round(object.pos.z * 5) / 5] = [];
    }
    object.visibilityCoord = Math.round(object.pos.z * 5) / 5;
    object.visibilityCoordDepth = this[Math.round(object.pos.z * 5) / 5].length;
    this[Math.round(object.pos.z * 5) / 5].push(object);
  };
  this.visibles.draw = function () {
    var i; var j;
    for (i=50 ; i>=0 ; i--) {
      if (this[i/5]) {
        for (j=0 ; j<this[i/5].length ; j++) {
          if (this[i/5][j]) {
            this[i/5][j].draw(this);
          }
        }
      }
    }
  };

  this.visibles.push(this.spawn);
  this.visibles.push(this.second);
  this.visibles.push(this.third);
  this.visibles.push(this.player);

  setTimeout(function () {
    this.player.goTo(this.second);
    console.log('1');
  }.bind(this), 7000);

  setTimeout(function () {
    this.player.goTo(this.third);
    console.log('2');
  }.bind(this), 18000);

  setTimeout(function () {
    this.player.goTo(this.spawn);
    console.log('3');
  }.bind(this), 24000);

  this.interval = setInterval(function () {
    this.visibles.draw();
    this.player.act();
  }.bind(this), 32);
};

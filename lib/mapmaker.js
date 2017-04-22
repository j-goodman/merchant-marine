onload = function () {
  setupMap();
};

// Map.js
setupMap = function () {
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
  //  x: 0-10,
  //  y: 1-9,
  //  z: 0-10
  //  color: 3-digit hex value,e
  // )
  drawObject('planet', 1, 9, 8, color());
  drawObject('planet', 9, 2, 2, color());
  drawObject('ship', 4, 2, 2, color());
};

var colors = ['#db1', '#348', '#70f', '#9ab', '#351'];
var color = function () {
  return colors[Math.floor(Math.random() * colors.length)];
}

drawObject = function (type, x, y, z, color) {
  var panel = document.getElementById('map-panel');
  var plane = document.createElement('CANVAS');
  var ctx = plane.getContext('2d');

  plane.style.display = 'inline';
  plane.style.position = 'absolute';
  plane.style.right = '26px';
  plane.style.transform = 'translateZ(' + (-86) * z + 'px)';
  plane.height = 500;
  plane.width = 920;
  plane.style.height = '500px';
  plane.style.width = '920px';

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
      ctx.arc(86 * x + 30, 500 - 50 * y, 28, 0, 2 * Math.PI);
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
};

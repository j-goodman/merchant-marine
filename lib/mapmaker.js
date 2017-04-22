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
  drawPlanet(7, 9, 7, '#db1');
  drawPlanet(6, 7, 8, '#348');

  drawPlanet(7.5, 8, 6, '#70f');
  drawPlanet(0, 3, 2, '#9ab');
  drawPlanet(2, 1, 3, '#351');
};

drawPlanet = function (x, y, z, color) {
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
  ctx.lineTo(86 * x + 30, 520 - 50 * y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(86 * x + 30, 500 - 50 * y, 20, 1.15 * 2*Math.PI, 0.6 * 2*Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(86 * x + 30, 500 - 50 * y, 10, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  panel.appendChild(plane);
};

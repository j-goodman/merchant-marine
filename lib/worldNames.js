var worldNames = {
  desert: [
    'Solzin',
    'Gahar',
  ],
  garden: [
    'Kuvro',
    'Andol',
  ],
  mining: [
    'Asterfall',
    'Chancartier',
  ],
  ocean: [
    'Yastanere',
    'Alkuro',
  ],
  gas: [
    'Sansimar',
    'Acrolamp',
  ],
};

var nameWorld = function (world) {
  // --> Assigns a random world name based on the planet's environmental class
  world.name = worldNames[world.class][Math.floor(Math.random() * worldNames[world.class].length)];
  return world.name;
};

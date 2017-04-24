var worldNames = {
  desert: [
    'Solzin',
    'Gahar',
    'Xolotl',
    'Leel',
    'Shuttlehook',
    'Delro',
    'Imriel',
    'Geth',
  ],
  garden: [
    'Kuvro',
    'Andol',
    'Enendi',
    'Farrin',
    'Lapelier',
    'Ananya',
    'Marefoot',
    'Kumbe',
    'Memna',
  ],
  mining: [
    'Asterfall',
    'Chancartier',
    'Enkidu',
    'Pevlar',
    'Ammon',
    'Tibel',
    'Vemet',
    'Pitch',
    'Keppel',
  ],
  ocean: [
    'Yastanere',
    'Alkuro',
    'Tlalocan',
    'Nostos',
    'Alalia',
    'Atrador',
    'Tycho',
    'Tor-Ammon',
    'Sujo',
  ],
  gas: [
    'Sansimar',
    'Acrolamp',
    'Manastos',
    'Ilinkar',
    'Huitlihuitl',
    'Miranan',
    'Samna',
    'Soloshka',
  ],
};

var nameWorld = function (world) {
  // --> Assigns a random world name based on the planet's environmental class
  world.name = worldNames[world.class][Math.floor(Math.random() * worldNames[world.class].length)];
  return world.name;
};

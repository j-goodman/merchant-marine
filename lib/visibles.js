var assignVisibles = function () {
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
};

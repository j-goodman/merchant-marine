var assignVisibles = function () {
  this.visibles = {};

  this.visibles.push = function (object) {
    /*
    --> Adds an object to the visibles list based on its current z position.
    --> Z positions are measured to a precision of 1/5
    */
    if (!this[Math.round(object.pos.z * 5) / 5]) {
      this[Math.round(object.pos.z * 5) / 5] = [];
    }
    object.visibilityCoord = Math.round(object.pos.z * 5) / 5;
    object.visibilityCoordDepth = this[Math.round(object.pos.z * 5) / 5].length;
    this[Math.round(object.pos.z * 5) / 5].push(object);
  };

  this.visibles.draw = function () {
    /*
    --> Draws visible objects in the correct order of their z position
    */
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

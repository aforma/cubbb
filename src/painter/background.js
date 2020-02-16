var vector = require("../util/vector");
var Voronoi = require('voronoi');
module.exports = function(drawer, width, height, time) {
  var position = {
    x: 0,
    y: 0
  };
  let velocity = { x: 0, y: 0 };
  const acceleration = { x: 0, y: 0 };
  let startTime;
  let canDraw = true;
  let newDraw = 0;

  return {
    draw() {
      if (!canDraw) {
        return;
      }
      if (!startTime) {
        startTime = Date.now();
        newDraw = Date.now();
      }
      if (Math.abs(Date.now() - startTime) > time * 3000) {
        drawer(position.x, position.y, false);
        this.done = true;
      }

      acceleration.x = Math.random() * 2;
      acceleration.y = Math.random() * 2;
      velocity.x += acceleration.x;
      velocity.y += acceleration.y;
      velocity = vector.mult(vector.normalize(velocity), 100);

      position.x += velocity.x;
      position.y += velocity.y;

      if (position.x <= 0) {
        position.x = 0;
        velocity.x *= -1;
      }
      
      if (position.x >= width) {
        position.x = width;
        velocity.x *= -1;
      }

      if (position.y < 0 || position.y > height) {
        velocity.y *= -1;
      }
      // const drawNew = newDraw
      if (Math.abs(Date.now() - newDraw) > Math.random() * 50 && !this.done) {
        newDraw = Date.now();
        drawer(position.x, position.y, true);
      } else {
        drawer(position.x, position.y, false);
      }
    }
  };
};

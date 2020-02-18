const sketch = require("canvas-sketch");
const backgroundBrush = require("./brush/background");
const bcakgroundPainter = require("./painter/background");
const mouse = require("./painter/mouse");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  duration: 20,
  units: "px",
  fps: 24,
  animate: true
};

window.onload = () => {
  sketch(s => {
    const background = backgroundBrush(s.context, {
      strokeStyle: "#CCCCCC",
      lineWidth: 1
    });
    const background1Painter = bcakgroundPainter(
      background.draw.bind(background),
      s.width,
      s.height,
      10 + Math.random() * 10
    );
    const mousePainter = mouse(background.draw.bind(background), s.canvas);

    return {
      resize(params) {},
      render(params) {
        s.context.fillStyle='#bbb';
        s.context.beginPath();
        s.context.rect(0, 0, s.width, s.height);
        s.context.fill();
        background1Painter.draw();
        // mousePainter.draw();
      },
      unload() {}
    };
  }, settings);
};

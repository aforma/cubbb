module.exports = (_ctx, opts) => {
  const ctx = _ctx;
  let options = {};
  if (opts) {
    options = opts;
  }
  const config = {
    lineWidth: options.lineWidth || 1,
    strokeStyle: options.strokeStyle || "black"
  };

  const colors = ['#ec0000', '#ecdf00', '#003dff', '#00c700', '#ff7900','#4cd1ff', '#00fd8c', '#ff9ef3']
  const points = [[]];
  let colorIndex = 0;

  return {
    draw(x, y, reset) {
      ctx.lineWidth = config.lineWidth;
      ctx.strokeStyle = config.strokeStyle;
      points[points.length - 1].push({ x, y, color: colors[colorIndex] });
      if (reset) {
        points.push([])
        colorIndex += 1;
        if (colorIndex >= colors.length) {
          colorIndex = 0;
        }
      }
      for(let i = 0; i < points.length; i += 1) {
        ctx.beginPath();
        if (points[i].length > 0) {
          ctx.moveTo(points[i][0].x, points[i][0].y);
        }
        for(let j = 0; j < points[i].length; j += 1) {
          ctx.fillStyle =  points[i][j].color;
          ctx.lineTo( points[i][j].x, points[i][j].y);
        }
        ctx.fill();
        ctx.stroke();
      }
    },
    drawLine(fromX, fromY, x, y) {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fill();
    }
  };
};

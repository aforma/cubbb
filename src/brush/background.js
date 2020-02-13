var Voronoi = require("voronoi");

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

  const colors = [
    "#ec0000",
    "#ecdf00",
    "#003dff",
    "#00c700",
    "#ff7900",
    "#4cd1ff",
    "#00fd8c",
    "#ff9ef3"
  ];
  const points = [];
  let colorIndex = 0;
  const voronoi = new Voronoi();
  var diagram;
  var bbox = { xl: 650, xr: ctx.canvas.width * 0.75, yt: 300, yb: ctx.canvas.height * 0.75 };

  return {
    draw(x, y, reset) {
      if (reset) {
        points.push({ x, y, color: colors[colorIndex] });
        colorIndex += 1;
        if (colorIndex >= colors.length) {
          colorIndex = 0;
        }
        diagram = voronoi.compute(points, bbox);
      }
      if (!diagram) {
        return
      }
      ctx.lineWidth = config.lineWidth;
      for (let i = 0; i < diagram.cells.length; i += 1) {
        const cell = diagram.cells[i];
        if (cell.halfedges.length > 0) {
          ctx.beginPath();
          var halfedges = cell.halfedges,
            nHalfedges = halfedges.length,
            v = halfedges[0].getStartpoint();
          ctx.moveTo(v.x,v.y);
          for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
            v = halfedges[iHalfedge].getEndpoint();
            ctx.lineTo(v.x,v.y);
            }
          ctx.fillStyle = points[i].color;
          ctx.strokeStyle = config.strokeStyle;
          ctx.fill();
          ctx.stroke();
        }
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

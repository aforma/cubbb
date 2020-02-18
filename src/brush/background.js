var Voronoi = require("voronoi");
var load = require('load-asset');

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
  let addImg = false;
  var bbox = { xl: 0, xr: ctx.canvas.width, yt: 0, yb: ctx.canvas.height };

  return {
    draw(x, y) {
      this.addImage();
      if (!this.img) {
        return;
      }
      points.push({ x, y, color: colors[colorIndex] });
      diagram = voronoi.compute(points, bbox);
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
          // ctx.fillStyle = this.imgContext.getImageData(v.x, v.y, 1, 1);;
          if (v.y > ctx.canvas.height * 0.99) {
            v.y = ctx.canvas.height * 0.99;
          }
            const color = this.imgContext.getImageData(v.x, v.y, 1, 1).data;
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
          // ctx.strokeStyle = config.strokeStyle;
          ctx.fill();
          ctx.stroke();
        }
      }

    },
    addImage() {
      if (!addImg) {
        addImg = true;
        const img = new Image();
        img.onload = () => {
          this.img = img;
          this.imgCanvas = document.createElement('canvas');
          this.imgCanvas.setAttribute('width', ctx.canvas.width);
          this.imgCanvas.setAttribute('height', ctx.canvas.height);
          this.imgContext = this.imgCanvas.getContext('2d');
          this.imgContext.drawImage(
            this.img,
            0,
            0,
            this.img.width,
            this.img.height * 0.9,
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height
          );
        };
        img.src = "images/heitor3.jpg";
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

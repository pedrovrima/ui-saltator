import SimplexNoise from "simplex-noise";

type points= {
    x: number;
    y: number;
    originX: number;
    originY: number;
    noiseOffsetX: number;
    noiseOffsetY: number;
}


function formatPoints(points:points[], close:any):number[] {
    // so that coords can be passed as objects or arrays
      const new_points = points.map((pnt:points) => [pnt.x, pnt.y]);
  
    if (close) {
      const lastPoint = new_points[new_points.length - 1];
      const secondToLastPoint = new_points[new_points.length - 2];
  
      const firstPoint = new_points[0];
      const secondPoint = new_points[1];
  
      new_points.unshift(lastPoint);
      new_points.unshift(secondToLastPoint);
  
      new_points.push(firstPoint);
      new_points.push(secondPoint);
    }
  
    return new_points.flat();
  }
  
 export function spline(points :points[], tension = 1, close = false) {
    const new_points = formatPoints(points, close);
  
    const size = points.length;
    const last = size - 4;
  
    const startPointX = close ? new_points[2] :new_points[0];
    const startPointY = close ? new_points[3] : new_points[1];
  
    let path = "M" + [startPointX, startPointY];
  
  
    const startIteration = close ? 2 : 0;
    const maxIteration = close ? size - 4 : size - 2;
    const inc = 2;
  
    for (let i = startIteration; i < maxIteration; i += inc) {
      const x0 = i ? new_points[i - 2] : new_points[0];
      const y0 = i ? new_points[i - 1] : new_points[1];
  
      const x1 = new_points[i + 0];
      const y1 = new_points[i + 1];
  
      const x2 = new_points[i + 2];
      const y2 = new_points[i + 3];
  
      const x3 = i !== last ? new_points[i + 4] : x2;
      const y3 = i !== last ? new_points[i + 5] : y2;
  
      const cp1x = x1 + ((x2 - x0) / 6) * tension;
      const cp1y = y1 + ((y2 - y0) / 6) * tension;
  
      const cp2x = x2 - ((x3 - x1) / 6) * tension;
      const cp2y = y2 - ((y3 - y1) / 6) * tension;
  
      path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
  
    }
  
    return path;
  }
  

export default function animate(data:Uint8Array,n_angles:number) {
    let hueNoiseOffset = 0;
    let noiseStep = 0.005;
    const points = createPoints(n_angles);

    var numbers = []; // new empty array
  
    var min, max, r, n, p;
  
    min = 0;
    max = 32;
    r = 32; // how many numbers you want to extract
  
    for (let i = 0; i < r; i++) {
      do {
        n = Math.floor(Math.random() * (max - min + 1)) + min;
        p = numbers.includes(n);
        if (!p) {
          numbers.push(n);
        }
      } while (p);
    }
    const new_data = [...data];
    // for every point...
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const n = Math.pow(new_data[i] / 250, 2) + 1;
      // console.log(nX)
      const angle = (i * (Math.PI * 2)) / n_angles;
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = 5 + n * Math.cos(angle);
      const y = 5 + n * Math.sin(angle);
      // update the point's current coordinates
      point.x = x;
      point.y = y;
  
      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    }
  
    const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
    const hue = map(hueNoise, -1, 1, 0, 360);
  
    // root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
    // root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
    //   document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;
  
    hueNoiseOffset += noiseStep / 6;
  
  
    //   requestAnimationFrame(animate);
  
    return(spline(points, 1, true));
  
  }
  
  function map(n:number, start1:number, end1:number, start2:number, end2:number,) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }
  
  function noise(x:number, y:number) {
    const simplex = new SimplexNoise();
    return simplex.noise2D(x, y);
  }
  
  function createPoints(n_angles:number) {
    const points = [];
    // how many points do we need
    const numPoints = n_angles;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 10;
  
    for (let i = 1; i <= numPoints; i++) {
      // x & y coordinates of the current point
      const theta = i * angleStep;
      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;
  
      // store the point's position
      points.push({
        x: x,
        y: y,
        // we need to keep a reference to the point's original point for when we modulate the values later
        originX: x,
        originY: y,
        // more on this in a moment!
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }
  
    return points;
  }
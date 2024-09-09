const palette = Object.keys(COLOR_PALETTES)[Math.floor(Math.random() * Object.keys(COLOR_PALETTES).length)];

const colors = COLOR_PALETTES[palette];
const count = 22;

let angle;

function circles(
  x, y,
  radius,
  amount,
  collor,
  spacing,
  weight,
  offset,
  maxAlpha,
) {
  const startRadius = radius;
  const endRadius = radius + (spacing * amount);
  strokeWeight(weight);
  const endOffset = endRadius * 0.5;
  for (let i = 0; i < amount; i++) {
    const alpha = map(i, 0, amount, 0, maxAlpha);
    const r = map(i, 0, amount, startRadius, endRadius);
    stroke(collor.r, collor.g, collor.b, alpha);
    const displacement = p5.Vector.fromAngle(angle).setMag(map(i, 0, amount, offset, endOffset));
    circle(x + displacement.x, y + displacement.y, r * 2);
  }
  return [endRadius, endOffset];
}

function setup() {
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.remove();
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);

  background(0);
  noFill();

  angle = random(0, TWO_PI);

  let x = random(width / 4, width - width / 4);
  let y = random(height  / 4, height - height / 4);
  let radius = 20;
  let amount = 20;
  let spacing = 6 * random(1, 3);
  let endRadius = radius;
  let offset = 0;
  for (let i = 0; i < count; i++) {
    [endRadius, offset] = circles(
      x, y,
      endRadius + spacing,
      amount,
      colors[i % colors.length].rgba,
      spacing,
      5,
      offset,
      map(i, 0, count, 255, random(50, 200))
    );
  }
}

function keyPressed() {
  if (keyCode === 32) {
    saveCanvas('print.png');
  }
}

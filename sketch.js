const c = { r: 33, g: 158, b: 188 };

function circles(
  x, y,
  radius,
  amount,
  collor,
  spacing,
  weight,
  offset = 0,
) {
  const startRadius = radius;
  const endRadius = radius + (spacing * amount);
  strokeWeight(weight);
  const endOffset = endRadius * 0.5;
  for (let i = 0; i < amount; i++) {
    const alpha = map(i, 0, amount, 20, 200);
    const r = map(i, 0, amount, startRadius, endRadius);
    stroke(collor.r, collor.g, collor.b, alpha);
    circle(x + map(i, 0, amount, offset, endOffset), y, r * 2);
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

  let x = width / 3;
  let y = height / 2;
  let radius = 20;
  let amount = 20;
  let spacing = 5;
  let endRadius = radius;
  let offset = 0;
  for (let i = 0; i < 8; i++) {
    [endRadius, offset] = circles(
      x, y,
      endRadius + spacing,
      amount,
      c,
      spacing,
      3,
      offset
    );
  }
}

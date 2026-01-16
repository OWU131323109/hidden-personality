let angle = 0;

function setup() {
  const c = createCanvas(300, 300, WEBGL);
  c.parent('flower-canvas');
}

function draw() {
  background(245);
  if (!window.flowerData) return;

  rotateY(angle);
  angle += 0.01;

  ambientLight(150);
  noStroke();

  fill(255, 150, 180);

  for (let i = 0; i < 8; i++) {
    push();
    rotateY(TWO_PI / 8 * i);
    translate(60, 0, 0);
    sphere(15);
    pop();
  }

  fill(255, 220, 120);
  sphere(22);
}

function setup() {
  const canvas = createCanvas(420, 420, WEBGL);
  canvas.parent("canvas-area");
  angleMode(DEGREES);
}

function draw() {
  background(255);
  rotateX(180); // 真上視点

  if (!window.bouquetColors) return;

  noStroke();

  // ===== 主役の花 =====
  drawRealFlower({
    x: 0,
    y: 0,
    baseColor: window.bouquetColors[0],
    size: 1.2
  });

  // ===== サブ花 =====
  const r = 120;
  for (let i = 1; i < window.bouquetColors.length; i++) {
    const a = (360 / (window.bouquetColors.length - 1)) * (i - 1);
    drawRealFlower({
      x: cos(a) * r,
      y: sin(a) * r,
      baseColor: window.bouquetColors[i],
      size: 0.8
    });
  }
}

/**
 * リアル寄りの花
 */
function drawRealFlower({ x, y, baseColor, size }) {
  push();
  translate(x, y, 0);

  // ===== 花びら =====
  const layers = 3;
  for (let layer = 0; layer < layers; layer++) {
    const petalCount = 6 + layer * 2;
    const radius = 18 * size + layer * 10;
    const tilt = 20 + layer * 15;

    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i;

      push();
      rotateZ(angle);
      translate(radius, 0, 0);
      rotateX(tilt);

      fill(
        baseColor.r + layer * 10,
        baseColor.g + layer * 10,
        baseColor.b + layer * 10
      );

      scale(1.8 * size, 0.6 * size, 0.3 * size);
      sphere(12);
      pop();
    }
  }

  // ===== 花芯 =====
  fill(240, 200, 80);
  sphere(10 * size);

  pop();
}

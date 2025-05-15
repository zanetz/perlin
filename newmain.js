let rows = 40, cols = 40, spacing = 16, shapeSize = 12;
let shapeType = 'hexagon';
let randShapeBool = false, useAltDraw = false, isStriped = false;
let tileSize = 150;
let drawFunctions = [draw1, drawPulse, draw2, drawFromImage];
let currentDrawIndex = 0;

let topLeftPicker, topRightPicker, bottomLeftPicker, bottomRightPicker;
let strokeBottomLeft, strokeBottomRight, strokeTopLeft, strokeTopRight;
let strokeColorPicker, backgroundPicker;
let rowsSlider, colsSlider, spacingSlider, sizeSlider, strokeWeightSlider;
let idkValueSlider, canvasWidthSlider, canvasHeightSlider;
let buffer, shapeButton, randomShapeButton;

let scaleR;

let img, imageInput;
let gridSize = 10;



function setup() {
  createCanvas(600, 600);
  initializeUI();
  generateColorMaps();
  buffer = createGraphics(width, height);
  pixelDensity(1);

  let toggleButton = createButton('Toggle Draw Mode');
  toggleButton.mousePressed(toggleDraw);

}

function draw() {
  drawFunctions[currentDrawIndex]();
}

function toggleDraw() {
  currentDrawIndex = (currentDrawIndex + 1) % drawFunctions.length;
}

let smallImg;  // will hold the resized image for grid sampling

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, loadedImg => {
      img = loadedImg;

      // Resize canvas to image size (+ padding if desired)
      let newWidth = img.width + 50;
      let newHeight = img.height + 50;
      resizeCanvas(newWidth, newHeight);

      // Set grid resolution to half image resolution (rounded)
      let newCols = Math.floor(img.width / scaleR.value());
      let newRows = Math.floor(img.height / scaleR.value());

      // Update sliders and globals
      colsSlider.value(newCols);
      rowsSlider.value(newRows);
      cols = newCols;
      rows = newRows;

      // Generate downscaled image
      createSmallImg();

      // Switch to image drawing mode
      currentDrawIndex = drawFunctions.length - 1;
      loop();
    });
  }
}

function createSmallImg() {
  if (!img) return;

  let rows = rowsSlider.value();
  let cols = colsSlider.value();

  // Create a new small image that exactly matches the current grid size
  smallImg = createImage(cols, rows);
  // Copy & resize original img into smallImg at cols x rows size
  smallImg.copy(img, 0, 0, img.width, img.height, 0, 0, cols, rows);
  smallImg.loadPixels();  // load pixels for sampling in draw
}

function drawFromImage() {
  if (!img || !smallImg) return;

  background(backgroundPicker ? backgroundPicker.color() : 255);
  pixelDensity(1);

  let rows = rowsSlider ? rowsSlider.value() : 40;
  let cols = colsSlider ? colsSlider.value() : 40;
  let spacing = spacingSlider ? spacingSlider.value() : 16;
  let gridW = spacing;
  let gridH = spacing;

  let userSpeed = (speedSlider ? speedSlider.value() : 1) * 3;
  let schmoveVal = schmovementSlider ? schmovementSlider.value() : 5;
  let userPulse = pulseSlider ? pulseSlider.value() : 0;

  const centerX = width / 2;
  const centerY = height / 2;

  strokeWeight(strokeWeightSlider ? strokeWeightSlider.value() : 0);
  if ((strokeWeightSlider ? strokeWeightSlider.value() : 0) > 0) {
    stroke(strokeColorPicker ? strokeColorPicker.color() : 0);
  } else {
    noStroke();
  }

  let offsetX = (width - cols * spacing) / 2 + spacing / 2;
  let offsetY = (height - rows * spacing) / 2 + spacing / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * spacing + offsetX;
      let y = i * spacing + offsetY;

      // Perlin noise motion
      const noiseVal = noise(x / width, y / height, frameCount * 0.0001 * userSpeed);
      const angle = noiseVal * TWO_PI * 5;
      const distortion = map(noiseVal, 0, 1, schmoveVal, min(gridW, gridH) / 2);
      x += distortion * cos(angle);
      y += distortion * sin(angle);

      // Pulsate size by distance from center
      let distFromCenter = dist(x, y, centerX, centerY);
      let direction = userPulse >= 0 ? 1 : -1;
      let pulsateSize = (sizeSlider ? sizeSlider.value() : min(gridW, gridH) * 0.8) + sin(frameCount * 0.05 + direction * distFromCenter * 0.01) * abs(userPulse);

      // Wrap screen edges
      if (x < 0) x = width + x % width;
      else if (x > width) x = x % width;
      if (y < 0) y = height + y % height;
      else if (y > height) y = y % height;

      // Use smallImg pixel colors for this grid cell
      let index = (j + i * cols) * 4;
      let r = smallImg.pixels[index];
      let g = smallImg.pixels[index + 1];
      let b = smallImg.pixels[index + 2];
      let a = smallImg.pixels[index + 3];

      fill(r, g, b, a);

      if (shapeType === 'square') {
        rectMode(CENTER);
        rect(x, y, pulsateSize, pulsateSize);
      } else {
        ellipse(x, y, pulsateSize);
      }
    }
  }
}

rowsSlider.input(() => {
  createSmallImg();
  redraw();
});

colsSlider.input(() => {
  createSmallImg();
  redraw();
});
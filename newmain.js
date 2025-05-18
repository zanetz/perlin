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

// --- checkerboard controls ---
let cbColsSlider, cbRowsSlider;        // # squares across / down
let cbColPickerA, cbColPickerB;        // the two alternating colours
let useCheckerboard = false;           // toggle – defaults to plain fill


let checkerGfx;             // off‑screen canvas
let cbDirty = true;         // “needs rebuild?” flag




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

  // 1. update global vars and background
  refreshGlobals();
  useCheckerboard ? blitCheckerboard() : background(backgroundPicker.color());

  // 2. gather common values
  let rows      = rowsSlider.value();
  let cols      = colsSlider.value();
  let spacing   = spacingSlider.value();
  let userSpeed = speedSlider.value() * 3;
  let schmove   = schmovementSlider.value();
  let pulseVal  = pulseSlider.value();
  let baseSize  = sizeSlider.value();

  const xOff = (width  - cols * spacing) / 2;
  const yOff = (height - rows * spacing) / 2;
  const cX   = width  / 2;
  const cY   = height / 2;

  pixelDensity(1);
  smallImg.loadPixels();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      let x = j * spacing + spacing/2 + xOff;
      let y = i * spacing + spacing/2 + yOff;

      const n   = noise(x/width, y/height, frameCount*0.0001*userSpeed);
      const ang = n * TWO_PI * 5;
      const dis = map(n, 0, 300, schmove, spacing/2);
      x += dis * cos(ang);
      y += dis * sin(ang);

      x = (x + width)  % width;
      y = (y + height) % height;

      const d    = dist(x, y, cX, cY);
      const dir  = pulseVal >= 0 ? 1 : -1;
      const size = baseSize + sin(frameCount*0.05 + dir*d*0.01)*abs(pulseVal);

      const idx = (j + i*cols)*4;
      const r   = smallImg.pixels[idx];
      const g   = smallImg.pixels[idx+1];
      const b   = smallImg.pixels[idx+2];
      const a   = smallImg.pixels[idx+3];
      fill(r, g, b, a);

      
      const px = cols>1 ? j/(cols-1) : 0;
      const py = rows>1 ? i/(rows-1) : 0;
      const top    = lerpColor(strokeTopLeftPicker.color(),    strokeTopRightPicker.color(),    px);
      const bottom = lerpColor(strokeBottomLeftPicker.color(), strokeBottomRightPicker.color(), px);
      const strokeCol = lerpColor(top, bottom, py);

      stroke(strokeCol);
      strokeWeight(strokeWeightVal);

      if (shapeType === 'square') {
        rectMode(CENTER);
        rect(x, y, size, size);
      } else {
        ellipse(x, y, size);
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


function drawCheckerboard(cols, rows, colA, colB) {
  const sqW = width  / cols;
  const sqH = height / rows;
  noStroke();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill((x + y) % 2 === 0 ? colA : colB);
      rect(x * sqW, y * sqH, sqW, sqH);
    }
  }
}

function rebuildCheckerboard() {
  if (!checkerGfx ||
      checkerGfx.width  !== width ||
      checkerGfx.height !== height) {
    checkerGfx = createGraphics(width, height);
  }

  const cols = cbColsSlider.value();
  const rows = cbRowsSlider.value();
  const colA = cbColPickerA.color();
  const colB = cbColPickerB.color();

  const sqW = width  / cols;
  const sqH = height / rows;
  checkerGfx.noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      checkerGfx.fill((x + y) % 2 === 0 ? colA : colB);
      checkerGfx.rect(x * sqW, y * sqH, sqW, sqH);
    }
  }
  cbDirty = false;
}

cbToggle.changed(() => { useCheckerboard = cbToggle.checked(); cbDirty = true; });
cbColsSlider.input(() => cbDirty = true);
cbRowsSlider.input(() => cbDirty = true);
cbColPickerA.input(() => cbDirty = true);
cbColPickerB.input(() => cbDirty = true);
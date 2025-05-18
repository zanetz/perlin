/*  ──────────────────────────────────────────────────────────────
    0.  CONSTANTS & STATE
    ────────────────────────────────────────────────────────────── */

let colorMap       = [];   // pre‑computed fill colours
let strokeColorMap = [];   // pre‑computed stroke colours



/*  ──────────────────────────────────────────────────────────────
    1.  COLOUR‑MAP GENERATION
    ────────────────────────────────────────────────────────────── */

function generateColorMaps () {

  /* 1a. make sure we have enough rows */
  while (colorMap.length       < rows) colorMap.push([]);
  while (strokeColorMap.length < rows) strokeColorMap.push([]);

  /* 1b. make sure every row has enough columns */
  for (let i = 0; i < rows; i++) {
    while (colorMap[i].length       < cols) colorMap[i].push(null);
    while (strokeColorMap[i].length < cols) strokeColorMap[i].push(null);
  }

  /* 1c. compute fill & stroke for each cell */
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      const px = cols > 1 ? map(j, 0, cols - 1, 0, 1) : 0;
      const py = rows > 1 ? map(i, 0, rows - 1, 0, 1) : 0;

      // fill
      const fTop    = lerpColor(topLeftPicker.color(),    topRightPicker.color(),    px);
      const fBottom = lerpColor(bottomLeftPicker.color(), bottomRightPicker.color(), px);
      colorMap[i][j] = lerpColor(fTop, fBottom, py);

      // stroke
      const sTop    = lerpColor(strokeTopLeftPicker.color(),  strokeTopRightPicker.color(),  px);
      const sBottom = lerpColor(strokeBottomLeftPicker.color(), strokeBottomRightPicker.color(), px);
      strokeColorMap[i][j] = lerpColor(sTop, sBottom, py);
    }
  }
}



/*  ──────────────────────────────────────────────────────────────
    2.  UTILITY – canvas resize & shared slider refresh
    ────────────────────────────────────────────────────────────── */

function refreshGlobals () {
  canvasWidth  = canvasWidthSlider.value();
  canvasHeight = canvasHeightSlider.value();
  resizeCanvas(canvasWidth, canvasHeight);

  rows            = rowsSlider.value();
  cols            = colsSlider.value();
  spacing         = spacingSlider.value();
  shapeSize       = sizeSlider.value();
  strokeWeightVal = strokeWeightSlider.value();
  schmoveVal      = schmovementSlider.value();
  userSpeed       = speedSlider.value() * 3;
  userPulse       = pulseSlider.value();
}



/*  ──────────────────────────────────────────────────────────────
    3.  DRAW VARIANTS
    ────────────────────────────────────────────────────────────── */


/* --------------------------------------------------------------
   3a. drawPulse  – radial pulsating grid
   -------------------------------------------------------------- */
function drawPulse () {

  refreshGlobals();

  useCheckerboard ? blitCheckerboard() : background(backgroundPicker.color());

  const xOff = (width  - cols * spacing) / 2;
  const yOff = (height - rows * spacing) / 2;
  const cX   = width  / 2;
  const cY   = height / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      let x = j * spacing + spacing / 2 + xOff;
      let y = i * spacing + spacing / 2 + yOff;

      /* pulsation */
      const d    = dist(x, y, cX, cY);
      const dir  = userPulse >= 0 ? 1 : -1;
      const size = shapeSize + sin(frameCount * .05 + dir * d * .01) * abs(userPulse);

      /* colour (direct blend) */
      const px = map(j, 0, cols - 1, 0, 1);
      const py = map(i, 0, rows - 1, 0, 1);
      const fillCol   = lerpColor( lerpColor(topLeftPicker.color(),    topRightPicker.color(),    px ),
                                   lerpColor(bottomLeftPicker.color(), bottomRightPicker.color(), px ), py );
      const strokeCol = lerpColor( lerpColor(strokeTopLeftPicker.color(),  strokeTopRightPicker.color(),  px ),
                                   lerpColor(strokeBottomLeftPicker.color(), strokeBottomRightPicker.color(), px ), py );

      fill(fillCol);
      stroke(strokeCol);
      strokeWeight(strokeWeightVal);
      drawShape(shapeType, x, y, size);
    }
  }
}



/* --------------------------------------------------------------
   3b. draw1 – noise‑distorted grid (pre‑computed colours)
   -------------------------------------------------------------- */
function draw1 () {

  refreshGlobals();
  useCheckerboard ? blitCheckerboard() : background(backgroundPicker.color());

  const xOff = (width  - cols * spacing) / 2;
  const yOff = (height - rows * spacing) / 2;
  const cX   = width  / 2;
  const cY   = height / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      /* base position */
      let x = j * spacing + spacing / 2 + xOff;
      let y = i * spacing + spacing / 2 + yOff;

      /* “schmovement” – Perlin noise distortion */
      const n   = noise(x / width, y / height, frameCount * .0001 * userSpeed);
      const ang = n * TWO_PI * 5;
      const dis = map(n, 0, 300, schmoveVal, spacing / 2);
      x += dis * cos(ang);
      y += dis * sin(ang);

      /* pulsation */
      const d    = dist(x, y, cX, cY);
      const dir  = userPulse >= 0 ? 1 : -1;
      const size = shapeSize + sin(frameCount * .05 + dir * d * .01) * abs(userPulse);

      /* colours from pre‑built maps */
      const fillCol   = colorMap[i]?.[j]       || color(0);
      const strokeCol = strokeColorMap[i]?.[j] || color(0);

      fill(fillCol);
      stroke(strokeCol);
      strokeWeight(strokeWeightVal);
      drawShape(shapeType, x, y, size);
    }
  }
}



/* --------------------------------------------------------------
   3c. draw2 – four‑quadrant split
   -------------------------------------------------------------- */
function draw2 () {

  refreshGlobals();
  useCheckerboard ? blitCheckerboard() : background(backgroundPicker.color());

  const xOff = (width  - cols * spacing) / 2;
  const yOff = (height - rows * spacing) / 2;
  const cX   = width  / 2;
  const cY   = height / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      /* base position */
      let x = j * spacing + spacing / 2 + xOff;
      let y = i * spacing + spacing / 2 + yOff;

      /* quadrant offsets */
      if (i < rows / 2 && j < cols / 2)       { x += -width/4;  y += -height/4; }
      else if (i < rows / 2 && j >= cols / 2) { x +=  width/4;  y += -height/4; }
      else if (i >= rows / 2 && j < cols / 2) { x += -width/4;  y +=  height/4; }
      else                                    { x +=  width/4;  y +=  height/4; }

      /* noise distortion */
      const n   = noise(x / width, y / height, frameCount * .0001 * userSpeed);
      const ang = n * TWO_PI * 5;
      const dis = map(n, 0, 300, schmoveVal, spacing / 2);
      x += dis * cos(ang);
      y += dis * sin(ang);

      /* pulsation */
      const d    = dist(x, y, cX, cY);
      const dir  = userPulse >= 0 ? 1 : -1;
      const size = shapeSize + sin(frameCount * .05 + dir * d * .01) * abs(userPulse);

      /* colour (direct blend) */
      const px = map(j, 0, cols - 1, 0, 1);
      const py = map(i, 0, rows - 1, 0, 1);
      const fillCol   = lerpColor( lerpColor(topLeftPicker.color(),    topRightPicker.color(),    px ),
                                   lerpColor(bottomLeftPicker.color(), bottomRightPicker.color(), px ), py );
      const strokeCol = lerpColor( lerpColor(strokeTopLeftPicker.color(),  strokeTopRightPicker.color(),  px ),
                                   lerpColor(strokeBottomLeftPicker.color(), strokeBottomRightPicker.color(), px ), py );

      fill(fillCol);
      stroke(strokeCol);
      strokeWeight(strokeWeightVal);
      drawShape(shapeType, x, y, size);
    }
  }
}



/* --------------------------------------------------------------
   3d. draw3 – N×N section split (sections = strokeWeightVal)
   -------------------------------------------------------------- */
function draw3 () {

  refreshGlobals();
  useCheckerboard ? blitCheckerboard() : background(backgroundPicker.color());

  const numSections   = strokeWeightVal;    // user‑controllable section count
  const sW            = width  / numSections;
  const sH            = height / numSections;
  const xOff          = (width  - cols * spacing) / 2;
  const yOff          = (height - rows * spacing) / 2;
  const cX            = width  / 2;
  const cY            = height / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      /* base position inside grid */
      let x = j * spacing + spacing / 2 + xOff;
      let y = i * spacing + spacing / 2 + yOff;

      /* section offsets */
      const sRow = floor(i / (rows / numSections));
      const sCol = floor(j / (cols / numSections));
      x += (sCol - (numSections - 1) / 2) * sW;
      y += (sRow - (numSections - 1) / 2) * sH;

      /* noise distortion */
      const n   = noise(x / width, y / height, frameCount * .0001 * userSpeed);
      const ang = n * TWO_PI * 5;
      const dis = map(n, 0, 300, schmoveVal, spacing / 2);
      x += dis * cos(ang);
      y += dis * sin(ang);

      /* pulsation */
      const d    = dist(x, y, cX, cY);
      const dir  = userPulse >= 0 ? 1 : -1;
      const size = shapeSize + sin(frameCount * .05 + dir * d * .01) * abs(userPulse);

      /* colour (direct blend) */
      const px = map(j, 0, cols - 1, 0, 1);
      const py = map(i, 0, rows - 1, 0, 1);
      const fillCol   = lerpColor( lerpColor(topLeftPicker.color(),    topRightPicker.color(),    px ),
                                   lerpColor(bottomLeftPicker.color(), bottomRightPicker.color(), px ), py );
      const strokeCol = lerpColor( lerpColor(strokeTopLeftPicker.color(),  strokeTopRightPicker.color(),  px ),
                                   lerpColor(strokeBottomLeftPicker.color(), strokeBottomRightPicker.color(), px ), py );

      fill(fillCol);
      stroke(strokeCol);
      strokeWeight(strokeWeightVal);
      drawShape(shapeType, x, y, size);
    }
  }
}



/*  ──────────────────────────────────────────────────────────────
    4.  HELPER – checkerboard blit
    ────────────────────────────────────────────────────────────── */

/* draw.js  – checkerboard helpers
   ---------------------------------------------- */

/* cheap frame‑blit, rebuild only when cbDirty === true */
function blitCheckerboard () {
  if (cbDirty) rebuildCheckerboard();
  image(checkerGfx, 0, 0);
}

function rebuildCheckerboard () {
  /* … already‑existing code … */
  cbDirty = false;
}

/* If you are NOT using ES modules, expose to global. */
window.blitCheckerboard      = blitCheckerboard;
window.rebuildCheckerboard   = rebuildCheckerboard;
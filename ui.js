/* ============================================================
   INITIALISE EVERYTHING
   ============================================================ */
function initializeUI () {
  createMainSliders();
  createShapeControls();
  createFillPickers();
  createStrokePickers();
  createRandomButtons();
  createCheckerboardControls();
  hookGenerateColorMapEvents();
}


/* ============================================================
   1.  MAIN GRID & MOTION CONTROLS
   ============================================================ */
function createMainSliders () {

  // helper to avoid repetition
  function labelledSlider ({min, max, val}, y, label) {
    const s = createSlider(min, max, val);
    s.position(160, y);
    createP(label).position(20, y - 4);
    return s;
  }

  rowsSlider          = labelledSlider({min:1,   max:300, val:rows},  14,  'Rows');
  colsSlider          = labelledSlider({min:1,   max:150, val:cols},  44,  'Cols');
  spacingSlider       = labelledSlider({min:1,   max:160, val:spacing}, 74,'Spacing');
  sizeSlider          = labelledSlider({min:1,   max:100, val:shapeSize},134,'Size');
  strokeWeightSlider  = labelledSlider({min:0,   max:10,  val:1},     380,'Outline W');
  schmovementSlider   = labelledSlider({min:0,   max:900, val:150},   430,'Schmovement');
  speedSlider         = labelledSlider({min:1,   max:40,  val:10},    460,'Speed');
  canvasWidthSlider   = labelledSlider({min:100, max:3000,val:1500},  490,'Canvas W');
  canvasHeightSlider  = labelledSlider({min:100, max:3000,val:1200},  520,'Canvas H');
  pulseSlider         = labelledSlider({min:-50, max:50,  val:0},     730,'Pulse');

  /* Pulse reset */
  createButton('Reset Pulse')
          .position(160, 760)
          .mousePressed(() => pulseSlider.value(0));

  /* Background colour */
  backgroundPicker = createColorPicker('#000000');
  backgroundPicker.position(160, 350);
  createP('Background').position(20, 330);

  /* Scale‑R (used by your image grid) */
  scaleR = createInput('25', 'number')
              .attribute('min', 1).attribute('max', 50);
  scaleR.position(160, 1160).size(60);
  createP('scaleR').position(20, 1160);

  /* File input */
  imageInput = createFileInput(handleFile);
  imageInput.position(20, 1100);
}


/* ============================================================
   2.  SHAPE TYPE & TOGGLE
   ============================================================ */
function createShapeControls () {
  shapeButton = createButton('Toggle Shape');
  shapeButton.position(160, 294);
  shapeButton.mousePressed(toggleShapeType);
}


/* ============================================================
   3.  FILL & STROKE COLOUR PICKERS
   ============================================================ */
function createFillPickers () {
  const y0 = 170;
  topLeftPicker    = colourSwatch(160, y0,        'Shape Colour');
  topRightPicker   = colourSwatch(230, y0);
  bottomLeftPicker = colourSwatch(160, y0 + 50);
  bottomRightPicker= colourSwatch(230, y0 + 50);

  function colourSwatch (x, y, lbl) {
    if (lbl) createP(lbl).position(20, y + 20);
    const p = createColorPicker('#000000');
    p.position(x, y);
    return p;
  }
}



/* ============================================================
   3b.  STROKE COLOUR PICKERS – with your saved defaults
   ============================================================ */
function createStrokePickers () {
  const y0 = 570;            // first row

  strokeTopLeftPicker    = strokeSwatch(160, y0,       '#f50707', 'Outline Colour');
  strokeTopRightPicker   = strokeSwatch(230, y0,       '#1fff00');
  strokeBottomLeftPicker = strokeSwatch(160, y0 + 50,  '#073df5');
  strokeBottomRightPicker= strokeSwatch(230, y0 + 50,  '#ffffff');

  function strokeSwatch (x, y, defaultCol, lbl) {
    if (lbl) createP(lbl).position(20, y + 10);
    const picker = createColorPicker(defaultCol);
    picker.position(x, y);
    return picker;
  }
}


/* ============================================================
   4.  RANDOM / PRESET BUTTONS
   ============================================================ */
function createRandomButtons () {
  const btn = (txt, y, fn) =>
        createButton(txt).position(160, y).mousePressed(fn);

  btn('Randomize Fill Colours',    800, randomizeFillColors);
  btn('Randomize Stroke Colours',  830, randomizeStrokeColors);
  btn('Randomize Background',      860, randomizeBackgroundColor);
  btn('Set fill to black',         900, blackFill);
  btn('Set border to black',       930, blackBorder);

  // your custom presets
  btn('star snakes',               670, setStarSnakes);
  btn('one',                       700, OneSnake);
}


/* ============================================================
   5.  CHECKERBOARD CONTROLS
   ============================================================ */
function createCheckerboardControls () {

  cbToggle = createCheckbox('Checkerboard BG', false);
  cbToggle.position(20, 1230).changed(toggleCB);

  // sliders & pickers (initially hidden until toggle on)
  cbColsSlider   = createSlider(2, 200, 20).position(160, 1260).hide();
  cbRowsSlider   = createSlider(2, 200, 20).position(160, 1290).hide();
  cbColPickerA   = createColorPicker('#444444').position(160, 1310).hide();
  cbColPickerB   = createColorPicker('#dddddd').position(230, 1310).hide();

  createP('CB Columns').position(20, 1260);
  createP('CB Rows').position(20, 1290);
  createP('CB Colour A').position(20, 1310);
  createP('B').position(235, 1290);

  // mark checkerboard dirty when any control moves
  [cbColsSlider, cbRowsSlider, cbColPickerA, cbColPickerB]
        .forEach(ctrl => ctrl.input(() => cbDirty = true));

  function toggleCB () {
    useCheckerboard = cbToggle.checked();
    cbDirty = true;
    const vis = useCheckerboard ? 'show' : 'hide';
    [cbColsSlider, cbRowsSlider, cbColPickerA, cbColPickerB]
          .forEach(ctrl => ctrl[vis]());
  }
}


/* ============================================================
   6.  COLOUR‑MAP REGEN EVENTS
   ============================================================ */
function hookGenerateColorMapEvents () {
  [
    rowsSlider, colsSlider,
    topLeftPicker, topRightPicker, bottomLeftPicker, bottomRightPicker,
    strokeTopLeftPicker, strokeTopRightPicker, strokeBottomLeftPicker, strokeBottomRightPicker
  ].forEach(ctrl => ctrl.input(generateColorMaps));
}


/* ============================================================
   7.  UTILITY BUTTON CALLBACKS
   (unchanged from your original code)
   ============================================================ */
function getRandomColor ()       { return color(random(255), random(255), random(255)); }

function randomizeFillColors ()  {
  [topLeftPicker, topRightPicker, bottomLeftPicker, bottomRightPicker]
      .forEach(p => p.value(getRandomColor().toString('#rrggbb')));
  generateColorMaps();
}

function randomizeStrokeColors () {
  [strokeTopLeftPicker, strokeTopRightPicker, strokeBottomLeftPicker, strokeBottomRightPicker]
      .forEach(p => p.value(getRandomColor().toString('#rrggbb')));
  generateColorMaps();
}

function randomizeBackgroundColor () { backgroundPicker.value(getRandomColor().toString('#rrggbb')); }

function blackFill ()   {
  [topLeftPicker, topRightPicker, bottomLeftPicker, bottomRightPicker]
      .forEach(p => p.value('#000000'));
  generateColorMaps();
}
function blackBorder () {
  [strokeTopLeftPicker, strokeTopRightPicker, strokeBottomLeftPicker, strokeBottomRightPicker]
      .forEach(p => p.value('#000000'));
  generateColorMaps();
}
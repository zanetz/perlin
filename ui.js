// ui.js
function initializeUI() {
  rowsSlider = createSlider(1, 300, rows);
  rowsSlider.position(160, 14);
  const rowsLabel = createP('Rows');
  rowsLabel.position(20, 10);

  colsSlider = createSlider(1, 150, cols);
  colsSlider.position(160, 44);
  const colsLabel = createP('Columns');
  colsLabel.position(20, 40);

  spacingSlider = createSlider(1, 160, spacing);
  spacingSlider.position(160, 74);
  const spacingLabel = createP('Spacing');
  spacingLabel.position(20, 70);

  sizeSlider = createSlider(1, 100, shapeSize);
  sizeSlider.position(160, 134);
  const sizeLabel = createP('Size');
  sizeLabel.position(20, 130);

  // Color Picker Grid - 2x2 layout
  topLeftPicker = createColorPicker('#000000');
  topLeftPicker.position(160, 170);
  const topLeftLabel = createP('Shape Color');
  topLeftLabel.position(20, 190);

  topRightPicker = createColorPicker('#000000');
  topRightPicker.position(230, 170);
 // const topRightLabel = createP('Top Right');
  //topRightLabel.position(300, 150);

  bottomLeftPicker = createColorPicker('#000000');
  bottomLeftPicker.position(160, 220);
  // const bottomLeftLabel = createP('Bottom Left');
  // bottomLeftLabel.position(50, 200);

  bottomRightPicker = createColorPicker('#000000');
  bottomRightPicker.position(230, 220);
  // const bottomRightLabel = createP('Bottom Right');
  // bottomRightLabel.position(300, 200);

  shapeButton = createButton('Toggle Shape');
  shapeButton.position(160, 294);
  shapeButton.mousePressed(toggleShapeType);

  backgroundPicker = createColorPicker('#000000');
  backgroundPicker.position(160, 350);
  const backgroundLabel = createP('Background');
  backgroundLabel.position(20, 330);

  strokeWeightSlider = createSlider(0, 10, 1);
  strokeWeightSlider.position(160, 380);
  const strokeWeightLabel = createP('Outline Weight');
  strokeWeightLabel.position(20, 360);

  // strokeColorPicker = createColorPicker('#FFFFFF');
  // strokeColorPicker.position(160, 404);
  // const strokeColorLabel = createP('Stroke Color');
  // strokeColorLabel.position(20, 380);

  initializeAdditionalUI(); // Call additional UI initialization
}

function initializeAdditionalUI() {
  const setStarSnakesButton = createButton('star snakes');
  setStarSnakesButton.position(160, 670);
  setStarSnakesButton.mousePressed(setStarSnakes);

  const setOneSnakeButton = createButton('one');
  setOneSnakeButton.position(160, 700);
  setOneSnakeButton.mousePressed(OneSnake);

  schmovementSlider = createSlider(0, 900, 150);
  schmovementSlider.position(160, 430);
  const schmovementLabel = createP('Schmovement');
  schmovementLabel.position(20, 420);

  speedSlider = createSlider(1, 40, 10);
  speedSlider.position(160, 460);
  const speedLabel = createP('Speed');
  speedLabel.position(20, 450);

  canvasWidthSlider = createSlider(100, 3000, 1500);
  canvasWidthSlider.position(160, 490);
  const canvasWidthLabel = createP('Canvas Width');
  canvasWidthLabel.position(20, 480);

  canvasHeightSlider = createSlider(100, 3000, 1200);
  canvasHeightSlider.position(160, 520);
  const canvasHeightLabel = createP('Canvas Height');
  canvasHeightLabel.position(20, 510);

  pulseSlider = createSlider(-50, 50, 0);
  pulseSlider.position(160, 730);
  const pulseLabel = createP('Pulse');
  pulseLabel.position(20, 720);

  // Stroke color pickers in 2x2 grid layout
  initializeStrokeColorPickers();
}

function initializeStrokeColorPickers() {
  strokeTopLeftPicker = createColorPicker('#f50707');
  strokeTopLeftPicker.position(160, 570);
  const strokeTopLeftLabel = createP('Outline Color');
  strokeTopLeftLabel.position(20, 580);

  strokeTopRightPicker = createColorPicker('#1fff00');
  strokeTopRightPicker.position(230, 570);
  //const strokeTopRightLabel = createP('Stroke Top Right');
  //strokeTopRightLabel.position(300, 550);

  strokeBottomLeftPicker = createColorPicker('#073df5');
  strokeBottomLeftPicker.position(160, 620);
  //const strokeBottomLeftLabel = createP('Stroke Bottom Left');
  //strokeBottomLeftLabel.position(50, 600);

  strokeBottomRightPicker = createColorPicker('#ffffff');
  strokeBottomRightPicker.position(230, 620);
  //const strokeBottomRightLabel = createP('Stroke Bottom Right');
  //strokeBottomRightLabel.position(300, 600);
}

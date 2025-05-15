// ui.js
function initializeUI() {
  rowsSlider = createSlider(1, 300, rows);
  rowsSlider.position(160, 14);
  rowsSlider.input(() => {
    rows = rowsSlider.value();
    generateColorMaps();  // Update the color maps when the rows slider changes
  });
  const rowsLabel = createP('Rows');
  rowsLabel.position(20, 10);

  // Columns Slider
  colsSlider = createSlider(1, 150, cols);
  colsSlider.position(160, 44);
  colsSlider.input(() => {
    cols = colsSlider.value();
    generateColorMaps();  // Update the color maps when the columns slider changes
  });
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

  // add a 0 button to reset the pulse slider
  const pulseResetButton = createButton('Reset Pulse');
  pulseResetButton.position(160, 760);
  pulseResetButton.mousePressed(() => {
    pulseSlider.value(0);
  });

  imageInput = createFileInput(handleFile);
  imageInput.position(20, 1100);


  scaleR = createInput('25', 'number');
  scaleR.attribute('min', '1');
  scaleR.attribute('max', '50');
  scaleR.position(160, 1160);
  scaleR.size(60);
  const scaleRLabel = createP('scaleR');
  scaleRLabel.position(20, 1160);

  initializeAdditionalUI();
}

function initializeAdditionalUI() {

  initializeFillColorPickers();
  initializeStrokeColorPickers();
  initializeRandButtons();
  rowsSlider.input(generateColorMaps);
  colsSlider.input(generateColorMaps);
  topLeftPicker.input(generateColorMaps);
  topRightPicker.input(generateColorMaps);
  bottomLeftPicker.input(generateColorMaps);
  bottomRightPicker.input(generateColorMaps);
  strokeTopLeftPicker.input(generateColorMaps);
  strokeTopRightPicker.input(generateColorMaps);
  strokeBottomLeftPicker.input(generateColorMaps);
  strokeBottomRightPicker.input(generateColorMaps);

}

// Stroke color pickers in 2x2 grid layout
function initializeStrokeColorPickers() {
  strokeTopLeftPicker = createColorPicker('#f50707');
  strokeTopLeftPicker.position(160, 570);
  const strokeTopLeftLabel = createP('Outline Color');
  strokeTopLeftLabel.position(20, 580);

  strokeTopRightPicker = createColorPicker('#1fff00');
  strokeTopRightPicker.position(230, 570);
  
  strokeBottomLeftPicker = createColorPicker('#073df5');
  strokeBottomLeftPicker.position(160, 620);
  
  strokeBottomRightPicker = createColorPicker('#ffffff');
  strokeBottomRightPicker.position(230, 620);
}

// Fill color pickers in 2x2 grid layout
function initializeFillColorPickers(){
  topLeftPicker = createColorPicker('#000000');
  topLeftPicker.position(160, 170);
  const topLeftLabel = createP('Shape Color');
  topLeftLabel.position(20, 190);

  topRightPicker = createColorPicker('#000000');
  topRightPicker.position(230, 170);

  bottomLeftPicker = createColorPicker('#000000');
  bottomLeftPicker.position(160, 220);

  bottomRightPicker = createColorPicker('#000000');
  bottomRightPicker.position(230, 220);
}

function initializeRandButtons() {
  const randomizeFillColorsButton = createButton('Randomize Fill Colors');
  randomizeFillColorsButton.position(160, 800);
  randomizeFillColorsButton.mousePressed(randomizeFillColors);
  
  const randomizeStrokeColorsButton = createButton('Randomize Stroke Colors');
  randomizeStrokeColorsButton.position(160, 830);
  randomizeStrokeColorsButton.mousePressed(randomizeStrokeColors);

  const randomizeBackgroundColorButton = createButton('Randomize Background Color');
  randomizeBackgroundColorButton.position(160, 860);
  randomizeBackgroundColorButton.mousePressed(randomizeBackgroundColor);

  const blackFillButton = createButton('Set fill to black');
  blackFillButton.position(160, 900);
  blackFillButton.mousePressed(blackFill);

  const blackBorderButton = createButton('Set border to black');
  blackBorderButton.position(160, 930);
  blackBorderButton.mousePressed(blackBorder);

  const setStarSnakesButton = createButton('star snakes');
  setStarSnakesButton.position(160, 670);
  setStarSnakesButton.mousePressed(setStarSnakes);

  const setOneSnakeButton = createButton('one');
  setOneSnakeButton.position(160, 700);
  setOneSnakeButton.mousePressed(OneSnake);



}


function getRandomColor() {
  return color(random(255), random(255), random(255));
}


function randomizeFillColors() {
  topLeftPicker.value(getRandomColor().toString('#rrggbb'));
  topRightPicker.value(getRandomColor().toString('#rrggbb'));
  bottomLeftPicker.value(getRandomColor().toString('#rrggbb'));
  bottomRightPicker.value(getRandomColor().toString('#rrggbb'));

  generateColorMaps();
}


function randomizeStrokeColors() {
  strokeTopLeftPicker.value(getRandomColor().toString('#rrggbb'));
  strokeTopRightPicker.value(getRandomColor().toString('#rrggbb'));
  strokeBottomLeftPicker.value(getRandomColor().toString('#rrggbb'));
  strokeBottomRightPicker.value(getRandomColor().toString('#rrggbb'));

  generateColorMaps();
}


function randomizeBackgroundColor() {
  backgroundPicker.value(getRandomColor().toString('#rrggbb'));
}


function blackFill() {
  topLeftPicker.value('#000000');
  topRightPicker.value('#000000');
  bottomLeftPicker.value("#000000")
  bottomRightPicker.value("#000000")

    generateColorMaps();

}


function blackBorder() {
  strokeTopLeftPicker.value('#000000');
  strokeTopRightPicker.value('#000000');
  strokeBottomLeftPicker.value("#000000")
  strokeBottomRightPicker.value("#000000")

    generateColorMaps();

}



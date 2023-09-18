let rows = 7; // number of rows
let cols = 7; // number of columns
let spacing = 35; // spacing between points
let shapeType = 'rect'; // shape type ('rect' or 'circle' )
let shapeSize = 20; // size of the shape
let topLeftColor;
let topRightColor;
let bottomLeftColor;
let bottomRightColor;

let randShapeBool = false;

let rowsSlider;
let colsSlider;
let spacingSlider;
let sizeSlider;
let strokeWeightSlider;
let idkValueSlider;

let buffer; // Graphics buffer

let shapeButton;
let randomShapeButton;

let topLeftPicker;
let topRightPicker;
let bottomLeftPicker;
let bottomRightPicker;
let strokeColorPicker;
let backgroundPicker;

function setup() {
  createCanvas(600, 600); // create a canvas with width and height of 600 pixels

  // Create sliders and labels for rows, columns, spacing, and size
  rowsSlider = createSlider(1, 100, rows);
  rowsSlider.position(160, 14);
  const rowsLabel = createP('Rows');
  rowsLabel.position(20, 10);

  colsSlider = createSlider(1, 100, cols);
  colsSlider.position(160, 44);
  const colsLabel = createP('Columns');
  colsLabel.position(20, 40);

  spacingSlider = createSlider(1, 40, spacing);
  spacingSlider.position(160, 74);
  const spacingLabel = createP('Spacing');
  spacingLabel.position(20, 70);

  sizeSlider = createSlider(1, 100, shapeSize);
  sizeSlider.position(160, 134);
  const sizeLabel = createP('Size');
  sizeLabel.position(20, 130);

  // Create color pickers and labels for each corner
  topLeftPicker = createColorPicker('#FFFF00');
  topLeftPicker.position(160, 164);
  const topLeftLabel = createP('Top Left');
  topLeftLabel.position(20, 160);

  topRightPicker = createColorPicker('#FF0000');
  topRightPicker.position(160, 194);
  const topRightLabel = createP('Top Right');
  topRightLabel.position(20, 190);

  bottomLeftPicker = createColorPicker('#0000FF');
  bottomLeftPicker.position(160, 224);
  const bottomLeftLabel = createP('Bottom Left');
  bottomLeftLabel.position(20, 220);

  bottomRightPicker = createColorPicker('#00FF00');
  bottomRightPicker.position(160, 254);
  const bottomRightLabel = createP('Bottom Right');
  bottomRightLabel.position(20, 250);

  // Create button to toggle shapeType
  shapeButton = createButton('Toggle Shape');
  shapeButton.position(160, 294);
  shapeButton.mousePressed(toggleShapeType);

  // Create color picker and label for the background
  backgroundPicker = createColorPicker('#000000');
  backgroundPicker.position(160, 350);
  const backgroundLabel = createP('Background');
  backgroundLabel.position(20, 330);

  strokeWeightSlider = createSlider(0, 10, 1);
  strokeWeightSlider.position(160, 380);
  const strokeWeightLabel = createP('Stroke Weight');
  strokeWeightLabel.position(20, 360);

  strokeColorPicker = createColorPicker('#FFFFFF');
  strokeColorPicker.position(160, 404);
  const strokeColorLabel = createP('Stroke Color');
  strokeColorLabel.position(20, 380);

  schmovementSlider = createSlider(0, 300, 10);
  schmovementSlider.position(160, 430);
  const schmovementLabel = createP('Schmovement');
  schmovementLabel.position(20, 420);

  speedSlider = createSlider(1, 20, 10);
  speedSlider.position(160, 460);
  const speedLabel = createP('Speed');
  speedLabel.position(20, 450);



  // Create the graphics buffer
  buffer = createGraphics(width, height);


}

function draw() {
  // set the background to black
  background(backgroundPicker.color());

  // Update variables based on slider values
  rows = rowsSlider.value();
  cols = colsSlider.value();
  spacing = spacingSlider.value();
  shapeSize = sizeSlider.value();
  strokeWeightVal = strokeWeightSlider.value();
  schmoveVal = schmovementSlider.value();
  userSpeed = speedSlider.value() * 3;

  const xOffset = (width - cols * spacing) / 2;
  const yOffset = (height - rows * spacing) / 2;

  buffer.background(backgroundPicker.color());


  // loop through each row and column to draw shapes
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * spacing + spacing / 2 + xOffset; // calculate x coordinate of shape
      let y = i * spacing + spacing / 2 + yOffset; // calculate y coordinate of shape

      // use Perlin noise to distort the position of the shape
      const noiseVal = noise(x / width, y / height, frameCount * 0.0001 * userSpeed);
      const angle = noiseVal * TWO_PI * 5;
      const distortion = map(noiseVal, 0, 300, schmoveVal, spacing / 2);
      x += distortion * cos(angle);
      y += distortion * sin(angle);

      // wrap shapes around the screen if they go off-screen
      if (x < 0) {
        x = width + x % width;
      } else if (x > width) {
        x = x % width;
      }

      if (y < 0) {
        y = height + y % height;
      } else if (y > height) {
        y = y % height;
      }

      // interpolate between colors based on position
      const posx = map(j, 0, cols - 1, 0, 1);
      const posy = map(i, 0, rows - 1, 0, 1);
      const colorTopLeft = topLeftPicker.color();
      const colorTopRight = topRightPicker.color();
      const colorBottomLeft = bottomLeftPicker.color();
      const colorBottomRight = bottomRightPicker.color();
      const colorTop = lerpColor(colorTopLeft, colorTopRight, posx);
      const colorBottom = lerpColor(colorBottomLeft, colorBottomRight, posx);
      const colorFinal = lerpColor(colorTop, colorBottom, posy);

      // set the fill color to the interpolated color
      fill(colorFinal);
      stroke(strokeColorPicker.color());
      strokeWeight(strokeWeightVal);

      // draw shapes based on shapeType
      if (shapeType === 'rect') {
        rect(x, y, shapeSize, shapeSize);
      } else if (shapeType === 'circle') {
        ellipse(x, y, shapeSize, shapeSize);
      } else if (shapeType === 'triangle') {
        triangle(x, y, x + shapeSize, y, x + shapeSize / 2, y + shapeSize);
      }
    }
  }
}

// Toggle between rectangle mode and ellipse mode and triangle
function toggleShapeType() {
  if (shapeType === 'rect') {
    shapeType = 'circle';
  } else if (shapeType === 'circle') {
    shapeType = 'triangle';
  } else if (shapeType === 'triangle') {
    shapeType = 'rect';
  }
}


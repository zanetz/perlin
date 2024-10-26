let rows = 15; // number of rows
let cols = 15; // number of columns
let spacing = 35; // spacing between points
let shapeType = 'line'; // shape type ('rect' or 'circle' )
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
let canvasWidthSlider;
let canvasHeightSlider;

let buffer; // Graphics buffer

let shapeButton;
let randomShapeButton;

let topLeftPicker;
let topRightPicker;
let bottomLeftPicker;
let bottomRightPicker;
let strokeColorPicker;
let backgroundPicker;

let strokeBottomLeft
let strokeBottomRight
let strokeTopLeft
let strokeTopRight

let drawButton; // Button to generate the picture


function setup() {
    createCanvas(600, 600);

    // Create sliders and labels for rows, columns, spacing, and size
    rowsSlider = createSlider(1, 150, rows);
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
  
  
  
    schmovementSlider = createSlider(0, 300, 10);
    schmovementSlider.position(160, 430);
    const schmovementLabel = createP('Schmovement');
    schmovementLabel.position(20, 420);
  
    speedSlider = createSlider(1, 20, 10);
    speedSlider.position(160, 460);
    const speedLabel = createP('Speed');
    speedLabel.position(20, 450);
  
    canvasWidthSlider = createSlider(100, 2000, 600);
    canvasWidthSlider.position(160, 490);
    const canvasWidthLabel = createP('Canvas Width');
    canvasWidthLabel.position(20, 480);
  
    canvasHeightSlider = createSlider(100, 2000, 600);
    canvasHeightSlider.position(160, 520);
    const canvasHeightLabel = createP('Canvas Height');
    canvasHeightLabel.position(20, 510);
  
  // stroke stuff
    strokeTopLeftPicker = createColorPicker('#33ffdd')
    strokeTopLeftPicker.position(160, 550);
    const strokeTopLeftLabel = createP('Stroke Top Left');
    strokeTopLeftLabel.position(20, 540);
  
    strokeTopRightPicker = createColorPicker('#e633ff')
    strokeTopRightPicker.position(160, 580);
    const strokeTopRightLabel = createP('Stroke Top Right');
    strokeTopRightLabel.position(20, 570);
  
  
    strokeBottomLeftPicker = createColorPicker('#33ff4c')
    strokeBottomLeftPicker.position(160, 610);
    const strokeBottomLeftLabel = createP('Stroke Bottom Left');
    strokeBottomLeftLabel.position(20, 600);
  
  
    strokeBottomRightPicker = createColorPicker('#ffffff')
    strokeBottomRightPicker.position(160, 640);
    const strokeBottomRightLabel = createP('Stroke Bottom Right');
    strokeBottomRightLabel.position(20, 630);
  
    strokeWeightSlider = createSlider(0, 10, 10);
    strokeWeightSlider.position(160, 380);
    const strokeWeightLabel = createP('Stroke Weight');
    strokeWeightLabel.position(20, 360);
  
    strokeColorPicker = createColorPicker('#FFFFFF');
    strokeColorPicker.position(160, 404);
    const strokeColorLabel = createP('Stroke Color');
    strokeColorLabel.position(20, 380);
  
  
  
  
    // Create the graphics buffer
    buffer = createGraphics(width, height);
  
    // Add the button to draw a new pattern
    drawButton = createButton('Draw New Pattern');
    drawButton.position(160, 550);
    drawButton.mousePressed(drawPattern);
  
    // Draw the initial static pattern once
    drawPattern();
  
  

}

function generatePicture() {
    drawPattern(); // Call the drawPattern function to draw the picture
}

function draw() {
  // set the background to black
  background(0);

  // set the fill color to white
  //background(255);
  
  const rows = 300; // number of rows
  const cols = 300; // number of columns
  const spacing = 3; // spacing between points
  
  // loop through each row and column to draw points
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * spacing ; // calculate x coordinate of point
      const y = i * spacing ; // calculate y coordinate of point
      
      // use Perlin noise to distort the position of the point
      const noiseVal = noise(x/width, y/height);
      const angle = noiseVal * TWO_PI;
      const distortion = map(noiseVal, 50, 100, 100, spacing/2);
      const newX = x + distortion * cos(angle);
      const newY = y + distortion * sin(angle);
      
      // interpolate between colors based on position
      const topLeft = color(255, 255, 0); // yellow
      const topRight = color(255, 0, 0); // red
      const bottomLeft = color(0, 0, 255); // blue
      const bottomRight = color(0, 255, 0); // green
      
      
      const posx = map(j, 0, cols-1, 0, 1);
      const posy = map(i, 0, rows-1, 0, 1);
      const colorTop = lerpColor(topLeft, topRight, posx);
      const colorBottom = lerpColor(bottomLeft, bottomRight, posx);
      const colorFinal = lerpColor(colorTop, colorBottom, posy);
      
      // set the fill color to the interpolated color
      fill(colorFinal);
      circle(newX, newY, 4); // draw a circle at the distorted (newX, newY) position with a radius of 2 pixels
    }
  }
}


{/* <body>
    <script src="sketch.js"></script>
    <button onclick="location.href='index2.html'">Go to Sketch Page</button>
  </body> */}
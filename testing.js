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

let drawButton;




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

function drawPattern() {
    // Update the canvas size based on slider values
    let canvasWidth = canvasWidthSlider.value();
    let canvasHeight = canvasHeightSlider.value();
    resizeCanvas(canvasWidth, canvasHeight); // Resize the canvas based on slider values
  
    // Set the background to black
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
  
    // Loop through each row and column to draw shapes
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let x = j * spacing + spacing / 2 + xOffset; // Calculate x coordinate of shape
        let y = i * spacing + spacing / 2 + yOffset; // Calculate y coordinate of shape

        const noiseVal = noise(x/width, y/height);
        const angle = noiseVal * TWO_PI;
        const distortion = map(noiseVal, 50, 100, schmoveVal, spacing/2);
        const newX = x + distortion * cos(angle);
        const newY = y + distortion * sin(angle);
  
        // Interpolate between colors based on position
        const posx = map(j, 0, cols - 1, 0, 1);
        const posy = map(i, 0, rows - 1, 0, 1);
        const colorTopLeft = topLeftPicker.color();
        const colorTopRight = topRightPicker.color();
        const colorBottomLeft = bottomLeftPicker.color();
        const colorBottomRight = bottomRightPicker.color();
        const colorTop = lerpColor(colorTopLeft, colorTopRight, posx);
        const colorBottom = lerpColor(colorBottomLeft, colorBottomRight, posx);
        const colorFinal = lerpColor(colorTop, colorBottom, posy);
  
        const strokeTopLeftColor = strokeTopLeftPicker.color();
        const strokeTopRightColor = strokeTopRightPicker.color();
        const strokeBottomLeftColor = strokeBottomLeftPicker.color();
        const strokeBottomRightColor = strokeBottomRightPicker.color();
        const strokeColorTop = lerpColor(strokeTopLeftColor, strokeTopRightColor, posx);
        const strokeColorBottom = lerpColor(strokeBottomLeftColor, strokeBottomRightColor, posx);
        const strokeColorFinal = lerpColor(strokeColorTop, strokeColorBottom, posy);
  
        // Set the fill color to the interpolated color
        fill(colorFinal);
        stroke(strokeColorFinal);
        strokeWeight(strokeWeightVal);
  
        // Draw shapes based on shapeType
        if (shapeType === 'rect') {
          rect(newX, newY, shapeSize, shapeSize);
        } else if (shapeType === 'circle') {
          ellipse(newX, newY, shapeSize, shapeSize);
        } else if (shapeType === 'triangle') {
          triangle(newX, newY, x + shapeSize, y, x + shapeSize / 2, y + shapeSize);
        } else if (shapeType === 'line') {
          line(newX, newY, x + shapeSize, y + shapeSize);
        } else if (shapeType === 'hexagon') {
          drawHexagon(newX, newY, shapeSize);
        } else if (shapeType === 'star') {
          drawStar(newX, newY, shapeSize / 2, shapeSize, 5);
        } else if (shapeType === 'heart') {
          drawHeart(newX, newY, shapeSize);
        }
      }
    }
  }



// Custom function to draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
    let x1 = x + cos(a) * radius2;
    let y1 = y + sin(a) * radius2;
    vertex(x1, y1);
    let x2 = x + cos(a + halfAngle) * radius1;
    let y2 = y + sin(a + halfAngle) * radius1;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}


function drawHexagon(x, y, size) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    const angle = TWO_PI / 6 * i;
    const xOffset = cos(angle) * size;
    const yOffset = sin(angle) * size;
    vertex(x + xOffset, y + yOffset);
  }
  endShape(CLOSE);
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x + size, y - size, x + 2 * size, y + size / 2, x, y + 2 * size);
  bezierVertex(x - 2 * size, y + size / 2, x - size, y - size, x, y);
  endShape(CLOSE);
}



// Toggle between shapes
function toggleShapeType() {
  if (shapeType === 'rect') {
    shapeType = 'circle';
  } else if (shapeType === 'circle') {
    shapeType = 'triangle';
  } else if (shapeType === 'triangle') {
    shapeType = 'line';
  } else if (shapeType === 'line') {
    shapeType = 'hexagon';
  } else if (shapeType === 'hexagon') {
    shapeType = 'star';
  } else if (shapeType === 'star') {
    shapeType = 'heart';
  } else if (shapeType === 'heart') {
    shapeType = 'smiley';
  } else if (shapeType === 'smiley') {
    shapeType = 'rect';
  }
}


function drawSmiley(x, y, size) {
  // Draw the head (a yellow circle)
  ellipse(x, y, size, size);

  // Draw the eyes (two white circles)
  fill(255);
  ellipse(x - size / 4, y - size / 4, size / 5, size / 5);
  ellipse(x + size / 4, y - size / 4, size / 5, size / 5);

  // Draw the pupils (two black circles)
  fill(0);
  ellipse(x - size / 4, y - size / 4, size / 10, size / 10);
  ellipse(x + size / 4, y - size / 4, size / 10, size / 10);

  // Draw the mouth (an arc for a smile)
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(x, y + size / 10, size / 2, size / 5, 0, PI);
}


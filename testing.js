let rows = 40; // number of rows
let cols = 40; // number of columns
let spacing = 16; // spacing between points
let shapeType = 'hexagon'; // shape type ('rect' or 'circle' )
let shapeSize = 12; // size of the shape
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

let useAltDraw = false;



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
  topLeftPicker = createColorPicker('#000000');
  topLeftPicker.position(160, 164);
  const topLeftLabel = createP('Top Left');
  topLeftLabel.position(20, 160);

  topRightPicker = createColorPicker('#000000');
  topRightPicker.position(160, 194);
  const topRightLabel = createP('Top Right');
  topRightLabel.position(20, 190);

  bottomLeftPicker = createColorPicker('#000000');
  bottomLeftPicker.position(160, 224);
  const bottomLeftLabel = createP('Bottom Left');
  bottomLeftLabel.position(20, 220);

  bottomRightPicker = createColorPicker('#000000');
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



  schmovementSlider = createSlider(0, 300, 150);
  schmovementSlider.position(160, 430);
  const schmovementLabel = createP('Schmovement');
  schmovementLabel.position(20, 420);

  speedSlider = createSlider(1, 20, 10);
  speedSlider.position(160, 460);
  const speedLabel = createP('Speed');
  speedLabel.position(20, 450);

  canvasWidthSlider = createSlider(100, 2000, 1500);
  canvasWidthSlider.position(160, 490);
  const canvasWidthLabel = createP('Canvas Width');
  canvasWidthLabel.position(20, 480);

  canvasHeightSlider = createSlider(100, 2000, 1200);
  canvasHeightSlider.position(160, 520);
  const canvasHeightLabel = createP('Canvas Height');
  canvasHeightLabel.position(20, 510);

// stroke stuff
  strokeTopLeftPicker = createColorPicker('#f50707')
  strokeTopLeftPicker.position(160, 550);
  const strokeTopLeftLabel = createP('Stroke Top Left');
  strokeTopLeftLabel.position(20, 540);

  strokeTopRightPicker = createColorPicker('#1fff00')
  strokeTopRightPicker.position(160, 580);
  const strokeTopRightLabel = createP('Stroke Top Right');
  strokeTopRightLabel.position(20, 570);


  strokeBottomLeftPicker = createColorPicker('#073df5')
  strokeBottomLeftPicker.position(160, 610);
  const strokeBottomLeftLabel = createP('Stroke Bottom Left');
  strokeBottomLeftLabel.position(20, 600);


  strokeBottomRightPicker = createColorPicker('#ffffff')
  strokeBottomRightPicker.position(160, 640);
  const strokeBottomRightLabel = createP('Stroke Bottom Right');
  strokeBottomRightLabel.position(20, 630);

  strokeWeightSlider = createSlider(0, 10, 1);
  strokeWeightSlider.position(160, 380);
  const strokeWeightLabel = createP('Stroke Weight');
  strokeWeightLabel.position(20, 360);

  strokeColorPicker = createColorPicker('#FFFFFF');
  strokeColorPicker.position(160, 404);
  const strokeColorLabel = createP('Stroke Color');
  strokeColorLabel.position(20, 380);

  const setValuesButton = createButton('Set Specific Values');
  setValuesButton.position(160, 670); // Position the button below the sliders
  setValuesButton.mousePressed(setSpecificValues);


  // Create the graphics buffer
  buffer = createGraphics(width, height);

  let toggleButton = createButton('Toggle Draw Mode');
  toggleButton.mousePressed(toggleDraw);

}

function originalDraw() {
  // Update the canvas size based on slider values
  canvasWidth = canvasWidthSlider.value();
  canvasHeight = canvasHeightSlider.value();
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

  buffer.background(backgroundPicker.color());

  // Loop through each row and column to draw shapes
  for (let i = 0; i < rows; i++) {
     for (let j = 0; j < cols; j++) {
        let x = j * spacing + spacing / 2;
        let y = i * spacing + spacing / 2;

        // Determine which quadrant to draw in
        if (i < rows / 2 && j < cols / 2) {
           // Top-left quadrant
           x += xOffset - width / 4;
           y += yOffset - height / 4;
        } else if (i < rows / 2 && j >= cols / 2) {
           // Top-right quadrant
           x += xOffset + width / 4;
           y += yOffset - height / 4;
        } else if (i >= rows / 2 && j < cols / 2) {
           // Bottom-left quadrant
           x += xOffset - width / 4;
           y += yOffset + height / 4;
        } else if (i >= rows / 2 && j >= cols / 2) {
           // Bottom-right quadrant
           x += xOffset + width / 4;
           y += yOffset + height / 4;
        }

        // Apply Perlin noise for shape distortion
        const noiseVal = noise(x / width, y / height, frameCount * 0.0001 * userSpeed);
        const angle = noiseVal * TWO_PI * 5;
        const distortion = map(noiseVal, 0, 300, schmoveVal, spacing / 2);
        x += distortion * cos(angle);
        y += distortion * sin(angle);

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

        // Set the fill and stroke colors
        fill(colorFinal);
        stroke(strokeColorFinal);
        strokeWeight(strokeWeightVal);

        // Draw shapes based on shapeType
        if (shapeType === 'rect') {
           rect(x, y, shapeSize, shapeSize);
        } else if (shapeType === 'circle') {
           ellipse(x, y, shapeSize, shapeSize);
        } else if (shapeType === 'triangle') {
           triangle(x, y, x + shapeSize, y, x + shapeSize / 2, y + shapeSize);
        } else if (shapeType === 'line') {
           line(x, y, x + shapeSize, y + shapeSize);
        } else if (shapeType === 'hexagon') {
           drawHexagon(x, y, shapeSize);
        } else if (shapeType === 'star') {
           drawStar(x, y, shapeSize / 2, shapeSize, 5);
        } else if (shapeType === 'heart') {
           drawHeart(x, y, shapeSize);
        } else if (shapeType === 'smiley') {
           drawSmiley(x, y, shapeSize);
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

function setSpecificValues() {
  // Set specific values for the sliders
  rowsSlider.value(150); // Set rows to 50
  colsSlider.value(3); // Set columns to 50
  spacingSlider.value(1); // Set spacing to 20
  sizeSlider.value(100); // Set shape size to 15
  strokeWeightSlider.value(2); // Set stroke weight to 2
  canvasWidthSlider.value(700); // Set canvas width to 800
  canvasHeightSlider.value(500); // Set canvas height to 600
  speedSlider.value(20)
  schmovementSlider.value(300)

  // Set shape type to a specific value, for example, "star"
  shapeType = 'star';

  // Redraw the canvas to apply changes
  redraw();
}


function drawAlt() {

  // Update the canvas size based on slider values
  canvasWidth = canvasWidthSlider.value();
  canvasHeight = canvasHeightSlider.value();
  resizeCanvas(canvasWidth, canvasHeight); // Resize the canvas based on slider values

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

     const strokeTopLeftColor = strokeTopLeftPicker.color()
     const strokeTopRightColor = strokeTopRightPicker.color()
     const strokeBottomLeftColor = strokeBottomLeftPicker.color()
     const strokeBottomRightColor = strokeBottomRightPicker.color()
     const stokeColorTop = lerpColor(strokeTopLeftColor, strokeTopRightColor, posx);
     const strokeColorBottom = lerpColor(strokeBottomLeftColor, strokeBottomRightColor, posx);
     const strokeColorFinal = lerpColor(stokeColorTop, strokeColorBottom, posy);
    

     // set the fill color to the interpolated color
     fill(colorFinal);
     stroke(strokeColorFinal);
     strokeWeight(strokeWeightVal);

     // draw shapes based on shapeType
     if (shapeType === 'rect') {
       rect(x, y, shapeSize, shapeSize);
     } else if (shapeType === 'circle') {
       ellipse(x, y, shapeSize, shapeSize);
     } else if (shapeType === 'triangle') {
       triangle(x, y, x + shapeSize, y, x + shapeSize / 2, y + shapeSize);
     } else if (shapeType === 'line') {
       line(x, y, x + shapeSize, y + shapeSize);
     } else if (shapeType === 'hexagon') {
       drawHexagon(x, y, shapeSize);
     } else if (shapeType === 'star') {
       drawStar(x, y, shapeSize / 2, shapeSize, 5);
     } else if (shapeType === 'heart') {
       drawHeart(x, y, shapeSize);
     } else if (shapeType === 'smiley') {
       drawSmiley(x, y, shapeSize);
     }
   }
 }
}


function toggleDraw() {
  useAltDraw = !useAltDraw;
}

function draw() {
  if (useAltDraw) {
    drawAlt();
  } else {
    originalDraw(); // rename your current draw function as originalDraw
  }
}
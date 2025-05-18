const shapeTypes = ['rect', 'circle', 'triangle', 'line', 'pentagon', 'hexagon', 'star', 'heart', 'smiley', 'flower'];
let shapeIndex = 0;

function toggleShapeType() {
  shapeIndex = (shapeIndex + 1) % shapeTypes.length;
  shapeType = shapeTypes[shapeIndex];
}


function drawShape(shapeType, x, y, size) {
    if (shapeType === 'rect') {
       rect(x, y, size, size);
    } else if (shapeType === 'circle') {
       ellipse(x, y, size, size);
    } else if (shapeType === 'triangle') {
       triangle(x, y, x + size, y, x + size / 2, y + size);
    } else if (shapeType === 'line') {
       line(x, y, x + size, y + size);
    } else if (shapeType === 'hexagon') {
       drawHexagon(x, y, size);
    } else if (shapeType === 'star') {
       drawStar(x, y, size / 2, size, 5);
    } else if (shapeType === 'heart') {
       drawHeart(x, y, size);
    } else if (shapeType === 'smiley') {
       drawSmiley(x, y, size);
    } else if (shapeType === 'pentagon') {
      drawPentagon(x, y, size);
    }else if (shapeType === 'flower') {
      drawFlower(x, y, size)
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

  function setStarSnakes() {
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

    // set draw mode to draw3
    drawMode = 'draw3'

  
    // Redraw the canvas to apply changes
    redraw();
  }
  
  function OneSnake() {
    // Set specific values for the sliders
    rowsSlider.value(200); // Set rows to 50
    colsSlider.value(3); // Set columns to 50
    spacingSlider.value(4); // Set spacing to 20
    sizeSlider.value(100); // Set shape size to 15
    strokeWeightSlider.value(2); // Set stroke weight to 2
    canvasWidthSlider.value(1700); // Set canvas width to 800
    canvasHeightSlider.value(1500); // Set canvas height to 600
    speedSlider.value(3)
    schmovementSlider.value(300)
  
    // Set shape type to a specific value, for example, "star"
    shapeType = 'star';
  
    // Redraw the canvas to apply changes
    redraw();
  }


  function drawPentagon(x, y, size) {
    beginShape();
    for (let i = 0; i < 5; i++) { // Loop 5 times for a pentagon
      const angle = TWO_PI / 5 * i; // Divide the full circle by 5 for a pentagon
      const xOffset = cos(angle) * size;
      const yOffset = sin(angle) * size;
      vertex(x + xOffset, y + yOffset);
    }
    endShape(CLOSE);
  }

  function drawFlower(x, y, size, nPetals = 6) {
    const petalSize = size / 2;
    for (let i = 0; i < nPetals; i++) {
      const angle = TWO_PI / nPetals * i;
      const xOffset = cos(angle) * size;
      const yOffset = sin(angle) * size;
      ellipse(x + xOffset, y + yOffset, petalSize, petalSize);
    }
    // Draw the center of the flower
    fill(255, 204, 0); // yellow center
    ellipse(x, y, petalSize / 2, petalSize / 2);
    fill(255); // Reset to white for other shapes
  }

  
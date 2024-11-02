// main.js
let rows = 40; // number of rows
let cols = 40; // number of columns
let spacing = 16; // spacing between points
let shapeType = 'hexagon'; // shape type ('rect' or 'circle')
let shapeSize = 12; // size of the shape
let topLeftColor, topRightColor, bottomLeftColor, bottomRightColor;

let randShapeBool = false;
let rowsSlider, colsSlider, spacingSlider, sizeSlider, strokeWeightSlider;
let idkValueSlider, canvasWidthSlider, canvasHeightSlider;
let buffer, shapeButton, randomShapeButton;
let topLeftPicker, topRightPicker, bottomLeftPicker, bottomRightPicker;
let strokeColorPicker, backgroundPicker;
let strokeBottomLeft, strokeBottomRight, strokeTopLeft, strokeTopRight;
let useAltDraw = false;
let isStriped = false; // Variable to control whether to draw stripes
let tileSize = 150; // Size of each tile


let drawFunctions = [draw1, drawPulse,  draw2]; // Array of draw functions
let currentDrawIndex = 0; // Index to keep track of the current draw function

function setup() {
  createCanvas(600, 600);
  initializeUI(); // Call the UI initialization function
  buffer = createGraphics(width, height); // Create the graphics buffer
  let toggleButton = createButton('Toggle Draw Mode');
  toggleButton.mousePressed(toggleDraw);
}

function draw() {
    drawFunctions[currentDrawIndex](); // Call the current draw function
}

function toggleDraw() {
    currentDrawIndex = (currentDrawIndex + 1) % drawFunctions.length; // Cycle through the array
}


function drawPulse() {
    // Update the canvas size based on slider values
    canvasWidth = canvasWidthSlider.value();
    canvasHeight = canvasHeightSlider.value();
    resizeCanvas(canvasWidth, canvasHeight);

    // Set the background color
    background(backgroundPicker.color());

    // Update variables based on slider values
    rows = rowsSlider.value();
    cols = colsSlider.value();
    spacing = spacingSlider.value();
    shapeSize = sizeSlider.value();
    strokeWeightVal = strokeWeightSlider.value();
    schmoveVal = schmovementSlider.value();
    userSpeed = speedSlider.value() * 3;
    userPulse = pulseSlider.value()

    const xOffset = (width - cols * spacing) / 2;
    const yOffset = (height - rows * spacing) / 2;

    // Center coordinates for the pulse effect
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * spacing + spacing / 2 + xOffset;
            let y = i * spacing + spacing / 2 + yOffset;

            // Distance from the center
            let distFromCenter = dist(x, y, centerX, centerY);

            // Create a pulsating effect by altering shape size based on distance and time
            let direction = userPulse >= 0 ? 1 : -1;  // Determine the direction based on the sign of userPulse
            let pulsateSize = shapeSize + sin(frameCount * 0.05 + direction * distFromCenter * 0.01) * abs(userPulse);

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

            // Set fill and stroke colors
            fill(colorFinal);
            stroke(strokeColorFinal);
            strokeWeight(strokeWeightVal);

            // Draw the shape with pulsating size
            drawShape(shapeType, x, y, pulsateSize);
        }
    }
}

function draw1() {
    // Update the canvas size based on slider values
    canvasWidth = canvasWidthSlider.value();
    canvasHeight = canvasHeightSlider.value();
    resizeCanvas(canvasWidth, canvasHeight); // Resize the canvas based on slider values

    // Set the background to the selected color
    background(backgroundPicker.color());

    // Update variables based on slider values
    rows = rowsSlider.value();
    cols = colsSlider.value();
    spacing = spacingSlider.value();
    shapeSize = sizeSlider.value();
    strokeWeightVal = strokeWeightSlider.value();
    schmoveVal = schmovementSlider.value();
    userSpeed = speedSlider.value() * 3;
    userPulse = pulseSlider.value();

    const xOffset = (width - cols * spacing) / 2;
    const yOffset = (height - rows * spacing) / 2;

    // Center coordinates for the pulse effect
    const centerX = width / 2;
    const centerY = height / 2;

    // Loop through each row and column to draw shapes
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * spacing + spacing / 2 + xOffset; // Calculate x coordinate of shape
            let y = i * spacing + spacing / 2 + yOffset; // Calculate y coordinate of shape

            // Use Perlin noise to distort the position of the shape
            const noiseVal = noise(x / width, y / height, frameCount * 0.0001 * userSpeed);
            const angle = noiseVal * TWO_PI * 5;
            const distortion = map(noiseVal, 0, 300, schmoveVal, spacing / 2);
            x += distortion * cos(angle);
            y += distortion * sin(angle);

            // Distance from the center for pulsating effect
            let distFromCenter = dist(x, y, centerX, centerY);

            // Create a pulsating size based on distance and time
            let direction = userPulse >= 0 ? 1 : -1;  // Determine the direction based on the sign of userPulse
            let pulsateSize = shapeSize + sin(frameCount * 0.05 + direction * distFromCenter * 0.01) * abs(userPulse);

            // Wrap shapes around the screen if they go off-screen
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

            // Draw the shape with pulsating size
            drawShape(shapeType, x, y, pulsateSize);
        }
    }
}

function draw2() {
    // Update the canvas size based on slider values
    canvasWidth = canvasWidthSlider.value();
    canvasHeight = canvasHeightSlider.value();
    resizeCanvas(canvasWidth, canvasHeight); // Resize the canvas based on slider values

    // Set the background to the selected color
    background(backgroundPicker.color());

    // Update variables based on slider values
    rows = rowsSlider.value();
    cols = colsSlider.value();
    spacing = spacingSlider.value();
    shapeSize = sizeSlider.value();
    strokeWeightVal = strokeWeightSlider.value();
    schmoveVal = schmovementSlider.value();
    userSpeed = speedSlider.value() * 3;
    userPulse = pulseSlider.value(); // Add this line to get the pulse value from the slider

    const xOffset = (width - cols * spacing) / 2;
    const yOffset = (height - rows * spacing) / 2;

    // Center coordinates for the pulse effect
    const centerX = width / 2;
    const centerY = height / 2;

    // Loop through each row and column to draw shapes
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * spacing + spacing / 2 + xOffset; // Calculate x coordinate of shape
            let y = i * spacing + spacing / 2 + yOffset; // Calculate y coordinate of shape

            // Determine which quadrant to draw in
            if (i < rows / 2 && j < cols / 2) {
                // Top-left quadrant
                x += -width / 4;
                y += -height / 4;
            } else if (i < rows / 2 && j >= cols / 2) {
                // Top-right quadrant
                x += width / 4;
                y += -height / 4;
            } else if (i >= rows / 2 && j < cols / 2) {
                // Bottom-left quadrant
                x += -width / 4;
                y += height / 4;
            } else if (i >= rows / 2 && j >= cols / 2) {
                // Bottom-right quadrant
                x += width / 4;
                y += height / 4;
            }

            // Use Perlin noise to distort the position of the shape
            const noiseVal = noise(x / width, y / height, frameCount * 0.0001 * userSpeed);
            const angle = noiseVal * TWO_PI * 5;
            const distortion = map(noiseVal, 0, 300, schmoveVal, spacing / 2);
            x += distortion * cos(angle);
            y += distortion * sin(angle);

            // Distance from the center for pulsating effect
            let distFromCenter = dist(x, y, centerX, centerY);

            let direction = userPulse >= 0 ? 1 : -1;  // Determine the direction based on the sign of userPulse
            let pulsateSize = shapeSize + sin(frameCount * 0.05 + direction * distFromCenter * 0.01) * abs(userPulse);

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

            // Draw the shape with pulsating size
            drawShape(shapeType, x, y, pulsateSize);
        }
    }
}


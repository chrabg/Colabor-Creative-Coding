var wW;
var wH;

let imgmouse;
let mouseWidth = 200;
let mouseHeight = 100;

let imgsausage;
let sausageWidth = 200;
let sausageHeight = 150;

let imgbird;
let birdWidth = 200;
let birdHeight = 150;

let dynamicBoxW = 150;
let dynamicBoxH = 45;

let lastDrawTime = 0;
let drawInterval = 2;

let showConfetti = false;

let confettiPosition = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

let confetti;
let images = [];
let textPositions = [];

function preload() {
  confetti = loadImage("./confetti.gif");
  imgmouse = loadImage("./mouse.png");
  imgsausage = loadImage("./sausage.png");
  imgbird = loadImage("./bird.png");
}

function setup() {
  background(220);
  createCanvas(windowWidth, windowHeight);
  confetti.resize(300, 200);
  imgmouse.resize(300, 200);
  imgsausage.resize(300, 200);
  imgbird.resize(300, 200);
  noStroke();
  frameRate(30);

  wW = windowWidth - 300;
  wH = windowHeight - 200;

  // Initialize image positions
  for (let i = 0; i < 3; i++) {
    images.push({
      x: random(wW),
      y: random(wH),
    });

    textPositions.push({
      x: random(wW),
      y: random(wH),
    });
  }
}

function draw() {
  let currentTime = millis() / 1000; // Convert milliseconds to seconds
  if (currentTime - lastDrawTime >= drawInterval) {
    lastDrawTime = currentTime;
    drawStuff(); // Call the draw function
  }

  if (showConfetti) {
    image(
      confetti,
      confettiPosition.x,
      confettiPosition.y,
      confettiPosition.w,
      confettiPosition.h
    );
    setTimeout(() => {
      showConfetti = false;
    }, 2000);
  }
}

function drawStuff() {
  background(220);

  for (let i = 0; i < images.length; i++) {
    let imageObj = images[i];
    let textPos = textPositions[i];

    // Update image and text positions
    imageObj.x = random(wW);
    imageObj.y = random(wH);
    textPos.x = random(wW);
    textPos.y = random(wH);

    // Display images
    if (i === 0) {
      image(imgmouse, imageObj.x, imageObj.y, mouseWidth, mouseHeight);
    } else if (i === 1) {
      image(imgsausage, imageObj.x, imageObj.y, sausageWidth, sausageHeight);
    } else if (i === 2) {
      image(imgbird, imageObj.x, imageObj.y, birdWidth, birdHeight);
    }

    // Display labels
    if (i === 0) {
      drawLabel("mouse", textPos.x, textPos.y);
    } else if (i === 1) {
      drawLabel("sausage", textPos.x, textPos.y);
    } else if (i === 2) {
      drawLabel("bird", textPos.x, textPos.y);
    }

    // Check if the text label overlaps with the image and display confetti
    let imageCenterX = imageObj.x + imgmouse.width / 2;
    let imageCenterY = imageObj.y + imgmouse.height / 2;
    let textCenterX = textPos.x + dynamicBoxW / 2;
    let textCenterY = textPos.y + dynamicBoxH / 2;

    let distance = dist(imageCenterX, imageCenterY, textCenterX, textCenterY);

    if (
      distance < imgmouse.width / 2 + dynamicBoxW / 2 &&
      distance < imgmouse.height / 2 + dynamicBoxH / 2
    ) {
      showConfetti = true;
      confettiPosition = {
        x: imageObj.x,
        y: imageObj.y,
        w: windowWidth / 2,
        h: windowHeight / 2,
      };
    } else {
    }
  }
}

function drawLabel(label, x, y) {
  fill(255, 0);
  rect(x, y, dynamicBoxW, dynamicBoxH);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(label, x + dynamicBoxW / 2, y + dynamicBoxH / 2);
}

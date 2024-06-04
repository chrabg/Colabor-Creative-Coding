

function setup() {
  createCanvas(600, 600);
  background(220);

  for (let i = 0; i < 10; i = i + 1) {
    for (let j = 0; j < 5; j++) {
      fill(255,255,220);
      //noStroke();
      rect(i*60, j*60, 60, 60);
      //circle(0,i*60,60);
      //console.log(i);
    }
  }
}

function draw() {
  //rect(0, 0, 60, 60);
  //fill(50);
  //noStroke();
}

// Bild speichern
function keyPressed() {
  saveCanvas('Zwischenschritt', 'jpg')
}
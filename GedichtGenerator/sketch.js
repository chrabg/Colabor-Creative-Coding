let liste1 = ['Die Maus', 'Der Vogel', 'Die Wurst'];
let liste2 = ['traurig', 'glücklich', 'entspannt', 'aufgeregt', 'entzückt'];
let liste3 = ['spielt', 'stirbt', 'trinkt', 'zeichnet', 'tanzt']
let liste4 = ['in der Bratpfanne', 'auf dem Friedhof', 'in den Bergen', 'am Pult', 'unter der Dusche']



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(0.5);
  generateText();
}

function draw() {

  //let sourceA = join(source, "\n")
  //let piece = match (sourceA,/artists/g)
  // generateText();
}

function generateText() {

  let rand1 = floor(random(3));
  let rand2 = floor(random(5));
  let rand3 = floor(random(5));
  let rand4 = floor(random(5));

  let titel = 'Gedicht Generator'
  let untertitel = 'bitte klicken ☺'
  
  background(255);
  fill(10, 10, 10);

  textAlign(LEFT);
  textSize(24);
  textFont('avenir');
  push();
  textStyle(BOLD);
  text(titel.toUpperCase(), 50, 60);
  pop();
 
  textSize(16);
  text(untertitel, 50, 280);
  
  textSize(24);
  textFont('avenir');
  
  text(liste1[rand1] + "\n" + "ist " + liste2[rand2],
    50, 100, windowWidth, windowHeight);
  text("und " + liste3[rand3] + "\n" + liste4[rand4] + ".",
    50, 180, windowWidth, windowHeight);
}

function mouseClicked() {
  generateText()
}
let mic;
let midi_out;
let midi_enabled = false

let Sphere1Rotation 
let Sphere2Rotation 
let Sphere3Rotation 
let Cube1Rotation
let Cube2Rotation

let img
let img2
let img3
let img4
let img5

let sound

let liste= [0.005, 0.0125, 0.02];

function preload() {
  img = loadImage('Bilder/Bild-1.jpg')
  img2 = loadImage('Bilder/Bild-2.jpg')
  img3 = loadImage('Bilder/Bild-3.jpg')
  img4 = loadImage('Bilder/Bild-4.jpg')
  img5Q = loadImage('Bilder/Bild-5-Quadrat.jpg')

  // load sound ↓↓↓↓↓↓↓↓↓↓
  sound = loadSound('Lieder/RiverFlowsInYou.mp3')
}


function setup() {
  Sphere1Rotation = [random(liste), random(liste), random(liste)]
  Sphere2Rotation = [random(liste), random(liste), random(liste)]
  Sphere3Rotation = [random(liste), random(liste), random(liste)]
  Cube1Rotation = [random(liste), random(liste), random(liste)]
  Cube2Rotation = [random(liste), random(liste), random(liste)]

  let cnv = createCanvas(innerWidth, innerHeight - 10, WEBGL);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();

  // play the sound ↓↓↓↓↓↓↓↓↓↓
  sound.play()


  // ******************************************
  // ******************************************
  // ATTENTION IT CAN CREATE FEEDBACK!!!!!!
  // mic.connect();
  // ******************************************
  // ******************************************
  fft = new p5.FFT(0.8, 128);
  fft.setInput(mic)


  // ******************************************
  // ******************************************
  // initialize midi 
  // init_midi()
  // ******************************************
  // ******************************************
}


function draw() {

  let zahl = random (liste)

  background(0);

  // ******************************************
  // ******************************************
  // MIDI
  if (midi_enabled) {
    // within this if statement you can 
    // send midi notes and cc values
    if (frameCount % 10 === 0) {
      const value = round(random(127))
      send_cc(value, 0);
      send_note(value, 500)
    }
  }
  // ******************************************
  // ******************************************


  // 3d lights and materials
  lights()
  specularMaterial(10, 60, 120)
  // ambientMaterial(255, 200, 0)
  // normalMaterial(255, 0, 0)


  strokeWeight(1)
  //text('tap to start', 0, -height/2);
  let micLevel = mic.getLevel();

  // get sound amplitude ↓↓↓↓↓↓↓↓↓↓
  // let micLevel = sound.getLevel();

// KUGEL 1 (OBEN)
  console.log(micLevel)
  noStroke()
  texture(img)
  push()
  translate(98, -105, 0)
  rotateX(-frameCount * Sphere1Rotation[0])
  rotateY(frameCount * Sphere1Rotation[1])
  rotateZ(frameCount * Sphere1Rotation[2])
  sphere(124 + 200 * micLevel)
  pop()


  // KUGEL 2 (RECHTS)
  noStroke()
  texture(img2)
  push()
  translate(278, 137 , 0)
  rotateX(frameCount * Sphere2Rotation[0])
  rotateY(-frameCount * Sphere2Rotation[1])
  rotateZ(frameCount * Sphere2Rotation[2])
  sphere(89 + 200 * micLevel)
  pop()

  // KUGEL 3 (LINKS)
  noStroke()
  texture(img3)
  push()
  translate(-289, 77, 0)
  rotateX(frameCount * Sphere3Rotation[0])
  rotateY(frameCount * Sphere3Rotation[1])
  rotateZ(-frameCount * Sphere3Rotation[2])
  sphere(110 + 200 * micLevel)
  pop()


  // WÜRFEL 1 (OBEN)

  pop()
  texture(img4)
  push()
  translate(-184, -178, 0)
  rotateX(-frameCount * Cube1Rotation[0])
  rotateY(frameCount * Cube1Rotation[1])
  rotateZ(-frameCount * Cube1Rotation[2])
  box(148, 148, 148)
  pop()


  // WÜRFEL 2 (UNTEN)
  pop()
  texture(img5Q)
  push()
  translate(-16, 203, 0)
  rotateX(frameCount * Cube1Rotation[0])
  rotateY(-frameCount * Cube1Rotation[1])
  rotateZ(frameCount * Cube1Rotation[2])
  box(199, 199, 199)
  pop()

  // ******************************************
  // ******************************************
  // FFT analysis
  let spectrum = fft.analyze();
  let waves = fft.waveform()
  noStroke();
  fill('#3f3')
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h)
  }
  beginShape()

  noFill()
  stroke('#f3f')
  strokeWeight(3)
  for (let i = 0; i < waves.length; i++) {
    let x = map(i, 0, waves.length, 0, width);
    let y = map(waves[i], -1, 1, 0, height)
    vertex(x, y)
  }
  endShape()
  // ******************************************
  // ******************************************
}


function send_cc(value, cc) {
  const val = parseInt(abs(value)) % 128
  midi_out.sendControlChange(cc, value);
  // console.log(`send midi cc: ${val}`);
}
function send_note(note, duration) {
  midi_out.playNote(note, { duration });
  // console.log(`send midi note: ${note}`);
}


// ******************************************
// ******************************************
// MIDI FUNCTIONS!
function init_midi() {
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.outputs.length < 1) {
      console.log("No device detected.");
    } else {
      WebMidi.outputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
      });
      // midi_out = WebMidi.outputs[0].channels[1]
      create_buttons()
    }
  }
}

function create_buttons() {
  for (let i = 0; i < WebMidi.outputs.length; i++) {
    const midi = WebMidi.outputs[i];
    let btn = createButton(midi.name);
    btn.position(50, 40 * (i + 1));
    btn.mousePressed(() => {
      midi_out = midi.channels[1];
      console.log(`midi port selected: ${midi.name}`);
      removeElements()
      midi_enabled = true
    })
  }
}
// ******************************************
// ******************************************
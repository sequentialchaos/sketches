function preload() {
  sound = loadSound('Windowlicker.mp3');
}

function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.mouseClicked(togglePlay)
  fft = new p5.FFT();
  sound.amp(0.2);
  bar_width = width / sound.duration()
  colorMode(HSB)
  background(0);
}

function draw(){
  spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  cell_height = height / spectrum.length
  for (i = 0; i < spectrum.length; i++){
    x = map(sound.currentTime(), 0, sound.duration(), 0, width);
    y = map(i, 0, spectrum.length, 0, height);
    fill(spectrum[i], 255, 255)
    rect(x, y, bar_width, cell_height)
  }

  speed = map(mouseY, 0.1, height, 0, 10);
  speed = constrain(speed, 0.01, 100);
  sound.rate(speed);
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
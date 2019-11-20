let sketch1 = sketch => {
  sketch.setup = () => {
    let parent = document.getElementById("canvas1");
    console.log(parent.width);
    // sketch.createCanvas(100, 100);
    // sketch.background(0);
  };
};
let canvas1 = new p5(sketch1, "canvas1");

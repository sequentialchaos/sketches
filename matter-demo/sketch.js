function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  Engine = Matter.Engine
  World = Matter.World
  Bodies = Matter.Bodies

  engine = Engine.create()
  boxA = Bodies.rectangle(100, 100, 50, 50)
  Engine.run(engine)
  World.add(engine.world, [boxA])
  print(boxA)
}

function draw() {
  background(30)
  rect(boxA.position.x, boxA.position.y, 50, 50)
}
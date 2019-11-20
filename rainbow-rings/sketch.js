const maxRatio = 0.35
const numRings = 40
const ringRatio = maxRatio / numRings / 2
const speed = 1 / numRings

function setup() {
	const length = min(innerWidth, innerHeight)
	createCanvas(length, length, WEBGL).center('horizontal')
	colorMode(HSB, 100)
}

function draw() {
	background(0)
	noStroke()

	for (let i = 0; i < numRings; i++) {
		rotateX(frameCount * speed)
		rotateY(frameCount * speed * 0.5)
		rotateZ(frameCount * speed * 0.25)
		fill(map(i, 0, numRings, 0, 100), 80, 95)
		torus(width * (maxRatio - i * ringRatio * 2), width * ringRatio)
	}
}

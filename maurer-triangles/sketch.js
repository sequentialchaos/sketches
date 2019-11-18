// title: maurer triangle rainbow swish
// author: Winston Smith, @sequentialchaos
// created: Oct. 25, 2019
// https://editor.p5js.org/sequentialchaos/sketches/Zq70Kbrmk

const NUM_TRIANGLES = 30
let n = 2.18
let d = 41.86
let i = 0.92
let j = 1.25
let p, r

function setup() {
	createCanvas(innerWidth, innerHeight)
	colorMode(HSB, 1, 1, 1, 1)
	noStroke()

	p = PI
	r = (width + height) / 2 * 0.75
}

function draw() {
	translate(width / 2, height / 2)
	background(0, 0.05)
	for (let w = 0; w < NUM_TRIANGLES; w++) {
		let t = i + w
		let p1 = maurer(t, n, d, r)
		let p2 = maurer(t + p, n, d, r)
		let p3 = maurer(t + p + 0.01, n, d, r)
		fill(w / NUM_TRIANGLES, 1, 1, 0.01)
		triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
	}
	i += PI / 100000
	j += PI / 50000
	p = map(easeInOutQuad((j % PI) / PI), 0, 1, PI, PI * 3)
	d += 0.0001
	n += 0.00001

	// showValues()
}

function maurer(t, n, d, rMax) {
	let k = t * d
	let r = rMax * sin(n * k)
	let x = r * cos(k)
	let y = r * sin(k)
	return { x, y }
}

function showValues() {
	push()
	resetMatrix()
	fill(1)
	stroke(0)
	textSize(40)
	text(`n = ${n.toFixed(3)}`, 20, 50)
	text(`d = ${d.toFixed(3)}`, 20, 100)
	text(`i = ${i.toFixed(3)}`, 20, 150)
	text(`j = ${j.toFixed(3)}`, 20, 200)
	text(`p = ${p.toFixed(3)}`, 20, 250)
	pop()
}

function easeInOutQuad(t) {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

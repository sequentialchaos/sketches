// n = 4
let donut_flame = new L_system(
	(axiom = 'F+F+F+F+F+F'),
	(rules = {
		F: '+F+F-F'
	}),
	(len = 20),
	(angle = 60),
	(max_iterations = 10)
)

let donut_flame2 = new L_system(
	(axiom = 'F+F+F+F+F'),
	(rules = {
		F: '+F+F-F'
	}),
	(len = 2),
	(angle = 72),
	(max_iterations = 10)
)

function setup() {
	length = min(innerWidth, innerHeight)
	createCanvas(length, length, P2D).center('horizontal')
	// noLoop()
	frameRate(60)

	for (let i = 0; i < 4; i++) {
		donut_flame.getNextInstructions()
	}
	donut_flame.draw({ len: length * 0.038, mode: 'absolute', colormode: 'normal', show: false })
	// console.log(donut_flame.turtle.angle_delta)

	num_lines = donut_flame.turtle.lines.length
	color_speed = 5
	max_color_num = num_lines / color_speed
	colorMode(HSB, max_color_num)
	strokeWeight(map(length, 0, 2000, 3, 17))
	lines = donut_flame.turtle.lines

	record = false
	if (record) {
		capturer = new CCapture({
			framerate: 60,
			format: 'gif',
			workersPath: '../lib/',
			verbose: true
		})
		capturer.start()
	}
}

function draw() {
	background(0)
	translate(width * 0.2, height * 0.47)
	rotate(radians(24))

	for (let [ i, l ] of donut_flame.turtle.lines.entries()) {
		stroke(
			(i + frameCount) % max_color_num,
			map(i, 0, num_lines, max_color_num * 0.95, max_color_num * 0.45),
			max_color_num
		)
		line(l.x1, l.y1, l.x2, l.y2)
	}

	if (record) {
		capturer.capture(canvas)
		if (frameCount > max_color_num) {
			capturer.stop()
			capturer.save()
			noLoop()
		}
	}
}

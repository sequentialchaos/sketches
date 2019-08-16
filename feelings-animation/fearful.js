class BabySpider {
  constructor(angle, r, x, y, w, h) {
    this.angle = angle
    this.r = r
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.t = Math.random()
  }

  move(t, angle) {
    let dx = (noise(t + this.t) - 0.5) * 5
    let dy = (noise(t + this.t + 10000) - 0.5) * 5
    this.x += dx * cos(angle)
    this.y += dy * sin(angle)
  }
}

class Fearful {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.spider_babies = []
    this.d = 300
    for (let i = 0; i < 100; i++) {
      let r = Math.random() * 5 + 2
      let angle = random(0, TWO_PI)
      let baby_r = random(100, this.d)
      let baby_x = this.x + baby_r * cos(angle)
      let baby_y = this.y + baby_r * sin(angle)
      let baby_w = this.w / r
      let baby_h = baby_w
      let baby_spider = new BabySpider(
        angle,
        baby_r,
        baby_x,
        baby_y,
        baby_w,
        baby_h
      )
      this.spider_babies.push(baby_spider)
    }
  }
  
  draw(spider_image, t) {
    for (let i = 0; i < this.spider_babies.length; i++) {
      let spider_baby = this.spider_babies[i]
      push()
      translate(this.w / 2, this.h / 2)
      image(spider_image, spider_baby.x, spider_baby.y, spider_baby.w, spider_baby.h)
      pop()
      spider_baby.move(t, spider_baby.angle)
    }
    image(spider_image, this.x, this.y, this.w, this.h)

  }
}
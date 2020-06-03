export default class Camera {
  renderer

  follow = null

  target = {
    x: 0,
    y: 0,
  }
  position = {
    x: 0,
    y: 0
  }

  onTick () {
    if(this.follow) this.target = this.follow()

    this.position.x += (this.target.x - this.position.x) * 0.1
    this.position.y += (this.target.y - this.position.y) * 0.1
  }

  getTransformation() {
    return {
      x: (this.position.x - this.renderer.resolution.x / 2) * -1,
      y: (this.position.y - this.renderer.resolution.y / 2) * -1
    }
  }
}

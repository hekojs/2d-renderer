import Visual from '../Visual'

export default (creator) => {
  return (options) => {
    options = Visual.options({
      color: creator.renderer.palette.primary,
      alpha: 1,
      radius: 10,
      angle: 0,
      x: 0,
      y: 0
    }, options, 'radius')

    const circle = new creator.renderer.PIXI.Graphics()
    circle.lineStyle(options.radius / 5, Number('0x' + options.color), options.alpha)
    circle.drawCircle(0, 0, options.radius)
    circle.moveTo(0, 0)
    circle.lineTo(0, options.radius * -1)
    circle.endFill()

    circle.angle = options.angle
    circle.x = options.x
    circle.y = options.y

    return Visual.prepare(circle)
  }
}
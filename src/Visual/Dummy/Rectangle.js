import Visual from '../Visual'

export default (creator) => {
  return (options) => {
    options = Visual.options({
      color: creator.renderer.palette.primary,
      alpha: 1,
      width: 20,
      height: 20
    }, options, 'radius')

    let size = (options.width + options.height) / 2

    const box = new creator.renderer.PIXI.Graphics()
    box.lineStyle(size / 10, Number('0x' + options.color), options.alpha)
    box.drawRect(0, 0, options.width, options.height)

    box.lineStyle(size / 20, Number('0x' + options.color), options.alpha)
    box.moveTo(0, 0)
    box.lineTo(options.width, options.height)
    box.moveTo(options.width, 0)
    box.lineTo(0, options.height)

    box.endFill()

    return Visual.prepare(box)
  }
}
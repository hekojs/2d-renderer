import Visual from '../Visual'

export default (creator) => {
  return (options) => {
    options = Visual.options({
      color: creator.renderer.palette.primary,
      alpha: 1,
      radius: 10,
      blur: 0,
      blendMode: 'normal'
    }, options, 'radius')

    const circle = new creator.renderer.PIXI.Graphics()
    circle.lineStyle(0)
    circle.beginFill(Number('0x' + options.color), options.alpha)
    circle.drawCircle(0, 0, options.radius)
    circle.endFill()

    if (options.blur) {
      circle.filters = [new creator.renderer.PIXI.filters.BlurFilter(options.blur)]
    }
    if (options.blend === 'screen') {
      circle.blendMode = creator.renderer.PIXI.BLEND_MODES.SCREEN
    }

    return Visual.prepare(circle)
  }
}
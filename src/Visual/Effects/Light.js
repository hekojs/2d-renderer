import _ from 'lodash'

export default (helper) => {
  return class Light {
    constructor (options) {
      if(typeof options === "number") options = {radius: options}
      this.options = _.merge({
        color: 0x00FFC0,
        alpha: 0.3,
        radius: 20,
        blur: 5,
        addChild: true,
        properties: {}
      }, options)

      this.container = new PIXI.Graphics()
      this.container.lineStyle(0)
      this.container.beginFill(this.options.color, this.options.alpha)
      this.container.drawCircle(0, 0, this.options.radius)
      this.container.drawCircle(0, 0, this.options.radius / 2)
      this.container.filters = [new PIXI.filters.BlurFilter(this.options.blur)];
      this.container.blendMode = PIXI.BLEND_MODES.SCREEN
      this.container.endFill()

      for(let name in this.options.properties) {
        this.container[name] = this.options.properties[name]
      }

      if(this.options.addChild) {
        helper.container.addChild(this.container)
      }
    }
  }
}
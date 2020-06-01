export default (helper) => {
  return class FogLight {
    constructor (radius) {
      this.options = Object.assign({
        radius: 20,
        color: "FFFFFF"
      }, {
        radius
      })

      let light = new PIXI.Graphics()
      light.beginFill(Number("0x" + this.options.color), 1)
      light.drawCircle(0, 0, radius)
      light.endFill()
      light.filters = [new PIXI.filters.BlurFilter(5)]
      light.parentLayer = helper.view.layers.fog

      helper.container.addChild(light)
    }
  }
}
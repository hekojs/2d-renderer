import _ from 'lodash'

export default (helper) => {
  return class Sprite {
    constructor (texture, options) {
      this.texture = texture
      this.options = _.merge({
        center: true,
        shadow: {
          alpha: 1,
          blur: 1,
          distance: 4
        }
      }, options)

      this.container = new PIXI.Container()

      this._prepareSprite()
      if(this.options.shadow !== false)
        this._prepareShadow()

      helper.container.addChild(this.container)
    }

    _createSprite() {
      let sprite = new PIXI.Sprite(helper.texture(this.texture))
      if (this.options.center) {
        sprite.x -= sprite.width / 2
        sprite.y -= sprite.height / 2
      }
      return sprite
    }

    _prepareSprite () {
      this.sprite = this._createSprite()
      this.container.addChild(this.sprite)
    }

    _prepareShadow() {
      this.shadow = this._createSprite()
      this.shadow.filters = [
        new DropShadowFilter({
          shadowOnly: true,
          alpha: this.options.shadow.alpha,
          blur: this.options.shadow.blur,
          distance: this.options.shadow.distance
        })
      ]
      this.shadow.parentLayer = helper.view.layers.shadow
      this.container.addChild(this.shadow)
    }
  }
}
import _ from 'lodash'

export default (helper) => {
  return class SpriteAnimation {
    constructor (textures, options) {
      this.textures = textures
      this.options = _.merge({
        center: true,
        animation: {
          speed: 1 / 10,
          autoplay: false
        },
        shadow: {
          alpha: 1,
          blur: 1,
          distance: 4
        }
      }, options)

      this.container = new PIXI.Container()

      this._prepareSprite()
      if (this.options.shadow !== false)
        this._prepareShadow()

      if(this.options.animation.autoplay) {
        this.play()
      }

      helper.container.addChild(this.container)
    }

    gotoAndPlay (frameNumber) {
      this.sprite.gotoAndPlay(frameNumber)
      if(this.shadow) this.shadow.gotoAndPlay(frameNumber)
      return this
    }

    gotoAndStop (frameNumber) {
      this.sprite.gotoAndStop(frameNumber)
      if(this.shadow) this.shadow.gotoAndStop(frameNumber)
      return this
    }

    play () {
      this.sprite.play()
      if(this.shadow) this.shadow.play()
      return this
    }

    getCurrentFrame() {
      return this.sprite.currentFrame
    }

    stop () {
      this.sprite.stop()
      if(this.shadow) this.shadow.stop()
      return this
    }

    _createSprite () {
      let sprite = new PIXI.AnimatedSprite(helper.textures(this.textures))
      sprite.animationSpeed = this.options.animation.speed
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

    _prepareShadow () {
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
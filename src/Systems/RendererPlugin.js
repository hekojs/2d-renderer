import Heko from '@hekojs/core'

export default class RendererPlugin extends Heko.System {
  onAdd ({ renderer }) {
    this.renderer = renderer
  }

  onTick ({ delta, time }) {
    this.renderer.events.emit('before-tick')

    this.renderer.app.ticker.update()
    this.renderer.camera.onTick()

    this.renderer.events.emit('after-tick')
  }
}
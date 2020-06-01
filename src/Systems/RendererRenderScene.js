import Heko from '@hekojs/core'

export default class RendererRenderScene extends Heko.System {
  onAdd ({ renderer }) {
    this.renderer = renderer
  }

  onTick ({ delta, time }) {
    this.renderer.events.emit('before-tick')
    this.renderer.app.ticker.update()
    this.renderer.events.emit('after-tick')
  }
}
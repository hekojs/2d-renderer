import Graphics from './Graphics'
import Dummy from './Dummy'

export default class Creator {
  constructor (renderer) {
    this.renderer = renderer
    this.container = null

    this.Graphics = Graphics(this)
    this.Dummy = Dummy(this)
  }

  getTexture (path) {
    const temp = path.split(/\/(.+)/)
    if (typeof temp[1] !== 'undefined') {
      if(path in this.renderer.PIXI.Loader.shared.resources[temp[0]].textures) {
        return this.renderer.PIXI.Loader.shared.resources[temp[0]].textures[path]
      } else {
        return false
      }
    } else {
      return this.renderer.PIXI.Loader.shared.resources[temp[0]].textures
    }
  }

  getTextures (path) {
    let getNextTexture = (path, number) => {
      return this.getTexture(path.replace('01', number.toString().padStart(2, '0')))
    }

    let textures = []
    let number = 1
    while(getNextTexture(path, number) !== false) {
      textures.push(getNextTexture(path, number))
      number++
    }

    return textures
  }
}
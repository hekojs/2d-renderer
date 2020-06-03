import Plugin from './Plugin'
import Heko from '@hekojs/core'
import Palettes from './Palettes'
import Components from './Components'

Heko.registerComponents(Components)

export default {
  Components,
  Palettes,
  Plugin
}
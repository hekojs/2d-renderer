import Plugin from './Plugin'
import Heko from '@hekojs/core'
import Palettes from './Palettes'
import Components from './Components'
import Systems from './Systems'

Heko.registerComponents(Components)

export default {
  Components,
  Systems,
  Palettes: {
    Heko
  },
  Plugin
}
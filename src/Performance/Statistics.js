import { PIXIHooks } from 'gstats'
import Stats from 'stats.js'

export default class Statistics {
  constructor (renderer, options) {
    this.renderer = renderer
    this.options = Object.assign({
      target: document.body
    }, options)

    this._setup()
    this._setupStyle()
    this._setupEventListeners()
  }

  _setup () {
    this.hooks = new PIXIHooks(this.renderer.app)
    this.stats = new Stats
    this.stats.dom.id = 'renderer-statistics'
    this.engineStats = document.createElement("div")
    this.engineStats.style = 'position: fixed; top: 50px; left: 0px; cursor: pointer; opacity: 0.9; z-index: 10000;'
    this.engineStats.id = 'engine-statistics'

    this.panels = {}

    this.panels.draws = this.stats.addPanel(new Stats.Panel('Draw', '#ff0', '#220'))
    this.panels.textures = this.stats.addPanel(new Stats.Panel('Tex', '#ff0', '#220'))

    this.options.target.appendChild(this.stats.dom)
    this.options.target.appendChild(this.engineStats)
  }

  _setupStyle() {
    const panels = this.stats.dom.getElementsByTagName('canvas')
    for (let i = 0; i < panels.length; i++) {
      panels[i].style = 'width: 80px; height: 48px;'
    }
  }

  _setupEventListeners () {
    this.renderer.events.on('before-tick', () => this._begin())
    this.renderer.events.on('after-tick', () => this._update())
  }

  _begin () {
    this.stats.begin()
  }

  _update () {
    this.stats.end()

    this.panels.draws.update(this.hooks.deltaDrawCalls, Math.max(50, this.hooks.maxDeltaDrawCalls))
    this.panels.textures.update(this.hooks.texturesCount, Math.max(20, this.hooks.maxTextureCount))
  }
}
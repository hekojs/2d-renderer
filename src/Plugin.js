import Events from 'events'
import _ from 'lodash'
import * as PIXI from 'pixi.js'
import Statistics from './Modules/Statistics'
import Creator from './Visual/Creator'
import HekoPalette from './Palettes/Heko'
import RendererRenderScene from './Systems/RendererRenderScene'
import RendererDrawPhysicsShapes from './Systems/RendererDrawPhysicsShapes'

/*
 * The renderer plugin
 */
export default class Renderer {
  constructor (world, options) {
    this.world = world
    this.events = new Events
    this.palette = options && options.palette ? options.palette : HekoPalette
    this.visuals = new Creator(this)

    this.PIXI = window.PIXI = PIXI
    require('pixi-layers')
    require('pixi-tilemap')

    this.options = _.merge({
      resize: 'size',
      app: {
        antialias: true,
        width: 800,
        height: 600,
        resolution: 1,
        backgroundColor: Number('0x' + this.palette.background)
      },
      modules: {
        statistics: true,
        physicsDebugger: false
      },
      containers: [
        'scene',
        'ui'
      ],
      layers: [],
      target: document.body
    }, options)

    this.resolution = {
      x: this.options.app.width,
      y: this.options.app.height,
      absolute: {
        x: this.options.app.width,
        y: this.options.app.height,
        scale: this.options.app.resolution
      }
    }
  }

  onStart () {
    this.events.emit('starting')
    this._setupApplication()
    this._setupApplicationStage()
    this._setupApplicationResize()
    this._setupSystems()
    this._setupStatistics()
    this.events.emit('started')
  }

  getContainer (name) {
    return this.containers[name]
  }

  getLayer (name) {
    return this.layers[name]
  }

  _setupApplication () {
    this.app = new this.PIXI.Application(this.options.app)
    this.app.ticker.stop()

    this.options.target.appendChild(this.app.view)
  }

  _setupApplicationStage () {
    this.app.stage = new PIXI.display.Stage()

    this.containers = {}
    this.options.containers.forEach(name => {
      this.containers[name] = new this.PIXI.Container()
      this.app.stage.addChild(this.containers[name])
    })

    // Create debug container
    this.containers.debug = new this.PIXI.Container()
    this.app.stage.addChild(this.containers.debug)

    this.layers = {}
    this.options.layers.forEach(name => {
      this.layers[name] = new this.PIXI.display.Layer()
      this.app.stage.addChild(this.layers[name])
    })
  }

  _setupApplicationResize () {
    const resize = {
      scale: (width, height) => {
        const ratio = { x: width / this.resolution.x, y: height / this.resolution.y }

        this.resolution.absolute.scale = ratio.x > ratio.y ? ratio.y : ratio.x
        this.resolution.absolute.x = this.resolution.x * this.resolution.absolute.scale
        this.resolution.absolute.y = this.resolution.y * this.resolution.absolute.scale
        this.app.renderer.resolution = this.resolution.absolute.scale
        this.app.renderer.resize(width / this.resolution.absolute.scale, height / this.resolution.absolute.scale)
      },
      size: (width, height) => {
        this.resolution.absolute.x = this.resolution.x = width
        this.resolution.absolute.y = this.resolution.y = height
        this.app.renderer.resize(width, height)
      },
    }

    if (this.options.resize !== false) {
      window.addEventListener('resize', () => {
        if (this.options.target === document.body) { // If we linked directly the body, resize to document size
          resize[this.options.resize](window.innerWidth, window.innerHeight)
        } else { // If this is not the body, check the target size
          resize[this.options.resize](this.options.target.offsetWidth, this.options.target.offsetHeight)
        }

        this.events.emit('resize', { resolution: this.resolution })
      })
      window.dispatchEvent(new window.Event('resize'))
    }
  }

  _setupSystems () {
    this.world.systems.add(RendererRenderScene, { renderer: this })
    if(this.options.drawPhysicsShapes) {
      this.world.systems.add(RendererDrawPhysicsShapes, { renderer: this })
    }
  }

  _setupStatistics () {
    this.statistics = this.options.modules.statistics ? new Statistics(this, { target: this.options.target }) : null
  }
}
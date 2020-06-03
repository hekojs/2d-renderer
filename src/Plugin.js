import Events from 'events'
import _ from 'lodash'
import * as PIXI from 'pixi.js'
import Statistics from './Performance/Statistics'
import Creator from './Visual/Creator'
import HekoPalette from './Palettes/Heko'
import Camera from './Projection/Camera'
import RendererPlugin from './Systems/RendererPlugin'
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

    this.containers = {}
    this.layers = {}

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
      camera: null,
      target: document.body,
      stage: {
        scene: {
          type: 'container',
          options: {
            sortableChildren: true
          }
        },
        effects: {
          type: 'layer',
          fixed: true
        },
        ui: {
          type: 'container',
          fixed: true
        }
      },
      drawPhysicsShapes: false,
      statistics: false
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

    // Resolve target
    if(typeof this.options.target === 'string') {
      this.options.target = document.getElementById(options.target)
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

  onTick() {
    const transform = this.camera.getTransformation()
    this.app.stage.x = transform.x
    this.app.stage.y = transform.y
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
    // Setup the camera
    this.camera = this.options.camera ? this.options.camera : new Camera()
    this.camera.renderer = this

    this.app.stage = new PIXI.display.Stage()

    for(let name in this.options.stage) {
      const element = this.options.stage[name]

      if(element.type === 'container') {
        this.containers[name] = new this.PIXI.Container(element.options)
        this.containers[name].isFixed = !!element.fixed
        this.app.stage.addChild(this.containers[name])
      } else if (element.type === 'layer') {
        this.layers[name] = new this.PIXI.display.Layer(element.options)
        this.layers[name].isFixed = !!element.fixed
        this.app.stage.addChild(this.layers[name])
      }
    }

    // Create debug container
    this.containers.debug = new this.PIXI.Container()
    this.app.stage.addChild(this.containers.debug)
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
    this.world.systems.add(RendererPlugin, { renderer: this })
    if(this.options.drawPhysicsShapes) {
      this.world.systems.add(RendererDrawPhysicsShapes, { renderer: this })
    }
  }

  _setupStatistics () {
    this.statistics = this.options.statistics ? new Statistics(this, { target: this.options.target }) : null
  }
}
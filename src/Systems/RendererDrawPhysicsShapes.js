import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'

export default class RendererDrawPhysicsShapes extends Heko.System {
  static queries = {
    entities: { components: [HekoPhysics.Components.Physics] }
  }

  onAdd ({ renderer }) {
    this.physics = this.getWorld().plugins.get(HekoPhysics.Plugin)
    this.renderer = renderer
    this.graphics = {}

    this.getWorld().events.on('added.entity', (args) => this._createUpdateBody(args))
    this.getWorld().events.on('removed.entity', (args) => this._removeBody(args))
  }

  onTick ({ delta, time }) {
    this.queries.entities.results.forEach(entity => {
      if (entity.id in this.graphics) {
        const body = entity.getComponent(HekoPhysics.Components.Physics).body
        this.graphics[entity.id].x = body.position.x
        this.graphics[entity.id].y = body.position.y
        this.graphics[entity.id].rotation = body.angle
      }
    })
  }

  _createUpdateBody ({ entity }) {
    const physics = entity.getComponent(HekoPhysics.Plugin)
    if (physics && physics.body) {
      const body = physics.body
      if (!(entity.id in this.graphics)) {
        if (body.label === 'Rectangle Body' || body.label === 'Polygon Body') {
          this.graphics[entity.id] = this._createPolygon(body)
          this.renderer.containers.debug.addChild(this.graphics[entity.id])
        } else if (body.label === 'Body') {
          this.graphics[entity.id] = this._createPolygon(body)
          this.renderer.containers.debug.addChild(this.graphics[entity.id])
        } else if (body.label === 'Circle Body') {
          this.graphics[entity.id] = this._createCircle(body)
          this.renderer.containers.debug.addChild(this.graphics[entity.id])
        } else {
          console.warn('Unknown body label ' + body.label + ', debugger can only handle rectangle circle and vertices based shapes.')
        }
      }

      this.graphics[entity.id].x = physics.position.x
      this.graphics[entity.id].y = physics.position.y
      this.graphics[entity.id].rotation = physics.angle
    }
  }

  _createPolygon (body) {
    const graphics = new this.renderer.PIXI.Graphics()

    graphics.lineStyle(2, Number('0x' + this.renderer.palette.primary), 1)
    graphics.moveTo(body.vertices[0].x - body.position.x, body.vertices[0].y - body.position.y)
    body.vertices.forEach(vertice => {
      graphics.lineTo(vertice.x - body.position.x, vertice.y - body.position.y)
    })
    graphics.closePath()
    graphics.endFill()

    return graphics
  }

  _createCircle (body) {
    const graphics = new this.renderer.PIXI.Graphics()

    graphics.lineStyle(2, Number('0x' + this.renderer.palette.primary), 1)
    graphics.drawCircle(0, 0, body.circleRadius)
    graphics.moveTo(0, 0)
    graphics.lineStyle(2, Number('0x' + this.renderer.palette.secondary), 1)
    graphics.lineTo(0, body.circleRadius * -1)
    graphics.endFill()

    return graphics
  }

  _removeBody ({ entity }) {
    const physics = entity.getComponent(HekoPhysics.Plugin)
    if (physics) {
      if (entity.id in this.graphics) {
        this.renderer.containers.debug.removeChild(this.graphics[entity.id])
        delete this.graphics[entity.id]
      }
    }
  }
}
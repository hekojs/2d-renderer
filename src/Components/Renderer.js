import Heko from '@hekojs/core'
import Plugin from '../Plugin'

export default class Renderer extends Heko.Component {
  parent = 'scene'
  structure = [
    {
      name: 'container',
      sync: ['x', 'y', 'angle'],
      zIndexSyncY: false
    }
  ]

  attach () {
    this.renderer = this.entity.world.plugins.get(Plugin)
    this.PIXI = this.renderer.PIXI
    this.Create = this.renderer.visuals

    // Create containers
    this.containers = {}
    this.structure.forEach(struct => {
      this.containers[struct.name] = new this.PIXI.Container()
      this.containers[struct.name].visible = false
      this.containers[struct.name].initialized = false
      this.renderer.getContainer(this.parent).addChild(this.containers[struct.name])
    })

    // Listen for movement
    this.watch(this.entity.body, 'x', ({value}) => {
      this.structure.forEach(struct => {
        if(struct.sync.includes('x')) this.containers[struct.name].x = value
      })
    })
    this.watch(this.entity.body, 'y', ({value}) => {
      this.structure.forEach(struct => {
        if(struct.sync.includes('y')) this.containers[struct.name].y = value
      })
    })
  }

  update () {
    this.structure.forEach(struct => {
      // Sync positions of containers with the hasPosition ability
      if (this.entity.hasPosition) {
        struct.sync.forEach(sync => {
          this.containers[struct.name][sync] = this.entity.hasPosition[sync]
        })

        if ('zIndexSyncY' in struct && struct.zIndexSyncY === true) {
          this.containers[struct.name].zIndex = this.entity.hasPosition.y + this.containers[struct.name].height
        }
      }

      // First initialization code when first actualisation
      if (this.containers[struct.name].initialized === false) {
        this.containers[struct.name].initialized = true
        // Show the entity if set to be shown
        if (!('defaultVisible' in struct) || struct.defaultVisible === true) {
          this.containers[struct.name].visible = true
        }
      }
    })
  }

  detach () {
    this.structure.forEach(struct => {
      this.renderer.getContainer(this.parent).removeChild(this.containers[struct.name])
    })
  }
}
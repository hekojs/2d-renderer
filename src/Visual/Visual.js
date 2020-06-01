import _ from 'lodash'

export default {
  options(defaultOptions, options, alias) {
    if(alias && typeof options !== 'undefined' && typeof options !== 'object') {
      defaultOptions[alias] = options
    }

    return _.merge(defaultOptions, options)
  },

  prepare (target) {
    target.to = (entityRenderer, containerName) => {
      entityRenderer.containers[containerName].addChild(target)
    }

    return target
  },
}
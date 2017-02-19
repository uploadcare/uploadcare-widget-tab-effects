import initialState from './initial-state'
import effectsFromModifiers from './tools/effects-from-modifiers'

function createStore(settings, image) {
  const state = {
    settings: Object.assign({}, initialState.settings, settings),
    image: Object.assign({}, initialState.image, image),
    effects: Object.assign({}, initialState.effects, effectsFromModifiers(image.cdnUrlModifiers)),
  }

  function getState() {
    return state
  }

  return {getState}
}

export default createStore

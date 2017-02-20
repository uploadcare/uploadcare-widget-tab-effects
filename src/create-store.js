import initialState from './initial-state'
import effectsFromModifiers from './tools/effects-from-modifiers'
import getModifiersByEffects from './tools/get-modifiers-by-effects'

function createStore(settings, image) {
  let state = {
    settings: Object.assign({}, initialState.settings, settings),
    image: Object.assign({}, initialState.image, image),
    appliedEffects: Object.assign({}, initialState.appliedEffects, effectsFromModifiers(image.cdnUrlModifiers)),
  }
  let effectsListeners = []
  let imageListeners = []

  function subcribeToEffects(listener) {
    effectsListeners.push(listener)
  }

  function subscribeToImage(listener) {
    imageListeners.push(listener)
  }

  function getState() {
    return state
  }

  function setEffect(effect, value) {
    state.appliedEffects = Object.assign({}, state.appliedEffects, {[effect]: value})
    rebuildImage()
    effectsListeners.forEach(listener => listener())
  }

  function rebuildImage() {
    const {appliedEffects, image} = state
    const cdnUrlModifiers = getModifiersByEffects(appliedEffects)

    state.image = Object.assign({}, image,
      {
        cdnUrl: image.originalUrl + (cdnUrlModifiers || ''),
        cdnUrlModifiers,
      }
    )

    imageListeners.forEach(listener => listener())
  }

  return {
    subcribeToEffects,
    subscribeToImage,
    getState,
    setEffect,
  }
}

export default createStore

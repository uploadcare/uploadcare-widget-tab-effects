import initialState from './initial-state'
import effectsFromModifiers from './tools/effects-from-modifiers'
import getModifiersByEffects from './tools/get-modifiers-by-effects'

const createStore = (settings, image) => {
  let state = {
    settings: Object.assign({}, initialState.settings, settings),
    image: Object.assign({}, initialState.image, image),
    appliedEffects: Object.assign({}, initialState.appliedEffects, effectsFromModifiers(image.cdnUrlModifiers)),
  }
  let effectsListeners = []
  let effectListeners = {}
  let imageListeners = []

  const subcribeToEffects = (listener) => {
    effectsListeners.push(listener)
  }

  const subcribeToEffect = (effect, listener) => {
    if (!effectListeners[effect]) {
      effectListeners[effect] = []
    }

    effectListeners[effect].push(listener)
  }

  const subscribeToImage = (listener) => {
    imageListeners.push(listener)
  }

  const getState = () => {
    return state
  }

  const setEffect = (effect, value) => {
    state.appliedEffects = Object.assign({}, state.appliedEffects, {[effect]: value})
    rebuildImage()
    effectsListeners.forEach(listener => listener())

    if (effectListeners[effect]) {
      effectListeners[effect].forEach(listener => listener())
    }
  }

  const rebuildImage = () => {
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
    subcribeToEffect,
    subscribeToImage,
    getState,
    setEffect,
  }
}

export default createStore

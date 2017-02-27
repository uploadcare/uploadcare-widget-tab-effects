import initialState from './initial-state'
import getSettingsEffects from './tools/get-settings-effects'
import getAppliedEffects from './tools/get-applied-effects'
import getModifiersByEffects from './tools/get-modifiers-by-effects'

const createStore = (settings, image) => {
  const settingsEffects = getSettingsEffects(settings.effects)
  const appliedEffects = getAppliedEffects(image.cdnUrlModifiers, settingsEffects)

  let state = {
    settings: {
      ...settings,
      ...{effects: settingsEffects},
    },
    image: {
      ...initialState.image,
      ...image,
    },
    appliedEffects,
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

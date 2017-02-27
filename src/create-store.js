import initialState from './initial-state'
import getSettingsEffects from './tools/get-settings-effects'
import getAppliedEffects from './tools/get-applied-effects'
import getModifiersByEffects from './tools/get-modifiers-by-effects'
import effectsFromModifiers from './tools/effects-from-modifiers'

const createStore = (settings, image) => {
  const settingsEffects = getSettingsEffects(settings.effects)
  const appliedEffects = getAppliedEffects(settingsEffects)
  const appliedEffectsFromModifiers = effectsFromModifiers(image.cdnUrlModifiers, settingsEffects)

  let state = {
    settings: {
      ...settings,
      ...{effects: settingsEffects},
    },
    image: {
      ...initialState.image,
      ...image,
    },
    appliedEffects: {
      ...appliedEffects,
      ...appliedEffectsFromModifiers,
    },
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
    state.appliedEffects = {
      ...state.appliedEffects,
      ...{[effect]: value},
    }

    rebuildImage()

    effectsListeners.forEach(listener => listener())

    if (effectListeners[effect]) {
      effectListeners[effect].forEach(listener => listener())
    }
  }

  const rebuildImage = () => {
    const {appliedEffects, image} = state
    const cdnUrlModifiers = getModifiersByEffects(appliedEffects)

    state.image = {
      ...image,
      ...{
        cdnUrl: image.originalUrl + (cdnUrlModifiers || ''),
        cdnUrlModifiers,
      },
    }

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

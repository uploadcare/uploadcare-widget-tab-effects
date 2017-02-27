import initialState from '../initial-state'

const getSettingsEffects = (value) => {
  if (typeof value === 'string') {
    return value.replace(/\s/g, '').split(',')
  }

  if (Array.isArray(value)) {
    return value
  }

  return initialState.settings.effects
}

export default getSettingsEffects

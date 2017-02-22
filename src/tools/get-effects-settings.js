const getEffectsSettings = (value, initial = []) => {
  if (typeof value === 'string') {
    return value.replace(/\s/g, '').split(',')
  }

  if (Array.isArray(value)) {
    return value
  }

  return initial
}

export default getEffectsSettings

import getModifiersByCrop from './get-modifiers-by-crop'

const getModifiersByEffects = (effects, withCrop = true, withRFM = true) => {
  let cdnUrlModifiers = ''

  for (const effect in effects) {
    if (effects[effect]) {
      switch (typeof effects[effect]) {
        case 'boolean':
          if (!withRFM && !!~['flip', 'mirror'].indexOf(effect)) {
            break
          }
          cdnUrlModifiers += `-/${effect}/`
          break
        case 'number':
          if (!withRFM && effect === 'rotate') {
            break
          }
          cdnUrlModifiers += `-/${effect}/${effects[effect]}/`
          break
        case 'object':
          if (effect === 'crop' && withCrop) {
            const effectObject = effects[effect]
            const resizeModifiers = effectObject.resizeTo
              ? `-/resize/${effectObject.resizeTo.join('x')}/`
              : '-/preview/'

            cdnUrlModifiers += getModifiersByCrop(effectObject) + resizeModifiers
          }
          break
      }
    }
  }

  if (cdnUrlModifiers) {
    cdnUrlModifiers = effects['crop'] && withCrop ? cdnUrlModifiers : `-/preview/${cdnUrlModifiers}`
  }
  else {
    cdnUrlModifiers = ''
  }

  return cdnUrlModifiers
}

export default getModifiersByEffects

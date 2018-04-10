const effectsDefaults = {
  blur: ['number', 10],
  enhance: ['number', 50],
  flip: ['boolean'],
  grayscale: ['boolean'],
  invert: ['boolean'],
  mirror: ['boolean'],
  rotate: ['number'],
  sharp: ['number', 5],
}

const modifierRegExp = {
  blur: /-\/blur\/(([0-9]+)\/|)/i,
  crop: /-\/crop\/([0-9]+)x([0-9]+)(\/(center|([0-9]+),([0-9]+)))?\//i,
  enhance: /-\/enhance\/(([0-9]+)\/|)/i,
  flip: /-\/flip\//i,
  grayscale: /-\/grayscale\//i,
  invert: /-\/invert\//i,
  mirror: /-\/mirror\//i,
  rotate: /-\/rotate\/(([0-9]+)\/)/i,
  sharp: /-\/sharp\/(([0-9]+)\/|)/i,
}

function effectsFromModifiers(cdnUrlModifiers, settingsEffects) {
  if (!cdnUrlModifiers) {
    return {
      effects: {},
      otherModifiers: '',
    }
  }

  let effects = {}
  let otherModifiers = cdnUrlModifiers.replace(/-\/preview\//g, '')

  settingsEffects.forEach(settingsEffect => {
    if (modifierRegExp[settingsEffect]) {
      const foundModifier = cdnUrlModifiers.match(modifierRegExp[settingsEffect])

      if (foundModifier) {
        let effectValue

        if (settingsEffect === 'crop') {
          effectValue = {
            coords: {
              width: parseInt(foundModifier[1]),
              height: parseInt(foundModifier[2]),
              center: foundModifier[4] === 'center',
              left: foundModifier[5] === undefined ? undefined : parseInt(foundModifier[5]),
              top: foundModifier[6] === undefined ? undefined : parseInt(foundModifier[6]),
            },
          }
        }
        else {
          if (effectsDefaults[settingsEffect][0] === 'boolean') {
            effectValue = true
          }
          if (effectsDefaults[settingsEffect][0] === 'number') {
            effectValue = (foundModifier[2] === undefined)
              ? effectsDefaults[settingsEffect][1]
              : parseInt(foundModifier[2])
          }
        }

        effects[settingsEffect] = effectValue
        otherModifiers = otherModifiers.replace(foundModifier[0], '')
      }
    }
  })

  return {
    effects,
    otherModifiers,
  }
}

export default effectsFromModifiers

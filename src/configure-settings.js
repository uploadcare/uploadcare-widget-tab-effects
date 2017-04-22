import {getSettingsCrop, getSettingsEffects} from 'tools'

const configureSettings = (settings) => {
  const effects = getSettingsEffects(settings.effects)
  const crop = getSettingsCrop(settings.crop, effects)

  return {
    ...settings,
    ...{crop},
    ...{effects},
  }
}

export default configureSettings

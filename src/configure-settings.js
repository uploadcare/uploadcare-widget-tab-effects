import getSettingsEffects from './tools/get-settings-effects'
import getSettingsCrop from './tools/get-settings-crop'

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

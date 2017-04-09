import getSettingsEffects from './tools/get-settings-effects'

const configureSettings = (initialSettings, settings) => {
  const effects = getSettingsEffects(initialSettings.effects)

  return {
    ...settings,
    ...{effects},
  }
}

export default configureSettings

import customExtends from './tools/custom-extends'
import LocaleBuilder from './tools/localeBuilder'
import createStore from './create-store'
import configureSettings from './configure-settings'
import initialState from './initial-state'
import getAppliedEffects from './tools/get-applied-effects'
import effectsFromModifiers from './tools/effects-from-modifiers'
import Tab from './components/Tab/Tab'

function createPreviewTabEffects(PreviewTab, uc) {
  customExtends(PreviewTabEffects, PreviewTab)

  function PreviewTabEffects(container, button, dialogApi, settings, name) {
    PreviewTabEffects.__super__.constructor.call(this, container, button, dialogApi, settings, name)
  }

  PreviewTabEffects.prototype.__setState = function(state, data) {
    if (state === 'image') {
      if (data.info) {
        const image = data.info
        const localeBuilder = new LocaleBuilder()
        const settings = configureSettings(this.settings)
        const appliedEffects = getAppliedEffects(settings.effects)
        const appliedEffectsFromModifiers = effectsFromModifiers(image.cdnUrlModifiers, settings.effects)
        const store = createStore({
          ...initialState,
          ...{image},
          ...{
            appliedEffects: {
              ...appliedEffects,
              ...appliedEffectsFromModifiers.effects,
            },
          },
          ...{otherModifiers: appliedEffectsFromModifiers.otherModifiers},
        })

        localeBuilder.build(uc.locale.translations)
        uc.locale.rebuild()

        const tab = new Tab({
          uc,
          store,
          settings,
          onDone: () => {
            const newFile = this.file.then((info) => {
              const state = store.getState()
              const {cdnUrl, cdnUrlModifiers} = state.image

              return {
                ...info,
                ...{
                  cdnUrl,
                  cdnUrlModifiers,
                },
              }
            })

            this.dialogApi.fileColl.replace(this.file, newFile)
          },
          onFail: () => {
            this.file = null
            this.__setState('error', {error: 'loadImage'})
          },
        })

        const container = this.container[0]

        container.innerHTML = ''
        Array.prototype.slice.call((tab.getElement()).children)
          .forEach(child => container.appendChild(child))

        store.setImageLoad('start')
      }
    }
    else {
      PreviewTabEffects.__super__.__setState.call(this, state, data)
    }
  }

  PreviewTabEffects.prototype.initImage = function() {}

  return PreviewTabEffects
}

export default createPreviewTabEffects

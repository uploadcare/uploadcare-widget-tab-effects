import customExtends from './tools/custom-extends'
import LocaleBuilder from './tools/localeBuilder'
import createStore from './create-store'
import startPreviewTabEffects from './start-preview-tab-effects'

function createPreviewTabEffects(PreviewTab, uc) {
  customExtends(PreviewTabEffects, PreviewTab)

  function PreviewTabEffects(container, button, dialogApi, settings, name) {
    PreviewTabEffects.__super__.constructor.call(this, container, button, dialogApi, settings, name)
  }

  PreviewTabEffects.prototype.__setState = function(state, data) {
    if (state === 'image') {
      if (data.info) {
        const localeBuilder = new LocaleBuilder()
        const store = createStore(this.settings, data.info)

        localeBuilder.build(uc.locale.translations)
        uc.locale.rebuild()

        startPreviewTabEffects({
          uc,
          container: this.container[0],
          store,
          onDone: () => {
            const newFile = this.file.then((info) => {
              const state = store.getState()
              const {cdnUrl, cdnUrlModifiers} = state.image

              return Object.assign({}, info, {
                cdnUrl,
                cdnUrlModifiers,
              })
            })

            this.dialogApi.fileColl.replace(this.file, newFile)
          },
          onFail: () => {
            this.file = null
            this.__setState('error', {error: 'loadImage'})
          },
        })
      }
    }
    else {
      PreviewTabEffects.__super__.__setState.call(this, state, data)
    }
  }

  PreviewTabEffects.prototype.initImage = function() {
  }

  return PreviewTabEffects
}

export default createPreviewTabEffects

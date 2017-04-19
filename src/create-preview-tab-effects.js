import customExtends from './tools/custom-extends'
import LocaleBuilder from './tools/localeBuilder'
import configureSettings from './configure-settings'
import configureStore from './configure-store'
import {Tab} from 'components'

function createPreviewTabEffects(PreviewTab, uc) {
  customExtends(PreviewTabEffects, PreviewTab)

  function PreviewTabEffects(container, button, dialogApi, settings, name) {
    PreviewTabEffects.__super__.constructor.call(this, container, button, dialogApi, settings, name)
  }

  PreviewTabEffects.prototype.__setState = function(state, data) {
    if (state === 'image') {
      if (data.info) {
        const localeBuilder = new LocaleBuilder()
        const settings = configureSettings(this.settings)
        const store = configureStore(data.info, settings)
        const onDone = () => {
          const newFile = this.file.then((info) => {
            const {cdnUrl, cdnUrlModifiers} = store.getState().image

            return {
              ...info,
              ...{
                cdnUrl,
                cdnUrlModifiers,
              },
            }
          })

          this.dialogApi.fileColl.replace(this.file, newFile)
        }
        const onFail = () => {
          this.file = null
          this.__setState('error', {error: 'loadImage'})
        }

        localeBuilder.build(uc.locale.translations)
        uc.locale.rebuild()

        const tab = new Tab({
          uc,
          store,
          settings,
          onDone,
          onFail,
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

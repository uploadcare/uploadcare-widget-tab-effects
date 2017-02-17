import customExtends from './tools/custom-extends'
import LocaleBuilder from './tools/localeBuilder'
import EffectsModel from './models/effectsModel'
import PreviewView from './views/previewView'

function createPreviewTabEffects(PreviewTab, uc) {
  customExtends(PreviewTabEffects, PreviewTab)

  function PreviewTabEffects(container, button, dialogApi, settings, name) {
    PreviewTabEffects.__super__.constructor.call(this, container, button, dialogApi, settings, name)
  }

  PreviewTabEffects.prototype.__setState = function(state, data) {
    if (state === 'image') {
      if (data.info) {
        const localeBuilder = new LocaleBuilder()

        localeBuilder.build(uc.locale.translations)
        uc.locale.rebuild()

        const model = new EffectsModel(
          'ucarecdn.com/',
          data.info.originalImageInfo.width,
          data.info.originalImageInfo.height,
          data.info.crop,
          uc.locale)

        model.parseUrl(data.info.cdnUrl)

        const previewView = new PreviewView(this.container, model, uc, this.settings)

        previewView
          .render()
          .done(() => {
            const newFile = this.file.then((info) => {
              info.cdnUrlModifiers = model.getModifiers() + model.getPreviewModifiers()
              info.cdnUrl = model.getPreviewUrl()
              info.crop = model.coords

              return info
            })

            this.dialogApi.fileColl.replace(this.file, newFile)
          })
          .fail(() => {
            this.file = null
            this.__setState('error', {error: 'loadImage'})
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

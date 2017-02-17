import PreviewView from './views/previewView'
import EffectsModel from './models/effectsModel'
import LocaleBuilder from './tools/localeBuilder'

function uploadcareTabEffects(container, button, dialogApi, settings) {
  if (typeof uploadcare === 'undefined') {
    throw new ReferenceError('uploadcare is not defined')
  }

  uploadcare.plugin(function(uc) {
    if (settings.multiple) {
      return new uc.widget.tabs.PreviewTabMultiple(container, button, dialogApi, settings, name)
    }

    const PreviewTab = uc.widget.tabs.PreviewTab

    const customExtends = (child, parent) => {
      for (const key in parent) {
        if (Object.prototype.hasOwnProperty.call(parent, key)) {
          child[key] = parent[key]
        }
      }

      function Ctor() {
        this.constructor = child
      }

      Ctor.prototype = parent.prototype
      child.prototype = new Ctor()
      child.__super__ = parent.prototype

      return child
    }

    const EffectsPreviewTab = (function() {
      customExtends(EffectsPreviewTab, PreviewTab)

      function EffectsPreviewTab(container, button, dialogApi, settings, name) {
        EffectsPreviewTab.__super__.constructor.call(this, container, button, dialogApi, settings, name)
      }

      EffectsPreviewTab.prototype.__setState = function(state, data) {
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

            const previewView = new PreviewView(container, model, uc, settings)

            previewView
              .render()
              .done(() => {
                const newFile = this.file.then((info) => {
                  info.cdnUrlModifiers = model.getModifiers() + model.getPreviewModifiers()
                  info.cdnUrl = model.getPreviewUrl()
                  info.crop = model.coords

                  return info
                })

                dialogApi.fileColl.replace(this.file, newFile)
              })
              .fail(() => {
                this.file = null
                this.__setState('error', {error: 'loadImage'})
              })
          }
        }
        else {
          EffectsPreviewTab.__super__.__setState.call(this, state, data)
        }
      }

      EffectsPreviewTab.prototype.initImage = function() {}

      return EffectsPreviewTab
    })()

    return new EffectsPreviewTab(container, button, dialogApi, settings, name)
  })
}

module.exports = uploadcareTabEffects

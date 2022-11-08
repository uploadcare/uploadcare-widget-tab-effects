import createPreviewTabEffects from './create-preview-tab-effects'

// Last argument is an `uploadcare` instance.
// It's passed to the custom tab from react-widget
// See https://github.com/uploadcare/react-widget/blob/master/src/hooks/use-custom-tabs.js#L9
// eslint-disable-next-line max-params
function uploadcareTabEffects(container, button, dialogApi, settings, name, uploadcare) {
  uploadcare.plugin(function(uc) {
    if (settings.multiple) {
      return new uc.widget.tabs.PreviewTabMultiple(container, button, dialogApi, settings, name)
    }

    const PreviewTabEffects = createPreviewTabEffects(uc.widget.tabs.PreviewTab, uc)

    return new PreviewTabEffects(container, button, dialogApi, settings, name)
  })
}

export default uploadcareTabEffects

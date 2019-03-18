const autoCrop = (store, settings, uc) => {
  const {crop: cropSettings, multiple} = settings
  const {image} = store.getState()

  // auto-crop only in single file mode
  if (!cropSettings || !multiple) {
    return
  }

  // if even one of crop option sets allow free crop,
  // we don't need to crop automatically
  if (cropSettings.some(c => !c.preferedSize)) {
    return
  }

  if (!image.isImage || image.cdnUrlModifiers || image.crop) {
    return
  }

  const info = image.originalImageInfo
  const size = uc.utils.fitSize(
    settings.crop[0].preferedSize,
    [info.width, info.height],
    true
  )

  const crop = {
    originalSize: [info.width, info.height],
    coords: {
      left: Math.round((info.width - size[0]) / 2),
      top: Math.round((info.height - size[1]) / 2),
      width: size[0],
      height: size[1],
    },
  }

  store.setAppliedEffect({crop})
  store.rebuildImage()
}

export default autoCrop

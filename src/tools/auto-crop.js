const getFinalSize = (crop, info) => {
  const downscale = crop.downscale && (info.width > crop.preferedSize[0] || info.height > crop.preferedSize[1])
  const upscale = crop.upscale && (info.width < crop.preferedSize[0] || info.height < crop.preferedSize[1])

  if (downscale || upscale) {
    return crop.preferedSize
  }
  else {
    return null
  }
}

const autoCrop = (store, settings, uc) => {
  const {crop} = settings
  const {image} = store.getState()

  if (!crop) {
    return
  }

  // if even one of crop option sets allow free crop,
  // we don't need to crop automatically
  if (crop.some(c => !c.preferedSize)) {
    return
  }

  if (!image.isImage || image.cdnUrlModifiers || image.crop) {
    return
  }

  const info = image.originalImageInfo
  const size = uc.utils.fitSize(crop[0].preferedSize, [info.width, info.height], true)

  const cropEffect = {
    originalSize: [info.width, info.height],
    resizeTo: getFinalSize(crop[0], info),
    coords: {
      left: Math.round((info.width - size[0]) / 2),
      top: Math.round((info.height - size[1]) / 2),
      width: size[0],
      height: size[1],
    },
  }

  store.setAppliedEffect({crop: cropEffect})
  store.rebuildImage()
}

export default autoCrop

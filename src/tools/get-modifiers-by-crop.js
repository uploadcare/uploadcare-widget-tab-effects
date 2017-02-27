const getModifiersByCrop = (crop) => {
  const size = crop.originalSize
  const {width, height, center, left, top} = crop.coords
  // const prefered = this.crop.preferedSize
  let modifiers = ''

  if (size) {
    const wholeImage = width === size[0] && height === size[1]

    if (!wholeImage) {
      modifiers += `-/crop/${width}x${height}/${left},${top}/`
    }
  }
  else {
    modifiers += `-/crop/${width}x${height}/`

    if (center) {
      modifiers += 'center/'
    }
    else if ((left !== undefined) && (top !== undefined)) {
      modifiers += `${left},${top}/`
    }
  }

  // const downscale = this.crop.downscale && (width > prefered[0] || height > prefered[1])
  // const upscale = this.crop.upscale && (width < prefered[0] || height < prefered[1])
  //
  // if (downscale || upscale) {
  //   // modifiers += `-/resize/${prefered.join('x')}/`
  // }

  return modifiers
}

export default getModifiersByCrop

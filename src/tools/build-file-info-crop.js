const buildFileInfoCrop = ({originalSize, coords, resizeTo}) => {
  const cropInfo = {
    width: originalSize[0],
    height: originalSize[1],
    left: coords.left,
    top: coords.top,
  }

  if (resizeTo) {
    cropInfo.sw = resizeTo[0]
    cropInfo.sh = resizeTo[1]
  }

  return cropInfo
}

export default buildFileInfoCrop

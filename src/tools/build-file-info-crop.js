const buildFileInfoCrop = ({coords, resizeTo}) => {
  const cropInfo = {
    width: coords.width,
    height: coords.height,
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

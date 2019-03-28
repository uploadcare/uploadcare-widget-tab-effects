const buildFileInfoCrop = ({originalSize, coords}) => ({
  width: originalSize[0],
  height: originalSize[1],
  left: coords.left,
  top: coords.top,
  sh: coords.height,
  sw: coords.width,
})

export default buildFileInfoCrop

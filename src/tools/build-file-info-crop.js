const buildFileInfoCrop = ({originalSize, coords, resizeTo}) => ({
  width: originalSize[0],
  height: originalSize[1],
  left: coords.left,
  top: coords.top,
  sw: resizeTo ? resizeTo[0] : coords.width,
  sh: resizeTo ? resizeTo[1] : coords.height,
})

export default buildFileInfoCrop

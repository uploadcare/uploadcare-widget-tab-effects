import blur from '../images/blur.svg'
import crop from '../images/crop.svg'
import enhance from '../images/enhance.svg'
import flip from '../images/flip.svg'
import grayscale from '../images/grayscale.svg'
import invert from '../images/invert.svg'
import mirror from '../images/mirror.svg'
import rotate from '../images/rotate.svg'
import sharp from '../images/sharp.svg'

const icons = {
  blur,
  crop,
  enhance,
  flip,
  grayscale,
  invert,
  mirror,
  rotate,
  sharp,
}

const getIcon = (name) => (icons[name]) ? icons[name] : ''

export default getIcon

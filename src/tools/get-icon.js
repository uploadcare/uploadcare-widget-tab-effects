import grayscale from '../images/grayscale.svg'
import enhance from '../images/enhance.svg'

const icons = {
  grayscale,
  enhance,
}

const getIcon = (name) => (icons[name]) ? icons[name] : ''

export default getIcon

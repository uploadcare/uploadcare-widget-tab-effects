import createNode from '../../tools/create-node'
import cn from './Icon.pcss'
import blur from '../../images/blur.svg'
import crop from '../../images/crop.svg'
import enhance from '../../images/enhance.svg'
import flip from '../../images/flip.svg'
import grayscale from '../../images/grayscale.svg'
import mirror from '../../images/mirror.svg'
import rotate from '../../images/rotate.svg'
import sharp from '../../images/sharp.svg'

const icons = {
  blur,
  crop,
  enhance,
  flip,
  grayscale,
  mirror,
  rotate,
  sharp,
}

const Icon = (name) => {
  if (!icons[name]) {
    throw new Error(`Icon with name "${name}" doesn't exist.`)
  }

  let $element

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    $element = createNode(icons[name])

    $element.classList.add(cn['icon'])
  }

  return {getElement}
}

export default Icon

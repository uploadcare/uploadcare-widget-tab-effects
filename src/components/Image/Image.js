import createNode from '../../tools/create-node'
import cn from './Image.pcss'
import template from './Image.html'

const Image = (props) => {
  let element
  let img

  const getElement = () => {
    if (!element) {
      render()
    }

    return element
  }

  const render = () => {
    const {imageUrl, onLoad, onFail} = props

    element = createNode(template({
      cn,
      imageUrl,
    }))

    img = element.querySelector(`.${cn.image}`)

    img.addEventListener('load', () => onLoad())
    img.addEventListener('error', () => onFail())
    img.addEventListener('abort', () => onFail())
  }

  return {getElement}
}

export default Image

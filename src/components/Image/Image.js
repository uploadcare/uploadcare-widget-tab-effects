import {createNode} from 'tools'
import cn from './Image.pcss'
import template from './Image.html'

const Image = (props) => {
  let $element
  let $img
  const {
    imageUrl,
    onUpdate,
    onLoad,
    onFail,
  } = props

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const getImg = () => $img

  const render = () => {
    $element = createNode(template({
      cn,
      imageUrl,
    }))

    $img = $element.querySelector(`.${cn.image}`)

    $img.addEventListener('load', () => onLoad())
    $img.addEventListener('error', () => onFail())
    $img.addEventListener('abort', () => onFail())
  }

  const updateImageUrl = (imageUrl) => {
    $img.src = imageUrl

    onUpdate()
  }

  return {
    getElement,
    getImg,
    updateImageUrl,
  }
}

export default Image

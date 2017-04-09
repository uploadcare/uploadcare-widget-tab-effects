import createNode from '../../tools/create-node'
import cn from './Image.pcss'
import template from './Image.html'

const Image = (props) => {
  let $element
  let $img
  let {imageUrl} = props
  const {
    onLoad,
    onFail,
  } = props

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

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

  const updateImageUrl = (newImageUrl) => {
    imageUrl = newImageUrl

    $img.src = imageUrl
  }

  return {
    getElement,
    updateImageUrl,
  }
}

export default Image

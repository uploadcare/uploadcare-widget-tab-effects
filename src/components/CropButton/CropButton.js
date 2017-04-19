import createNode from '../../tools/create-node'
import cn from './CropButton.pcss'
import template from './CropButton.html'

const APPLIED_CLASS_NAME = 'uploadcare--crop-sizes__item_current'
const ICON_FREE_CLASS_NAME = 'uploadcare--crop-sizes__icon_free'

const CropButton = (props) => {
  let $element
  const {
    size,
    title,
    onClick,
  } = props
  let state = {applied: props.applied || false}

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    $element = createNode(template({
      title,
      cn,
    }))

    setupIcon()

    if (state.applied) {
      $element.classList.add(APPLIED_CLASS_NAME)
    }

    $element.addEventListener('click', handleClick)
  }

  const setupIcon = () => {
    let $icon = $element.querySelector(`.${cn['crop-button__icon']}`)
    const {width, height} = size

    if (width && height) {
      $icon.style.width = width
      $icon.style.height = height
    }
    else {
      $icon.classList.add(ICON_FREE_CLASS_NAME)
    }
  }

  const handleClick = () => {
    if (!onClick) return

    onClick()
  }

  const toggleApplied = (applied) => {
    if (!$element || (state.applied === applied)) return

    state.applied = applied

    $element.classList[(applied) ? 'add' : 'remove'](APPLIED_CLASS_NAME)
  }

  return {
    getElement,
    toggleApplied,
  }
}

export default CropButton

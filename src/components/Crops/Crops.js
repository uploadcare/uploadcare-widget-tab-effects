import createNode from '../../tools/create-node'
import cn from './Crops.pcss'
import template from './Crops.html'
import {CropButton} from 'components'

const Crops = (props) => {
  let $element
  let buttons = []
  const {
    crops,
    onCropClick,
  } = props
  let state = {currentCrop: props.currentCrop || 0}

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    $element = createNode(template({cn}))

    crops.forEach(crop => {
      const {index, size, title} = crop

      buttons[index] = new CropButton({
        size,
        title,
        applied: state.currentCrop === index,
        onClick: () => {
          if (state.currentCrop === index) return

          updateApplied(index)
          onCropClick(crop)
        },
      })
    })

    buttons.forEach(button => $element.appendChild(button.getElement()))
  }

  const updateApplied = (currentCrop) => {
    if (!buttons) return

    state.currentCrop = currentCrop

    buttons.forEach((button, index) => button.toggleApplied((index === currentCrop)))
  }

  return {
    getElement,
    updateApplied,
  }
}

export default Crops

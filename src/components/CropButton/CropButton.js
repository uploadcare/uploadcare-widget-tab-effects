import createNode from '../../tools/create-node'
import cn from './CropButton.pcss'
import template from './CropButton.html'

const CropButton = (props) => {
  let $element

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const {uc, onClick} = props
    const size = getSizeInfo()

    $element = createNode(template({
      title: size ? size.description : uc.locale.t('dialog.tabs.preview.crop.free'),
      cn,
    }))

    const $icon = $element.querySelector(`.${cn['crop-button__icon']}`)

    if (size) {
      $icon.style.width = size.width
      $icon.style.height = size.height
    }
    else {
      $icon.classList.add('uploadcare--crop-sizes__icon_free')
    }

    $element.addEventListener('click', () => onClick($element))
  }

  const getSizeInfo = () => {
    const {uc, crop} = props
    const {preferedSize} = crop

    let description
    let width
    let height

    if (preferedSize) {
      const gcd = uc.utils.gcd(preferedSize[0], preferedSize[1])
      const size = uc.utils.fitSize(preferedSize, [30, 30], true)

      description = `${preferedSize[0] / gcd}:${preferedSize[1] / gcd}`
      width = `${Math.max(20, size[0])}px`
      height = `${Math.max(12, size[1])}px`

      return {
        description,
        width,
        height,
      }
    }

    return null
  }

  return {getElement}
}

export default CropButton

import classnames from './CropButton.pcss'
import template from './CropButton.html'

class CropButton {
  constructor(props) {
    this.props = props
    this.cn = classnames
    this.template = template
  }

  render() {
    const {template, cn} = this
    const {uc, crop, onClick} = this.props
    const prefered = crop.preferedSize
    let title

    if (prefered) {
      const gcd = uc.utils.gcd(prefered[0], prefered[1])

      title = `${prefered[0] / gcd}:${prefered[1] / gcd}`
    }
    else {
      title = uc.locale.t('dialog.tabs.preview.crop.free')
    }

    const container = document.createElement('div')

    container.innerHTML = template({
      title,
      cn,
    })

    const element = container.querySelector(`.${cn['crop-button']}`)
    const icon = element.querySelector(`.${cn['crop-button__icon']}`)

    if (prefered) {
      const size = uc.utils.fitSize(prefered, [30, 30], true)

      icon.style.width = `${Math.max(20, size[0])}px`
      icon.style.height = `${Math.max(12, size[1])}px`
    }
    else {
      icon.classList.add('uploadcare--crop-sizes__icon_free')
    }

    element.addEventListener('click', () => onClick())

    return element
  }
}

export default CropButton

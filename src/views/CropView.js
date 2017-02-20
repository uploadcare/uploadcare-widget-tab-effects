import BaseView from '../tools/BaseView/BaseView'
import CropButton from '../components/CropButton/CropButton'
import classnames from './CropView.pcss'
import template from './CropView.html'
import getModifiersByEffects from '../tools/get-modifiers-by-effects'

class CropView extends BaseView {
  constructor(props) {
    super(props)

    const {store} = props
    const state = store.getState()

    this.cn = Object.assign({}, this.cn, classnames)
    this.template = template
    this.cropWidget = null
    this.currentCrop = state.settings.crop[0]
    this.imageUrl = state.image.originalUrl + (getModifiersByEffects(state.appliedEffects, false) || '')
  }

  templateDidMount() {
    const {cn} = this
    const {uc, store, container, onDone, onCancel} = this.props
    const state = store.getState()
    const done = container.querySelector(`.${cn.done}`)
    const cancel = container.querySelector(`.${cn.cancel}`)
    const cropButtons = container.querySelector(`.${cn['crop-buttons']}`)

    state.settings.crop.forEach(crop => {
      const cropButton = new CropButton({
        uc,
        crop,
        onClick: (element) => {
          [].slice.call(cropButtons.children)
            .forEach(child => child.classList.remove('uploadcare--crop-sizes__item_current'))

          this.cropWidget.setCrop(crop)

          element.classList.add('uploadcare--crop-sizes__item_current')
        },
      })

      cropButtons.appendChild(cropButton.getElement())
    })

    done.addEventListener('click', () => {
      const {crop, originalSize} = this.cropWidget

      store.setEffect('crop', Object.assign({}, crop, {
        originalSize,
        coords: this.cropWidget.getSelection(),
      }))
      onDone()
    })
    cancel.addEventListener('click', () => {
      store.setEffect('crop', null)
      onCancel()
    })
  }

  imageDidLoad() {
    super.imageDidLoad()

    if (!this.cropWidget) {
      const {image, currentCrop, cn} = this
      const {store, uc, container} = this.props
      const state = store.getState()
      const {rotate} = state.appliedEffects
      const {width, height} = state.image.originalImageInfo

      const size = rotate && !!~[90, 270].indexOf(rotate)
        ? [height, width]
        : [width, height]

      this.cropWidget = new uc.crop.CropWidget(uc.jQuery(image), size, currentCrop)

      const cropButtons = container.querySelector(`.${cn['crop-buttons']}`)

      cropButtons.children[0].classList.add('uploadcare--crop-sizes__item_current')
    }
  }
}

export default CropView
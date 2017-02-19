import BaseView from '../tools/BaseView/BaseView'
import classnames from './CropView.pcss'
import template from './CropView.html'

class CropView extends BaseView {
  constructor(props) {
    super(props)

    this.cn = Object.assign({}, this.cn, classnames)
    this.template = template
  }

  templateDidMount() {
    const {cn} = this
    const {store, container, onDone, onCancel} = this.props
    const done = container.querySelector(`.${cn.done}`)
    const cancel = container.querySelector(`.${cn.cancel}`)

    done.addEventListener('click', () => onDone())
    cancel.addEventListener('click', () => {
      store.setEffect('crop', {})
      onCancel()
    })
  }
}

export default CropView

import classnames from './BaseView.pcss'
import template from './BaseView.html'

class BaseView {
  constructor(props) {
    this.props = props
    this.title = props.title || this.props.uc.locale.t('dialog.tabs.names.preview')
    this.cn = classnames
    this.template = template
    this.data = {}
    this.image = null
    this.imageUrl = props.store.getState().image.cdnUrl
  }

  render() {
    if (typeof this.template !== 'function') {
      return
    }

    const {title, template, cn, data, imageUrl} = this
    const {uc, container, store} = this.props
    const state = store.getState()

    container.innerHTML = template({
      title,
      cn,
      t: uc.locale.t,
      state,
      data,
      imageUrl: imageUrl + '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/',
    })

    this.templateDidMount()
    this.imageWillLoad()

    this.image = container.querySelector(`.${cn.image}`)

    if (this.image) {
      store.subscribeToImage(() => this.updateImageUrl())

      if (this.image.complete) {
        this.imageDidLoad()
      }

      this.image.addEventListener('load', () => this.imageDidLoad())
      this.image.addEventListener('error', () => this.imageDidFail())
      this.image.addEventListener('abort', () => this.imageDidFail())
    }
    else {
      this.imageDidLoad()
    }
  }

  templateDidMount() {
  }

  updateImageUrl() {
    const state = this.props.store.getState()

    this.imageWillLoad()
    this.imageUrl = state.image.cdnUrl
    this.image.src = this.imageUrl + '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/'
  }

  imageWillLoad() {
    const {cn} = this
    const {container} = this.props
    const done = container.querySelector(`.${cn.done}`)

    container.classList.remove('uploadcare--preview_status_loaded')
    done.setAttribute('aria-disabled', true)
  }

  imageDidLoad() {
    const {cn} = this
    const {container} = this.props
    const done = container.querySelector(`.${cn.done}`)

    container.classList.add('uploadcare--preview_status_loaded')
    done.setAttribute('aria-disabled', false)
  }

  imageDidFail() {
    if (this.props.onFail) {
      this.props.onFail()
    }
  }
}

export default BaseView

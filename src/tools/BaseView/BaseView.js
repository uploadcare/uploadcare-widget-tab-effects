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
  }

  render() {
    if (typeof this.template !== 'function') {
      return
    }

    const {title, template, cn, data} = this
    const {uc, container, store} = this.props
    const state = store.getState()

    container.innerHTML = template({
      title,
      cn,
      t: uc.locale.t,
      state,
      data,
    })

    this.templateDidMount()
    this.imageWillLoad()

    this.image = container.querySelector(`.${cn.image}`)

    if (this.image) {
      store.subscribeToImage(() => {
        const state = store.getState()

        this.imageWillLoad()
        this.image.src = state.image.cdnUrl
      })

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

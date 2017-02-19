import classnames from './BaseView.pcss'
import template from './BaseView.html'

class BaseView {
  constructor(props) {
    this.props = props
    this.title = this.props.uc.locale.t('dialog.tabs.names.preview')
    this.cn = classnames
    this.template = template
  }

  render() {
    if (typeof this.template !== 'function') {
      return
    }

    const {title, template, cn} = this
    const {uc, container, store} = this.props
    const state = store.getState()

    container.innerHTML = template({
      title,
      cn,
      t: uc.locale.t,
      state,
    })
  }
}

export default BaseView

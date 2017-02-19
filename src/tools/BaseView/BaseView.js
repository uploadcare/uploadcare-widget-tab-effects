import classnames from './BaseView.pcss'

class BaseView {
  constructor(props) {
    this.props = props
    this.cn = classnames
  }

  render() {
    if (typeof this.template !== 'function') {
      return
    }

    const {template, cn} = this
    const {uc, container, store} = this.props
    const state = store.getState()

    container.innerHTML = template({
      cn,
      t: uc.locale.t,
      state,
    })
  }
}

export default BaseView

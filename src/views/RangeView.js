import BaseView from '../tools/BaseView/BaseView'

class RangeView extends BaseView {
  constructor(props) {
    super(props)
  }

  templateDidMount() {
    const {cn} = this
    const {container, onCancel} = this.props
    // const state = store.getState()
    const cancel = container.querySelector(`.${cn.cancel}`)

    cancel.addEventListener('click', () => onCancel())
    // const additions = container.querySelector(`.${cn.additions}`)
    //
    // additions.appendChild(effectButtons)
  }
}

export default RangeView

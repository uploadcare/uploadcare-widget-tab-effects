import BaseView from '../tools/BaseView/BaseView'
import classnames from './RangeView.pcss'
import template from './RangeView.html'

const ranges = {
  enhance: [0, 100],
  sharp: [0, 20],
  blur: [0, 5000],
}

class RangeView extends BaseView {
  constructor(props) {
    const {effect, store} = props
    const state = store.getState()

    super(props)

    this.data = {
      value: state.appliedEffects[effect],
      min: ranges[effect][0] || 0,
      max: ranges[effect][1] || 100,
    }
    this.cn = {
      ...this.cn,
      ...classnames,
    }
    this.template = template
  }

  templateDidMount() {
    const {cn} = this
    const {store, effect, container, onDone, onCancel} = this.props
    const done = container.querySelector(`.${cn.done}`)
    const cancel = container.querySelector(`.${cn.cancel}`)
    const range = container.querySelector(`.${cn['range__input']}`)

    range.addEventListener('change', (e) => store.setEffect(effect, parseInt(e.target.value)))

    done.addEventListener('click', () => onDone())
    cancel.addEventListener('click', () => {
      store.setEffect(effect, 0)
      onCancel()
    })
  }
}

export default RangeView

import classnames from './EffectButton.pcss'
import template from './EffectButton.html'

class EffectButton {
  constructor(props) {
    this.props = props
    this.cn = classnames
    this.template = template
  }

  render() {
    const {template, cn} = this
    const {title} = this.props
    const element = document.createElement('div')

    element.className = cn['effect-button']
    element.setAttribute('role', 'button')
    element.innerHTML = template({
      title,
      cn,
    })

    return element
  }
}

export default EffectButton

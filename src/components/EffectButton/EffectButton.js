import classnames from './EffectButton.pcss'
import template from './EffectButton.html'

class EffectButton {
  constructor(props) {
    this.props = props
    this.cn = classnames
    this.template = template
    this.element = null
  }

  render() {
    const {template, cn} = this
    const {title, applied, onClick} = this.props

    this.element = document.createElement('div')

    this.element.className = cn['effect-button']
    if (applied) {
      this.element.classList.add(cn['effect-button_applied'])
    }
    this.element.setAttribute('role', 'button')
    this.element.innerHTML = template({
      title,
      cn,
    })
    this.element.addEventListener('click', () => onClick())

    return this.element
  }

  setApplied(applied) {
    const {cn} = this

    this.props.applied = applied

    if (this.element) {
      if (applied) {
        this.element.classList.add(cn['effect-button_applied'])
      }
      else {
        this.element.classList.remove(cn['effect-button_applied'])
      }
    }
  }
}

export default EffectButton

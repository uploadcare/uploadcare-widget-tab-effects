import cn from './EffectButton.pcss'
import template from './EffectButton.html'

const EffectButton = (props) => {
  let element = null
  const {title, applied, onClick} = props

  element = document.createElement('div')

  element.className = cn['effect-button']
  if (applied) {
    element.classList.add(cn['effect-button_applied'])
  }
  element.setAttribute('role', 'button')
  element.innerHTML = template({
    title,
    cn,
  })
  element.addEventListener('click', () => onClick())

  const getElement = () => element

  const setApplied = (newApplied) => {
    if (element) {
      if (newApplied) {
        element.classList.add(cn['effect-button_applied'])
      }
      else {
        element.classList.remove(cn['effect-button_applied'])
      }
    }
  }

  return {
    getElement,
    setApplied,
  }
}

export default EffectButton

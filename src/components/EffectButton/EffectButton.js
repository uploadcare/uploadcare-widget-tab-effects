import cn from './EffectButton.pcss'
import template from './EffectButton.html'

const EffectButton = (props) => {
  const {title, applied, onClick} = props

  const elementContainer = document.createElement('div')

  elementContainer.innerHTML = template({
    title,
    cn,
  })

  const element = elementContainer.querySelector(`.${cn['effect-button']}`)

  if (applied) {
    element.classList.add(cn['effect-button_applied'])
  }
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

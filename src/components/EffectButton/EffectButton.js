import createNode from '../../tools/create-node'
import cn from './EffectButton.pcss'
import template from './EffectButton.html'
import Icon from '../Icon/Icon'

const EffectButton = (props) => {
  let $element

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const {effect, title, applied} = props
    const icon = new Icon(effect)

    $element = createNode(template({
      title,
      cn,
    }))

    $element.appendChild(icon.getElement())

    if (applied) {
      $element.classList.add(cn['effect-button_applied'])
    }

    $element.addEventListener('click', handleClick)
  }

  const handleClick = (e) => {
    if (e.target.getAttribute('aria-disabled') === 'true') return

    const {onClick} = props

    if (onClick) onClick()
  }

  const toggleApplied = (newApplied) => {
    if ($element) {
      if (newApplied) {
        $element.classList.add(cn['effect-button_applied'])
      }
      else {
        $element.classList.remove(cn['effect-button_applied'])
      }
    }
  }

  return {
    getElement,
    toggleApplied,
  }
}

export default EffectButton

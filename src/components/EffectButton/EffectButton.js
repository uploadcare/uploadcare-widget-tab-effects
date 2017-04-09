import createNode from '../../tools/create-node'
import cn from './EffectButton.pcss'
import template from './EffectButton.html'
import Icon from '../Icon/Icon'

const EffectButton = (props) => {
  let $element
  let {
    applied = false,
    disabled = false,
  } = props
  const {
    effect,
    title,
    onClick,
  } = props

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const getEffect = () => effect

  const render = () => {
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

  const handleClick = () => {
    if (disabled || !onClick) return

    onClick()
  }

  const toggleApplied = (newApplied) => {
    if (!$element || (applied === newApplied)) return

    applied = newApplied

    if (applied) {
      $element.classList.add(cn['effect-button_applied'])
    }
    else {
      $element.classList.remove(cn['effect-button_applied'])
    }
  }

  const toggleDisabled = (newDisabled) => {
    if (!$element || (disabled === newDisabled)) return

    disabled = newDisabled

    $element.setAttribute('aria-disabled', disabled)
  }

  return {
    getElement,
    getEffect,
    toggleApplied,
    toggleDisabled,
  }
}

export default EffectButton

import createNode from '../../tools/create-node'
import cn from './Effects.pcss'
import template from './Effects.html'
import EffectButton from '../EffectButton/EffectButton'

const Effects = (props) => {
  let $element
  let buttons = []

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const {effects, titles, appliedEffects, onEffectClick} = props

    $element = createNode(template({cn}))

    effects.forEach(effect => {
      buttons.push(new EffectButton({
        effect,
        title: titles[effect],
        applied: !!appliedEffects[effect],
        onClick: () => onEffectClick(effect),
      }))
    })

    buttons.forEach(button => $element.appendChild(button.getElement()))
  }

  const toggleDisabled = (isDisabled) => {
    if (!buttons) return

    buttons.forEach(button => button.toggleDisabled(isDisabled))
  }

  const updateApplied = (appliedEffects) => {
    if (!buttons) return

    buttons.forEach(button => button.toggleApplied(!!appliedEffects[button.getEffect()]))
  }

  return {
    getElement,
    toggleDisabled,
    updateApplied,
  }
}

export default Effects

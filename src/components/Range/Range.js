import createNode from '../../tools/create-node'
import cn from './Range.pcss'
import template from './Range.html'

const Range = (props) => {
  let $element

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const {onChange, min, max, step, value} = props

    $element = createNode(template({
      cn,
      min: min || 0,
      max: max || 100,
      step: step || 1,
      value: value || 0,
    }))

    $element.addEventListener('change', (e) => onChange(e.target.value))
  }

  return {getElement}
}

export default Range

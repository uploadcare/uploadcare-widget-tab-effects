import createNode from '../../tools/create-node'
import cn from './Footer.pcss'
import template from './Footer.html'

const Footer = (props) => {
  let $element
  let $additionsElement
  let $doneElement
  let $cancelElement

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const {locale, children, onDone, onCancel} = props

    $element = createNode(template({
      cn,
      locale,
    }))

    $additionsElement = $element.querySelector(`.${cn.additions}`)
    $doneElement = $element.querySelector(`.${cn.done}`)
    $cancelElement = $element.querySelector(`.${cn.cancel}`)

    if (children) {
      $additionsElement.appendChild(children)
    }

    $doneElement.addEventListener('click', () => onDone($doneElement))
    $cancelElement.addEventListener('click', () => onCancel($cancelElement))
  }

  const appendChild = (child) => {
    if (!$element) return

    $additionsElement.appendChild(child)
  }

  const toggleDisabled = (isDisabled) => {
    if (!$doneElement) return

    $doneElement.setAttribute('aria-disabled', isDisabled)
  }

  return {
    getElement,
    appendChild,
    toggleDisabled,
  }
}

export default Footer

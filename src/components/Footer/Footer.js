import createNode from '../../tools/create-node'
import cn from './Footer.pcss'
import template from './Footer.html'

const Footer = (props) => {
  let $element
  let $additionsElement
  let $doneElement
  let $cancelElement
  const {
    locale,
    onDone,
    onCancel,
  } = props

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    $element = createNode(template({
      cn,
      locale,
    }))

    $additionsElement = $element.querySelector(`.${cn.additions}`)
    $doneElement = $element.querySelector(`.${cn.done}`)
    $cancelElement = $element.querySelector(`.${cn.cancel}`)

    $doneElement.addEventListener('click', onDone)
    $cancelElement.addEventListener('click', onCancel)
  }

  const empty = () => {
    if (!$element) return

    $additionsElement.innerHTML = ''
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
    empty,
    appendChild,
    toggleDisabled,
  }
}

export default Footer

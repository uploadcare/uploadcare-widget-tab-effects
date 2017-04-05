import createNode from '../../tools/create-node'
import cn from './Header.pcss'
import template from './Header.html'

const Header = (props) => {
  let element
  let titleElement

  const getElement = () => {
    if (!element) {
      render()
    }

    return element
  }

  const render = () => {
    const {title} = props

    element = createNode(template({
      title,
      cn,
    }))

    titleElement = element.querySelector(`.${cn.title}`)
  }

  const updateTitle = (newTitle) => {
    if (!titleElement) return

    titleElement.innerText = newTitle
  }

  return {
    getElement,
    updateTitle,
  }
}

export default Header

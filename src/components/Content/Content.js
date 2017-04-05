import createNode from '../../tools/create-node'
import template from './Content.html'

const Content = (props) => {
  let element

  const getElement = () => {
    if (!element) {
      render()
    }

    return element
  }

  const render = () => {
    const {children} = props

    element = createNode(template())

    element.appendChild(children)
  }

  return {getElement}
}

export default Content

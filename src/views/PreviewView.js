import BaseView from '../tools/BaseView/BaseView'
import classnames from './PreviewView.pcss'
import template from './PreviewView.html'

class PreviewView extends BaseView {
  constructor(props) {
    super(props)

    this.cn = Object.assign({}, this.cn, classnames)
    this.template = template
  }
}

export default PreviewView

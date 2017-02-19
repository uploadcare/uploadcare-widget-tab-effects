import BaseView from '../tools/BaseView/BaseView'
import classnames from './PreviewView.pcss'

class PreviewView extends BaseView {
  constructor(props) {
    super(props)

    this.cn = Object.assign({}, this.cn, classnames)
  }
}

export default PreviewView

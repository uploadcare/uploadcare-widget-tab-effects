import BaseView from '../tools/BaseView/BaseView'
import classnames from './PreviewView.pcss'
import EffectButton from '../components/EffectButton/EffectButton'

class PreviewView extends BaseView {
  constructor(props) {
    super(props)

    this.cn = Object.assign({}, this.cn, classnames)
  }

  templateDidMount() {
    const {cn} = this
    const {store, container, onDone, onEffectClick} = this.props
    const state = store.getState()
    const effects = state.settings.effects
    const done = container.querySelector(`.${cn.done}`)
    const additions = container.querySelector(`.${cn.additions}`)
    const effectButtons = document.createElement('div')

    done.addEventListener('click', () => onDone())

    effectButtons.className = cn['effect-buttons']

    effects.forEach(effect => {
      const effectButton = new EffectButton({
        title: effect,
        onClick: () => onEffectClick(effect),
      })

      effectButtons.appendChild(effectButton.render())
    })

    additions.appendChild(effectButtons)
  }
}

export default PreviewView

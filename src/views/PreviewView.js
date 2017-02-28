import BaseView from '../tools/BaseView/BaseView'
import classnames from './PreviewView.pcss'
import EffectButton from '../components/EffectButton/EffectButton'

class PreviewView extends BaseView {
  constructor(props) {
    super(props)

    this.cn = {
      ...this.cn,
      ...classnames,
    }
  }

  templateDidMount() {
    const {cn} = this
    const {uc, store, container, onDone, onEffectClick} = this.props
    const state = store.getState()
    const effects = state.settings.effects
    const done = container.querySelector(`.${cn.done}`)
    const additions = container.querySelector(`.${cn.additions}`)
    const effectButtons = document.createElement('div')

    done.addEventListener('click', () => onDone())

    effectButtons.className = cn['effect-buttons']

    effects.forEach(effect => {
      const effectButton = new EffectButton({
        effect,
        title: uc.locale.t(`dialog.tabs.effects.captions.${effect}`),
        applied: !!state.appliedEffects[effect],
        onClick: () => onEffectClick(effect),
      })

      store.subcribeToEffect(effect, () => {
        const newState = store.getState()

        effectButton.setApplied(newState.appliedEffects[effect])
      })

      effectButtons.appendChild(effectButton.getElement())
    })

    additions.appendChild(effectButtons)
  }

  imageWillLoad() {
    super.imageWillLoad()

    const {cn} = this
    const {container} = this.props

    const effectButtons = container.querySelector(`.${cn['effect-buttons']}`)

    if (effectButtons) {
      Array.prototype.slice.call(effectButtons.children)
        .forEach(child => child.setAttribute('aria-disabled', true))
    }
  }

  imageDidLoad() {
    super.imageDidLoad()

    const {cn} = this
    const {container} = this.props

    const effectButtons = container.querySelector(`.${cn['effect-buttons']}`)

    if (effectButtons) {
      Array.prototype.slice.call(effectButtons.children)
        .forEach(child => child.setAttribute('aria-disabled', false))
    }
  }
}

export default PreviewView

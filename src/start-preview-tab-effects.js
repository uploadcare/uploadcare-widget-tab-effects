import PreviewView from './views/PreviewView'
import getNextRotateValue from './tools/get-next-rotate-value'

const startPreviewTabEffects = ({
  uc,
  container,
  store,
  onDone,
  onFail,
}) => {
  const onEffectClick = (effect) => {
    const {appliedEffects} = store.getState()

    if (typeof appliedEffects[effect] === 'boolean') {
      store.setEffect(effect, !appliedEffects[effect])

      return
    }

    if (effect === 'rotate') {
      const currentRotateValue = appliedEffects.rotate

      store.setEffect('rotate', getNextRotateValue(currentRotateValue))
    }
  }
  const preview = new PreviewView({
    uc,
    container,
    store,
    onDone,
    onFail,
    onEffectClick,
  })

  preview.render()
}

export default startPreviewTabEffects

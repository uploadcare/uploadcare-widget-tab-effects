import PreviewView from './views/PreviewView'
import RangeView from './views/RangeView'
import CropView from './views/CropView'
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

      return
    }

    if (typeof appliedEffects[effect] === 'number') {
      const rangeView = new RangeView({
        title: uc.locale.t(`dialog.tabs.effects.captions.${effect}`),
        effect: effect,
        uc,
        container,
        store,
        onFail,
        onDone: () => preview.render(),
        onCancel: () => preview.render(),
      })

      rangeView.render()

      return
    }

    if (effect === 'crop') {
      const cropView = new CropView({
        title: uc.locale.t('dialog.tabs.effects.captions.crop'),
        uc,
        container,
        store,
        onFail,
        onDone: () => preview.render(),
        onCancel: () => preview.render(),
      })

      cropView.render()
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

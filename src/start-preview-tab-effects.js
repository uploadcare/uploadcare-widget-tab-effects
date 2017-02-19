import PreviewView from './views/PreviewView'

const startPreviewTabEffects = ({
  uc,
  container,
  store,
  onDone,
  onFail,
}) => {
  console.log('The Effects Tab', store.getState())

  const onEffectClick = (effect) => {
    const {appliedEffects} = store.getState()

    if (typeof appliedEffects[effect] === 'boolean') {
      store.setEffect(effect, !appliedEffects[effect])
    }
  }
  const preview = new PreviewView({
    uc,
    container,
    store,
    onFail,
    onEffectClick,
  })

  preview.render()
}

export default startPreviewTabEffects

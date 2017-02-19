import PreviewView from './views/PreviewView'

const startPreviewTabEffects = ({
  uc,
  container,
  store,
  onDone,
  onFail,
}) => {
  console.log('The Effects Tab', store.getState())

  const preview = new PreviewView({
    uc,
    container,
    store,
    onFail,
  })

  preview.render()
}

export default startPreviewTabEffects

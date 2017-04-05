import Header from './components/Header/Header'
import Image from './components/Image/Image'
import Content from './components/Content/Content'
import Footer from './components/Footer/Footer'

const startPreviewTabEffects = ({
  uc,
  container,
  store,
  onDone,
  onFail,
}) => {
  const state = store.getState()

  container.innerHTML = ''

  const header = new Header({title: uc.locale.t('dialog.tabs.names.preview')})
  const image = new Image({
    imageUrl: state.image.cdnUrl + '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/',
    onLoad: () => console.log('load'),
    onFail: () => console.log('fail'),
  })
  const content = new Content({children: image.getElement()})
  const footer = new Footer({
    locale: {
      done: uc.locale.t('dialog.tabs.preview.done'),
      cancel: uc.locale.t('dialog.tabs.preview.image.change'),
    },
    onDone: () => onDone,
    onCancel: () => console.log('cancel'),
  })

  container.appendChild(header.getElement())
  container.appendChild(content.getElement())
  container.appendChild(footer.getElement())
}

export default startPreviewTabEffects

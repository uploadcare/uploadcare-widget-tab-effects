import createNode from '../../tools/create-node'
import template from './Tab.html'
import Header from '../Header/Header'
import Image from '../Image/Image'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'
import Effects from '../Effects/Effects'
import getLocaleTitle from '../../tools/get-locale-title'
import getNextRotateValue from '../../tools/get-next-rotate-value'
import Range from '../Range/Range'

const ranges = {
  enhance: [0, 100],
  sharp: [0, 20],
  blur: [0, 100, 5],
}

const Tab = (props) => {
  let $element
  let header
  let content
  let footer
  let image
  let effects
  const {
    uc,
    store,
    settings,
    onDone,
    onFail,
  } = props
  const t = uc.locale.t

  const getElement = () => {
    if (!$element) {
      render()
    }

    return $element
  }

  const render = () => {
    const state = store.getState()

    $element = createNode(template())

    header = new Header({title: getLocaleTitle(t, state.view)})

    footer = new Footer({
      locale: {
        done: t('dialog.tabs.preview.done'),
        cancel: t('dialog.tabs.preview.image.change'),
      },
      onDone: (e) => {
        const state = store.getState()
        const {view} = state

        if (view === 'preview') {
          onDone()
        }
        else {
          e.stopPropagation()

          store.setView('preview')
        }
      },
      onCancel: (e) => {
        const state = store.getState()
        const {view} = state

        if (view !== 'preview') {
          e.stopPropagation()

          store.setAppliedEffect({[view]: 0})
          store.setView('preview')
        }
      },
    })

    content = new Content()

    image = new Image({
      imageUrl: state.image.cdnUrl + '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/',
      onLoad: () => store.setImageLoad('load'),
      onFail: () => store.setImageLoad('fail'),
    })

    $element.appendChild(header.getElement())
    $element.appendChild(content.getElement())
    $element.appendChild(footer.getElement())

    content.appendChild(image.getElement())

    let effectsTitles = {}

    settings.effects.forEach(effect => {
      effectsTitles[effect] = getLocaleTitle(t, effect)
    })

    effects = new Effects({
      effects: settings.effects,
      titles: effectsTitles,
      appliedEffects: state.appliedEffects,
      onEffectClick: (effect) => {
        const state = store.getState()
        const {appliedEffects} = state

        if (effect === 'rotate') {
          store.setAppliedEffect({'rotate': getNextRotateValue(appliedEffects.rotate)})

          return
        }

        if (typeof appliedEffects[effect] === 'boolean') {
          store.setAppliedEffect({[effect]: !appliedEffects[effect]})

          return
        }

        if (typeof appliedEffects[effect] === 'number') {
          store.setView(effect)
        }
      },
    })

    const $effects = effects.getElement()

    footer.appendChild($effects)

    store.subscribeToAppliedEffects(() => {
      store.rebuildImage()

      const state = store.getState()

      effects.updateApplied(state.appliedEffects)
    })

    store.subscribeToView(() => {
      const state = store.getState()
      const {view, appliedEffects} = state

      header.updateTitle(getLocaleTitle(t, view))

      footer.empty()

      if (view === 'preview') {
        footer.appendChild($effects)
      }
      else {
        let value = appliedEffects[view]

        if (value === 0) {
          value = ranges[view][1] / 2

          store.setAppliedEffect({[view]: value})
        }

        const range = new Range({
          min: ranges[view][0],
          max: ranges[view][1],
          step: ranges[view][2],
          value,
          onChange: (value) => store.setAppliedEffect({[view]: parseInt(value)}),
        })

        footer.appendChild(range.getElement())
      }
    })

    store.subscribeToImage(() => {
      const state = store.getState()
      const imageUrl = state.image.cdnUrl + '-/preview/1162x693/-/setfill/ffffff/-/format/jpeg/-/progressive/yes/'

      image.updateImageUrl(imageUrl)

      store.setImageLoad('start')
    })

    store.subscribeToImageLoad(() => {
      const state = store.getState()
      const {view, imageLoad} = state

      switch (imageLoad) {
        case 'start':
          footer.toggleDisabled(true)

          if (view === 'preview') {
            effects.toggleDisabled(true)
          }
          break
        case 'load':
          footer.toggleDisabled(false)

          if (view === 'preview') {
            effects.toggleDisabled(false)
          }
          break
        case 'fail':
          onFail()
          break
      }
    })
  }

  return {getElement}
}

export default Tab

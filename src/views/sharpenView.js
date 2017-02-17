'use strict'

import sharpenTemplate from '../templates/sharpen.html'
import Slider from '../components/slider.js'
import IdGenerator from '../tools/IdGenerator.js'

import '../styles/slider.pcss'

export default class SharpenView {
  constructor(container, effectsModel, uc) {
    this.container = container
    this.model = effectsModel
    this.$ = uc.jQuery
    this.slider = new Slider(null, 20)
    this.slider.onChange(newVal => this.onChangeSlider(newVal))

    this.SLIDER_ID = 'slider_' + IdGenerator.Generate()
    this.PREVIEW_IMG_ID = 'preview_mage_' + IdGenerator.Generate()
    this.SHARPEN_APPLY_BTN_ID = 'sharpenApplyBtn' + +IdGenerator.Generate()
    this.SHARPEN_CANCEL_BTN_ID = 'sharpenCancelBtn' + +IdGenerator.Generate()
  }

  render(parentEl = this.container) {
    if (!this.viewDeferred || this.viewDeferred.state() === 'resolved') {
      this.viewDeferred = this.$.Deferred()
    }
    this.container = parentEl

    const renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: this.SLIDER_ID,
      previewImageId: this.PREVIEW_IMG_ID,
      sharpenApplyBtn: this.SHARPEN_APPLY_BTN_ID,
      sharpenCancelBtn: this.SHARPEN_CANCEL_BTN_ID,
      locale: this.model.locale,
    }

    const markupStr = sharpenTemplate(renderData)

    parentEl.html(markupStr)

    const sliderContainer = this.$(parentEl).find('.' + this.SLIDER_ID)

    this.slider.render(sliderContainer, this.model.sharp)

    this.setupHandlers(parentEl)

    return this.viewDeferred.promise()
  }

  setupHandlers(parentEl) {
    this.$(parentEl).find('.' + this.SHARPEN_CANCEL_BTN_ID)
      .click(ev => this.sharpenCancelClick(ev))
    this.$(parentEl).find('.' + this.SHARPEN_APPLY_BTN_ID)
      .click(ev => this.sharpenApplyClick(ev))
  }

  sharpenCancelClick() {
    this.model.sharp = undefined
    this.viewDeferred.resolve({reason: 'Cancel'})
  }

  sharpenApplyClick() {
    this.viewDeferred.resolve({reason: 'Apply'})
  }

  onChangeSlider(newVal) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(() => {
      this.model.sharp = newVal
      this.container.find('.' + this.PREVIEW_IMG_ID).attr('src', this.model.getPreviewUrl(800, 382))
    }, 300)
  }
}

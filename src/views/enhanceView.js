'use strict';

import enhanceTemplate from '../templates/enhance.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/slider.pcss';

export default class EnhanceView {
  constructor(container, effectsModel, uc) {
    this.container = container;
    this.model = effectsModel;
    this.$ = uc.jQuery;

    this.slider = new Slider();

    this.slider.onChange(newVal => {
      return this.onChangeSlider(newVal);
    });

    this.SLIDER_ID = "slider_" + IdGenerator.Generate();
    this.PREVIEW_IMG_ID = "preview_mage_" + IdGenerator.Generate();

    this.ENHANCE_APPLY_BTN_ID = "enhanceApplyBtn_" + IdGenerator.Generate();
    this.ENHANCE_CANCEL_BTN_ID = "enhanceCancelBtn_" + IdGenerator.Generate();

  }

  render(parentEl = this.container) {

    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = this.$.Deferred();
    }
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: this.SLIDER_ID,
      previewImageId: this.PREVIEW_IMG_ID,
      enhanceApplyBtn: this.ENHANCE_APPLY_BTN_ID,
      enhanceCancelBtn: this.ENHANCE_CANCEL_BTN_ID,
      locale: this.model.locale
    };
    let markupStr = enhanceTemplate(renderData);
    parentEl.html(markupStr);

    const sliderContainer = this.$(parentEl).find("." + this.SLIDER_ID);
    this.slider.render(sliderContainer, this.model.enhance);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    this.$(parentEl).find('.' + this.ENHANCE_CANCEL_BTN_ID ).click( ev => { return this.enhanceCancelClick(ev); });
    this.$(parentEl).find('.' + this.ENHANCE_APPLY_BTN_ID).click(ev => { return this.enhanceApplyClick(ev); });

  }

  enhanceCancelClick(ev) {
    this.model.enhance = undefined;
    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  enhanceApplyClick(ev) {
    this.viewDeferred.resolve({
      reason: "Apply"
    });
  }

  onChangeSlider(newVal) {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(()=> {
      this.model.enhance = newVal;
      this.container.find("." + this.PREVIEW_IMG_ID).attr("src", this.model.getPreviewUrl(800, 382));
    }, 300);
  }
}

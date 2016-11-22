'use strict';

import ejs from '../../node_modules/ejs/ejs';
import sharpenTemplate from '../templates/sharpen.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/slider.pcss';

let $ = uploadcare.jQuery;

export default class SharpenView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    this.slider = new Slider(null, 20);
    this.slider.onChange(newVal => {
      return this.onChangeSlider(newVal);
    });

    this.SLIDER_ID = "slider_" + IdGenerator.Generate();
    this.PREVIEW_IMG_ID = "preview_mage_" + IdGenerator.Generate();
    this.SHARPEN_APPLY_BTN_ID = "sharpenApplyBtn" + + IdGenerator.Generate();
    this.SHARPEN_CANCEL_BTN_ID = "sharpenCancelBtn" + + IdGenerator.Generate();
  }

  render(parentEl = this.container) {

    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = $.Deferred();
    }
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: this.SLIDER_ID,
      previewImageId: this.PREVIEW_IMG_ID,
      sharpenApplyBtn: this.SHARPEN_APPLY_BTN_ID,
      sharpenCancelBtn: this.SHARPEN_CANCEL_BTN_ID,
      locale: this.model.locale
    };

    let markupStr = ejs.render(sharpenTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("." + this.SLIDER_ID);
    this.slider.render(sliderContainer, this.model.sharp);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('.' + this.SHARPEN_CANCEL_BTN_ID).click(ev => { return this.sharpenCancelClick(ev); });
    $(parentEl).find('.' + this.SHARPEN_APPLY_BTN_ID).click(ev => { return this.sharpenApplyClick(ev); });
  }

  sharpenCancelClick(ev) {
    this.model.sharp = undefined;
    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  sharpenApplyClick(ev) {
    this.viewDeferred.resolve({
      reason: "Apply"
    });
  }

  onChangeSlider(newVal) {

    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(()=> {
      this.model.sharp = newVal;
      this.container.find("." + this.PREVIEW_IMG_ID).attr("src", this.model.getPreviewUrl(800, 382));
    }, 300);
  }
}

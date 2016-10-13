'use strict';

import ejs from '../../node_modules/ejs/ejs';
import sharpenTemplate from '../templates/sharpen.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

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

  }

  render(parentEl = this.container) {
    this.viewDeferred = $.Deferred();
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: this.SLIDER_ID,
      previewImageId: this.PREVIEW_IMG_ID
    };

    let markupStr = ejs.render(sharpenTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("#" + this.SLIDER_ID);
    this.slider.render(sliderContainer, this.model.sharp);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('#sharpenCancelBtn').click(ev => { return this.sharpenCancelClick(ev); });
    $(parentEl).find('#sharpenApplyBtn').click(ev => { return this.sharpenApplyClick(ev); });
    $(parentEl).find('#sharpenCancelMobBtn').click(ev => { return this.sharpenCancelClick(ev); });
    $(parentEl).find('#sharpenApplyMobBtn').click(ev => { return this.sharpenApplyClick(ev); });
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
      this.container.find("#" + this.PREVIEW_IMG_ID).attr("src", this.model.getPreviewUrl(800, 382));
    }, 300);
  }
}
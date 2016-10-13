'use strict';

import ejs from '../../node_modules/ejs/ejs';
import enhanceTemplate from '../templates/enhance.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

let $ = uploadcare.jQuery;

export default class EnhanceView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    
    this.slider = new Slider();
    
    this.slider.onChange(newVal => {
      return this.onChangeSlider(newVal);
    });

    this.SLIDER_ID = "slider_" + IdGenerator.Generate();
    this.PREVIEW_IMG_ID = "preview_mage_" + IdGenerator.Generate();
  }

  render(parentEl = this.container) {
    this.viewDeferred = $.Deferred();
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: this.SLIDER_ID,
      previewImageId: this.PREVIEW_IMG_ID
    };
    let markupStr = ejs.render(enhanceTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("#" + this.SLIDER_ID);
    this.slider.render(sliderContainer, this.model.enhance);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('#enhanceCancelBtn').click( ev => { return this.enhanceCancelClick(ev); });
    $(parentEl).find('#enhanceApplyBtn').click(ev => { return this.enhanceApplyClick(ev); });
    $(parentEl).find('#enhanceCancelMobBtn').click( ev => { return this.enhanceCancelClick(ev); });
    $(parentEl).find('#enhanceApplyMobBtn').click(ev => { return this.enhanceApplyClick(ev); });

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
      this.container.find("#" + this.PREVIEW_IMG_ID).attr("src", this.model.getPreviewUrl(800, 382));
    }, 300);
  }
}
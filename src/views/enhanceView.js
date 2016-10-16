'use strict';

import ejs from '../../node_modules/ejs/ejs';
import enhanceTemplate from '../templates/enhance.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

import buttonStyles from '../styles/buttons.scss';
import imageStyles from '../styles/images.scss';
import layoutStyles from '../styles/viewContainer.scss';
import sliderStyles from '../styles/slider.scss';

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

    this.ENHANCE_APPLY_BTN_ID = "enhanceApplyBtn_" + IdGenerator.Generate();
    this.ENHANCE_CANCEL_BTN_ID = "enhanceCancelBtn_" + IdGenerator.Generate();

    this.ENHANCE_APPLY_MOB_BTN_ID = "enhanceApplyMobBtn_" + IdGenerator.Generate();
    this.ENHANCE_CANCEL_MOB_BTN_ID = "enhanceCancelMobBtn_" + IdGenerator.Generate();
    
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
      enhanceApplyBtn: this.ENHANCE_APPLY_BTN_ID,
      enhanceCancelBtn: this.ENHANCE_CANCEL_BTN_ID,
      enhanceApplyMobBtn: this.ENHANCE_APPLY_MOB_BTN_ID,
      enhanceCancelMobBtn: this.ENHANCE_CANCEL_MOB_BTN_ID,
      buttonStyles,
      imageStyles,
      layoutStyles,
      sliderStyles
    };
    let markupStr = ejs.render(enhanceTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("#" + this.SLIDER_ID);
    this.slider.render(sliderContainer, this.model.enhance);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('#' + this.ENHANCE_CANCEL_BTN_ID ).click( ev => { return this.enhanceCancelClick(ev); });
    $(parentEl).find('#' + this.ENHANCE_APPLY_BTN_ID).click(ev => { return this.enhanceApplyClick(ev); });
    $(parentEl).find('#' + this.ENHANCE_CANCEL_MOB_BTN_ID).click( ev => { return this.enhanceCancelClick(ev); });
    $(parentEl).find('#' + this.ENHANCE_APPLY_MOB_BTN_ID).click(ev => { return this.enhanceApplyClick(ev); });

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
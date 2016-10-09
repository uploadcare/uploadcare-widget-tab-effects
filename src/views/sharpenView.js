'use strict';

import ejs from '../../node_modules/ejs/ejs';
import sharpenTemplate from '../templates/sharpen.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

const SLIDER_ID = "slider_" + IdGenerator.Generate();

let $ = uploadcare.jQuery;
let that;

export default class SharpenView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    this.slider = new Slider();
    that = this;
  }

  render(parentEl = this.container) {
    this.viewDeferred = $.Deferred();
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: SLIDER_ID
    };

    let markupStr = ejs.render(sharpenTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("#" + SLIDER_ID);
    this.slider.render(sliderContainer);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('#sharpenCancelBtn').click(this.sharpenCancelClick);
    $(parentEl).find('#sharpenApplyBtn').click(this.sharpenApplyClick);
  } 

  sharpenCancelClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Cancel"
    });
  }

  sharpenApplyClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Apply"
    });
  }
}
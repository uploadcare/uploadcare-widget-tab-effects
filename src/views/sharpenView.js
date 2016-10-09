'use strict';

import ejs from '../../node_modules/ejs/ejs';
import sharpenTemplate from '../templates/sharpen.html';
import Slider from "../components/slider.js";
import IdGenerator from '../tools/IdGenerator.js';

const SLIDER_ID = "slider_" + IdGenerator.Generate();
const PREVIEW_IMG_ID = "preview_mage_" + IdGenerator.Generate();

let $ = uploadcare.jQuery;
let that;

export default class SharpenView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    this.slider = new Slider(null, 20);
    this.slider.onChange(newVal => {
      return this.onChangeSlider(newVal);
    })
    that = this;
  }

  render(parentEl = this.container) {
    this.viewDeferred = $.Deferred();
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      sliderId: SLIDER_ID,
      previewImageId: PREVIEW_IMG_ID
    };

    let markupStr = ejs.render(sharpenTemplate, renderData);
    parentEl.html(markupStr);

    const sliderContainer = $(parentEl).find("#" + SLIDER_ID);
    this.slider.render(sliderContainer, this.model.sharp);

    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find('#sharpenCancelBtn').click(ev => { return this.sharpenCancelClick(ev); });
    $(parentEl).find('#sharpenApplyBtn').click(ev => { return this.sharpenApplyClick(ev); });
  } 

  sharpenCancelClick(ev) {
    this.model.sharp = undefined;
    this.viewDeferred.resolve({
      closeType: "Cancel"
    });
  }

  sharpenApplyClick(ev) {
    this.viewDeferred.resolve({
      closeType: "Apply"
    });
  }

  onChangeSlider(newVal) {
    this.model.sharp = newVal;
    this.container.find("#" + PREVIEW_IMG_ID).attr("src", this.model.getPreviewUrl(800, 382));
  }
}
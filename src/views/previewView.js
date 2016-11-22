'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from '../templates/preview.html';

import CropAndRotateView from './cropAndRotateView.js';
import EnhanceView from './enhanceView.js';
import SharpenView from './sharpenView.js';
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/effect-buttons.pcss';
import '../styles/effect-button.pcss';

const $ = uploadcare.jQuery;

export default class PreviewView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.cropAndRotateView = new CropAndRotateView(container, effectsModel);
    this.enhanceView = new EnhanceView(container, effectsModel);
    this.sharpenView = new SharpenView(container, effectsModel);

    this.CROP_AND_ROTATE_BTN_ID = "cropAndRotateBtn_" + IdGenerator.Generate();
    this.ENHANCE_BTN_ID = "enhanceBtn_" + IdGenerator.Generate();
    this.SHARPEN_BTN_ID = "sharpenBtn_" + IdGenerator.Generate();
    this.GRAYSCALE_BTN_ID = "grayScaleBtn_" + IdGenerator.Generate();

    this.DONE_BTN_ID = "doneBtn_" + IdGenerator.Generate();
    this.REMOVE_BTN_ID = "removeBtn_" + IdGenerator.Generate();
 }

  render(parentEl = this.container) {
    this.container = parentEl;
    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = $.Deferred();
    }
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      cropAndRotateBtnId: this.CROP_AND_ROTATE_BTN_ID,
      enhanceBtnId: this.ENHANCE_BTN_ID,
      sharpenBtnId: this.SHARPEN_BTN_ID,
      grayscaleBtnId: this.GRAYSCALE_BTN_ID,
      doneBtn: this.DONE_BTN_ID,
      removeBtn: this.REMOVE_BTN_ID,

      appliedGrayscale: this.model.grayscale === null,
      appliedSharpen: this.model.sharp ? true : false,
      appliedEnhance: this.model.enhance ? true : false,
      appliedCar: (this.model.rotate || this.model.crop) ? true : false,
      locale: this.model.locale
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find("." + this.CROP_AND_ROTATE_BTN_ID).click(ev => { return this.cropAndRotateClick(ev); });
    $(parentEl).find("." + this.ENHANCE_BTN_ID).click(ev => { return this.enhanceClick(ev); });
    $(parentEl).find("." + this.SHARPEN_BTN_ID).click(ev => { return this.sharpenClick(ev); });
    $(parentEl).find("." + this.GRAYSCALE_BTN_ID).click(ev => { return this.grayScaleClick(ev); });

    $(parentEl).find("." + this.REMOVE_BTN_ID).click(ev => { return this.removeClick(ev); });
    $(parentEl).find("." + this.DONE_BTN_ID).click(ev => { return this.doneClick(ev); });
  }

  cropAndRotateClick(ev) {
    this.cropAndRotateView.render()
      .then(type => {
        this.render();
      });
  }

  enhanceClick(ev) {
    this.enhanceView.render()
      .then(type => {
        this.render();
      });
  }

  sharpenClick(ev) {
    this.sharpenView.render()
      .then(type => {
        this.render();
      });
  }

  grayScaleClick(ev) {
    if (this.model.grayscale === null) {
      this.model.grayscale = undefined;
    } else {
      this.model.grayscale = null;
    }
    this.render();
  }

  doneClick(ev) {
    this.viewDeferred.resolve({
      reason: "Done"
    });
  }

  removeClick(ev) {
    this.model.enhance = undefined;
    this.model.sharp = undefined;
    this.model.grayscale = undefined;
    this.model.rotate = undefined;
    this.model.crop = undefined;
    this.render();
  }
}

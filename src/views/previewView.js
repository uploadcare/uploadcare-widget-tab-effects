'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from '../templates/preview.html';

import '../styles/buttons.scss';
import '../styles/images.scss';
import '../styles/viewContainer.scss';
import '../styles/slider.scss';

import CropAndRotateView from './cropAndRotateView.js';
import EnhanceView from './enhanceView.js';
import SharpenView from './sharpenView.js';
import IdGenerator from '../tools/IdGenerator.js';

const CROP_AND_ROTATE_BTN_ID = "cropAndRotateBtn_" + IdGenerator.Generate();
const ENHANCE_BTN_ID = "enhanceBtn_" + IdGenerator.Generate();
const SHARPEN_BTN_ID = "sharpenBtn_" + IdGenerator.Generate();
const GRAYSCALE_BTN_ID = "grayScaleBtn_" + IdGenerator.Generate();

const $ = uploadcare.jQuery;

export default class PreviewView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.cropAndRotateView = new CropAndRotateView(container, effectsModel);
    this.enhanceView = new EnhanceView(container, effectsModel);
    this.sharpenView = new SharpenView(container, effectsModel);
  }

  
  render(parentEl = this.container) {
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      cropAndRotateBtnId: CROP_AND_ROTATE_BTN_ID,
      enhanceBtnId: ENHANCE_BTN_ID,
      sharpenBtnId: SHARPEN_BTN_ID,
      grayscaleBtnId: GRAYSCALE_BTN_ID,

      appliedGrayscale: this.model.grayscale === null,
      appliedSharpen: this.model.sharp ? true : false,
      appliedEnhance: this.model.enhance ? true : false      
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);
  }

  setupHandlers(parentEl) {
    $(parentEl).find("#" + CROP_AND_ROTATE_BTN_ID).click(ev => { return this.cropAndRotateClick(ev); });   
    $(parentEl).find("#" + ENHANCE_BTN_ID).click(ev => { return this.enhanceClick(ev); });   
    $(parentEl).find("#" + SHARPEN_BTN_ID).click(ev => { return this.sharpenClick(ev); });   
    $(parentEl).find("#" + GRAYSCALE_BTN_ID).click(ev => { return this.grayScaleClick(ev); });
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
}
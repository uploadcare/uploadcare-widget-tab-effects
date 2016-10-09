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

const $ = uploadcare.jQuery;


let that;

export default class PreviewView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.cropAndRotateView = new CropAndRotateView(container, effectsModel);
    this.enhanceView = new EnhanceView(container, effectsModel);
    this.sharpenView = new SharpenView(container, effectsModel);

    that = this;
  }

  
  render(parentEl = this.container) {
    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      cropAndRotateBtnId: CROP_AND_ROTATE_BTN_ID,
      enhanceBtnId: ENHANCE_BTN_ID,
      sharpenBtnId: SHARPEN_BTN_ID
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);
  }

  setupHandlers(parentEl) {
    $(parentEl).find("#" + CROP_AND_ROTATE_BTN_ID).click(this.cropAndRotateClick);   
    $(parentEl).find("#" + ENHANCE_BTN_ID).click(this.enhanceClick);   
    $(parentEl).find("#" + SHARPEN_BTN_ID).click(this.sharpenClick);   
  }

  cropAndRotateClick(ev) {
    that.cropAndRotateView.render()
      .then(type => {
        that.render();
      });
  }

  enhanceClick(ev) {
    that.enhanceView.render()
      .then(type => {
        that.render();
      });
  }

  sharpenClick(ev) {
    that.sharpenView.render()
      .then(type => {
        that.render();
      });
  }
}
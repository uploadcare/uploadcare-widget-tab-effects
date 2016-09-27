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

let $ = uploadcare.jQuery;

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
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382)
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers();
  }

  setupHandlers() {
    $('#cropAndRotateBtn').click(this.CropAndRotateClick);   
    $('#enhanceBtn').click(this.EnhanceClick);   
    $('#sharpenBtn').click(this.SharpenClick);   
  }

  CropAndRotateClick(ev) {
    that.cropAndRotateView.render()
      .then(type => {
        that.render();
      });
  }

  EnhanceClick(ev) {
    that.enhanceView.render()
      .then(type => {
        that.render();
      });
  }

  SharpenClick(ev) {
    that.sharpenView.render()
      .then(type => {
        that.render();
      });
  }
}
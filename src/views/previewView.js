'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from '../templates/preview.html';

import '../styles/buttons.scss';
import '../styles/images.scss';
import '../styles/viewContainer.scss';

import CropAndRotateView from './cropAndRotateView.js';

let that;

export default class PreviewView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.cropAndRotateView = new CropAndRotateView(container, effectsModel);

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
    uploadcare.jQuery('#cropAndRotateBtn').click(this.CropAndRotateClick);   
  }

  CropAndRotateClick(ev) {
    that.cropAndRotateView.render();
  }
}
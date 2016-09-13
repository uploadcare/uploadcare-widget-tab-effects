'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';

export default class CropAndRotateView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
  }

  render(parentEl = this.container) {
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382)
    };
    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);
  }

}
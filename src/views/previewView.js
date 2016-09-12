'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from '../templates/preview.html';

import '../styles/preview.scss';

export default class PreviewView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
  }

  
  render(parentEl = this.container) {
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382)
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);
  }
}
'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from './template/preview.ejs'


export default class CropAndRotateView {
  constructor() {
    this.url = ''
  }

  render(parentEl) {
    let markupStr = ejs.render(previewTemplate, {});
    parentEl.html(markupStr);
  }

}
'use strict'
import ejs from 'ejs';
import previewTemplate from './template/preview.ejs'


export default class EditRect {
  constructor() {
  }

  render(parentEl) {
    let markupStr = ejs.render(previewTemplate, {});
    parentEl.html(markupStr);
  }
}
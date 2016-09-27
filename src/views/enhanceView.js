'use strict';

import ejs from '../../node_modules/ejs/ejs';
import enhanceTemplate from '../templates/enhance.html';

let $ = uploadcare.jQuery;
let that;

export default class EnhanceView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    that = this;
  }

  render(parentEl = this.container) {
    this.viewDeferred = $.Deferred();
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382)
    };
    let markupStr = ejs.render(enhanceTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers();
    return this.viewDeferred.promise();
  }

  setupHandlers() {
    $('#enhanceCancelBtn').click(this.enhanceCancelClick);
    $('#enhanceApplyBtn').click(this.enhanceApplyClick);
  } 

  enhanceCancelClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Cancel"
    });
  }

  enhanceApplyClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Apply"
    });
  }
}
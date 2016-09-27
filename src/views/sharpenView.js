'use strict';

import ejs from '../../node_modules/ejs/ejs';
import sharpenTemplate from '../templates/sharpen.html';

let $ = uploadcare.jQuery;
let that;

export default class SharpenView {
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
    let markupStr = ejs.render(sharpenTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers();
    return this.viewDeferred.promise();
  }

  setupHandlers() {
    $('#sharpenCancelBtn').click(this.sharpenCancelClick);
    $('#sharpenApplyBtn').click(this.sharpenApplyClick);
  } 

  sharpenCancelClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Cancel"
    });
  }

  sharpenApplyClick(ev) {
    that.viewDeferred.resolve({
      closeType: "Apply"
    });
  }
}
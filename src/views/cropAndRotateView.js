'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';
let $ = uploadcare.jQuery;
let that;

export default class CropAndRotateView {
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
    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers();
    return this.viewDeferred.promise();
  }

  setupHandlers() {
    $('#carCancelBtn').click(this.carCancelClick);
    $('#carApplyBtn').click(this.carApplyClick);
  } 

  carCancelClick(ev) {
    that.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {
    that.viewDeferred.resolve({
      reason: "Apply"
    });
  }
}
'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';
let $ = uploadcare.jQuery;

export default class CropAndRotateView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
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
    $('#carCancelBtn').click(ev => { return this.carCancelClick(ev); });
    $('#carApplyBtn').click(ev => { return this.carApplyClick(ev); });
  } 

  carCancelClick(ev) {
    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {
    this.viewDeferred.resolve({
      reason: "Apply"
    });
  }
}
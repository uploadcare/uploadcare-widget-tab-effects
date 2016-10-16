'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';
import IdGenerator from '../tools/IdGenerator.js';

import buttonStyles from '../styles/buttons.scss';
import imageStyles from '../styles/images.scss';
import layoutStyles from '../styles/viewContainer.scss';

let $ = uploadcare.jQuery;

export default class CropAndRotateView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;
    
    this.CAR_APPLY_BTN_ID = "carApplyBtn" + IdGenerator.Generate();
    this.CAR_CANCEL_BTN_ID = "carCancelBtn" + IdGenerator.Generate();
    this.CAR_APPLY_MOB_BTN_ID = "carApplyMobBtn" + IdGenerator.Generate();
    this.CAR_CANCEL_MOB_BTN_ID = "carCancelMobBtn" + IdGenerator.Generate();
  }

  render(parentEl = this.container) {
    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = $.Deferred();
    }

    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      carApplyBtn: this.CAR_APPLY_BTN_ID,
      carCancelBtn: this.CAR_CANCEL_BTN_ID,
      carApplyMobBtn: this.CAR_APPLY_MOB_BTN_ID,
      carCancelMobBtn: this.CAR_CANCEL_MOB_BTN_ID,
      buttonStyles,
      imageStyles,
      layoutStyles
    };

    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);

    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find("#" + this.CAR_CANCEL_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("#" + this.CAR_APPLY_BTN_ID).click(ev => { return this.carApplyClick(ev); });
    $(parentEl).find("#" + this.CAR_CANCEL_MOB_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("#" + this.CAR_APPLY_MOB_BTN_ID).click(ev => { return this.carApplyClick(ev); });
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
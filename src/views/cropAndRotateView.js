'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/rotate-button.pcss';

const $ = uploadcare.jQuery;

export default class CropAndRotateView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.rotateDirection = 0;
    if(this.model.rotate === 90) {
    	this.rotateDirection = -1;
		} else if(this.model.rotate !== undefined) {
    	this.rotateDirection = 1;
		}

    this.DONE_BTN_ID = "carApplyBtn" + IdGenerator.Generate();
    this.CANCEL_BTN_ID = "carCancelBtn" + IdGenerator.Generate();

    this.ROTATE_LEFT_BTN = "carRotateLeftBtn" + IdGenerator.Generate();
    this.ROTATE_RIGHT_BTN = "carRotateRightBtn" + IdGenerator.Generate();
  }

  render(parentEl = this.container) {
    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = $.Deferred();
    }

    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      carApplyBtn: this.DONE_BTN_ID,
      carCancelBtn: this.CANCEL_BTN_ID,
      carRotateLeftBtn: this.ROTATE_LEFT_BTN,
      carRotateRightBtn: this.ROTATE_RIGHT_BTN,
      rotate: this.model.rotate,
      rotateDirection: this.rotateDirection,
      locale: this.model.locale
    };

    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);

		parentEl.removeClass('uploadcare--preview_status_loaded')
		$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', true);
		$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', true);

    var img = $(parentEl).find('.uploadcare--preview__image');

    if(img[0].complete) {
			parentEl.addClass('uploadcare--preview_status_loaded')
			$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
			$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
			this.setupHandlers(parentEl);
		} else {
			img[0].addEventListener('load', () => {
				console.log('img load')
				parentEl.addClass('uploadcare--preview_status_loaded')
				$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
				$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
				this.setupHandlers(parentEl);
			})
			img[0].addEventListener('error', () => {
				this.viewDeferred.reject('image load failed')
			})
			img[0].addEventListener('abort', () => {
				this.viewDeferred.reject('image load aborted')
			})
		}

    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find("." + this.CANCEL_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("." + this.DONE_BTN_ID).click(ev => { return this.carApplyClick(ev); });
    $(parentEl).find("." + this.ROTATE_LEFT_BTN).click(ev => { return this.carRotateClick(-1); /* rotate left */ });
    $(parentEl).find("." + this.ROTATE_RIGHT_BTN).click(ev => { return this.carRotateClick(1); /* rotate right */ });
  }

  carCancelClick(ev) {
    this.model.rotate = undefined;

    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {
    this.viewDeferred.resolve({
      reason: "Apply"
    });
  }

  carRotateClick (rotateDirection) {
    if(this.model.rotate === undefined){
    	if(rotateDirection === -1){
    		this.model.rotate = 90;
			}
    	if(rotateDirection === 1){
    		this.model.rotate = 270;
			}
		}
		else {
			var angles = [90, 0, 270, 180];
			var prevAngle = this.model.rotate;
			var prevAngleIndex = angles.indexOf(prevAngle);

			if(!~prevAngleIndex) {
				return;
			}

			var nextAngleIndex = prevAngleIndex + rotateDirection;

			if(nextAngleIndex >= angles.length) {
				nextAngleIndex = 0;
			}

			if(nextAngleIndex < 0) {
				nextAngleIndex = angles.length - 1;
			}

			this.model.rotate = angles[nextAngleIndex];
		}

		this.rotateDirection = this.model.rotate ? rotateDirection : 0;
    this.render();
  }
}

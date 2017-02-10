'use strict'
import ejs from '../../node_modules/ejs/ejs';
import previewTemplate from '../templates/preview.html';

import CropAndRotateView from './cropAndRotateView.js';
import EnhanceView from './enhanceView.js';
import SharpenView from './sharpenView.js';
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/effect-buttons.pcss';
import '../styles/effect-button.pcss';

export default class PreviewView {
  constructor(container, effectsModel, uc) {
    this.container = container;
    this.model = effectsModel;
    this.$ = uc.jQuery;

    this.cropAndRotateView = new CropAndRotateView(container, effectsModel, uc);
    this.enhanceView = new EnhanceView(container, effectsModel, uc);
    this.sharpenView = new SharpenView(container, effectsModel);

    this.CROP_AND_ROTATE_BTN_ID = "cropAndRotateBtn_" + IdGenerator.Generate();
    this.ENHANCE_BTN_ID = "enhanceBtn_" + IdGenerator.Generate();
    this.SHARPEN_BTN_ID = "sharpenBtn_" + IdGenerator.Generate();
    this.GRAYSCALE_BTN_ID = "grayScaleBtn_" + IdGenerator.Generate();

    this.DONE_BTN_ID = "doneBtn_" + IdGenerator.Generate();
    this.REMOVE_BTN_ID = "removeBtn_" + IdGenerator.Generate();
 }

  render(parentEl = this.container) {
    this.container = parentEl;
    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = this.$.Deferred();
    }
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      cropAndRotateBtnId: this.CROP_AND_ROTATE_BTN_ID,
      enhanceBtnId: this.ENHANCE_BTN_ID,
      sharpenBtnId: this.SHARPEN_BTN_ID,
      grayscaleBtnId: this.GRAYSCALE_BTN_ID,
      doneBtn: this.DONE_BTN_ID,
      removeBtn: this.REMOVE_BTN_ID,

      appliedGrayscale: this.model.grayscale === null,
      appliedSharpen: this.model.sharp ? true : false,
      appliedEnhance: this.model.enhance ? true : false,
      appliedCar: (this.model.rotate || this.model.crop) ? true : false,
      locale: this.model.locale
    };
    let markupStr = ejs.render(previewTemplate, renderData);
    parentEl.html(markupStr);

		parentEl.removeClass('uploadcare--preview_status_loaded')
		this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', true);
		this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', true);

    const img = parentEl.find('.uploadcare--preview__image');
    if(img[0].complete) {
			parentEl.addClass('uploadcare--preview_status_loaded')
			this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
			this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', false);
		}
    img[0].addEventListener('load', () => {
			parentEl.addClass('uploadcare--preview_status_loaded')
			this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
			this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', false);
			this.setupHandlers(parentEl);
		})
    img[0].addEventListener('error', () => {
			this.viewDeferred.reject('image load failed')
		})
    img[0].addEventListener('abort', () => {
			this.viewDeferred.reject('image load aborted')
		})

    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    this.$(parentEl).find("." + this.CROP_AND_ROTATE_BTN_ID).click(ev => { return this.cropAndRotateClick(ev); });
    this.$(parentEl).find("." + this.ENHANCE_BTN_ID).click(ev => { return this.enhanceClick(ev); });
    this.$(parentEl).find("." + this.SHARPEN_BTN_ID).click(ev => { return this.sharpenClick(ev); });
    this.$(parentEl).find("." + this.GRAYSCALE_BTN_ID).click(ev => { return this.grayScaleClick(ev); });

    this.$(parentEl).find("." + this.REMOVE_BTN_ID).click(ev => { return this.removeClick(ev); });
    this.$(parentEl).find("." + this.DONE_BTN_ID).click(ev => { return this.doneClick(ev); });
  }

  cropAndRotateClick(ev) {
    this.cropAndRotateView.render()
      .then(type => {
        this.render();
      });
  }

  enhanceClick(ev) {
    this.enhanceView.render()
      .then(type => {
        this.render();
      });
  }

  sharpenClick(ev) {
    this.sharpenView.render()
      .then(type => {
        this.render();
      });
  }

  grayScaleClick(ev) {
    if (this.model.grayscale === null) {
      this.model.grayscale = undefined;
    } else {
      this.model.grayscale = null;
    }
    this.render();
  }

  doneClick(ev) {
    this.viewDeferred.resolve({
      reason: "Done"
    });
  }

  removeClick(ev) {
    this.model.enhance = undefined;
    this.model.sharp = undefined;
    this.model.grayscale = undefined;
    this.model.rotate = undefined;
    this.model.crop = undefined;
    this.render();
  }
}

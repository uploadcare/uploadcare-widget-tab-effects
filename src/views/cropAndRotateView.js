'use strict';

import ejs from '../../node_modules/ejs/ejs';
import cropAndRotateTemplate from '../templates/cropAndRotate.html';
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/rotate-button.pcss';

let $ = uploadcare.jQuery;

export default class CropAndRotateView {
  constructor(container, effectsModel) {
    this.container = container;
    this.model = effectsModel;

    this.CAR_APPLY_BTN_ID = "carApplyBtn" + IdGenerator.Generate();
    this.CAR_CANCEL_BTN_ID = "carCancelBtn" + IdGenerator.Generate();

    this.CAR_FREE_RATIO_BTN_ID = "carFreeRatioBtn" + IdGenerator.Generate();
    this.CAR_ORIG_RATIO_BTN_ID = "carOrigRatioBtn" + IdGenerator.Generate();
    this.CAR_ONE_TO_ONE_RATIO_BTN_ID = "carOneToOneRatioBtn" + IdGenerator.Generate();
    this.CAR_THREE_TO_FOUR_RATIO_BTN_ID = "carThreeToFourRatioBtn" + IdGenerator.Generate();
    this.CAR_FOUR_TO_THREE_RATIO_BTN_ID = "carFourToThreeRatioBtn" + IdGenerator.Generate();
    this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID = "carSixteenToNineRatioBtn" + IdGenerator.Generate();
    this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID = "carNineToSixteenRatioBtn" + IdGenerator.Generate();
    this.CAR_ROTATE_LEFT_BTN = "carRotateLeftBtn" + IdGenerator.Generate();
    this.CAR_ROTATE_RIGHT_BTN = "carRotateRightBtn" + IdGenerator.Generate();
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
      carRotateLeftBtn: this.CAR_ROTATE_LEFT_BTN,
      carRotateRightBtn: this.CAR_ROTATE_RIGHT_BTN,
			carOrigRatioBtn: this.CAR_ORIG_RATIO_BTN_ID,
			carOneToOneRatioBtn: this.CAR_ONE_TO_ONE_RATIO_BTN_ID,
			carThreeToFourRatioBtn: this.CAR_THREE_TO_FOUR_RATIO_BTN_ID,
			carFourToThreeRatioBtn: this.CAR_FOUR_TO_THREE_RATIO_BTN_ID,
			carSixteenToNineRatioBtn: this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID,
			carNineToSixteenRatioBtn: this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID,
    };

    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);

    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {
    $(parentEl).find("." + this.CAR_CANCEL_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("." + this.CAR_APPLY_BTN_ID).click(ev => { return this.carApplyClick(ev); });
    $(parentEl).find("." + this.CAR_ROTATE_LEFT_BTN).click(ev => { return this.carRotateClick(1); /* rotate left */ });
    $(parentEl).find("." + this.CAR_ROTATE_RIGHT_BTN).click(ev => { return this.carRotateClick(0); /* rotate right */ });
    $(parentEl).find("." + this.CAR_ORIG_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(null); });
    $(parentEl).find("." + this.CAR_ONE_TO_ONE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(1); });
    $(parentEl).find("." + this.CAR_THREE_TO_FOUR_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(3/4); });
    $(parentEl).find("." + this.CAR_FOUR_TO_THREE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(4/3); });
    $(parentEl).find("." + this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(16/9); });
    $(parentEl).find("." + this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(9/16); });
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

  carRotateClick (direction) {
    var valArray = [undefined, 90, 180, 270];
    var curVal = this.model.rotate;
    var ind = valArray.findIndex((val, i, arr) => {
      return val === curVal;
    });
    if(direction) {
      ind++;
      if(ind >= valArray.length) {
        ind = 0;
      }
    } else {
      ind--;
      if(ind < 0) {
        ind = valArray.length - 1;
      }
    }
    this.model.rotate = valArray[ind];
    this.render();
  }

  carSetCropRatio(ratio) {

    if(!ratio)
    {
      this.model.setCropSize(this.model.imgWidth, this.model.imgHeight);
    } else if (ratio === 1) {
      const squareSize = Math.min(this.model.imgWidth, this.model.imgHeight);
      this.model.setCropSize(squareSize, squareSize);
    } else {
      const squareSize = Math.min(this.model.imgWidth, this.model.imgHeight);
      const curRatio = this.model.imgWidth / this.model.imgHeight;
      if(curRatio > 1) {
        if(ratio < curRatio) {
          this.model.setCropSize(ratio*squareSize, squareSize);
        } else {
          this.model.setCropSize(squareSize, 1/ratio*squareSize);
        }
      } else {
        if(ratio < curRatio) {
          this.model.setCropSize(squareSize, ratio*squareSize);
        } else {
          this.model.setCropSize(1/ratio*squareSize, squareSize);
        }
      }
    }

    this.render();
  }
}

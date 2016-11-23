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
    this.cropApi = null;

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
    
    this.cropPos = this.model.getCropPos();
    this.cropSize = this.model.getCropSize();
    
    this.freeCropFlag = this.cropPos.y !== null ? true : false;
    
    if(this.model.rotate) {
      this.rotateFlag = true;
    }

    this.cropConsts = {
      ORIG_RATIO: 'original',
      FREE_CROP: 'freeCrop',
      ONE_TO_ONE: '1:1',
      THREE_TO_FOUR: '3:4',
      FOUR_TO_THREE: '4:3',
      SIXTEEN_TO_NINE: '16:9',
      NINE_TO_SIXTEEN: '9:16'
    } 
  }

  render(parentEl = this.container) {
    if(!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = $.Deferred();
    }

    this.container = parentEl;

    if(this.freeCropFlag) {
      this.model.crop = undefined;
    }

    const cropRatio = this.getCropConst();
    
    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382),
      carApplyBtn: this.CAR_APPLY_BTN_ID,
      carCancelBtn: this.CAR_CANCEL_BTN_ID,
      carRotateLeftBtn: this.CAR_ROTATE_LEFT_BTN,
      carRotateRightBtn: this.CAR_ROTATE_RIGHT_BTN,
      rotateFlag: this.model.rotate ? true: false,
      freeCropFlag: this.freeCropFlag,
			carOrigRatioBtn: this.CAR_ORIG_RATIO_BTN_ID,
			carOneToOneRatioBtn: this.CAR_ONE_TO_ONE_RATIO_BTN_ID,
			carThreeToFourRatioBtn: this.CAR_THREE_TO_FOUR_RATIO_BTN_ID,
			carFourToThreeRatioBtn: this.CAR_FOUR_TO_THREE_RATIO_BTN_ID,
			carSixteenToNineRatioBtn: this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID,
			carNineToSixteenRatioBtn: this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID,
      carFreeRatioBtn: this.CAR_FREE_RATIO_BTN_ID,
      cropRatio,
      cropRatioConsts: this.cropConsts,
      locale: this.model.locale
    };

    let markupStr = ejs.render(cropAndRotateTemplate, renderData);
    parentEl.html(markupStr);
    this.crop_img = $(parentEl).find(".uploadcare--preview__image-container>img");

    this.crop_img.on('load', () => {
   
      if(this.freeCropFlag) {
        
        let rotateFlag = false;
        let trueSize = [ this.model.imgWidth, this.model.imgHeight ];
        var curRotate = this.model.rotate;
        if(curRotate === 90 || curRotate === 270) {
          trueSize = trueSize.reverse();
          rotateFlag = true;
        }

        this.cropApi = $.Jcrop(this.crop_img, {
          trueSize,
          onChange: ev => {
            const coords = ev;
            const left = Math.round(Math.max(0, coords.x));
            const top = Math.round(Math.max(0, coords.y));

            let width = Math.round(Math.min( this.model.imgWidth, coords.x2)) - left;
            let height = Math.round(Math.min(this.model.imgHeight, coords.y2)) - top;
            if(rotateFlag) {
              width = Math.round(Math.min( this.model.imgHeight, coords.x2)) - left;
              height = Math.round(Math.min(this.model.imgWidth, coords.y2)) - top;
            }

            this.cropPos.x = left;
            this.cropPos.y = top;
            this.cropSize.width = width;
            this.cropSize.height = height;

          },
          baseClass: 'uploadcare--jcrop',
          addClass: 'uploadcare--crop-widget',
          createHandles: ['nw','ne','se','sw'],
          bgColor: 'transparent',
          bgOpacity: .8
        });
        
        if(this.cropPos.x !== null && this.cropPos.y !== null) {
          const rect = [this.cropPos.x, 
            this.cropPos.y, 
            this.cropPos.x + this.cropSize.width, 
            this.cropPos.y + this.cropSize.height];
          this.cropApi.setSelect(rect); 
        }
      } else {
        this.cropApi = undefined;
      }
    });
    
    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setupHandlers(parentEl) {

    $(parentEl).find("." + this.CAR_CANCEL_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("." + this.CAR_FREE_RATIO_BTN_ID).click(ev => { return this.carFreeRatio(); });
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
    this.model.crop = undefined;
    this.freeCropFlag = false;

    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {

    if(this.freeCropFlag) {
      this.model.setCropSize(this.cropSize.width, this.cropSize.height);
      this.model.setCropPos(this.cropPos.x, this.cropPos.y);
    }

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

    this.freeCropFlag = false;
    if(!ratio)
    {
      this.model.crop = undefined;
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
        if(ratio > curRatio) {
          this.model.setCropSize(squareSize, 1/ratio*squareSize);
        } else {
          this.model.setCropSize(ratio*squareSize, squareSize);
        }
      }
    }

    this.render();
  }

  carFreeRatio() {
    this.freeCropFlag = true;
    this.model.crop = undefined;
    this.render();
  }

  getCropConst() {
    
    const cropSize = this.model.getCropSize();
    const cropRate = Math.round(cropSize.width / cropSize.height * 100) / 100;
    const threeToFourRate = Math.round( 3 / 4 * 100 ) / 100;
    const fourToThreeRate = Math.round( 4 / 3 * 100 ) / 100;
    const sixteenToNineRate = Math.round( 16 / 9 * 100 ) / 100;
    const nineToSixteenRate = Math.round( 9 / 16 * 100 ) / 100;
    const delta = 0.01;

    if(this.freeCropFlag) {
      return this.cropConsts.FREE_CROP;
    } else if (!this.crop && !this.cropSize) {
      return this.cropConsts.ORIG_RATIO;
    } else if ( cropRate === 1 ) {
      return this.cropConsts.ONE_TO_ONE;
    } else if ( cropRate <= fourToThreeRate + delta && cropRate >= fourToThreeRate - delta) {
      return this.cropConsts.FOUR_TO_THREE;
    } else if ( cropRate <= threeToFourRate + delta && cropRate >= threeToFourRate - delta) {
      return this.cropConsts.THREE_TO_FOUR;
    } else if ( cropRate <= sixteenToNineRate + delta && cropRate >= sixteenToNineRate - delta) {
      return this.cropConsts.SIXTEEN_TO_NINE;
    } else if ( cropRate <= nineToSixteenRate + delta && cropRate >= nineToSixteenRate - delta) {
      return this.cropConsts.NINE_TO_SIXTEEN;
    } else {
      return this.cropConsts.ORIG_RATIO;
    }
  }
}

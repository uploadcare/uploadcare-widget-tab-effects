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
    
    this.freeCropFlag = false;
    
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
    this.model.crop = undefined;

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

        let rotateFlag = false;
        let trueSize = [ this.model.imgWidth, this.model.imgHeight ];
        var curRotate = this.model.rotate;
        if(curRotate === 90 || curRotate === 270) {
          trueSize = trueSize.reverse();
          rotateFlag = true;
        }

        this.cropApi = $.Jcrop(this.crop_img[0], {
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
          createHandles: ['nw', 'ne', 'se', 'sw'],
          bgColor: 'transparent',
          bgOpacity: .8
        });
        
        let rect = [];
        if(this.cropPos.x !== null && this.cropPos.y !== null) {
          rect = [this.cropPos.x, 
            this.cropPos.y, 
            this.cropPos.x + this.cropSize.width, 
            this.cropPos.y + this.cropSize.height];
        } else {
          let width = rotateFlag ? this.model.imgHeight : this.model.imgWidth; 
          let height = rotateFlag ? this.model.imgWidth : this.model.imgHeight; 
          const stepX = 0;
          const stepY = 0;

          rect = [stepX, stepY, width, height];
        }
        this.cropApi.setSelect(rect);
        switch(cropRatio) {
          case this.cropConsts.FREE_CROP:
            this.setCrop(null, null);            
          break;
          case this.cropConsts.ORIG_RATIO:
            var curRotate = this.model.rotate;
            if(curRotate === 90 || curRotate === 270) {
              this.setCrop(this.model.imgHeight, this.model.imgWidth);            
            } else {
              this.setCrop(this.model.imgWidth, this.model.imgHeight);            
            }
          break;
          case this.cropConsts.ONE_TO_ONE:
            this.setCrop(1, 1);
          break;
          case this.cropConsts.THREE_TO_FOUR:
            this.setCrop(3, 4);
          break;
          case this.cropConsts.FOUR_TO_THREE:
            this.setCrop(4, 3);
          break;
          case this.cropConsts.SIXTEEN_TO_NINE:
            this.setCrop(16, 9);
          break;
          case this.cropConsts.NINE_TO_SIXTEEN:
            this.setCrop(9, 16);
          break;
        }
    });
    
    this.setupHandlers(parentEl);
    return this.viewDeferred.promise();
  }

  setCrop(wRatio, hRatio) {
    let crop = {
      downscale: false, 
      upscale: false, 
      notLess: false, 
      preferedSize: wRatio ? [
        wRatio, hRatio
      ] : undefined
    }
     return this.cropApi.setOptions({
          aspectRatio: crop.preferedSize ? crop.preferedSize[0] / crop.preferedSize[1] : 0,
          minSize: crop.notLess ? utils.fitSize(crop.preferedSize, this.originalSize) : [0, 0]
        });
  }

  setupHandlers(parentEl) {

    $(parentEl).find("." + this.CAR_CANCEL_BTN_ID).click(ev => { return this.carCancelClick(ev); });
    $(parentEl).find("." + this.CAR_FREE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(null, null, ev.currentTarget); });
    $(parentEl).find("." + this.CAR_APPLY_BTN_ID).click(ev => { return this.carApplyClick(ev); });
    $(parentEl).find("." + this.CAR_ROTATE_LEFT_BTN).click(ev => { return this.carRotateClick(1); /* rotate left */ });
    $(parentEl).find("." + this.CAR_ROTATE_RIGHT_BTN).click(ev => { return this.carRotateClick(0); /* rotate right */ });
    $(parentEl).find("." + this.CAR_ORIG_RATIO_BTN_ID).click(ev => { 
      var curRotate = this.model.rotate;
      if(curRotate === 90 || curRotate === 270) {
        return this.carSetCropRatio(this.model.imgHeight, this.model.imgWidth, ev.currentTarget); 
      } else {
        return this.carSetCropRatio(this.model.imgWidth, this.model.imgHeight, ev.currentTarget); 
      }
    });
    $(parentEl).find("." + this.CAR_ONE_TO_ONE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(1, 1, ev.currentTarget); });
    $(parentEl).find("." + this.CAR_THREE_TO_FOUR_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(3, 4, ev.currentTarget); });
    $(parentEl).find("." + this.CAR_FOUR_TO_THREE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(4, 3, ev.currentTarget); });
    $(parentEl).find("." + this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(16, 9, ev.currentTarget); });
    $(parentEl).find("." + this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID).click(ev => { return this.carSetCropRatio(9, 16, ev.currentTarget); });
  }

  resetCropValues() {
    this.model.crop = undefined;
    this.freeCropFlag = false;
    this.cropPos.x = null;
    this.cropPos.y = null;
    this.cropSize.width = undefined;
    this.cropSize.height = undefined;
  }

  carCancelClick(ev) {
    this.model.rotate = undefined;
    this.resetCropValues();
    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {

    this.model.setCropSize(this.cropSize.width, this.cropSize.height);
    this.model.setCropPos(this.cropPos.x, this.cropPos.y);

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

  carSetCropRatio(wRatio, hRatio, elem) {

    this.freeCropFlag = wRatio?false:true;
    let curClass = 'uploadcare--crop-sizes__item_current';
    this.setCrop(wRatio, hRatio);
    this.container.find('.uploadcare--crop-sizes>*')
      .removeClass(curClass);
    $(elem).addClass(curClass);
  }

  carFreeRatio() {
    this.freeCropFlag = true;
    this.model.crop = undefined;
    this.render();
  }

  getCropConst() {
    
    const cropSize = this.cropSize;
    if (!cropSize.width) {
      return this.cropConsts.FREE_CROP;
    }
    
    const cropRate = Math.round(cropSize.width / cropSize.height * 100) / 100;
    const threeToFourRate = Math.round( 3 / 4 * 100 ) / 100;
    const fourToThreeRate = Math.round( 4 / 3 * 100 ) / 100;
    const sixteenToNineRate = Math.round( 16 / 9 * 100 ) / 100;
    const nineToSixteenRate = Math.round( 9 / 16 * 100 ) / 100;
    const delta = 0.01;

    if(this.freeCropFlag) {
      return this.cropConsts.FREE_CROP;
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

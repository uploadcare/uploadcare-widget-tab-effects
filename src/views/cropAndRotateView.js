'use strict';

import cropAndRotateTemplate from '../templates/cropAndRotate.html';
import cropSizesItemTemplate from '../templates/crop-sizes__item.html';
import IdGenerator from '../tools/IdGenerator.js';

import '../styles/rotate-button.pcss';

export default class CropAndRotateView {
  constructor(container, effectsModel, uc, settings) {
    this.container = container;
    this.model = effectsModel;
    this.uc = uc;
    this.$ = uc.jQuery;
    this.crop = settings.crop;
    this.currentCropIndex = 0;

    this.rotateDirection = 0;
    if (this.model.rotate === 90) {
      this.rotateDirection = -1;
    } else if (this.model.rotate !== undefined) {
      this.rotateDirection = 1;
    }

    this.DONE_BTN_ID = "carApplyBtn" + IdGenerator.Generate();
    this.CANCEL_BTN_ID = "carCancelBtn" + IdGenerator.Generate();

    this.ROTATE_LEFT_BTN = "carRotateLeftBtn" + IdGenerator.Generate();
    this.ROTATE_RIGHT_BTN = "carRotateRightBtn" + IdGenerator.Generate();
  }

  render(parentEl = this.container) {
    if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
      this.viewDeferred = this.$.Deferred();
    }

    this.container = parentEl;

    let renderData = {
      previewUrl: this.model.getPreviewUrl(800, 382, false),
      carApplyBtn: this.DONE_BTN_ID,
      carCancelBtn: this.CANCEL_BTN_ID,
      carRotateLeftBtn: this.ROTATE_LEFT_BTN,
      carRotateRightBtn: this.ROTATE_RIGHT_BTN,
      rotate: this.model.rotate,
      rotateDirection: this.rotateDirection,
      locale: this.model.locale
    };

    let markupStr = cropAndRotateTemplate(renderData);
    parentEl.html(markupStr);
    this.populateCropSizes();

    parentEl.removeClass('uploadcare--preview_status_loaded')
    this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', true);
    this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', true);
    this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', true);

    var img = this.$(parentEl).find('.uploadcare--preview__image');

    if (img[0].complete) {
      parentEl.addClass('uploadcare--preview_status_loaded')
      this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
      this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
      this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', false);
      this.setupHandlers(parentEl);
      if (this.crop) {
        this.startCrop(img);
      }
    } else {
      img[0].addEventListener('load', () => {
        console.log('img load')
        parentEl.addClass('uploadcare--preview_status_loaded')
        this.$(parentEl).find("." + this.DONE_BTN_ID).attr('aria-disabled', false);
        this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
        this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', false);
        this.setupHandlers(parentEl);
        if (this.crop) {
          this.startCrop(img);
        }
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
    this.$(parentEl).find("." + this.CANCEL_BTN_ID).click(ev => {
      return this.carCancelClick(ev);
    });
    this.$(parentEl).find("." + this.DONE_BTN_ID).click(ev => {
      return this.carApplyClick(ev);
    });
    this.$(parentEl).find("." + this.ROTATE_LEFT_BTN).click(ev => {
      this.carRotateClick(-1);
      /* rotate left */
    });
    this.$(parentEl).find("." + this.ROTATE_RIGHT_BTN).click(ev => {
      this.carRotateClick(1);
      /* rotate right */
    });
  }

  carCancelClick(ev) {
    this.model.rotate = undefined;

    this.viewDeferred.resolve({
      reason: "Cancel"
    });
  }

  carApplyClick(ev) {
    if (this.crop && this.widget) {
      this.model.cropIndex = this.currentCropIndex;
      this.model.crop = this.widget.crop
      this.model.cropSize = this.widget.originalSize
      this.model.coords = this.widget.getSelection()
    }
    this.viewDeferred.resolve({
      reason: "Apply"
    });
  }

  carRotateClick(rotateDirection) {
    if (this.model.rotate === undefined) {
      if (rotateDirection === -1) {
        this.model.rotate = 90;
      }
      if (rotateDirection === 1) {
        this.model.rotate = 270;
      }
    }
    else {
      var angles = [90, 0, 270, 180];
      var prevAngle = this.model.rotate;
      var prevAngleIndex = angles.indexOf(prevAngle);

      if (!~prevAngleIndex) {
        return;
      }

      var nextAngleIndex = prevAngleIndex + rotateDirection;

      if (nextAngleIndex >= angles.length) {
        nextAngleIndex = 0;
      }

      if (nextAngleIndex < 0) {
        nextAngleIndex = angles.length - 1;
      }

      this.model.rotate = angles[nextAngleIndex];
    }

    this.rotateDirection = this.model.rotate ? rotateDirection : 0;
    this.render();
  }

  populateCropSizes() {
    var control = this.container.find('.uploadcare--crop-sizes')
    var template = cropSizesItemTemplate();
    var currentClass = 'uploadcare--crop-sizes__item_current'

    this.$.each(this.crop, (i, crop) => {
      var prefered = crop.preferedSize;
      var caption;
      if (prefered) {
        var gcd = this.uc.utils.gcd(prefered[0], prefered[1]);
        caption = `${prefered[0] / gcd}:${prefered[1] / gcd}`
      }
      else {
        caption = this.uc.locale.t('dialog.tabs.preview.crop.free')
      }

      var item = this.$(template).appendTo(control)
        .attr('data-caption', caption)
        .on('click', (e) => {
          if (!this.$(e.currentTarget).hasClass(currentClass) && this.crop.length > 1 && this.widget) {
            this.widget.setCrop(crop);
            control.find('.uploadcare--crop-sizes__item').removeClass(currentClass)
            item.addClass(currentClass)
            this.currentCropIndex = i;
          }
        })

      if (prefered) {
        var size = this.uc.utils.fitSize(prefered, [30, 30], true);
        item.find('.uploadcare--crop-sizes__icon')
          .css({
            width: Math.max(20, size[0]),
            height: Math.max(12, size[1]),
          })
      }
      else {
        item.find('.uploadcare--crop-sizes__icon').addClass('uploadcare--crop-sizes__icon_free')
      }
    })
    control.find('.uploadcare--crop-sizes__item').eq(this.currentCropIndex).addClass(currentClass)
  }

  startCrop(img) {
    const size = this.model.rotate && !!~[90, 270].indexOf(this.model.rotate)
      ? [this.model.imgHeight, this.model.imgWidth]
      : [this.model.imgWidth, this.model.imgHeight]

    this.widget = new this.uc.crop.CropWidget(
      img,
      size,
      this.crop[this.currentCropIndex],
    )

    var cdnModifiers = this.model.getCropModifiers();
    if (cdnModifiers) {
      this.widget.setSelectionFromModifiers(cdnModifiers)
    }
  }
}

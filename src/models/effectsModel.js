'use strict'

const FORMAT_EFFECT = 'format';
const PROGRESSIVE_EFFECT = 'progressive';
const QUALITY_EFFECT = 'quality';
const ROTATE_EFFECT = 'rotate';
const AUTOROTATE_EFFECT = 'autorotate';
const FLIP_EFFECT = 'flip';
const MIRROR_EFFECT = 'mirror';
const ENHANCE_EFFECT = 'enhance';
const SHARP_EFFECT = 'sharp';
const BLUR_EFFECT = 'blur';
const GRAYSCALE_EFFECT = 'grayscale';
const INVERT_EFFECT = 'invert';
const CROP_EFFECT = 'crop';

export default function EffectsModel (cdn_url, imgWidth, imgHeight) {
  this.cdn_url = cdn_url;
  this.imgWidth = imgWidth;
  this.imgHeight = imgHeight;
  this.cropPos = undefined;
  var effectsData = {};

  Object.defineProperty(this, FORMAT_EFFECT, definePropOptions(FORMAT_EFFECT));
  Object.defineProperty(this, PROGRESSIVE_EFFECT, definePropOptions(PROGRESSIVE_EFFECT));
  Object.defineProperty(this, QUALITY_EFFECT, definePropOptions(QUALITY_EFFECT));
  Object.defineProperty(this, ROTATE_EFFECT, definePropOptions(ROTATE_EFFECT));
  Object.defineProperty(this, AUTOROTATE_EFFECT, definePropOptions(AUTOROTATE_EFFECT));
  Object.defineProperty(this, FLIP_EFFECT, definePropOptions(FLIP_EFFECT));
  Object.defineProperty(this, MIRROR_EFFECT, definePropOptions(MIRROR_EFFECT));
  Object.defineProperty(this, ENHANCE_EFFECT, definePropOptions(ENHANCE_EFFECT));
  Object.defineProperty(this, SHARP_EFFECT, definePropOptions(SHARP_EFFECT));
  Object.defineProperty(this, BLUR_EFFECT, definePropOptions(BLUR_EFFECT));
  Object.defineProperty(this, GRAYSCALE_EFFECT, definePropOptions(GRAYSCALE_EFFECT));
  Object.defineProperty(this, INVERT_EFFECT, definePropOptions(INVERT_EFFECT));
  Object.defineProperty(this, CROP_EFFECT, definePropOptions(CROP_EFFECT));


  function definePropOptions(propertyName) {
    return {
      enumerable: true,
      set: function(value) {
        effectsData[propertyName] = value;
        return value;
      },

      get: function() {
        return effectsData[propertyName];
      }
    }
  }

  this.parseUrl = function(url) {
    if((typeof url) !== 'string') {
      throw new Error('`url` param can be only a string');
    }
    var effectsArr = url.split('-/');
    var urlWithId = effectsArr[0];
    var protocolAndIdArr = urlWithId.split(this.cdn_url);
    this.protocol = protocolAndIdArr[0].split('://')[0];
    this.imageId = protocolAndIdArr[1].split('/')[0];
    for(var i=1; i < effectsArr.length; i++) {
      this.parseValue(effectsArr[i]);
    }
  }

  this.parseValue = function(formatString) {
    var formatArr = formatString.split('/');
    if(formatArr[0] == CROP_EFFECT ) {
      this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
      this.cropPos = formatArr[2] ? formatArr[2] : undefined;
    } else {
      this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
    }
  }

  this.getFinalUrl = function() {
    var baseUrl =  this.protocol + '://' + this.cdn_url + this.imageId + '/';
    uploadcare.jQuery.each(effectsData, (key, val) => {
      if(val !== undefined) {
        baseUrl += '-/' + key + '/';
        if (val) {
          baseUrl += val + '/';
        }
      } 

      if (key === CROP_EFFECT && val) {
        if(this.cropPos) {
          baseUrl += this.cropPos + '/';
        } else {
          baseUrl += 'center/';
        }
      }
    });
    return baseUrl;
  }

  this.getPreviewUrl = function(width, height) {
    var res = this.getFinalUrl() + '-/preview/';
    if(width) {
      res += width; 
    }
    if(height) {
      res += "x" + height;
    }
    if(width || height) {
      res += "/";
    } 
    return res;
  }

  this.setCropSize = function(width, height) {
      effectsData[CROP_EFFECT] = Math.round(width) + 'x' + Math.round(height);
      this.cropPos = undefined;
  }

  this.setCropPosCenter = function() {
    this.cropPos = "center";
  }

  this.setCropPos = function(posX, posY) {
    this.cropPos = posX + ',' + posY;
  }
}

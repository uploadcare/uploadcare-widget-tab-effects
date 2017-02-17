'use strict'

const FORMAT_EFFECT = 'format'
const PROGRESSIVE_EFFECT = 'progressive'
const QUALITY_EFFECT = 'quality'
const ROTATE_EFFECT = 'rotate'
const AUTOROTATE_EFFECT = 'autorotate'
const FLIP_EFFECT = 'flip'
const MIRROR_EFFECT = 'mirror'
const ENHANCE_EFFECT = 'enhance'
const SHARP_EFFECT = 'sharp'
const BLUR_EFFECT = 'blur'
const GRAYSCALE_EFFECT = 'grayscale'
const INVERT_EFFECT = 'invert'
const CROP_EFFECT = 'crop'

export default function EffectsModel(cdn_url, imgWidth, imgHeight, crop, locale) {
  this.cdn_url = cdn_url
  this.imgWidth = imgWidth
  this.imgHeight = imgHeight
  let cropPos = undefined
  const priorityArr = []
  let effectsData = {}
  this.locale = locale

  Object.defineProperty(this, FORMAT_EFFECT, definePropOptions(FORMAT_EFFECT))
  Object.defineProperty(this, PROGRESSIVE_EFFECT, definePropOptions(PROGRESSIVE_EFFECT))
  Object.defineProperty(this, QUALITY_EFFECT, definePropOptions(QUALITY_EFFECT))
  Object.defineProperty(this, ROTATE_EFFECT, definePropOptions(ROTATE_EFFECT))
  Object.defineProperty(this, AUTOROTATE_EFFECT, definePropOptions(AUTOROTATE_EFFECT))
  Object.defineProperty(this, FLIP_EFFECT, definePropOptions(FLIP_EFFECT))
  Object.defineProperty(this, MIRROR_EFFECT, definePropOptions(MIRROR_EFFECT))
  Object.defineProperty(this, ENHANCE_EFFECT, definePropOptions(ENHANCE_EFFECT))
  Object.defineProperty(this, SHARP_EFFECT, definePropOptions(SHARP_EFFECT))
  Object.defineProperty(this, BLUR_EFFECT, definePropOptions(BLUR_EFFECT))
  Object.defineProperty(this, GRAYSCALE_EFFECT, definePropOptions(GRAYSCALE_EFFECT))
  Object.defineProperty(this, INVERT_EFFECT, definePropOptions(INVERT_EFFECT))
  Object.defineProperty(this, CROP_EFFECT, definePropOptions(CROP_EFFECT))


  function definePropOptions(propertyName) {
    return {
      enumerable: true,
      set: function(value) {
        effectsData[propertyName] = value

        const propInd = priorityArr.indexOf(propertyName)
        if (value === undefined) {
          if (propInd !== -1) {
            priorityArr.splice(propInd, 1)
          }
        } else {
          if (propInd === -1) {
            priorityArr.push(propertyName)
          }
          else {
            priorityArr.splice(propInd, 1)
            priorityArr.push(propertyName)
          }
        }
        return value
      },

      get: function() {
        return effectsData[propertyName]
      },
    }
  }

  this.parseUrl = function(url) {
    if ((typeof url) !== 'string') {
      throw new Error('`url` param can be only a string')
    }
    var effectsArr = url.split('-/')
    var urlWithId = effectsArr[0]
    var protocolAndIdArr = urlWithId.split(this.cdn_url)
    this.protocol = protocolAndIdArr[0].split('://')[0]
    this.imageId = protocolAndIdArr[1].split('/')[0]
    for (var i = 1; i < effectsArr.length; i++) {
      this.parseValue(effectsArr[i])
    }
  }

  this.parseValue = function(formatString) {
    var formatArr = formatString.split('/')
    if (formatArr[0] == CROP_EFFECT) {
      this[formatArr[0]] = formatArr[1] ? formatArr[1] : null
      cropPos = formatArr[2] ? formatArr[2] : undefined
    } else {
      try {
        this[formatArr[0]] = formatArr[1] ? parseInt(formatArr[1], 10) : null
      } catch (ex) {
        this[formatArr[0]] = formatArr[1] ? formatArr[1] : null
      }
    }

    if (priorityArr.indexOf(formatArr[0]) === -1) {
      priorityArr.push(formatArr[0])
    }
  }

  this.getCropModifiers = function() {
    if (!this.crop || !this.cropSize || !this.coords) {
      return ''
    }
    const size = this.cropSize
    const {width, height} = this.coords
    const prefered = this.crop.preferedSize
    let modifiers = ''

    const wholeImage = width === size[0] && height === size[1]
    if (!wholeImage) {
      modifiers += `-/crop/${width}x${height}/${this.coords.left},${this.coords.top}/`
    }

    const downscale = this.crop.downscale && (width > prefered[0] || height > prefered[1])
    const upscale = this.crop.upscale && (width < prefered[0] || height < prefered[1])
    if (downscale || upscale) {
      console.log(this.coords)
      // modifiers += `-/resize/${prefered.join('x')}/`
    }

    return modifiers
  }

  this.getModifiers = function(withCrop = true) {
    var url =  ''
    uploadcare.jQuery.each(priorityArr, (key, val) => {
      if (val === CROP_EFFECT) {
        if (withCrop) {
          url += this.getCropModifiers()
        }
      }
      else if (effectsData[val] !== undefined && effectsData[val] !== 0) {
        url += '-/' + val + '/'
        if (effectsData[val] !== '' && effectsData[val] !== null) {
          url += effectsData[val] + '/'
        }
      }
    })
    return url
  }

  this.getBaseUrl = function() {
    return  this.protocol + '://' + this.cdn_url + this.imageId + '/'
  }

  this.getFinalUrl = function(withCrop = true) {
    return this.getBaseUrl() + this.getModifiers(withCrop)
  }

  this.getPreviewModifiers = function(width, height) {
    var res = '-/preview/'
    if (width) {
      res += width
    }
    if (height) {
      res += 'x' + height
    }
    if (width || height) {
      res += '/'
    }
    return res
  }

  this.getPreviewUrl = function(width, height, withCrop = true) {
    return this.getFinalUrl(withCrop) + this.getPreviewModifiers(width, height)
  }

  this.setCropSize = function(width, height) {
    this[CROP_EFFECT] = Math.round(width) + 'x' + Math.round(height)
    cropPos = undefined
  }

  this.getCropSize = function() {
    let sizeArr = this[CROP_EFFECT] ? this[CROP_EFFECT].split('x') : []
    return {
      width: sizeArr[0] ? parseInt(sizeArr[0], 10) : null,
      height: sizeArr[1] ? parseInt(sizeArr[1], 10) : null,
    }
  }

  this.setCropPosCenter = function() {
    cropPos = 'center'
  }

  this.setCropPos = function(posX, posY) {
    cropPos = posX + ',' + posY
  }

  this.getCropPos = function() {
    const posArr = cropPos ? cropPos.split(',') : []
    return {
      x: posArr[0] ? parseInt(posArr[0], 10) : null,
      y: posArr[1] ? parseInt(posArr[1], 10) : null,
    }
  }
}

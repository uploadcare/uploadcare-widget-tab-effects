(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["uploadcareTabEffects"] = factory();
	else
		root["uploadcareTabEffects"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _previewView = __webpack_require__(2);
	
	var _previewView2 = _interopRequireDefault(_previewView);
	
	var _effectsModel = __webpack_require__(25);
	
	var _effectsModel2 = _interopRequireDefault(_effectsModel);
	
	var _localeBuilder = __webpack_require__(26);
	
	var _localeBuilder2 = _interopRequireDefault(_localeBuilder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function uploadcareTabEffects(container, button, dialogApi, settings) {
	  if (typeof uploadcare === 'undefined') {
	    throw new ReferenceError('uploadcare is not defined');
	  }
	
	  uploadcare.plugin(function (uc) {
	    if (settings.multiple) {
	      return new uc.widget.tabs.PreviewTabMultiple(container, button, dialogApi, settings, name);
	    }
	
	    var PreviewTab = uc.widget.tabs.PreviewTab;
	
	    var customExtends = function customExtends(child, parent) {
	      for (var key in parent) {
	        if (Object.prototype.hasOwnProperty.call(parent, key)) {
	          child[key] = parent[key];
	        }
	      }
	
	      function Ctor() {
	        this.constructor = child;
	      }
	
	      Ctor.prototype = parent.prototype;
	      child.prototype = new Ctor();
	      child.__super__ = parent.prototype;
	
	      return child;
	    };
	
	    var EffectsPreviewTab = function () {
	      customExtends(EffectsPreviewTab, PreviewTab);
	
	      function EffectsPreviewTab(container, button, dialogApi, settings, name) {
	        EffectsPreviewTab.__super__.constructor.call(this, container, button, dialogApi, settings, name);
	      }
	
	      EffectsPreviewTab.prototype.__setState = function (state, data) {
	        var _this = this;
	
	        if (state === 'image') {
	          if (data.info) {
	            (function () {
	              var localeBuilder = new _localeBuilder2.default();
	
	              localeBuilder.build(uc.locale.translations);
	              uc.locale.rebuild();
	
	              var model = new _effectsModel2.default('ucarecdn.com/', data.info.originalImageInfo.width, data.info.originalImageInfo.height, data.info.crop, uc.locale);
	
	              model.parseUrl(data.info.cdnUrl);
	
	              var previewView = new _previewView2.default(container, model, uc, settings);
	
	              previewView.render().done(function () {
	                var newFile = _this.file.then(function (info) {
	                  info.cdnUrlModifiers = model.getModifiers() + model.getPreviewModifiers();
	                  info.cdnUrl = model.getPreviewUrl();
	                  info.crop = model.coords;
	
	                  return info;
	                });
	
	                dialogApi.fileColl.replace(_this.file, newFile);
	              }).fail(function () {
	                _this.file = null;
	                _this.__setState('error', { error: 'loadImage' });
	              });
	            })();
	          }
	        } else {
	          EffectsPreviewTab.__super__.__setState.call(this, state, data);
	        }
	      };
	
	      EffectsPreviewTab.prototype.initImage = function () {};
	
	      return EffectsPreviewTab;
	    }();
	
	    return new EffectsPreviewTab(container, button, dialogApi, settings, name);
	  });
	}
	
	module.exports = uploadcareTabEffects;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _preview = __webpack_require__(3);
	
	var _preview2 = _interopRequireDefault(_preview);
	
	var _cropAndRotateView = __webpack_require__(5);
	
	var _cropAndRotateView2 = _interopRequireDefault(_cropAndRotateView);
	
	var _enhanceView = __webpack_require__(13);
	
	var _enhanceView2 = _interopRequireDefault(_enhanceView);
	
	var _sharpenView = __webpack_require__(19);
	
	var _sharpenView2 = _interopRequireDefault(_sharpenView);
	
	var _IdGenerator = __webpack_require__(8);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(21);
	
	__webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PreviewView = function () {
	  function PreviewView(container, effectsModel, uc, settings) {
	    _classCallCheck(this, PreviewView);
	
	    this.container = container;
	    this.model = effectsModel;
	    this.$ = uc.jQuery;
	
	    this.cropAndRotateView = new _cropAndRotateView2.default(container, effectsModel, uc, settings);
	    this.enhanceView = new _enhanceView2.default(container, effectsModel, uc);
	    this.sharpenView = new _sharpenView2.default(container, effectsModel, uc);
	
	    this.CROP_AND_ROTATE_BTN_ID = 'cropAndRotateBtn_' + _IdGenerator2.default.Generate();
	    this.ENHANCE_BTN_ID = 'enhanceBtn_' + _IdGenerator2.default.Generate();
	    this.SHARPEN_BTN_ID = 'sharpenBtn_' + _IdGenerator2.default.Generate();
	    this.GRAYSCALE_BTN_ID = 'grayScaleBtn_' + _IdGenerator2.default.Generate();
	
	    this.DONE_BTN_ID = 'doneBtn_' + _IdGenerator2.default.Generate();
	    this.REMOVE_BTN_ID = 'removeBtn_' + _IdGenerator2.default.Generate();
	  }
	
	  _createClass(PreviewView, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      this.container = parentEl;
	      if (!this.viewDeferred || this.viewDeferred.state() === 'resolved') {
	        this.viewDeferred = this.$.Deferred();
	      }
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        cropAndRotateBtnId: this.CROP_AND_ROTATE_BTN_ID,
	        enhanceBtnId: this.ENHANCE_BTN_ID,
	        sharpenBtnId: this.SHARPEN_BTN_ID,
	        grayscaleBtnId: this.GRAYSCALE_BTN_ID,
	        doneBtn: this.DONE_BTN_ID,
	        removeBtn: this.REMOVE_BTN_ID,
	
	        appliedGrayscale: this.model.grayscale === null,
	        appliedSharpen: !!this.model.sharp,
	        appliedEnhance: !!this.model.enhance,
	        appliedCar: !!(this.model.rotate || this.model.crop),
	        locale: this.model.locale
	      };
	
	      var markupStr = (0, _preview2.default)(renderData);
	
	      parentEl.html(markupStr);
	
	      parentEl.removeClass('uploadcare--preview_status_loaded');
	      this.$(parentEl).find('.' + this.DONE_BTN_ID).attr('aria-disabled', true);
	      this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', true);
	
	      var img = parentEl.find('.uploadcare--preview__image');
	
	      if (img[0].complete) {
	        parentEl.addClass('uploadcare--preview_status_loaded');
	        this.$(parentEl).find('.' + this.DONE_BTN_ID).attr('aria-disabled', false);
	        this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', false);
	      }
	      img[0].addEventListener('load', function () {
	        parentEl.addClass('uploadcare--preview_status_loaded');
	        _this.$(parentEl).find('.' + _this.DONE_BTN_ID).attr('aria-disabled', false);
	        _this.$(parentEl).find('.uploadcare-tab-effects--effect-button').attr('aria-disabled', false);
	        _this.setupHandlers(parentEl);
	      });
	      img[0].addEventListener('error', function () {
	        _this.viewDeferred.reject('image load failed');
	      });
	      img[0].addEventListener('abort', function () {
	        _this.viewDeferred.reject('image load aborted');
	      });
	
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      this.$(parentEl).find('.' + this.CROP_AND_ROTATE_BTN_ID).click(function (ev) {
	        return _this2.cropAndRotateClick(ev);
	      });
	      this.$(parentEl).find('.' + this.ENHANCE_BTN_ID).click(function (ev) {
	        return _this2.enhanceClick(ev);
	      });
	      this.$(parentEl).find('.' + this.SHARPEN_BTN_ID).click(function (ev) {
	        return _this2.sharpenClick(ev);
	      });
	      this.$(parentEl).find('.' + this.GRAYSCALE_BTN_ID).click(function (ev) {
	        return _this2.grayScaleClick(ev);
	      });
	
	      this.$(parentEl).find('.' + this.REMOVE_BTN_ID).click(function (ev) {
	        return _this2.removeClick(ev);
	      });
	      this.$(parentEl).find('.' + this.DONE_BTN_ID).click(function (ev) {
	        return _this2.doneClick(ev);
	      });
	    }
	  }, {
	    key: 'cropAndRotateClick',
	    value: function cropAndRotateClick() {
	      var _this3 = this;
	
	      this.cropAndRotateView.render().then(function () {
	        _this3.render();
	      });
	    }
	  }, {
	    key: 'enhanceClick',
	    value: function enhanceClick() {
	      var _this4 = this;
	
	      this.enhanceView.render().then(function () {
	        _this4.render();
	      });
	    }
	  }, {
	    key: 'sharpenClick',
	    value: function sharpenClick() {
	      var _this5 = this;
	
	      this.sharpenView.render().then(function () {
	        _this5.render();
	      });
	    }
	  }, {
	    key: 'grayScaleClick',
	    value: function grayScaleClick() {
	      if (this.model.grayscale === null) {
	        this.model.grayscale = undefined;
	      } else {
	        this.model.grayscale = null;
	      }
	      this.render();
	    }
	  }, {
	    key: 'doneClick',
	    value: function doneClick() {
	      this.viewDeferred.resolve({ reason: 'Done' });
	    }
	  }, {
	    key: 'removeClick',
	    value: function removeClick() {
	      this.model.enhance = undefined;
	      this.model.sharp = undefined;
	      this.model.grayscale = undefined;
	      this.model.rotate = undefined;
	      this.model.crop = undefined;
	      this.render();
	    }
	  }]);
	
	  return PreviewView;
	}();
	
	exports.default = PreviewView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="uploadcare--panel__header">\r\n  <div class="uploadcare--text uploadcare--text_large uploadcare--panel__title uploadcare--preview__title">\r\n    ' +
	__e( locale.t('dialog.tabs.names.preview') ) +
	'\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--panel__content">\r\n  <div class="uploadcare--preview__image-container">\r\n    <img src="' +
	((__t = ( previewUrl )) == null ? '' : __t) +
	'" alt="" class="uploadcare--preview__image"/>\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--footer uploadcare--panel__footer">\r\n  <div class="uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back ' +
	((__t = ( removeBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.remove') ) +
	'</div>\r\n\r\n  <div class="uploadcare--footer__additions">\r\n    <div class="uploadcare-tab-effects--effect-buttons">\r\n      <div class="uploadcare-tab-effects--effect-button ';
	 if(appliedCar) { ;
	__p += 'uploadcare-tab-effects--effect-button_applied';
	 } ;
	__p += ' ' +
	((__t = ( cropAndRotateBtnId )) == null ? '' : __t) +
	'"\r\n           role="button">\r\n        <svg width="29" height="28" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd" class="svg-stroke"><path d="M7.5 28V7h21"/><path d="M21 0v21H0"/></g></svg>\r\n        <div class="uploadcare-tab-effects--effect-button__caption">' +
	__e( locale.t('dialog.tabs.effects.captions.cropAndRotate') ) +
	'</div>\r\n      </div>\r\n      <div class="uploadcare-tab-effects--effect-button ';
	 if(appliedEnhance) { ;
	__p += 'uploadcare-tab-effects--effect-button_applied';
	 } ;
	__p += ' ' +
	((__t = ( enhanceBtnId )) == null ? '' : __t) +
	'"\r\n           role="button">\r\n        <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd" class="svg-stroke"><path d="M11.616 11.037c-5.015 3.843-1 8.997-1 8.997 5.311 0 9.616-4.26 9.616-9.517C20.232 5.261 15.927 1 10.616 1c0 0 6.016 6.194 1 10.037z" fill="#000" class="svg-fill"/><path d="M10.616 1C5.306 1 1 5.261 1 10.517c0 5.256 4.305 9.517 9.616 9.517"/></g></svg>\r\n        <div class="uploadcare-tab-effects--effect-button__caption">' +
	__e( locale.t('dialog.tabs.effects.captions.enhance') ) +
	'</div>\r\n      </div>\r\n      <div class="uploadcare-tab-effects--effect-button ';
	 if(appliedSharpen) { ;
	__p += 'uploadcare-tab-effects--effect-button_applied';
	 } ;
	__p += ' ' +
	((__t = ( sharpenBtnId )) == null ? '' : __t) +
	'"\r\n           role="button">\r\n        <svg width="26" height="22" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd" stroke-linejoin="round" class="svg-stroke"><path d="M13 22L25 1H1z"/></g></svg>\r\n        <div class="uploadcare-tab-effects--effect-button__caption">' +
	__e( locale.t('dialog.tabs.effects.captions.sharpen') ) +
	'</div>\r\n      </div>\r\n      <div class="uploadcare-tab-effects--effect-button ';
	 if(appliedGrayscale) { ;
	__p += 'uploadcare-tab-effects--effect-button_applied';
	 } ;
	__p += ' ' +
	((__t = ( grayscaleBtnId )) == null ? '' : __t) +
	'"\r\n           role="button">\r\n        <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd" class="svg-stroke"><path d="M10.616 20.034c5.311 0 9.616-4.26 9.616-9.517C20.232 5.261 15.927 1 10.616 1" fill="#000" class="svg-fill"/><path d="M10.616 1C5.306 1 1 5.261 1 10.517c0 5.256 4.305 9.517 9.616 9.517"/></g></svg>\r\n        <div class="uploadcare-tab-effects--effect-button__caption">' +
	__e( locale.t('dialog.tabs.effects.captions.grayscale') ) +
	'</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="uploadcare--button uploadcare--button_primary uploadcare--preview__done ' +
	((__t = ( doneBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.done') ) +
	'</div>\r\n</div>\r\n';
	
	}
	return __p
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function () {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) {
	        args.push(arguments[position++]);
	      }return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function later() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) {
	        result = args[i].call(this, result);
	      }return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) {
	      if (_.has(obj, key)) keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) {
	      keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function iteratee(value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function iteratee(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };
	
	  _.noop = function () {};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) {
	      accum[i] = iteratee(i);
	    }return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };
	
	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'": "'",
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function template(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cropAndRotate = __webpack_require__(6);
	
	var _cropAndRotate2 = _interopRequireDefault(_cropAndRotate);
	
	var _cropSizes__item = __webpack_require__(7);
	
	var _cropSizes__item2 = _interopRequireDefault(_cropSizes__item);
	
	var _IdGenerator = __webpack_require__(8);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CropAndRotateView = function () {
	  function CropAndRotateView(container, effectsModel, uc, settings) {
	    _classCallCheck(this, CropAndRotateView);
	
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
	
	    this.DONE_BTN_ID = 'carApplyBtn' + _IdGenerator2.default.Generate();
	    this.CANCEL_BTN_ID = 'carCancelBtn' + _IdGenerator2.default.Generate();
	
	    this.ROTATE_LEFT_BTN = 'carRotateLeftBtn' + _IdGenerator2.default.Generate();
	    this.ROTATE_RIGHT_BTN = 'carRotateRightBtn' + _IdGenerator2.default.Generate();
	  }
	
	  _createClass(CropAndRotateView, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      if (!this.viewDeferred || this.viewDeferred.state() === 'resolved') {
	        this.viewDeferred = this.$.Deferred();
	      }
	
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382, false),
	        carApplyBtn: this.DONE_BTN_ID,
	        carCancelBtn: this.CANCEL_BTN_ID,
	        carRotateLeftBtn: this.ROTATE_LEFT_BTN,
	        carRotateRightBtn: this.ROTATE_RIGHT_BTN,
	        rotate: this.model.rotate,
	        rotateDirection: this.rotateDirection,
	        locale: this.model.locale
	      };
	
	      var markupStr = (0, _cropAndRotate2.default)(renderData);
	
	      parentEl.html(markupStr);
	      this.populateCropSizes();
	
	      parentEl.removeClass('uploadcare--preview_status_loaded');
	      this.$(parentEl).find('.' + this.DONE_BTN_ID).attr('aria-disabled', true);
	      this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', true);
	      this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', true);
	
	      var img = this.$(parentEl).find('.uploadcare--preview__image');
	
	      if (img[0].complete) {
	        parentEl.addClass('uploadcare--preview_status_loaded');
	        this.$(parentEl).find('.' + this.DONE_BTN_ID).attr('aria-disabled', false);
	        this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
	        this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', false);
	        this.setupHandlers(parentEl);
	        if (this.crop) {
	          this.startCrop(img);
	        }
	      } else {
	        img[0].addEventListener('load', function () {
	          parentEl.addClass('uploadcare--preview_status_loaded');
	          _this.$(parentEl).find('.' + _this.DONE_BTN_ID).attr('aria-disabled', false);
	          _this.$(parentEl).find('.uploadcare-tab-effects--rotate-button').attr('aria-disabled', false);
	          _this.$(parentEl).find('.uploadcare--crop-sizes__item').attr('aria-disabled', false);
	          _this.setupHandlers(parentEl);
	          if (_this.crop) {
	            _this.startCrop(img);
	          }
	        });
	        img[0].addEventListener('error', function () {
	          _this.viewDeferred.reject('image load failed');
	        });
	        img[0].addEventListener('abort', function () {
	          _this.viewDeferred.reject('image load aborted');
	        });
	      }
	
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      this.$(parentEl).find('.' + this.CANCEL_BTN_ID).click(function (ev) {
	        return _this2.carCancelClick(ev);
	      });
	      this.$(parentEl).find('.' + this.DONE_BTN_ID).click(function (ev) {
	        return _this2.carApplyClick(ev);
	      });
	      this.$(parentEl).find('.' + this.ROTATE_LEFT_BTN).click(function () {
	        return _this2.carRotateClick(-1);
	      });
	      this.$(parentEl).find('.' + this.ROTATE_RIGHT_BTN).click(function () {
	        return _this2.carRotateClick(1);
	      });
	    }
	  }, {
	    key: 'carCancelClick',
	    value: function carCancelClick() {
	      this.model.rotate = undefined;
	
	      this.viewDeferred.resolve({ reason: 'Cancel' });
	    }
	  }, {
	    key: 'carApplyClick',
	    value: function carApplyClick() {
	      if (this.crop && this.widget) {
	        this.model.cropIndex = this.currentCropIndex;
	        this.model.crop = this.widget.crop;
	        this.model.cropSize = this.widget.originalSize;
	        this.model.coords = this.widget.getSelection();
	      }
	      this.viewDeferred.resolve({ reason: 'Apply' });
	    }
	  }, {
	    key: 'carRotateClick',
	    value: function carRotateClick(rotateDirection) {
	      if (this.model.rotate === undefined) {
	        if (rotateDirection === -1) {
	          this.model.rotate = 90;
	        }
	        if (rotateDirection === 1) {
	          this.model.rotate = 270;
	        }
	      } else {
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
	  }, {
	    key: 'populateCropSizes',
	    value: function populateCropSizes() {
	      var _this3 = this;
	
	      var control = this.container.find('.uploadcare--crop-sizes');
	      var template = (0, _cropSizes__item2.default)();
	      var currentClass = 'uploadcare--crop-sizes__item_current';
	
	      this.$.each(this.crop, function (i, crop) {
	        var prefered = crop.preferedSize;
	        var caption = void 0;
	
	        if (prefered) {
	          var gcd = _this3.uc.utils.gcd(prefered[0], prefered[1]);
	
	          caption = prefered[0] / gcd + ':' + prefered[1] / gcd;
	        } else {
	          caption = _this3.uc.locale.t('dialog.tabs.preview.crop.free');
	        }
	
	        var item = _this3.$(template).appendTo(control).attr('data-caption', caption).on('click', function (e) {
	          if (!_this3.$(e.currentTarget).hasClass(currentClass) && _this3.crop.length > 1 && _this3.widget) {
	            _this3.widget.setCrop(crop);
	            control.find('.uploadcare--crop-sizes__item').removeClass(currentClass);
	            item.addClass(currentClass);
	            _this3.currentCropIndex = i;
	          }
	        });
	
	        if (prefered) {
	          var size = _this3.uc.utils.fitSize(prefered, [30, 30], true);
	
	          item.find('.uploadcare--crop-sizes__icon').css({
	            width: Math.max(20, size[0]),
	            height: Math.max(12, size[1])
	          });
	        } else {
	          item.find('.uploadcare--crop-sizes__icon').addClass('uploadcare--crop-sizes__icon_free');
	        }
	      });
	      control.find('.uploadcare--crop-sizes__item').eq(this.currentCropIndex).addClass(currentClass);
	    }
	  }, {
	    key: 'startCrop',
	    value: function startCrop(img) {
	      var size = this.model.rotate && !!~[90, 270].indexOf(this.model.rotate) ? [this.model.imgHeight, this.model.imgWidth] : [this.model.imgWidth, this.model.imgHeight];
	
	      this.widget = new this.uc.crop.CropWidget(img, size, this.crop[this.currentCropIndex]);
	
	      var cdnModifiers = this.model.getCropModifiers();
	
	      if (cdnModifiers) {
	        this.widget.setSelectionFromModifiers(cdnModifiers);
	      }
	    }
	  }]);
	
	  return CropAndRotateView;
	}();
	
	exports.default = CropAndRotateView;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="uploadcare--panel__header">\r\n  <div class="uploadcare--text uploadcare--text_large uploadcare--panel__title uploadcare--preview__title">\r\n    ' +
	__e( locale.t('dialog.tabs.effects.captions.cropAndRotate') ) +
	'\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--panel__content">\r\n  <div class="uploadcare--preview__image-container">\r\n    <img src="' +
	((__t = ( previewUrl )) == null ? '' : __t) +
	'" alt="" class="uploadcare--preview__image"/>\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--footer uploadcare--panel__footer uploadcare--panel__footer_inverted">\r\n  <div class="uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back ' +
	((__t = ( carCancelBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.cancel') ) +
	'</div>\r\n\r\n  <div class="uploadcare--footer__additions">\r\n    <div role="button" class="uploadcare-tab-effects--rotate-button ' +
	((__t = ( carRotateLeftBtn )) == null ? '' : __t) +
	' ';
	 if(rotateDirection == -1) {;
	__p += ' uploadcare-tab-effects--rotate-button_current ';
	};
	__p += '">\r\n      <svg width="29" height="25" viewBox="0 0 29 25" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd"><path d="M5 12.5C5 6.149 10.149 1 16.5 1S28 6.149 28 12.5 22.851 24 16.5 24"/><path d="M9 9l-4 4-4-4"/></g></svg>\r\n    </div>\r\n\r\n    <div class="uploadcare--crop-sizes"></div>\r\n\r\n    <div role="button" class="uploadcare-tab-effects--rotate-button ' +
	((__t = ( carRotateRightBtn )) == null ? '' : __t) +
	' ';
	 if(rotateDirection == 1) {;
	__p += ' uploadcare-tab-effects--rotate-button_current ';
	};
	__p += '">\r\n      <svg width="29" height="25" viewBox="0 0 29 25" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" fill="none" fill-rule="evenodd"><path d="M24 12.5C24 6.149 18.851 1 12.5 1S1 6.149 1 12.5 6.149 24 12.5 24"/><path d="M20 9l4 4 4-4"/></g></svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="uploadcare--button uploadcare--button_primary uploadcare--preview__done ' +
	((__t = ( carApplyBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.done') ) +
	'</div>\r\n</div>\r\n';
	
	}
	return __p
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="uploadcare--crop-sizes__item" data-caption="">\r\n  <div class="uploadcare--crop-sizes__icon"></div>\r\n</div>\r\n';
	
	}
	return __p
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  Generate: function Generate() {
	    var myRandom = function myRandom() {
	      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    };
	
	    return myRandom() + myRandom();
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./rotate-button.pcss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./rotate-button.pcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--rotate-button {\r\n  flex-basis: 60px;\r\n\r\n  svg {\r\n    g {\r\n      stroke: #454545;\r\n    }\r\n  }\r\n\r\n  &:hover, &:focus {\r\n    svg {\r\n      g {\r\n        stroke: #282828;\r\n      }\r\n    }\r\n  }\r\n\r\n  &:active {\r\n    svg {\r\n      g {\r\n        stroke: #000;\r\n      }\r\n    }\r\n  }\r\n\r\n  &[aria-disabled=true] {\r\n    cursor: not-allowed;\r\n    opacity: .65;\r\n  }\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button_current {\r\n  position: relative;\r\n\r\n  &:before {\r\n    content: '';\r\n    display: block;\r\n\r\n    position: absolute;\r\n    top: 100%;\r\n    left: 50%;\r\n\r\n    width: 6px;\r\n    height: 6px;\r\n\r\n    background: #3787ec;\r\n    border-radius: 50%;\r\n\r\n    transform: translateX(-50%);\r\n  }\r\n}\r\n\r\n", ""]);
	
	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enhance = __webpack_require__(14);
	
	var _enhance2 = _interopRequireDefault(_enhance);
	
	var _slider = __webpack_require__(15);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(8);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EnhanceView = function () {
	  function EnhanceView(container, effectsModel, uc) {
	    var _this = this;
	
	    _classCallCheck(this, EnhanceView);
	
	    this.container = container;
	    this.model = effectsModel;
	    this.$ = uc.jQuery;
	
	    this.slider = new _slider2.default();
	
	    this.slider.onChange(function (newVal) {
	      return _this.onChangeSlider(newVal);
	    });
	
	    this.SLIDER_ID = 'slider_' + _IdGenerator2.default.Generate();
	    this.PREVIEW_IMG_ID = 'preview_mage_' + _IdGenerator2.default.Generate();
	
	    this.ENHANCE_APPLY_BTN_ID = 'enhanceApplyBtn_' + _IdGenerator2.default.Generate();
	    this.ENHANCE_CANCEL_BTN_ID = 'enhanceCancelBtn_' + _IdGenerator2.default.Generate();
	  }
	
	  _createClass(EnhanceView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      if (!this.viewDeferred || this.viewDeferred.state() === 'resolved') {
	        this.viewDeferred = this.$.Deferred();
	      }
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        sliderId: this.SLIDER_ID,
	        previewImageId: this.PREVIEW_IMG_ID,
	        enhanceApplyBtn: this.ENHANCE_APPLY_BTN_ID,
	        enhanceCancelBtn: this.ENHANCE_CANCEL_BTN_ID,
	        locale: this.model.locale
	      };
	
	      var markupStr = (0, _enhance2.default)(renderData);
	
	      parentEl.html(markupStr);
	
	      var sliderContainer = this.$(parentEl).find('.' + this.SLIDER_ID);
	
	      this.slider.render(sliderContainer, this.model.enhance);
	
	      this.setupHandlers(parentEl);
	
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      this.$(parentEl).find('.' + this.ENHANCE_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.enhanceCancelClick(ev);
	      });
	      this.$(parentEl).find('.' + this.ENHANCE_APPLY_BTN_ID).click(function (ev) {
	        return _this2.enhanceApplyClick(ev);
	      });
	    }
	  }, {
	    key: 'enhanceCancelClick',
	    value: function enhanceCancelClick() {
	      this.model.enhance = undefined;
	      this.viewDeferred.resolve({ reason: 'Cancel' });
	    }
	  }, {
	    key: 'enhanceApplyClick',
	    value: function enhanceApplyClick() {
	      this.viewDeferred.resolve({ reason: 'Apply' });
	    }
	  }, {
	    key: 'onChangeSlider',
	    value: function onChangeSlider(newVal) {
	      var _this3 = this;
	
	      if (this.timeoutId) {
	        clearTimeout(this.timeoutId);
	      }
	      this.timeoutId = setTimeout(function () {
	        _this3.model.enhance = newVal;
	        _this3.container.find('.' + _this3.PREVIEW_IMG_ID).attr('src', _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	
	  return EnhanceView;
	}();
	
	exports.default = EnhanceView;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '<div class="uploadcare--panel__header">\r\n  <div class="uploadcare--text uploadcare--text_large uploadcare--panel__title uploadcare--preview__title">\r\n    ' +
	__e( locale.t('dialog.tabs.effects.captions.enhance') ) +
	'\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--panel__content">\r\n  <div class="uploadcare--preview__image-container">\r\n    <img src="' +
	((__t = ( previewUrl )) == null ? '' : __t) +
	'" alt="" class="uploadcare--preview__image ' +
	((__t = ( previewImageId)) == null ? '' : __t) +
	'"/>\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--footer uploadcare--panel__footer uploadcare--panel__footer_inverted">\r\n  <div class="uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back ' +
	((__t = ( enhanceCancelBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.cancel') ) +
	'</div>\r\n\r\n  <div class="uploadcare--footer__additions">\r\n    <div class="uploadcare-tab-effects--slider ' +
	((__t = ( sliderId )) == null ? '' : __t) +
	'"></div>\r\n  </div>\r\n\r\n  <div class="uploadcare--button uploadcare--button_primary uploadcare--preview__done ' +
	((__t = ( enhanceApplyBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.done') ) +
	'</div>\r\n</div>\r\n';
	
	}
	return __p
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _slider = __webpack_require__(16);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(8);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $ = uploadcare.jQuery;
	
	var Slider = function () {
	  function Slider(container) {
	    var maxValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	
	    _classCallCheck(this, Slider);
	
	    this.container = container;
	    this.onChangeHandler = null;
	    this.maxValue = maxValue;
	    this.RANGE_ID = 'range_' + _IdGenerator2.default.Generate();
	  }
	
	  _createClass(Slider, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this.container = parentEl;
	      var markupStr = (0, _slider2.default)({
	        pointerId: this.RANGE_ID,
	        min: 0,
	        max: this.maxValue,
	        value: value
	      });
	
	      parentEl.html(markupStr);
	      this.setupHandlers(parentEl);
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this = this;
	
	      this.$range = $(parentEl).find('.' + this.RANGE_ID);
	
	      this.$range.on('change', function (ev) {
	        return _this.change(ev);
	      });
	    }
	  }, {
	    key: 'change',
	    value: function change(ev) {
	      if (this.onChangeHandler) {
	        this.onChangeHandler(ev.currentTarget.value);
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(handler) {
	      this.onChangeHandler = handler;
	    }
	  }]);
	
	  return Slider;
	}();
	
	exports.default = Slider;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<input type="range" class="uploadcare--input-range ' +
	((__t = ( pointerId )) == null ? '' : __t) +
	'" min="' +
	((__t = ( min )) == null ? '' : __t) +
	'" max="' +
	((__t = ( max )) == null ? '' : __t) +
	'" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'"/>';
	
	}
	return __p
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./slider.pcss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./slider.pcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--slider {\r\n  flex: 1;\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range {\r\n  -webkit-appearance: none;\r\n  display: inline-block;\r\n\r\n  width: 100%;\r\n  height: 40px;\r\n\r\n  background: transparent;\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range:focus {\r\n  outline: color(#157cfc a(50%)) 2px solid;\r\n  outline-offset: 1px;\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range::-webkit-slider-runnable-track {\r\n  -webkit-appearance: none;\r\n  height: 4px;\r\n\r\n  border-radius: 2px;\r\n  border: none;\r\n  background: #9b9b9b;\r\n\r\n  cursor: pointer;\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range::-webkit-slider-thumb {\r\n  -webkit-appearance: none;\r\n  width: 20px;\r\n  height: 20px;\r\n\r\n  margin-top: -8px;\r\n\r\n  border: none;\r\n  border-radius: 50%;\r\n  background: #454545;\r\n  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .3);\r\n\r\n  cursor: pointer;\r\n\r\n  transition: box-shadow .3s, background .3s;\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range::-webkit-slider-thumb:hover,\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range::-webkit-slider-thumb:focus {\r\n  background-color: #5b5b5b;\r\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, .5);\r\n}\r\n\r\n.uploadcare-tab-effects--slider input[type=\"range\"].uploadcare--input-range::-webkit-slider-thumb:active {\r\n  background-color: #282828;\r\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, .5);\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sharpen = __webpack_require__(20);
	
	var _sharpen2 = _interopRequireDefault(_sharpen);
	
	var _slider = __webpack_require__(15);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(8);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SharpenView = function () {
	  function SharpenView(container, effectsModel, uc) {
	    var _this = this;
	
	    _classCallCheck(this, SharpenView);
	
	    this.container = container;
	    this.model = effectsModel;
	    this.$ = uc.jQuery;
	    this.slider = new _slider2.default(null, 20);
	    this.slider.onChange(function (newVal) {
	      return _this.onChangeSlider(newVal);
	    });
	
	    this.SLIDER_ID = 'slider_' + _IdGenerator2.default.Generate();
	    this.PREVIEW_IMG_ID = 'preview_mage_' + _IdGenerator2.default.Generate();
	    this.SHARPEN_APPLY_BTN_ID = 'sharpenApplyBtn' + +_IdGenerator2.default.Generate();
	    this.SHARPEN_CANCEL_BTN_ID = 'sharpenCancelBtn' + +_IdGenerator2.default.Generate();
	  }
	
	  _createClass(SharpenView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      if (!this.viewDeferred || this.viewDeferred.state() === 'resolved') {
	        this.viewDeferred = this.$.Deferred();
	      }
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        sliderId: this.SLIDER_ID,
	        previewImageId: this.PREVIEW_IMG_ID,
	        sharpenApplyBtn: this.SHARPEN_APPLY_BTN_ID,
	        sharpenCancelBtn: this.SHARPEN_CANCEL_BTN_ID,
	        locale: this.model.locale
	      };
	
	      var markupStr = (0, _sharpen2.default)(renderData);
	
	      parentEl.html(markupStr);
	
	      var sliderContainer = this.$(parentEl).find('.' + this.SLIDER_ID);
	
	      this.slider.render(sliderContainer, this.model.sharp);
	
	      this.setupHandlers(parentEl);
	
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      this.$(parentEl).find('.' + this.SHARPEN_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.sharpenCancelClick(ev);
	      });
	      this.$(parentEl).find('.' + this.SHARPEN_APPLY_BTN_ID).click(function (ev) {
	        return _this2.sharpenApplyClick(ev);
	      });
	    }
	  }, {
	    key: 'sharpenCancelClick',
	    value: function sharpenCancelClick() {
	      this.model.sharp = undefined;
	      this.viewDeferred.resolve({ reason: 'Cancel' });
	    }
	  }, {
	    key: 'sharpenApplyClick',
	    value: function sharpenApplyClick() {
	      this.viewDeferred.resolve({ reason: 'Apply' });
	    }
	  }, {
	    key: 'onChangeSlider',
	    value: function onChangeSlider(newVal) {
	      var _this3 = this;
	
	      if (this.timeoutId) {
	        clearTimeout(this.timeoutId);
	      }
	      this.timeoutId = setTimeout(function () {
	        _this3.model.sharp = newVal;
	        _this3.container.find('.' + _this3.PREVIEW_IMG_ID).attr('src', _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	
	  return SharpenView;
	}();
	
	exports.default = SharpenView;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	__p += '<div class="uploadcare--panel__header">\r\n  <div class="uploadcare--text uploadcare--text_large uploadcare--panel__title uploadcare--preview__title">\r\n    ' +
	__e( locale.t('dialog.tabs.effects.captions.sharpen') ) +
	'\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--panel__content">\r\n  <div class="uploadcare--preview__image-container">\r\n    <img src="' +
	((__t = ( previewUrl )) == null ? '' : __t) +
	'" alt="" class="uploadcare--preview__image ' +
	((__t = ( previewImageId)) == null ? '' : __t) +
	'"/>\r\n  </div>\r\n</div>\r\n\r\n<div class="uploadcare--footer uploadcare--panel__footer uploadcare--panel__footer_inverted">\r\n  <div class="uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back ' +
	((__t = ( sharpenCancelBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.cancel') ) +
	'</div>\r\n\r\n  <div class="uploadcare--footer__additions">\r\n    <div class="uploadcare-tab-effects--slider ' +
	((__t = ( sliderId )) == null ? '' : __t) +
	'"></div>\r\n  </div>\r\n\r\n  <div class="uploadcare--button uploadcare--button_primary uploadcare--preview__done ' +
	((__t = ( sharpenApplyBtn )) == null ? '' : __t) +
	'"\r\n       tabindex="0" role="button">' +
	__e( locale.t('dialog.tabs.effects.buttons.done') ) +
	'</div>\r\n</div>\r\n';
	
	}
	return __p
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./effect-buttons.pcss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./effect-buttons.pcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--effect-buttons {\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: space-around;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./effect-button.pcss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./effect-button.pcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--effect-button {\r\n  flex: 0 1 auto;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: flex-end;\r\n\r\n  height: 45px;\r\n\r\n  color: #454545;\r\n\r\n  .svg-stroke {\r\n    stroke: #454545;\r\n  }\r\n\r\n  .svg-fill {\r\n    fill: #454545;\r\n  }\r\n\r\n  &:hover, &:focus {\r\n    color: #282828;\r\n\r\n    .svg-stroke {\r\n      stroke: #282828;\r\n    }\r\n\r\n    .svg-fill {\r\n      fill: #282828;\r\n    }\r\n  }\r\n\r\n  &:active {\r\n    color: #000;\r\n\r\n    .svg-stroke {\r\n      stroke: #000;\r\n    }\r\n\r\n    .svg-fill {\r\n      fill: #000;\r\n    }\r\n  }\r\n\r\n  &[aria-disabled=true] {\r\n    cursor: not-allowed;\r\n    opacity: .65;\r\n  }\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button_applied {\r\n  position: relative;\r\n\r\n  &:before {\r\n    content: '';\r\n    display: block;\r\n\r\n    position: absolute;\r\n    top: calc(100% + 3px);\r\n    left: 50%;\r\n\r\n    width: 6px;\r\n    height: 6px;\r\n\r\n    background: #3787ec;\r\n    border-radius: 50%;\r\n\r\n    transform: translateX(-50%);\r\n  }\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button__caption {\r\n  font-size: 13px;\r\n  line-height: 15px;\r\n\r\n  text-transform: uppercase;\r\n\r\n  margin-top: 5px;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = EffectsModel;
	var FORMAT_EFFECT = 'format';
	var PROGRESSIVE_EFFECT = 'progressive';
	var QUALITY_EFFECT = 'quality';
	var ROTATE_EFFECT = 'rotate';
	var AUTOROTATE_EFFECT = 'autorotate';
	var FLIP_EFFECT = 'flip';
	var MIRROR_EFFECT = 'mirror';
	var ENHANCE_EFFECT = 'enhance';
	var SHARP_EFFECT = 'sharp';
	var BLUR_EFFECT = 'blur';
	var GRAYSCALE_EFFECT = 'grayscale';
	var INVERT_EFFECT = 'invert';
	var CROP_EFFECT = 'crop';
	
	function EffectsModel(CDNBaseUrl, imgWidth, imgHeight, crop, locale) {
	  this.CDNBaseUrl = CDNBaseUrl;
	  this.imgWidth = imgWidth;
	  this.imgHeight = imgHeight;
	  var cropPos = undefined;
	  var priorityArr = [];
	  var effectsData = {};
	
	  this.locale = locale;
	
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
	      set: function set(value) {
	        effectsData[propertyName] = value;
	
	        var propInd = priorityArr.indexOf(propertyName);
	
	        if (value === undefined) {
	          if (propInd !== -1) {
	            priorityArr.splice(propInd, 1);
	          }
	        } else if (propInd === -1) {
	          priorityArr.push(propertyName);
	        } else {
	          priorityArr.splice(propInd, 1);
	          priorityArr.push(propertyName);
	        }
	
	        return value;
	      },
	
	      get: function get() {
	        return effectsData[propertyName];
	      }
	    };
	  }
	
	  this.parseUrl = function (url) {
	    if (typeof url !== 'string') {
	      throw new Error('`url` param can be only a string');
	    }
	    var effectsArr = url.split('-/');
	    var urlWithId = effectsArr[0];
	    var protocolAndIdArr = urlWithId.split(this.CDNBaseUrl);
	
	    this.protocol = protocolAndIdArr[0].split('://')[0];
	    this.imageId = protocolAndIdArr[1].split('/')[0];
	    for (var i = 1; i < effectsArr.length; i++) {
	      this.parseValue(effectsArr[i]);
	    }
	  };
	
	  this.parseValue = function (formatString) {
	    var formatArr = formatString.split('/');
	
	    if (formatArr[0] == CROP_EFFECT) {
	      this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
	      cropPos = formatArr[2] ? formatArr[2] : undefined;
	    } else {
	      try {
	        this[formatArr[0]] = formatArr[1] ? parseInt(formatArr[1]) : null;
	      } catch (ex) {
	        this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
	      }
	    }
	
	    if (priorityArr.indexOf(formatArr[0]) === -1) {
	      priorityArr.push(formatArr[0]);
	    }
	  };
	
	  this.getCropModifiers = function () {
	    if (!this.crop || !this.cropSize || !this.coords) {
	      return '';
	    }
	    var size = this.cropSize;
	    var _coords = this.coords;
	    var width = _coords.width;
	    var height = _coords.height;
	    // const prefered = this.crop.preferedSize
	
	    var modifiers = '';
	
	    var wholeImage = width === size[0] && height === size[1];
	
	    if (!wholeImage) {
	      modifiers += '-/crop/' + width + 'x' + height + '/' + this.coords.left + ',' + this.coords.top + '/';
	    }
	
	    // const downscale = this.crop.downscale && (width > prefered[0] || height > prefered[1])
	    // const upscale = this.crop.upscale && (width < prefered[0] || height < prefered[1])
	    //
	    // if (downscale || upscale) {
	    //   // modifiers += `-/resize/${prefered.join('x')}/`
	    // }
	
	    return modifiers;
	  };
	
	  this.getModifiers = function () {
	    var _this = this;
	
	    var withCrop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    var url = '';
	
	    uploadcare.jQuery.each(priorityArr, function (key, val) {
	      if (val === CROP_EFFECT) {
	        if (withCrop) {
	          url += _this.getCropModifiers();
	        }
	      } else if (effectsData[val] !== undefined && effectsData[val] !== 0) {
	        url += '-/' + val + '/';
	        if (effectsData[val] !== '' && effectsData[val] !== null) {
	          url += effectsData[val] + '/';
	        }
	      }
	    });
	
	    return url;
	  };
	
	  this.getBaseUrl = function () {
	    return this.protocol + '://' + this.CDNBaseUrl + this.imageId + '/';
	  };
	
	  this.getFinalUrl = function () {
	    var withCrop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    return this.getBaseUrl() + this.getModifiers(withCrop);
	  };
	
	  this.getPreviewModifiers = function (width, height) {
	    var res = '-/preview/';
	
	    if (width) {
	      res += width;
	    }
	    if (height) {
	      res += 'x' + height;
	    }
	    if (width || height) {
	      res += '/';
	    }
	
	    return res;
	  };
	
	  this.getPreviewUrl = function (width, height) {
	    var withCrop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	    return this.getFinalUrl(withCrop) + this.getPreviewModifiers(width, height);
	  };
	
	  this.setCropSize = function (width, height) {
	    this[CROP_EFFECT] = Math.round(width) + 'x' + Math.round(height);
	    cropPos = undefined;
	  };
	
	  this.getCropSize = function () {
	    var sizeArr = this[CROP_EFFECT] ? this[CROP_EFFECT].split('x') : [];
	
	    return {
	      width: sizeArr[0] ? parseInt(sizeArr[0]) : null,
	      height: sizeArr[1] ? parseInt(sizeArr[1]) : null
	    };
	  };
	
	  this.setCropPosCenter = function () {
	    cropPos = 'center';
	  };
	
	  this.setCropPos = function (posX, posY) {
	    cropPos = posX + ',' + posY;
	  };
	
	  this.getCropPos = function () {
	    var posArr = cropPos ? cropPos.split(',') : [];
	
	    return {
	      x: posArr[0] ? parseInt(posArr[0]) : null,
	      y: posArr[1] ? parseInt(posArr[1]) : null
	    };
	  };
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _en = __webpack_require__(27);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _ru = __webpack_require__(28);
	
	var _ru2 = _interopRequireDefault(_ru);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocaleBuilder = function () {
	  function LocaleBuilder() {
	    _classCallCheck(this, LocaleBuilder);
	
	    this.localeStruct = {
	      en: _en2.default,
	      ru: _ru2.default
	    };
	  }
	
	  // build to uc.locale.translations.en.dialog.tabs.effects
	
	
	  _createClass(LocaleBuilder, [{
	    key: 'build',
	    value: function build(ucStruct) {
	      for (var key in this.localeStruct) {
	        if (ucStruct.hasOwnProperty(key)) {
	          ucStruct[key].dialog.tabs.effects = this.localeStruct[key];
	        }
	      }
	    }
	  }]);
	
	  return LocaleBuilder;
	}();
	
	exports.default = LocaleBuilder;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  captions: {
	    sharpen: 'Sharpen',
	    enhance: 'Enhance',
	    grayscale: 'Grayscale',
	    cropAndRotate: 'Crop & Rotate'
	  },
	  buttons: {
	    remove: 'Remove',
	    done: 'Done',
	    cancel: 'Cancel'
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  captions: {
	    sharpen: 'Sharpen',
	    enhance: 'Enhance',
	    grayscale: 'Grayscale',
	    cropAndRotate: 'Crop & Rotate'
	  },
	  buttons: {
	    remove: 'Очистить',
	    done: 'Готово',
	    cancel: 'Отмена'
	  }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=uploadcare.tab-effects.js.map
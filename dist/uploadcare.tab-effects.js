/******/ (function(modules) { // webpackBootstrap
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

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = uploadcareTabEffects;
	
	var _previewView = __webpack_require__(2);
	
	var _previewView2 = _interopRequireDefault(_previewView);
	
	var _effectsModel = __webpack_require__(57);
	
	var _effectsModel2 = _interopRequireDefault(_effectsModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function effectsTab(container, button, dialogApi, settings) {
	
	  var filePromises = dialogApi.fileColl.get();
	  // getting first image for preview;
	  var isFileTaken = false;
	
	  filePromises.forEach(function (promise, i) {
	    promise.then(function (fileInfo) {
	
	      if (isFileTaken) {
	        return;
	      }
	
	      if (fileInfo.isImage) {
	        isFileTaken = true;
	      }
	      var model = new _effectsModel2.default('ucarecdn.com/');
	      model.parseUrl(fileInfo.cdnUrl);
	      var previewView = new _previewView2.default(container, model);
	      previewView.render().then(function (type) {
	        fileInfo.cdnUrl = model.getPreviewUrl();
	        dialogApi.resolve();
	      });
	    });
	  });
	}
	
	function uploadcareTabEffects() {
	  if (!uploadcare) throw Error('uploadcare widget not loaded');
	  uploadcare.registerTab('preview', effectsTab);
	}
	
	global.uploadcareTabEffects = uploadcareTabEffects;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ejs = __webpack_require__(23);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _preview = __webpack_require__(24);
	
	var _preview2 = _interopRequireDefault(_preview);
	
	var _buttons = __webpack_require__(25);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	var _images = __webpack_require__(29);
	
	var _images2 = _interopRequireDefault(_images);
	
	var _viewContainer = __webpack_require__(44);
	
	var _viewContainer2 = _interopRequireDefault(_viewContainer);
	
	var _cropAndRotateView = __webpack_require__(46);
	
	var _cropAndRotateView2 = _interopRequireDefault(_cropAndRotateView);
	
	var _enhanceView = __webpack_require__(49);
	
	var _enhanceView2 = _interopRequireDefault(_enhanceView);
	
	var _sharpenView = __webpack_require__(55);
	
	var _sharpenView2 = _interopRequireDefault(_sharpenView);
	
	var _IdGenerator = __webpack_require__(48);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var PreviewView = function () {
	  function PreviewView(container, effectsModel) {
	    (0, _classCallCheck3.default)(this, PreviewView);
	
	    this.container = container;
	    this.model = effectsModel;
	
	    this.cropAndRotateView = new _cropAndRotateView2.default(container, effectsModel);
	    this.enhanceView = new _enhanceView2.default(container, effectsModel);
	    this.sharpenView = new _sharpenView2.default(container, effectsModel);
	
	    this.CROP_AND_ROTATE_BTN_ID = "cropAndRotateBtn_" + _IdGenerator2.default.Generate();
	    this.ENHANCE_BTN_ID = "enhanceBtn_" + _IdGenerator2.default.Generate();
	    this.SHARPEN_BTN_ID = "sharpenBtn_" + _IdGenerator2.default.Generate();
	    this.GRAYSCALE_BTN_ID = "grayScaleBtn_" + _IdGenerator2.default.Generate();
	
	    this.DONE_BTN_ID = "doneBtn_" + _IdGenerator2.default.Generate();
	    this.REMOVE_BTN_ID = "removeBtn_" + _IdGenerator2.default.Generate();
	
	    this.DONE_MOB_BTN_ID = "doneMobBtn_" + _IdGenerator2.default.Generate();
	    this.REMOVE_MOB_BTN_ID = "removeMobBtn_" + _IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(PreviewView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      this.container = parentEl;
	      if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
	        this.viewDeferred = $.Deferred();
	      }
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        cropAndRotateBtnId: this.CROP_AND_ROTATE_BTN_ID,
	        enhanceBtnId: this.ENHANCE_BTN_ID,
	        sharpenBtnId: this.SHARPEN_BTN_ID,
	        grayscaleBtnId: this.GRAYSCALE_BTN_ID,
	        doneBtn: this.DONE_BTN_ID,
	        removeBtn: this.REMOVE_BTN_ID,
	        doneMobBtn: this.DONE_MOB_BTN_ID,
	        removeMobBtn: this.REMOVE_MOB_BTN_ID,
	
	        appliedGrayscale: this.model.grayscale === null,
	        appliedSharpen: this.model.sharp ? true : false,
	        appliedEnhance: this.model.enhance ? true : false,
	        buttonStyles: _buttons2.default,
	        imageStyles: _images2.default,
	        layoutStyles: _viewContainer2.default
	      };
	      var markupStr = _ejs2.default.render(_preview2.default, renderData);
	      parentEl.html(markupStr);
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this = this;
	
	      $(parentEl).find("#" + this.CROP_AND_ROTATE_BTN_ID).click(function (ev) {
	        return _this.cropAndRotateClick(ev);
	      });
	      $(parentEl).find("#" + this.ENHANCE_BTN_ID).click(function (ev) {
	        return _this.enhanceClick(ev);
	      });
	      $(parentEl).find("#" + this.SHARPEN_BTN_ID).click(function (ev) {
	        return _this.sharpenClick(ev);
	      });
	      $(parentEl).find("#" + this.GRAYSCALE_BTN_ID).click(function (ev) {
	        return _this.grayScaleClick(ev);
	      });
	
	      $(parentEl).find("#" + this.REMOVE_BTN_ID).click(function (ev) {
	        return _this.removeClick(ev);
	      });
	      $(parentEl).find("#" + this.REMOVE_MOB_BTN_ID).click(function (ev) {
	        return _this.removeClick(ev);
	      });
	      $(parentEl).find("#" + this.DONE_BTN_ID).click(function (ev) {
	        return _this.doneClick(ev);
	      });
	      $(parentEl).find("#" + this.DONE_MOB_BTN_ID).click(function (ev) {
	        return _this.doneClick(ev);
	      });
	    }
	  }, {
	    key: 'cropAndRotateClick',
	    value: function cropAndRotateClick(ev) {
	      var _this2 = this;
	
	      this.cropAndRotateView.render().then(function (type) {
	        _this2.render();
	      });
	    }
	  }, {
	    key: 'enhanceClick',
	    value: function enhanceClick(ev) {
	      var _this3 = this;
	
	      this.enhanceView.render().then(function (type) {
	        _this3.render();
	      });
	    }
	  }, {
	    key: 'sharpenClick',
	    value: function sharpenClick(ev) {
	      var _this4 = this;
	
	      this.sharpenView.render().then(function (type) {
	        _this4.render();
	      });
	    }
	  }, {
	    key: 'grayScaleClick',
	    value: function grayScaleClick(ev) {
	      if (this.model.grayscale === null) {
	        this.model.grayscale = undefined;
	      } else {
	        this.model.grayscale = null;
	      }
	      this.render();
	    }
	  }, {
	    key: 'doneClick',
	    value: function doneClick(ev) {
	      this.viewDeferred.resolve({
	        reason: "Done"
	      });
	    }
	  }, {
	    key: 'removeClick',
	    value: function removeClick(ev) {
	      this.model.enhance = undefined;
	      this.model.sharp = undefined;
	      this.model.grayscale = undefined;
	      this.render();
	    }
	  }]);
	  return PreviewView;
	}();
	
	exports.default = PreviewView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ejs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/
	
	'use strict';
	
	/**
	 * @file Embedded JavaScript templating engine.
	 * @author Matthew Eernisse <mde@fleegix.org>
	 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
	 * @project EJS
	 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
	 */
	
	/**
	 * EJS internal functions.
	 *
	 * Technically this "module" lies in the same file as {@link module:ejs}, for
	 * the sake of organization all the private functions re grouped into this
	 * module.
	 *
	 * @module ejs-internal
	 * @private
	 */
	
	/**
	 * Embedded JavaScript templating engine.
	 *
	 * @module ejs
	 * @public
	 */
	
	var fs = require('fs');
	var path = require('path');
	var utils = require('./utils');
	
	var scopeOptionWarned = false;
	var _VERSION_STRING = require('../package.json').version;
	var _DEFAULT_DELIMITER = '%';
	var _DEFAULT_LOCALS_NAME = 'locals';
	var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
	var _OPTS = [ 'cache', 'filename', 'delimiter', 'scope', 'context',
	        'debug', 'compileDebug', 'client', '_with', 'root', 'rmWhitespace',
	        'strict', 'localsName'];
	var _TRAILING_SEMCOL = /;\s*$/;
	var _BOM = /^\uFEFF/;
	
	/**
	 * EJS template function cache. This can be a LRU object from lru-cache NPM
	 * module. By default, it is {@link module:utils.cache}, a simple in-process
	 * cache that grows continuously.
	 *
	 * @type {Cache}
	 */
	
	exports.cache = utils.cache;
	
	/**
	 * Name of the object containing the locals.
	 *
	 * This variable is overriden by {@link Options}`.localsName` if it is not
	 * `undefined`.
	 *
	 * @type {String}
	 * @public
	 */
	
	exports.localsName = _DEFAULT_LOCALS_NAME;
	
	/**
	 * Get the path to the included file from the parent file path and the
	 * specified path.
	 *
	 * @param {String}  name     specified path
	 * @param {String}  filename parent file path
	 * @param {Boolean} isDir    parent file path whether is directory
	 * @return {String}
	 */
	exports.resolveInclude = function(name, filename, isDir) {
	  var dirname = path.dirname;
	  var extname = path.extname;
	  var resolve = path.resolve;
	  var includePath = resolve(isDir ? filename : dirname(filename), name);
	  var ext = extname(name);
	  if (!ext) {
	    includePath += '.ejs';
	  }
	  return includePath;
	};
	
	/**
	 * Get the path to the included file by Options
	 * 
	 * @param  {String}  path    specified path
	 * @param  {Options} options compilation options
	 * @return {String}
	 */
	function getIncludePath(path, options){
	  var includePath;
	  if (path.charAt(0) == '/') {
	    includePath = exports.resolveInclude(path.replace(/^\/*/,''), options.root || '/', true);
	  }
	  else {
	    if (!options.filename) {
	      throw new Error('`include` use relative path requires the \'filename\' option.');
	    }
	    includePath = exports.resolveInclude(path, options.filename);  
	  }
	  return includePath;
	}
	
	/**
	 * Get the template from a string or a file, either compiled on-the-fly or
	 * read from cache (if enabled), and cache the template if needed.
	 *
	 * If `template` is not set, the file specified in `options.filename` will be
	 * read.
	 *
	 * If `options.cache` is true, this function reads the file from
	 * `options.filename` so it must be set prior to calling this function.
	 *
	 * @memberof module:ejs-internal
	 * @param {Options} options   compilation options
	 * @param {String} [template] template source
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned.
	 * @static
	 */
	
	function handleCache(options, template) {
	  var func;
	  var filename = options.filename;
	  var hasTemplate = arguments.length > 1;
	
	  if (options.cache) {
	    if (!filename) {
	      throw new Error('cache option requires a filename');
	    }
	    func = exports.cache.get(filename);
	    if (func) {
	      return func;
	    }
	    if (!hasTemplate) {
	      template = fs.readFileSync(filename).toString().replace(_BOM, '');
	    }
	  }
	  else if (!hasTemplate) {
	    // istanbul ignore if: should not happen at all
	    if (!filename) {
	      throw new Error('Internal EJS error: no file name or template '
	                    + 'provided');
	    }
	    template = fs.readFileSync(filename).toString().replace(_BOM, '');
	  }
	  func = exports.compile(template, options);
	  if (options.cache) {
	    exports.cache.set(filename, func);
	  }
	  return func;
	}
	
	/**
	 * Get the template function.
	 *
	 * If `options.cache` is `true`, then the template is cached.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned
	 * @static
	 */
	
	function includeFile(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  opts.filename = getIncludePath(path, opts);
	  return handleCache(opts);
	}
	
	/**
	 * Get the JavaScript source of an included file.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {Object}
	 * @static
	 */
	
	function includeSource(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  var includePath;
	  var template;
	  includePath = getIncludePath(path,opts);
	  template = fs.readFileSync(includePath).toString().replace(_BOM, '');
	  opts.filename = includePath;
	  var templ = new Template(template, opts);
	  templ.generateSource();
	  return {
	    source: templ.source,
	    filename: includePath,
	    template: template
	  };
	}
	
	/**
	 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
	 * `lineno`.
	 *
	 * @implements RethrowCallback
	 * @memberof module:ejs-internal
	 * @param {Error}  err      Error object
	 * @param {String} str      EJS source
	 * @param {String} filename file name of the EJS file
	 * @param {String} lineno   line number of the error
	 * @static
	 */
	
	function rethrow(err, str, filename, lineno){
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':'
	    + lineno + '\n'
	    + context + '\n\n'
	    + err.message;
	
	  throw err;
	}
	
	/**
	 * Copy properties in data object that are recognized as options to an
	 * options object.
	 *
	 * This is used for compatibility with earlier versions of EJS and Express.js.
	 *
	 * @memberof module:ejs-internal
	 * @param {Object}  data data object
	 * @param {Options} opts options object
	 * @static
	 */
	
	function cpOptsInData(data, opts) {
	  _OPTS.forEach(function (p) {
	    if (typeof data[p] != 'undefined') {
	      opts[p] = data[p];
	    }
	  });
	}
	
	/**
	 * Compile the given `str` of ejs into a template function.
	 *
	 * @param {String}  template EJS template
	 *
	 * @param {Options} opts     compilation options
	 *
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `opts.client`, either type might be returned.
	 * @public
	 */
	
	exports.compile = function compile(template, opts) {
	  var templ;
	
	  // v1 compat
	  // 'scope' is 'context'
	  // FIXME: Remove this in a future version
	  if (opts && opts.scope) {
	    if (!scopeOptionWarned){
	      console.warn('`scope` option is deprecated and will be removed in EJS 3');
	      scopeOptionWarned = true;
	    }
	    if (!opts.context) {
	      opts.context = opts.scope;
	    }
	    delete opts.scope;
	  }
	  templ = new Template(template, opts);
	  return templ.compile();
	};
	
	/**
	 * Render the given `template` of ejs.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}   template EJS template
	 * @param {Object}  [data={}] template data
	 * @param {Options} [opts={}] compilation and rendering options
	 * @return {String}
	 * @public
	 */
	
	exports.render = function (template, d, o) {
	  var data = d || {};
	  var opts = o || {};
	
	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 2) {
	    cpOptsInData(data, opts);
	  }
	
	  return handleCache(opts, template)(data);
	};
	
	/**
	 * Render an EJS file at the given `path` and callback `cb(err, str)`.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}             path     path to the EJS file
	 * @param {Object}            [data={}] template data
	 * @param {Options}           [opts={}] compilation and rendering options
	 * @param {RenderFileCallback} cb callback
	 * @public
	 */
	
	exports.renderFile = function () {
	  var args = Array.prototype.slice.call(arguments);
	  var filename = args.shift();
	  var cb = args.pop();
	  var data = args.shift() || {};
	  var opts = args.pop() || {};
	  var result;
	
	  // Don't pollute passed in opts obj with new vals
	  opts = utils.shallowCopy({}, opts);
	
	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 3) {
	    // Express 4
	    if (data.settings && data.settings['view options']) {
	      cpOptsInData(data.settings['view options'], opts);
	    }
	    // Express 3 and lower
	    else {
	      cpOptsInData(data, opts);
	    }
	  }
	  opts.filename = filename;
	
	  try {
	    result = handleCache(opts)(data);
	  }
	  catch(err) {
	    return cb(err);
	  }
	  return cb(null, result);
	};
	
	/**
	 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
	 * @public
	 */
	
	exports.clearCache = function () {
	  exports.cache.reset();
	};
	
	function Template(text, opts) {
	  opts = opts || {};
	  var options = {};
	  this.templateText = text;
	  this.mode = null;
	  this.truncate = false;
	  this.currentLine = 1;
	  this.source = '';
	  this.dependencies = [];
	  options.client = opts.client || false;
	  options.escapeFunction = opts.escape || utils.escapeXML;
	  options.compileDebug = opts.compileDebug !== false;
	  options.debug = !!opts.debug;
	  options.filename = opts.filename;
	  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
	  options.strict = opts.strict || false;
	  options.context = opts.context;
	  options.cache = opts.cache || false;
	  options.rmWhitespace = opts.rmWhitespace;
	  options.root = opts.root;
	  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
	
	  if (options.strict) {
	    options._with = false;
	  }
	  else {
	    options._with = typeof opts._with != 'undefined' ? opts._with : true;
	  }
	
	  this.opts = options;
	
	  this.regex = this.createRegex();
	}
	
	Template.modes = {
	  EVAL: 'eval',
	  ESCAPED: 'escaped',
	  RAW: 'raw',
	  COMMENT: 'comment',
	  LITERAL: 'literal'
	};
	
	Template.prototype = {
	  createRegex: function () {
	    var str = _REGEX_STRING;
	    var delim = utils.escapeRegExpChars(this.opts.delimiter);
	    str = str.replace(/%/g, delim);
	    return new RegExp(str);
	  },
	
	  compile: function () {
	    var src;
	    var fn;
	    var opts = this.opts;
	    var prepended = '';
	    var appended = '';
	    var escape = opts.escapeFunction;
	
	    if (!this.source) {
	      this.generateSource();
	      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
	      if (opts._with !== false) {
	        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
	        appended += '  }' + '\n';
	      }
	      appended += '  return __output.join("");' + '\n';
	      this.source = prepended + this.source + appended;
	    }
	
	    if (opts.compileDebug) {
	      src = 'var __line = 1' + '\n'
	          + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
	          + '  , __filename = ' + (opts.filename ?
	                JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
	          + 'try {' + '\n'
	          + this.source
	          + '} catch (e) {' + '\n'
	          + '  rethrow(e, __lines, __filename, __line);' + '\n'
	          + '}' + '\n';
	    }
	    else {
	      src = this.source;
	    }
	
	    if (opts.debug) {
	      console.log(src);
	    }
	
	    if (opts.client) {
	      src = 'escape = escape || ' + escape.toString() + ';' + '\n' + src;
	      if (opts.compileDebug) {
	        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
	      }
	    }
	
	    if (opts.strict) {
	      src = '"use strict";\n' + src;
	    }
	
	    try {
	      fn = new Function(opts.localsName + ', escape, include, rethrow', src);
	    }
	    catch(e) {
	      // istanbul ignore else
	      if (e instanceof SyntaxError) {
	        if (opts.filename) {
	          e.message += ' in ' + opts.filename;
	        }
	        e.message += ' while compiling ejs';
	      }
	      throw e;
	    }
	
	    if (opts.client) {
	      fn.dependencies = this.dependencies;
	      return fn;
	    }
	
	    // Return a callable function which will execute the function
	    // created by the source-code, with the passed data as locals
	    // Adds a local `include` function which allows full recursive include
	    var returnedFn = function (data) {
	      var include = function (path, includeData) {
	        var d = utils.shallowCopy({}, data);
	        if (includeData) {
	          d = utils.shallowCopy(d, includeData);
	        }
	        return includeFile(path, opts)(d);
	      };
	      return fn.apply(opts.context, [data || {}, escape, include, rethrow]);
	    };
	    returnedFn.dependencies = this.dependencies;
	    return returnedFn;
	  },
	
	  generateSource: function () {
	    var opts = this.opts;
	
	    if (opts.rmWhitespace) {
	      // Have to use two separate replace here as `^` and `$` operators don't
	      // work well with `\r`.
	      this.templateText =
	        this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
	    }
	
	    // Slurp spaces and tabs before <%_ and after _%>
	    this.templateText =
	      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');
	
	    var self = this;
	    var matches = this.parseTemplateText();
	    var d = this.opts.delimiter;
	
	    if (matches && matches.length) {
	      matches.forEach(function (line, index) {
	        var opening;
	        var closing;
	        var include;
	        var includeOpts;
	        var includeObj;
	        var includeSrc;
	        // If this is an opening tag, check for closing tags
	        // FIXME: May end up with some false positives here
	        // Better to store modes as k/v with '<' + delimiter as key
	        // Then this can simply check against the map
	        if ( line.indexOf('<' + d) === 0        // If it is a tag
	          && line.indexOf('<' + d + d) !== 0) { // and is not escaped
	          closing = matches[index + 2];
	          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
	            throw new Error('Could not find matching close tag for "' + line + '".');
	          }
	        }
	        // HACK: backward-compat `include` preprocessor directives
	        if ((include = line.match(/^\s*include\s+(\S+)/))) {
	          opening = matches[index - 1];
	          // Must be in EVAL or RAW mode
	          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
	            includeOpts = utils.shallowCopy({}, self.opts);
	            includeObj = includeSource(include[1], includeOpts);
	            if (self.opts.compileDebug) {
	              includeSrc =
	                  '    ; (function(){' + '\n'
	                  + '      var __line = 1' + '\n'
	                  + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
	                  + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
	                  + '      try {' + '\n'
	                  + includeObj.source
	                  + '      } catch (e) {' + '\n'
	                  + '        rethrow(e, __lines, __filename, __line);' + '\n'
	                  + '      }' + '\n'
	                  + '    ; }).call(this)' + '\n';
	            }else{
	              includeSrc = '    ; (function(){' + '\n' + includeObj.source +
	                  '    ; }).call(this)' + '\n';
	            }
	            self.source += includeSrc;
	            self.dependencies.push(exports.resolveInclude(include[1],
	                includeOpts.filename));
	            return;
	          }
	        }
	        self.scanLine(line);
	      });
	    }
	
	  },
	
	  parseTemplateText: function () {
	    var str = this.templateText;
	    var pat = this.regex;
	    var result = pat.exec(str);
	    var arr = [];
	    var firstPos;
	
	    while (result) {
	      firstPos = result.index;
	
	      if (firstPos !== 0) {
	        arr.push(str.substring(0, firstPos));
	        str = str.slice(firstPos);
	      }
	
	      arr.push(result[0]);
	      str = str.slice(result[0].length);
	      result = pat.exec(str);
	    }
	
	    if (str) {
	      arr.push(str);
	    }
	
	    return arr;
	  },
	
	  scanLine: function (line) {
	    var self = this;
	    var d = this.opts.delimiter;
	    var newLineCount = 0;
	
	    function _addOutput() {
	      if (self.truncate) {
	        // Only replace single leading linebreak in the line after
	        // -%> tag -- this is the single, trailing linebreak
	        // after the tag that the truncation mode replaces
	        // Handle Win / Unix / old Mac linebreaks -- do the \r\n
	        // combo first in the regex-or
	        line = line.replace(/^(?:\r\n|\r|\n)/, '');
	        self.truncate = false;
	      }
	      else if (self.opts.rmWhitespace) {
	        // Gotta be more careful here.
	        // .replace(/^(\s*)\n/, '$1') might be more appropriate here but as
	        // rmWhitespace already removes trailing spaces anyway so meh.
	        line = line.replace(/^\n/, '');
	      }
	      if (!line) {
	        return;
	      }
	
	      // Preserve literal slashes
	      line = line.replace(/\\/g, '\\\\');
	
	      // Convert linebreaks
	      line = line.replace(/\n/g, '\\n');
	      line = line.replace(/\r/g, '\\r');
	
	      // Escape double-quotes
	      // - this will be the delimiter during execution
	      line = line.replace(/"/g, '\\"');
	      self.source += '    ; __append("' + line + '")' + '\n';
	    }
	
	    newLineCount = (line.split('\n').length - 1);
	
	    switch (line) {
	      case '<' + d:
	      case '<' + d + '_':
	        this.mode = Template.modes.EVAL;
	        break;
	      case '<' + d + '=':
	        this.mode = Template.modes.ESCAPED;
	        break;
	      case '<' + d + '-':
	        this.mode = Template.modes.RAW;
	        break;
	      case '<' + d + '#':
	        this.mode = Template.modes.COMMENT;
	        break;
	      case '<' + d + d:
	        this.mode = Template.modes.LITERAL;
	        this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
	        break;
	      case d + d + '>':
	        this.mode = Template.modes.LITERAL;
	        this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
	        break;
	      case d + '>':
	      case '-' + d + '>':
	      case '_' + d + '>':
	        if (this.mode == Template.modes.LITERAL) {
	          _addOutput();
	        }
	
	        this.mode = null;
	        this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
	        break;
	      default:
	        // In script mode, depends on type of tag
	        if (this.mode) {
	          // If '//' is found without a line break, add a line break.
	          switch (this.mode) {
	            case Template.modes.EVAL:
	            case Template.modes.ESCAPED:
	            case Template.modes.RAW:
	              if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
	                line += '\n';
	              }
	          }
	          switch (this.mode) {
	            // Just executing code
	            case Template.modes.EVAL:
	              this.source += '    ; ' + line + '\n';
	              break;
	            // Exec, esc, and output
	            case Template.modes.ESCAPED:
	              this.source += '    ; __append(escape(' +
	                line.replace(_TRAILING_SEMCOL, '').trim() + '))' + '\n';
	              break;
	            // Exec and output
	            case Template.modes.RAW:
	              this.source += '    ; __append(' +
	                line.replace(_TRAILING_SEMCOL, '').trim() + ')' + '\n';
	              break;
	            case Template.modes.COMMENT:
	              // Do nothing
	              break;
	            // Literal <%% mode, append as raw output
	            case Template.modes.LITERAL:
	              _addOutput();
	              break;
	          }
	        }
	        // In string mode, just add the output
	        else {
	          _addOutput();
	        }
	    }
	
	    if (self.opts.compileDebug && newLineCount) {
	      this.currentLine += newLineCount;
	      this.source += '    ; __line = ' + this.currentLine + '\n';
	    }
	  }
	};
	
	/**
	 * Escape characters reserved in XML.
	 *
	 * This is simply an export of {@link module:utils.escapeXML}.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @public
	 * @func
	 * */
	exports.escapeXML = utils.escapeXML;
	
	/**
	 * Express.js support.
	 *
	 * This is an alias for {@link module:ejs.renderFile}, in order to support
	 * Express.js out-of-the-box.
	 *
	 * @func
	 */
	
	exports.__express = exports.renderFile;
	
	// Add require support
	/* istanbul ignore else */
	if (require.extensions) {
	  require.extensions['.ejs'] = function (module, flnm) {
	    var filename = flnm || /* istanbul ignore next */ module.filename;
	    var options = {
	          filename: filename,
	          client: true
	        };
	    var template = fs.readFileSync(filename).toString();
	    var fn = exports.compile(template, options);
	    module._compile('module.exports = ' + fn.toString() + ';', filename);
	  };
	}
	
	/**
	 * Version of EJS.
	 *
	 * @readonly
	 * @type {String}
	 * @public
	 */
	
	exports.VERSION = _VERSION_STRING;
	
	/* istanbul ignore if */
	if (typeof window != 'undefined') {
	  window.ejs = exports;
	}
	
	},{"../package.json":6,"./utils":2,"fs":3,"path":4}],2:[function(require,module,exports){
	/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/
	
	/**
	 * Private utility functions
	 * @module utils
	 * @private
	 */
	
	'use strict';
	
	var regExpChars = /[|\\{}()[\]^$+*?.]/g;
	
	/**
	 * Escape characters reserved in regular expressions.
	 *
	 * If `string` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} string Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */
	exports.escapeRegExpChars = function (string) {
	  // istanbul ignore if
	  if (!string) {
	    return '';
	  }
	  return String(string).replace(regExpChars, '\\$&');
	};
	
	var _ENCODE_HTML_RULES = {
	      '&': '&amp;'
	    , '<': '&lt;'
	    , '>': '&gt;'
	    , '"': '&#34;'
	    , "'": '&#39;'
	    }
	  , _MATCH_HTML = /[&<>\'"]/g;
	
	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	};
	
	/**
	 * Stringified version of constants used by {@link module:utils.escapeXML}.
	 *
	 * It is used in the process of generating {@link ClientFunction}s.
	 *
	 * @readonly
	 * @type {String}
	 */
	
	var escapeFuncStr =
	  'var _ENCODE_HTML_RULES = {\n'
	+ '      "&": "&amp;"\n'
	+ '    , "<": "&lt;"\n'
	+ '    , ">": "&gt;"\n'
	+ '    , \'"\': "&#34;"\n'
	+ '    , "\'": "&#39;"\n'
	+ '    }\n'
	+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
	+ 'function encode_char(c) {\n'
	+ '  return _ENCODE_HTML_RULES[c] || c;\n'
	+ '};\n';
	
	/**
	 * Escape characters reserved in XML.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @implements {EscapeCallback}
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */
	
	exports.escapeXML = function (markup) {
	  return markup == undefined
	    ? ''
	    : String(markup)
	        .replace(_MATCH_HTML, encode_char);
	};
	exports.escapeXML.toString = function () {
	  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr
	};
	
	/**
	 * Copy all properties from one object to another, in a shallow fashion.
	 *
	 * @param  {Object} to   Destination object
	 * @param  {Object} from Source object
	 * @return {Object}      Destination object
	 * @static
	 * @private
	 */
	exports.shallowCopy = function (to, from) {
	  from = from || {};
	  for (var p in from) {
	    to[p] = from[p];
	  }
	  return to;
	};
	
	/**
	 * Simple in-process cache implementation. Does not implement limits of any
	 * sort.
	 *
	 * @implements Cache
	 * @static
	 * @private
	 */
	exports.cache = {
	  _data: {},
	  set: function (key, val) {
	    this._data[key] = val;
	  },
	  get: function (key) {
	    return this._data[key];
	  },
	  reset: function () {
	    this._data = {};
	  }
	};
	
	
	},{}],3:[function(require,module,exports){
	
	},{}],4:[function(require,module,exports){
	(function (process){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	}).call(this,require('_process'))
	},{"_process":5}],5:[function(require,module,exports){
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };
	
	},{}],6:[function(require,module,exports){
	module.exports={
	  "name": "ejs",
	  "description": "Embedded JavaScript templates",
	  "keywords": [
	    "template",
	    "engine",
	    "ejs"
	  ],
	  "version": "2.5.1",
	  "author": "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
	  "contributors": [
	    "Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"
	  ],
	  "license": "Apache-2.0",
	  "main": "./lib/ejs.js",
	  "repository": {
	    "type": "git",
	    "url": "git://github.com/mde/ejs.git"
	  },
	  "bugs": "https://github.com/mde/ejs/issues",
	  "homepage": "https://github.com/mde/ejs",
	  "dependencies": {},
	  "devDependencies": {
	    "browserify": "^13.0.1",
	    "eslint": "^3.0.0",
	    "istanbul": "~0.4.3",
	    "jake": "^8.0.0",
	    "jsdoc": "^3.4.0",
	    "lru-cache": "^4.0.1",
	    "mocha": "^3.0.2",
	    "rimraf": "^2.2.8",
	    "uglify-js": "^2.6.2"
	  },
	  "engines": {
	    "node": ">=0.10.0"
	  },
	  "scripts": {
	    "test": "mocha",
	    "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
	    "doc": "rimraf out && jsdoc -c jsdoc.json lib/* docs/jsdoc/*",
	    "devdoc": "rimraf out && jsdoc -p -c jsdoc.json lib/* docs/jsdoc/*"
	  }
	}
	
	},{}]},{},[1])(1)
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"<%= layoutStyles.viewContainer %>\">\r\n  <div class=\"<%= layoutStyles.headerBlock %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n                   <%= buttonStyles.ucButtonPrimary %> \r\n                   <%= buttonStyles.hideScreen %>\" id=\"<%= removeMobBtn %>\">Remove</button>\r\n    <h1>Preview</h1>\r\n    <button class=\"<%=buttonStyles.ucButton %>\r\n                   <%=buttonStyles.ucButtonPrimary %> \r\n                   <%=buttonStyles.hideScreen %>\" id=\"<%= doneMobBtn %>\">Done</button>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.imageBlock %>\">\r\n    <img src=\"<%= previewUrl %>\" alt=\"\">\r\n  </div>\r\n  <div class=\"<%= layoutStyles.toolBoxContainer %>\r\n              <%= layoutStyles.align-top %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonGrey %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= removeBtn %>\">Remove</button>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %>\" id=\"<%= cropAndRotateBtnId %>\">\r\n      <div class=\"<%= imageStyles.cropAndRotateImg %>\"></div>\r\n      <span>CROP &amp; ROTATE</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %>\" id=\"<%= enhanceBtnId %>\">\r\n      <div class=\"<%= imageStyles.enhanceImg %>\"></div>\r\n      <span>ENHANCE</span>\r\n      <% if(appliedEnhance) { %>\r\n        <div class=\"<%= buttonStyles.applied %>\"></div>\r\n      <% } %>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %>\" id=\"<%= sharpenBtnId %>\">\r\n      <div class=\"<%= imageStyles.sharpenImg %>\"></div>\r\n      <span>SHARPEN</span>\r\n      <% if(appliedSharpen) { %>\r\n        <div class=\"<%= buttonStyles.applied %>\"></div>\r\n      <% } %>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %>\" id=\"<%= grayscaleBtnId %>\">\r\n      <div class=\"<%= imageStyles.grayScaleImg %>\"></div>\r\n      <span>GRAYSCALE</span>\r\n      <% if(appliedGrayscale) { %>\r\n        <div class=\"<%= buttonStyles.applied %>\"></div>\r\n      <% } %>\r\n    </div>\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonPrimary %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= doneBtn %>\">Done</button>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./buttons.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./buttons.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports
	
	
	// module
	exports.push([module.id, "._3xeIIB3_G8yFK94QYxH8K {\n  border-radius: 24px;\n  height: 48px;\n  font-size: 17px;\n  letter-spacing: 0.3px;\n  padding-left: 42px;\n  padding-right: 42px;\n  padding-top: 14px;\n  padding-bottom: 14px;\n  border: 0px;\n  margin-left: 20px;\n  margin-right: 20px; }\n  @media screen and (max-width: 759px) {\n    ._3xeIIB3_G8yFK94QYxH8K {\n      margin-left: 0;\n      margin-right: 0;\n      padding-left: 0px;\n      padding-right: 0px; } }\n  ._3xeIIB3_G8yFK94QYxH8K:focus {\n    outline: none; }\n  ._3xeIIB3_G8yFK94QYxH8K:hover {\n    cursor: pointer; }\n  @media screen and (max-width: 759px) {\n    ._3xeIIB3_G8yFK94QYxH8K.w0eFRZb6qHbqLf3Jhq5ub {\n      font-family: SFUIText-Regular;\n      font-size: 16px;\n      letter-spacing: 0.3px;\n      line-height: 18px;\n      color: #3787EC;\n      background: none; } }\n  @media screen and (min-width: 760px) {\n    ._3xeIIB3_G8yFK94QYxH8K.w0eFRZb6qHbqLf3Jhq5ub {\n      color: #ffffff;\n      background: #5D5D5D; } }\n  @media screen and (max-width: 759px) {\n    ._3xeIIB3_G8yFK94QYxH8K._1JwsOu6Rk1yFV8Fvh0cl4g {\n      font-family: SFUIText-Regular;\n      font-size: 16px;\n      letter-spacing: 0.3px;\n      line-height: 18px;\n      color: #3787EC;\n      background: none; } }\n  @media screen and (min-width: 760px) {\n    ._3xeIIB3_G8yFK94QYxH8K._1JwsOu6Rk1yFV8Fvh0cl4g {\n      color: #ffffff;\n      background: #3787EC; } }\n  ._3xeIIB3_G8yFK94QYxH8K._1Ma7G-ueySMr_25I0o5Z3z {\n    color: #3787EC;\n    background: #ffffff; }\n\n.p7Tjl644Mzv1zpZaiZr0K {\n  border: 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  text-align: center;\n  color: #454545;\n  background: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative; }\n  @media screen and (max-width: 760px) {\n    .p7Tjl644Mzv1zpZaiZr0K {\n      font-family: SFUIText-Regular;\n      font-size: 10px;\n      letter-spacing: 0.41px; } }\n  .p7Tjl644Mzv1zpZaiZr0K._12ddhsVD8QRgw1DouCENn0 {\n    color: #ffffff; }\n  .p7Tjl644Mzv1zpZaiZr0K:focus {\n    outline: none; }\n  .p7Tjl644Mzv1zpZaiZr0K:hover {\n    cursor: pointer; }\n  .p7Tjl644Mzv1zpZaiZr0K ._1X7AREp1YWj897h8ycjVzP {\n    margin-top: 10px;\n    border-radius: 50%;\n    width: 8px;\n    height: 8px;\n    background: #3787EC;\n    position: absolute;\n    bottom: -15px;\n    left: calc(50% - 4px); }\n\n@media screen and (max-width: 760px) {\n  ._3HPHUAUjUyPVFC7b66iXHN {\n    display: none; } }\n\n@media screen and (min-width: 760px) {\n  .q6_WBi80lfjdk7GqA_qgK {\n    display: none; } }\n", ""]);
	
	// exports
	exports.locals = {
		"ucButton": "_3xeIIB3_G8yFK94QYxH8K",
		"ucButtonGrey": "w0eFRZb6qHbqLf3Jhq5ub",
		"ucButtonPrimary": "_1JwsOu6Rk1yFV8Fvh0cl4g",
		"ucButtonWhite": "_1Ma7G-ueySMr_25I0o5Z3z",
		"ucIconBtn": "p7Tjl644Mzv1zpZaiZr0K",
		"white": "_12ddhsVD8QRgw1DouCENn0",
		"applied": "_1X7AREp1YWj897h8ycjVzP",
		"hideMobile": "_3HPHUAUjUyPVFC7b66iXHN",
		"hideScreen": "q6_WBi80lfjdk7GqA_qgK"
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./images.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./images.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports
	
	
	// module
	exports.push([module.id, "._1OhXUVeHiX4jOF-rdsum4W, ._13HUF5cVmhRCBHgeuAZXvo, .ZeWrEuWC04y7iE9MWH-Da, ._2ujRd4EiqZcQJvJ_VC4jsT, .WkvKsgu_DdWylMjuMeOMD, ._2LXIaYOTk7zE0O-b3teycp, .joNmbIWjTDhxDjJPGG65I, ._1b5NJqKljCey8UuzOfiZcb, ._3asWOdoLJ1YpsD-KId6Dxm, .XC-K8RPm7WSUQY_VTnW6, ._2hDVBXObDK8fyCjIC_ulD4, .H4ZfPVKUMtQGkPJCgdPFr, .qPmdTXSMHqJak3iUjLONT, ._1xzTyVj-sZ9m0TRW9PZ04j {\n  background-position: center !important;\n  width: 32px;\n  height: 32px; }\n\n._13HUF5cVmhRCBHgeuAZXvo {\n  background: url(" + __webpack_require__(31) + ") 100% 100% no-repeat; }\n\n.ZeWrEuWC04y7iE9MWH-Da {\n  background: url(" + __webpack_require__(32) + ") 100% 100% no-repeat; }\n\n._2ujRd4EiqZcQJvJ_VC4jsT {\n  background: url(" + __webpack_require__(33) + ") 100% 100% no-repeat; }\n\n.WkvKsgu_DdWylMjuMeOMD {\n  background: url(" + __webpack_require__(34) + ") 100% 100% no-repeat; }\n\n._2LXIaYOTk7zE0O-b3teycp {\n  background: url(" + __webpack_require__(35) + ") 100% 100% no-repeat; }\n\n.joNmbIWjTDhxDjJPGG65I {\n  background: url(" + __webpack_require__(36) + ") 100% 100% no-repeat; }\n\n._1b5NJqKljCey8UuzOfiZcb {\n  background: url(" + __webpack_require__(37) + ") 100% 100% no-repeat; }\n\n._3asWOdoLJ1YpsD-KId6Dxm {\n  background: url(" + __webpack_require__(38) + ") 100% 100% no-repeat; }\n\n.XC-K8RPm7WSUQY_VTnW6 {\n  background: url(" + __webpack_require__(39) + ") 100% 100% no-repeat; }\n\n._2hDVBXObDK8fyCjIC_ulD4 {\n  background: url(" + __webpack_require__(40) + ") 100% 100% no-repeat; }\n\n.H4ZfPVKUMtQGkPJCgdPFr {\n  background: url(" + __webpack_require__(41) + ") 100% 100% no-repeat; }\n\n.qPmdTXSMHqJak3iUjLONT {\n  background: url(" + __webpack_require__(42) + ") 100% 100% no-repeat; }\n\n._1xzTyVj-sZ9m0TRW9PZ04j {\n  background: url(" + __webpack_require__(43) + ") 100% 100% no-repeat; }\n", ""]);
	
	// exports
	exports.locals = {
		"btnImage": "_1OhXUVeHiX4jOF-rdsum4W",
		"cropAndRotateImg": "_13HUF5cVmhRCBHgeuAZXvo",
		"enhanceImg": "ZeWrEuWC04y7iE9MWH-Da",
		"sharpenImg": "_2ujRd4EiqZcQJvJ_VC4jsT",
		"grayScaleImg": "WkvKsgu_DdWylMjuMeOMD",
		"freeRatioImg": "_2LXIaYOTk7zE0O-b3teycp",
		"originalRatioImg": "joNmbIWjTDhxDjJPGG65I",
		"oneToOneRatioImg": "_1b5NJqKljCey8UuzOfiZcb",
		"threeToFourRatioImg": "_3asWOdoLJ1YpsD-KId6Dxm",
		"fourToThreeRatioImg": "XC-K8RPm7WSUQY_VTnW6",
		"sixteenToNineRatioImg": "_2hDVBXObDK8fyCjIC_ulD4",
		"nineToSixteenRatioImg": "H4ZfPVKUMtQGkPJCgdPFr",
		"rotateLeftImg": "qPmdTXSMHqJak3iUjLONT",
		"rotateRightImg": "_1xzTyVj-sZ9m0TRW9PZ04j"
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyOXB4IiBoZWlnaHQ9IjI4cHgiIHZpZXdCb3g9IjAgMCAyOSAyOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM5NC4wMDAwMDAsIC02MTcuMDAwMDAwKSIgc3Ryb2tlPSIjNUQ1RDVEIj4NCiAgICAgICAgICAgIDxnIGlkPSJQYW5lbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTkuMDAwMDAwLCAyNy4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM2LjAwMDAwMCwgMC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlLTYiIHBvaW50cz0iNy41IDI4IDcuNSA3IDcuNSA3IDI4LjUgNyI+PC9wb2x5bGluZT4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlLTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLjUwMDAwMCwgMTAuNTAwMDAwKSBzY2FsZSgtMSwgLTEpIHRyYW5zbGF0ZSgtMTAuNTAwMDAwLCAtMTAuNTAwMDAwKSAiIHBvaW50cz0iMCAyMSAwIDAgMCAwIDIxIDAiPjwvcG9seWxpbmU+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMXB4IiBoZWlnaHQ9IjIxcHgiIHZpZXdCb3g9IjAgMCAyMSAyMSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUzMi4wMDAwMDAsIC02MjEuMDAwMDAwKSIgc3Ryb2tlPSIjNUQ1RDVEIj4NCiAgICAgICAgICAgIDxnIGlkPSJQYW5lbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzIuMDAwMDAwLCAzMi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE4Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC42MTYxNjE2LDEwLjAzNzEwOTQgQzUuNjAwNTg1ODcsMTMuODc5ODgyOCA5LjYxNjE2MTYyLDE5LjAzNDQ4MjggOS42MTYxNjE2MiwxOS4wMzQ0ODI4IEMxNC45MjcwMjEsMTkuMDM0NDgyOCAxOS4yMzIzMjMyLDE0Ljc3MzQ2ODcgMTkuMjMyMzIzMiw5LjUxNzI0MTM4IEMxOS4yMzIzMjMyLDQuMjYxMDE0MTEgMTQuOTI3MDIxLDAgOS42MTYxNjE2MiwwIEM5LjYxNjE2MTYyLDAgMTUuNjMxNzM3NCw2LjE5NDMzNTk0IDEwLjYxNjE2MTYsMTAuMDM3MTA5NCBaIiBpZD0iT3ZhbCIgZmlsbD0iIzVENUQ1RCI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjYxNjE2MTYyLDAgQzQuMzA1MzAyMiwwIDAsNC4yNjEwMTQxMSAwLDkuNTE3MjQxMzggQzAsMTQuNzczNDY4NyA0LjMwNTMwMjIsMTkuMDM0NDgyOCA5LjYxNjE2MTYyLDE5LjAzNDQ4MjgiIGlkPSJPdmFsIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyNnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyNiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPg0KICAgICAgICA8ZyBpZD0iUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY0My4wMDAwMDAsIC02MjEuMDAwMDAwKSIgc3Ryb2tlPSIjNUQ1RDVEIj4NCiAgICAgICAgICAgIDxnIGlkPSJQYW5lbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDg3LjAwMDAwMCwgMzIuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZS0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDEwLjUwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMzAuMDAwMDAwLCAtMTAuNTAwMDAwKSAiIHBvaW50cz0iMzAgMCA0MiAyMSAxOCAyMSI+PC9wb2x5Z29uPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMXB4IiBoZWlnaHQ9IjIxcHgiIHZpZXdCb3g9IjAgMCAyMSAyMSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc2OS4wMDAwMDAsIC02MjEuMDAwMDAwKSIgc3Ryb2tlPSIjNUQ1RDVEIj4NCiAgICAgICAgICAgIDxnIGlkPSJQYW5lbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjA0LjAwMDAwMCwgMzIuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkuNjE2MTYxNjIsMTkuMDM0NDgyOCBDMTQuOTI3MDIxLDE5LjAzNDQ4MjggMTkuMjMyMzIzMiwxNC43NzM0Njg3IDE5LjIzMjMyMzIsOS41MTcyNDEzOCBDMTkuMjMyMzIzMiw0LjI2MTAxNDExIDE0LjkyNzAyMSwwIDkuNjE2MTYxNjIsMCIgaWQ9Ik92YWwiIGZpbGw9IiM1RDVENUQiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjYxNjE2MTYyLDAgQzQuMzA1MzAyMiwwIDAsNC4yNjEwMTQxMSAwLDkuNTE3MjQxMzggQzAsMTQuNzczNDY4NyA0LjMwNTMwMjIsMTkuMDM0NDgyOCA5LjYxNjE2MTYyLDE5LjAzNDQ4MjgiIGlkPSJPdmFsIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMXB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMSAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+DQogICAgICAgIDxnIGlkPSJDcm9wLSZhbXA7LVJvdGF0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM5NS4wMDAwMDAsIC02MjMuMDAwMDAwKSIgc3Ryb2tlPSIjRkZGRkZGIj4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC02IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzkuMDAwMDAwLCA1OTAuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9Ik5hdmlnYXRpb24tLy1Dcm9wLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0OS4wMDAwMDAsIDI2LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iRlJFRS0rLVJlY3RhbmdsZS05MjMtQ29weS0zLSstUGF0aC0yMzkxLSstUGF0aC0yMzkxLUNvcHkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtQ29weS0zLSstUGF0aC0yMzkxLSstUGF0aC0yMzkxLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNTI3MjczLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtOTIzLUNvcHktMyIgZmlsbD0iI0ZGRkZGRiIgeD0iOS41MDkwOTA5MSIgeT0iMTEuNzYzNjM2NCIgd2lkdGg9IjEzLjgiIGhlaWdodD0iMTMuOCI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0yMzkxIiBwb2ludHM9IjcuMDg0NTM0OCAxNi4xNDEwNjg5IDcuMDg0NTM0OCA4LjI0MzI4ODc4IDE0Ljg2MzI4MTEgOC4yNDMyODg3OCI+PC9wb2x5bGluZT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMjM5MS1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4xODAyODIsIDI0LjQ5NDM0NSkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTIyLjE4MDI4MiwgLTI0LjQ5NDM0NSkgIiBwb2ludHM9IjE4LjI5MDkwOTEgMjguNDQzMjM0NyAxOC4yOTA5MDkxIDIwLjU0NTQ1NDUgMjYuMDY5NjU1NCAyMC41NDU0NTQ1Ij48L3BvbHlsaW5lPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxOXB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxOSAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NjcuMDAwMDAwLCAtNjIzLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkZSRUUtKy1SZWN0YW5nbGUtOTIzLUNvcHktMy0rLVBhdGgtMjM5MS0rLVBhdGgtMjM5MS1Db3B5LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcxLjAwMDAwMCwgMC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtOTIzLUNvcHktMy0rLVBhdGgtMjM5MS0rLVBhdGgtMjM5MS1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUyNzI3MywgMC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTkyMy1Db3B5LTMiIHg9IjgiIHk9IjgiIHdpZHRoPSIxNy41NjM2MzY0IiBoZWlnaHQ9IjIwLjA3MjcyNzMiPjwvcmVjdD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01MjkuMDAwMDAwLCAtNjIzLjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtQ29weS0yLSstMToxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzUuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtOTIzLUNvcHktMiIgeD0iNyIgeT0iOCIgd2lkdGg9IjIwLjA3MjcyNzMiIGhlaWdodD0iMjAuMDcyNzI3MyI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxN3B4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxNyAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NDUuMDAwMDAwLCAtNjI0LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtQ29weS00LSstMzo0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDguMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtOTIzLUNvcHktNCIgeD0iOS41MDkwOTA5MSIgeT0iOSIgd2lkdGg9IjE1LjA1NDU0NTUiIGhlaWdodD0iMjAuMDcyNzI3MyI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjE3cHgiIHZpZXdCb3g9IjAgMCAyMiAxNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01ODUuMDAwMDAwLCAtNjI3LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtQ29weS01LSstNDozIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTIuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTkyMy1Db3B5LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAzNjM2NCwgMTkuNTI3MjczKSByb3RhdGUoLTkwLjAwMDAwMCkgdHJhbnNsYXRlKC0xNi4wMzYzNjQsIC0xOS41MjcyNzMpICIgeD0iOC41MDkwOTA5MSIgeT0iOS40OTA5MDkwOSIgd2lkdGg9IjE1LjA1NDU0NTUiIGhlaWdodD0iMjAuMDcyNzI3MyI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjEzcHgiIHZpZXdCb3g9IjAgMCAyMiAxMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MDUuMDAwMDAwLCAtNjI4LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtKy0xNjo5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTEuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTQiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtOTIzIiB4PSI3LjAxODE4MTgyIiB5PSIxMyIgd2lkdGg9IjIwLjA3MjcyNzMiIGhlaWdodD0iMTEuMjkwOTA5MSI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxM3B4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxMyAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NzMuMDAwMDAwLCAtNjI0LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgNTkwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJOYXZpZ2F0aW9uLS8tQ3JvcC1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuMDAwMDAwLCAyNi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS05MjMtQ29weS0rLTk6MTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3Ni4wMDAwMDAsIDAuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMyI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS05MjMtQ29weSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuODAwMDAwLCAxOC42NjM2MzYpIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTE1LjgwMDAwMCwgLTE4LjY2MzYzNikgIiB4PSI1Ljc2MzYzNjM2IiB5PSIxMy4wMTgxODE4IiB3aWR0aD0iMjAuMDcyNzI3MyIgaGVpZ2h0PSIxMS4yOTA5MDkxIj48L3JlY3Q+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyOXB4IiBoZWlnaHQ9IjI1cHgiIHZpZXdCb3g9IjAgMCAyOSAyNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNzEuMDAwMDAwLCAtMzUxLjAwMDAwMCkiIHN0cm9rZT0iIzg2ODY4NiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4NS41MDAwMDAsIDM2My41MDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTI4NS41MDAwMDAsIC0zNjMuNTAwMDAwKSB0cmFuc2xhdGUoMjcyLjAwMDAwMCwgMzUyLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMywxMS41IEMyMyw1LjE0ODcyNTM4IDE3Ljg1MTI3NDYsMCAxMS41LDAgQzUuMTQ4NzI1MzgsMCAwLDUuMTQ4NzI1MzggMCwxMS41IEMwLDE3Ljg1MTI3NDYgNS4xNDg3MjUzOCwyMyAxMS41LDIzIEwxMS41LDIzIiBpZD0iT3ZhbC00Ij48L3BhdGg+DQogICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJUcmlhbmdsZS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMy4wMDAwMDAsIDEwLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMjMuMDAwMDAwLCAtMTAuMDAwMDAwKSAiIHBvaW50cz0iMTkgMTIgMjMgOCAyMyA4IDI3IDEyIj48L3BvbHlsaW5lPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyOXB4IiBoZWlnaHQ9IjI1cHgiIHZpZXdCb3g9IjAgMCAyOSAyNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IlByb2Nlc3NpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iQ3JvcC0mYW1wOy1Sb3RhdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NjkuMDAwMDAwLCAtMzUxLjAwMDAwMCkiIHN0cm9rZT0iIzg2ODY4NiI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg3MC4wMDAwMDAsIDM1Mi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjMsMTEuNSBDMjMsNS4xNDg3MjUzOCAxNy44NTEyNzQ2LDAgMTEuNSwwIEM1LjE0ODcyNTM4LDAgMCw1LjE0ODcyNTM4IDAsMTEuNSBDMCwxNy44NTEyNzQ2IDUuMTQ4NzI1MzgsMjMgMTEuNSwyMyBMMTEuNSwyMyIgaWQ9Ik92YWwtNCI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iVHJpYW5nbGUtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMuMDAwMDAwLCAxMC4wMDAwMDApIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTIzLjAwMDAwMCwgLTEwLjAwMDAwMCkgIiBwb2ludHM9IjE5IDEyIDIzIDggMjMgOCAyNyAxMiI+PC9wb2x5bGluZT4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./viewContainer.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./viewContainer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports
	
	
	// module
	exports.push([module.id, "._1BfQnaibTmiy62RnJydXEd {\n  width: 100%;\n  min-height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: #ffffff;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  ._1BfQnaibTmiy62RnJydXEd ._2wpcUR2x7dltEvVzikjxwU {\n    padding-top: 30px;\n    padding-bottom: 10px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%; }\n    @media screen and (max-width: 760px) {\n      ._1BfQnaibTmiy62RnJydXEd ._2wpcUR2x7dltEvVzikjxwU {\n        padding-top: 10px; } }\n    ._1BfQnaibTmiy62RnJydXEd ._2wpcUR2x7dltEvVzikjxwU h1 {\n      font-family: SFUIText-Medium;\n      font-size: 28px;\n      text-align: center;\n      letter-spacing: 0px;\n      line-height: 40px; }\n      @media screen and (max-width: 760px) {\n        ._1BfQnaibTmiy62RnJydXEd ._2wpcUR2x7dltEvVzikjxwU h1 {\n          font-family: SFUIText-Medium;\n          font-size: 16px;\n          letter-spacing: 0.4px; } }\n  ._1BfQnaibTmiy62RnJydXEd .x2L71BzL40SumZ5r5CMFX {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 auto;\n            flex: 1 auto;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    ._1BfQnaibTmiy62RnJydXEd .x2L71BzL40SumZ5r5CMFX img {\n      margin-left: 10px;\n      margin-right: 10px;\n      width: 100%; }\n  ._1BfQnaibTmiy62RnJydXEd ._18J7DHBZqGNnLqNG8zzvvP {\n    width: 100%;\n    height: 150px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    ._1BfQnaibTmiy62RnJydXEd ._18J7DHBZqGNnLqNG8zzvvP._38E6ueRHMS4rpx8QXdbNy5 {\n      background-color: #3787EC; }\n", ""]);
	
	// exports
	exports.locals = {
		"viewContainer": "_1BfQnaibTmiy62RnJydXEd",
		"headerBlock": "_2wpcUR2x7dltEvVzikjxwU",
		"imageBlock": "x2L71BzL40SumZ5r5CMFX",
		"toolBoxContainer": "_18J7DHBZqGNnLqNG8zzvvP",
		"blue": "_38E6ueRHMS4rpx8QXdbNy5"
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ejs = __webpack_require__(23);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _cropAndRotate = __webpack_require__(47);
	
	var _cropAndRotate2 = _interopRequireDefault(_cropAndRotate);
	
	var _IdGenerator = __webpack_require__(48);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	var _buttons = __webpack_require__(25);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	var _images = __webpack_require__(29);
	
	var _images2 = _interopRequireDefault(_images);
	
	var _viewContainer = __webpack_require__(44);
	
	var _viewContainer2 = _interopRequireDefault(_viewContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var CropAndRotateView = function () {
	  function CropAndRotateView(container, effectsModel) {
	    (0, _classCallCheck3.default)(this, CropAndRotateView);
	
	    this.container = container;
	    this.model = effectsModel;
	
	    this.CAR_APPLY_BTN_ID = "carApplyBtn" + _IdGenerator2.default.Generate();
	    this.CAR_CANCEL_BTN_ID = "carCancelBtn" + _IdGenerator2.default.Generate();
	    this.CAR_APPLY_MOB_BTN_ID = "carApplyMobBtn" + _IdGenerator2.default.Generate();
	    this.CAR_CANCEL_MOB_BTN_ID = "carCancelMobBtn" + _IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(CropAndRotateView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
	        this.viewDeferred = $.Deferred();
	      }
	
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        carApplyBtn: this.CAR_APPLY_BTN_ID,
	        carCancelBtn: this.CAR_CANCEL_BTN_ID,
	        carApplyMobBtn: this.CAR_APPLY_MOB_BTN_ID,
	        carCancelMobBtn: this.CAR_CANCEL_MOB_BTN_ID,
	        buttonStyles: _buttons2.default,
	        imageStyles: _images2.default,
	        layoutStyles: _viewContainer2.default
	      };
	
	      var markupStr = _ejs2.default.render(_cropAndRotate2.default, renderData);
	      parentEl.html(markupStr);
	      this.setupHandlers(parentEl);
	
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this = this;
	
	      $(parentEl).find("#" + this.CAR_CANCEL_BTN_ID).click(function (ev) {
	        return _this.carCancelClick(ev);
	      });
	      $(parentEl).find("#" + this.CAR_APPLY_BTN_ID).click(function (ev) {
	        return _this.carApplyClick(ev);
	      });
	      $(parentEl).find("#" + this.CAR_CANCEL_MOB_BTN_ID).click(function (ev) {
	        return _this.carCancelClick(ev);
	      });
	      $(parentEl).find("#" + this.CAR_APPLY_MOB_BTN_ID).click(function (ev) {
	        return _this.carApplyClick(ev);
	      });
	    }
	  }, {
	    key: 'carCancelClick',
	    value: function carCancelClick(ev) {
	      this.viewDeferred.resolve({
	        reason: "Cancel"
	      });
	    }
	  }, {
	    key: 'carApplyClick',
	    value: function carApplyClick(ev) {
	      this.viewDeferred.resolve({
	        reason: "Apply"
	      });
	    }
	  }]);
	  return CropAndRotateView;
	}();
	
	exports.default = CropAndRotateView;

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<div class=\"<%= layoutStyles.viewContainer %>\">\r\n  <div class=\"<%= layoutStyles.headerBlock %>\">\r\n    <button class=\"<%=buttonStyles.ucButton %>\r\n                   <%=buttonStyles.ucButtonPrimary %> \r\n                   <%=buttonStyles.hideScreen %>\" id=\"<%= carCancelMobBtn %>\">Cancel</button>\r\n    <h1>Crop &amp; Rotate</h1>\r\n    <button class=\"<%=buttonStyles.ucButton %>\r\n                   <%=buttonStyles.ucButtonPrimary %> \r\n                   <%=buttonStyles.hideScreen %>\" id=\"<%= carApplyMobBtn %>\">Apply</button>\r\n  </div>\r\n  <div class=\"<%=layoutStyles.imageBlock %>\">\r\n    <button class=\"<%= buttonStyles.ucIconBtn %> \r\n                  <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.rotateLeftImg %>\"></div>\r\n    </button>\r\n    <img src=\"<%= previewUrl %>\" alt=\"\">\r\n    <button class=\"<%= buttonStyles.ucIconBtn %> \r\n                  <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.rotateRightImg %>\"></div>\r\n    </button>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.toolBoxContainer %>\r\n              <%= layoutStyles.blue %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonGrey %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= carCancelBtn %>\">Cancel</button>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.freeRatioImg %>\"></div>\r\n      <span>FREE</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.originalRatioImg %>\"></div>\r\n      <span>ORIG</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.oneToOneRatioImg %>\"></div>\r\n      <span>1:1</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.threeToFourRatioImg %>\"></div>\r\n      <span>3:4</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.fourToThreeRatioImg %>\"></div>\r\n      <span>4:3</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.sixteenToNineRatioImg %>\"></div>\r\n      <span>16:9</span>\r\n    </div>\r\n    <div class=\"<%= buttonStyles.ucIconBtn %> <%= buttonStyles.white %>\">\r\n      <div class=\"<%= imageStyles.nineToSixteenRatioImg %>\"></div>\r\n      <span>9:16</span>\r\n    </div>\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonWhite %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= carApplyBtn %>\">Apply</button>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  Generate: function Generate() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ejs = __webpack_require__(23);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _enhance = __webpack_require__(50);
	
	var _enhance2 = _interopRequireDefault(_enhance);
	
	var _slider = __webpack_require__(51);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(48);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	var _buttons = __webpack_require__(25);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	var _images = __webpack_require__(29);
	
	var _images2 = _interopRequireDefault(_images);
	
	var _viewContainer = __webpack_require__(44);
	
	var _viewContainer2 = _interopRequireDefault(_viewContainer);
	
	var _slider3 = __webpack_require__(53);
	
	var _slider4 = _interopRequireDefault(_slider3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var EnhanceView = function () {
	  function EnhanceView(container, effectsModel) {
	    var _this = this;
	
	    (0, _classCallCheck3.default)(this, EnhanceView);
	
	    this.container = container;
	    this.model = effectsModel;
	
	    this.slider = new _slider2.default();
	
	    this.slider.onChange(function (newVal) {
	      return _this.onChangeSlider(newVal);
	    });
	
	    this.SLIDER_ID = "slider_" + _IdGenerator2.default.Generate();
	    this.PREVIEW_IMG_ID = "preview_mage_" + _IdGenerator2.default.Generate();
	
	    this.ENHANCE_APPLY_BTN_ID = "enhanceApplyBtn_" + _IdGenerator2.default.Generate();
	    this.ENHANCE_CANCEL_BTN_ID = "enhanceCancelBtn_" + _IdGenerator2.default.Generate();
	
	    this.ENHANCE_APPLY_MOB_BTN_ID = "enhanceApplyMobBtn_" + _IdGenerator2.default.Generate();
	    this.ENHANCE_CANCEL_MOB_BTN_ID = "enhanceCancelMobBtn_" + _IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(EnhanceView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	
	      if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
	        this.viewDeferred = $.Deferred();
	      }
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        sliderId: this.SLIDER_ID,
	        previewImageId: this.PREVIEW_IMG_ID,
	        enhanceApplyBtn: this.ENHANCE_APPLY_BTN_ID,
	        enhanceCancelBtn: this.ENHANCE_CANCEL_BTN_ID,
	        enhanceApplyMobBtn: this.ENHANCE_APPLY_MOB_BTN_ID,
	        enhanceCancelMobBtn: this.ENHANCE_CANCEL_MOB_BTN_ID,
	        buttonStyles: _buttons2.default,
	        imageStyles: _images2.default,
	        layoutStyles: _viewContainer2.default,
	        sliderStyles: _slider4.default
	      };
	      var markupStr = _ejs2.default.render(_enhance2.default, renderData);
	      parentEl.html(markupStr);
	
	      var sliderContainer = $(parentEl).find("#" + this.SLIDER_ID);
	      this.slider.render(sliderContainer, this.model.enhance);
	
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      $(parentEl).find('#' + this.ENHANCE_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.enhanceCancelClick(ev);
	      });
	      $(parentEl).find('#' + this.ENHANCE_APPLY_BTN_ID).click(function (ev) {
	        return _this2.enhanceApplyClick(ev);
	      });
	      $(parentEl).find('#' + this.ENHANCE_CANCEL_MOB_BTN_ID).click(function (ev) {
	        return _this2.enhanceCancelClick(ev);
	      });
	      $(parentEl).find('#' + this.ENHANCE_APPLY_MOB_BTN_ID).click(function (ev) {
	        return _this2.enhanceApplyClick(ev);
	      });
	    }
	  }, {
	    key: 'enhanceCancelClick',
	    value: function enhanceCancelClick(ev) {
	      this.model.enhance = undefined;
	      this.viewDeferred.resolve({
	        reason: "Cancel"
	      });
	    }
	  }, {
	    key: 'enhanceApplyClick',
	    value: function enhanceApplyClick(ev) {
	      this.viewDeferred.resolve({
	        reason: "Apply"
	      });
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
	        _this3.container.find("#" + _this3.PREVIEW_IMG_ID).attr("src", _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	  return EnhanceView;
	}();
	
	exports.default = EnhanceView;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "<div class=\"<%= layoutStyles.viewContainer %>\">\r\n  <div class=\"<%= layoutStyles.headerBlock %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n                   <%= buttonStyles.ucButtonPrimary %> \r\n                   <%= buttonStyles.hideScreen %>\" id=\"<%= enhanceCancelMobBtn %>\">Cancel</button>\r\n    <h1>Enhance</h1>\r\n    <button class=\"<%=buttonStyles.ucButton %>\r\n                   <%=buttonStyles.ucButtonPrimary %> \r\n                   <%=buttonStyles.hideScreen %>\" id=\"<%= enhanceApplyMobBtn %>\">Apply</button>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.imageBlock %>\">\r\n    <img src=\"<%= previewUrl %>\" alt=\"\" id=\"<%= previewImageId%>\"/>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.toolBoxContainer %>\r\n              <%= layoutStyles.blue %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonGrey %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= enhanceCancelBtn %>\">Cancel</button>\r\n    <div class=\"<%= sliderStyles.slider %>\" id=\"<%= sliderId%>\"></div>\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonWhite %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= enhanceApplyBtn %>\">Apply</button>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ejs = __webpack_require__(23);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _slider = __webpack_require__(52);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _slider3 = __webpack_require__(53);
	
	var _slider4 = _interopRequireDefault(_slider3);
	
	var _IdGenerator = __webpack_require__(48);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var Slider = function () {
	  function Slider(container) {
	    var maxValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	    (0, _classCallCheck3.default)(this, Slider);
	
	    this.container = container;
	    this.onChangeHandler = null;
	    this.maxValue = maxValue;
	    this.POINTER_ID = "pointer_" + _IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(Slider, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this.container = parentEl;
	      var markupStr = _ejs2.default.render(_slider2.default, {
	        pointerId: this.POINTER_ID,
	        styles: _slider4.default
	      });
	      parentEl.html(markupStr);
	      this.setupHandlers(parentEl);
	
	      this.currentPos = Math.round(100 / this.maxValue * value);
	
	      this.$pointer.css("left", "calc(" + this.currentPos + "% - 8px)");
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this = this;
	
	      this.$pointer = $(parentEl).find("#" + this.POINTER_ID);
	
	      this.$pointer.on("mousedown touchstart", function (ev) {
	        return _this.pointerMouseDown(ev);
	      });
	    }
	  }, {
	    key: 'pointerMouseDown',
	    value: function pointerMouseDown(ev) {
	      var _this2 = this;
	
	      this.multiplyer = 100 / this.$pointer.parent().width();
	      this.leftOffset = this.$pointer.parent().offset().left;
	      ev.preventDefault();
	      ev.stopPropagation();
	      ev.bubbles = false;
	
	      $("body").mousemove(function (ev) {
	        return _this2.bodyMouseMove(ev);
	      });
	
	      $("body").on("touchmove", function (ev) {
	        return _this2.bodyTouchMove(ev);
	      });
	
	      $("body").on("mouseup", function (ev) {
	        return _this2.bodyMouseUp(ev);
	      });
	    }
	  }, {
	    key: 'bodyMouseMove',
	    value: function bodyMouseMove(ev) {
	      return this.updatePoinerPos(ev.pageX);
	    }
	  }, {
	    key: 'bodyTouchMove',
	    value: function bodyTouchMove(ev) {
	      console.log(ev.originalEvent.touches[0]);
	      return this.updatePoinerPos(ev.originalEvent.touches[0].clientX);
	    }
	  }, {
	    key: 'updatePoinerPos',
	    value: function updatePoinerPos(pageX) {
	      var pointerPos = (pageX - this.leftOffset) * this.multiplyer;
	      pointerPos = Math.max(0, pointerPos);
	      pointerPos = Math.min(100, pointerPos);
	      pointerPos = Math.round(pointerPos);
	
	      this.$pointer.css("left", "calc(" + pointerPos + "% - 8px)");
	
	      if (this.onChangeHandler && this.currentPos != pointerPos) {
	        this.onChangeHandler(Math.round(this.maxValue / 100 * pointerPos));
	      }
	      this.currentPos = pointerPos;
	    }
	  }, {
	    key: 'bodyMouseUp',
	    value: function bodyMouseUp(ev) {
	      $("body").off();
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
/* 52 */
/***/ function(module, exports) {

	module.exports = "<div class=\"<%= styles.backLineBlock %>\">\r\n    <dib class=\"<%= styles.backLine %>\">\r\n        <div class=\"<%= styles.pointer %>\" id=\"<%= pointerId %>\"></div>\r\n    </dib>\r\n</div>\r\n"

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(54);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./slider.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./slider.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports
	
	
	// module
	exports.push([module.id, "._1rx5WoXsKqbwShENBAMQ9D {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 auto;\n          flex: 1 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 48px;\n  margin-left: 20px;\n  margin-right: 20px; }\n  ._1rx5WoXsKqbwShENBAMQ9D ._1Q06EO8XnkGG3TM6QZ8KKW {\n    padding-left: 8px;\n    padding-right: 8px;\n    display: block;\n    width: 100%;\n    height: 3px; }\n  ._1rx5WoXsKqbwShENBAMQ9D ._2PRMXABLlJorBaekS_nibM {\n    background: #ffffff;\n    width: calc(100% - 16px);\n    height: 3px;\n    position: absolute; }\n  ._1rx5WoXsKqbwShENBAMQ9D ._2_Ya-_PjgpGRFiKJcrZ1L6 {\n    border-radius: 50%;\n    position: absolute;\n    background: #ffffff;\n    width: 16px;\n    height: 16px;\n    top: -7px;\n    z-index: 100; }\n    ._1rx5WoXsKqbwShENBAMQ9D ._2_Ya-_PjgpGRFiKJcrZ1L6:hover {\n      cursor: pointer; }\n", ""]);
	
	// exports
	exports.locals = {
		"slider": "_1rx5WoXsKqbwShENBAMQ9D",
		"backLineBlock": "_1Q06EO8XnkGG3TM6QZ8KKW",
		"backLine": "_2PRMXABLlJorBaekS_nibM",
		"pointer": "_2_Ya-_PjgpGRFiKJcrZ1L6"
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ejs = __webpack_require__(23);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _sharpen = __webpack_require__(56);
	
	var _sharpen2 = _interopRequireDefault(_sharpen);
	
	var _slider = __webpack_require__(51);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(48);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	var _buttons = __webpack_require__(25);
	
	var _buttons2 = _interopRequireDefault(_buttons);
	
	var _images = __webpack_require__(29);
	
	var _images2 = _interopRequireDefault(_images);
	
	var _viewContainer = __webpack_require__(44);
	
	var _viewContainer2 = _interopRequireDefault(_viewContainer);
	
	var _slider3 = __webpack_require__(53);
	
	var _slider4 = _interopRequireDefault(_slider3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var SharpenView = function () {
	  function SharpenView(container, effectsModel) {
	    var _this = this;
	
	    (0, _classCallCheck3.default)(this, SharpenView);
	
	    this.container = container;
	    this.model = effectsModel;
	    this.slider = new _slider2.default(null, 20);
	    this.slider.onChange(function (newVal) {
	      return _this.onChangeSlider(newVal);
	    });
	
	    this.SLIDER_ID = "slider_" + _IdGenerator2.default.Generate();
	    this.PREVIEW_IMG_ID = "preview_mage_" + _IdGenerator2.default.Generate();
	    this.SHARPEN_APPLY_BTN_ID = "sharpenApplyBtn" + +_IdGenerator2.default.Generate();
	    this.SHARPEN_CANCEL_BTN_ID = "sharpenCancelBtn" + +_IdGenerator2.default.Generate();
	    this.SHARPEN_APPLY_MOB_BTN_ID = "sharpenApplyMobBtn" + +_IdGenerator2.default.Generate();
	    this.SHARPEN_CANCEL_MOB_BTN_ID = "sharpenCancelMobBtn" + +_IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(SharpenView, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	
	      if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
	        this.viewDeferred = $.Deferred();
	      }
	      this.container = parentEl;
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        sliderId: this.SLIDER_ID,
	        previewImageId: this.PREVIEW_IMG_ID,
	        sharpenApplyBtn: this.SHARPEN_APPLY_BTN_ID,
	        sharpenCancelBtn: this.SHARPEN_CANCEL_BTN_ID,
	        sharpenCancelMobBtn: this.SHARPEN_CANCEL_MOB_BTN_ID,
	        sharpenApplyMobBtn: this.SHARPEN_APPLY_MOB_BTN_ID,
	        buttonStyles: _buttons2.default,
	        imageStyles: _images2.default,
	        layoutStyles: _viewContainer2.default,
	        sliderStyles: _slider4.default
	      };
	
	      var markupStr = _ejs2.default.render(_sharpen2.default, renderData);
	      parentEl.html(markupStr);
	
	      var sliderContainer = $(parentEl).find("#" + this.SLIDER_ID);
	      this.slider.render(sliderContainer, this.model.sharp);
	
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      $(parentEl).find('#' + this.SHARPEN_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.sharpenCancelClick(ev);
	      });
	      $(parentEl).find('#' + this.SHARPEN_APPLY_BTN_ID).click(function (ev) {
	        return _this2.sharpenApplyClick(ev);
	      });
	      $(parentEl).find('#' + this.SHARPEN_CANCEL_MOB_BTN_ID).click(function (ev) {
	        return _this2.sharpenCancelClick(ev);
	      });
	      $(parentEl).find('#' + this.SHARPEN_APPLY_MOB_BTN_ID).click(function (ev) {
	        return _this2.sharpenApplyClick(ev);
	      });
	    }
	  }, {
	    key: 'sharpenCancelClick',
	    value: function sharpenCancelClick(ev) {
	      this.model.sharp = undefined;
	      this.viewDeferred.resolve({
	        reason: "Cancel"
	      });
	    }
	  }, {
	    key: 'sharpenApplyClick',
	    value: function sharpenApplyClick(ev) {
	      this.viewDeferred.resolve({
	        reason: "Apply"
	      });
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
	        _this3.container.find("#" + _this3.PREVIEW_IMG_ID).attr("src", _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	  return SharpenView;
	}();
	
	exports.default = SharpenView;

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "<div class=\"<%= layoutStyles.viewContainer %>\">\r\n  <div class=\"<%= layoutStyles.headerBlock %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n                   <%= buttonStyles.ucButtonPrimary %> \r\n                   <%= buttonStyles.hideScreen %>\" id=\"<%= sharpenCancelMobBtn %>\">Cancel</button>\r\n    <h1>Sharpen</h1>\r\n    <button class=\"<%=buttonStyles.ucButton %>\r\n                   <%=buttonStyles.ucButtonPrimary %> \r\n                   <%=buttonStyles.hideScreen %>\" id=\"<%= sharpenApplyMobBtn %>\">Apply</button>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.imageBlock %>\">\r\n    <img src=\"<%= previewUrl %>\" alt=\"\" id=\"<%= previewImageId%>\"/>\r\n  </div>\r\n  <div class=\"<%= layoutStyles.toolBoxContainer %>\r\n              <%= layoutStyles.blue %>\">\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonGrey %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= sharpenCancelBtn %>\">Cancel</button>\r\n    <div class=\"<%= sliderStyles.slider %>\" id=\"<%= sliderId %>\"></div>\r\n    <button class=\"<%= buttonStyles.ucButton %>\r\n       <%= buttonStyles.ucButtonWhite %>\r\n       <%= buttonStyles.hideMobile %>\" id=\"<%= sharpenApplyBtn %>\">Apply</button>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.INVERT_EFFECT = exports.GRAYSCALE_EFFECT = exports.BLUR_EFFECT = exports.SHARP_EFFECT = exports.ENHANCE_EFFECT = exports.MIRROR_EFFECT = exports.FLIP_EFFECT = exports.AUTOROTATE_EFFECT = exports.ROTATE_EFFECT = exports.QUALITY_EFFECT = exports.PROGRESSIVE_EFFECT = exports.FORMAT_EFFECT = undefined;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	exports.default = EffectsModel;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FORMAT_EFFECT = exports.FORMAT_EFFECT = 'format';
	var PROGRESSIVE_EFFECT = exports.PROGRESSIVE_EFFECT = 'progressive';
	var QUALITY_EFFECT = exports.QUALITY_EFFECT = 'quality';
	
	var ROTATE_EFFECT = exports.ROTATE_EFFECT = 'rotate';
	var AUTOROTATE_EFFECT = exports.AUTOROTATE_EFFECT = 'autorotate';
	var FLIP_EFFECT = exports.FLIP_EFFECT = 'flip';
	var MIRROR_EFFECT = exports.MIRROR_EFFECT = 'mirror';
	
	var ENHANCE_EFFECT = exports.ENHANCE_EFFECT = 'enhance';
	var SHARP_EFFECT = exports.SHARP_EFFECT = 'sharp';
	var BLUR_EFFECT = exports.BLUR_EFFECT = 'blur';
	var GRAYSCALE_EFFECT = exports.GRAYSCALE_EFFECT = 'grayscale';
	var INVERT_EFFECT = exports.INVERT_EFFECT = 'invert';
	
	function EffectsModel(cdn_url) {
	  this.cdn_url = cdn_url;
	  var effectsData = {};
	
	  (0, _defineProperty2.default)(this, FORMAT_EFFECT, definePropOptions(FORMAT_EFFECT));
	  (0, _defineProperty2.default)(this, PROGRESSIVE_EFFECT, definePropOptions(PROGRESSIVE_EFFECT));
	  (0, _defineProperty2.default)(this, QUALITY_EFFECT, definePropOptions(QUALITY_EFFECT));
	  (0, _defineProperty2.default)(this, ROTATE_EFFECT, definePropOptions(ROTATE_EFFECT));
	  (0, _defineProperty2.default)(this, AUTOROTATE_EFFECT, definePropOptions(AUTOROTATE_EFFECT));
	  (0, _defineProperty2.default)(this, FLIP_EFFECT, definePropOptions(FLIP_EFFECT));
	  (0, _defineProperty2.default)(this, MIRROR_EFFECT, definePropOptions(MIRROR_EFFECT));
	  (0, _defineProperty2.default)(this, ENHANCE_EFFECT, definePropOptions(ENHANCE_EFFECT));
	  (0, _defineProperty2.default)(this, SHARP_EFFECT, definePropOptions(SHARP_EFFECT));
	  (0, _defineProperty2.default)(this, BLUR_EFFECT, definePropOptions(BLUR_EFFECT));
	  (0, _defineProperty2.default)(this, GRAYSCALE_EFFECT, definePropOptions(GRAYSCALE_EFFECT));
	  (0, _defineProperty2.default)(this, INVERT_EFFECT, definePropOptions(INVERT_EFFECT));
	
	  function definePropOptions(propertyName) {
	    return {
	      enumerable: true,
	      set: function set(value) {
	        effectsData[propertyName] = value;
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
	    var protocolAndIdArr = urlWithId.split(this.cdn_url);
	    this.protocol = protocolAndIdArr[0].split('://')[0];
	    this.imageId = protocolAndIdArr[1].split('/')[0];
	    for (var i = 1; i < effectsArr.length; i++) {
	      this.parseValue(effectsArr[i]);
	    }
	  };
	
	  this.parseValue = function (formatString) {
	    var formatArr = formatString.split('/');
	    this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
	  };
	
	  this.getFinalUrl = function () {
	    var baseUrl = this.protocol + '://' + this.cdn_url + this.imageId + '/';
	    uploadcare.jQuery.each(effectsData, function (key, val) {
	      if (val !== undefined) {
	        baseUrl += '-/' + key + '/';
	        if (val) {
	          baseUrl += val + '/';
	        }
	      }
	    });
	    return baseUrl;
	  };
	
	  this.getPreviewUrl = function (width, height) {
	    var res = this.getFinalUrl() + '-/preview/';
	    if (width) {
	      res += width;
	    }
	    if (height) {
	      res += "x" + height;
	    }
	    if (width || height) {
	      res += "/";
	    }
	    return res;
	  };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=uploadcare.tab-effects.js.map
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
	
	var _effectsModel = __webpack_require__(44);
	
	var _effectsModel2 = _interopRequireDefault(_effectsModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function effectsTab(container, button, dialogApi, settings) {
	
	  // getting first image for preview;
	  var isFileTaken = false;
	
	  var fileResolver = function fileResolver(fileInfo) {
	    if (isFileTaken) {
	      return;
	    }
	
	    if (fileInfo.isImage) {
	      isFileTaken = true;
	    }
	
	    var model = new _effectsModel2.default('ucarecdn.com/', fileInfo.originalImageInfo.width, fileInfo.originalImageInfo.height);
	    model.parseUrl(fileInfo.cdnUrl);
	    var previewView = new _previewView2.default(container, model);
	    previewView.render().then(function (type) {
	      fileInfo.cdnUrl = model.getPreviewUrl();
	      dialogApi.resolve();
	    });
	  };
	
	  dialogApi.fileColl.onAdd.add(function (promise, i) {
	    promise.then(fileResolver);
	  });
	  var filePromises = dialogApi.fileColl.get();
	
	  filePromises.forEach(function (promise, i) {
	    promise.then(fileResolver);
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
	
	var _cropAndRotateView = __webpack_require__(25);
	
	var _cropAndRotateView2 = _interopRequireDefault(_cropAndRotateView);
	
	var _enhanceView = __webpack_require__(32);
	
	var _enhanceView2 = _interopRequireDefault(_enhanceView);
	
	var _sharpenView = __webpack_require__(38);
	
	var _sharpenView2 = _interopRequireDefault(_sharpenView);
	
	var _IdGenerator = __webpack_require__(27);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(40);
	
	__webpack_require__(42);
	
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
	
	        appliedGrayscale: this.model.grayscale === null,
	        appliedSharpen: this.model.sharp ? true : false,
	        appliedEnhance: this.model.enhance ? true : false,
	        appliedCar: this.model.rotate || this.model.crop ? true : false
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
	
	      $(parentEl).find("." + this.CROP_AND_ROTATE_BTN_ID).click(function (ev) {
	        return _this.cropAndRotateClick(ev);
	      });
	      $(parentEl).find("." + this.ENHANCE_BTN_ID).click(function (ev) {
	        return _this.enhanceClick(ev);
	      });
	      $(parentEl).find("." + this.SHARPEN_BTN_ID).click(function (ev) {
	        return _this.sharpenClick(ev);
	      });
	      $(parentEl).find("." + this.GRAYSCALE_BTN_ID).click(function (ev) {
	        return _this.grayScaleClick(ev);
	      });
	
	      $(parentEl).find("." + this.REMOVE_BTN_ID).click(function (ev) {
	        return _this.removeClick(ev);
	      });
	      $(parentEl).find("." + this.DONE_BTN_ID).click(function (ev) {
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

	module.exports = "<div class=\"uploadcare--panel__header\">\r\n\t<div class=\"uploadcare--panel__title uploadcare--preview__title\">\r\n\t\tPreview<!-- TODO Take word from locale -->\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__content\">\r\n\t<div class=\"uploadcare--preview__image-container\">\r\n\t\t<img src=\"<%= previewUrl %>\" alt=\"\" class=\"uploadcare--preview__image\"/>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__footer\">\r\n\t<div class=\"uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back <%= removeBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Cancel<!-- TODO Take word from locale --></div>\r\n\r\n\t<div class=\"uploadcare--panel__footer-additions\">\r\n\t\t<div class=\"uploadcare-tab-effects--effect-buttons\">\r\n\t\t\t<div class=\"uploadcare-tab-effects--effect-button <% if(appliedCar) { %>uploadcare-tab-effects--effect-button_applied<% } %> <%= cropAndRotateBtnId %>\">\r\n\t\t\t\t<svg width=\"29\" height=\"28\" viewBox=\"0 0 29 28\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\" class=\"svg-stroke\"><path d=\"M7.5 28V7h21\"/><path d=\"M21 0v21H0\"/></g></svg>\r\n\t\t\t\t<div class=\"uploadcare-tab-effects--effect-button__caption\">Crop &amp; Rotate<!-- TODO Take word from locale --></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"uploadcare-tab-effects--effect-button <% if(appliedEnhance) { %>uploadcare-tab-effects--effect-button_applied<% } %> <%= enhanceBtnId %>\">\r\n\t\t\t\t<svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\" class=\"svg-stroke\"><path d=\"M11.616 11.037c-5.015 3.843-1 8.997-1 8.997 5.311 0 9.616-4.26 9.616-9.517C20.232 5.261 15.927 1 10.616 1c0 0 6.016 6.194 1 10.037z\" fill=\"#000\" class=\"svg-fill\"/><path d=\"M10.616 1C5.306 1 1 5.261 1 10.517c0 5.256 4.305 9.517 9.616 9.517\"/></g></svg>\r\n\t\t\t\t<div class=\"uploadcare-tab-effects--effect-button__caption\">Enhance<!-- TODO Take word from locale --></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"uploadcare-tab-effects--effect-button <% if(appliedSharpen) { %>uploadcare-tab-effects--effect-button_applied<% } %> <%= sharpenBtnId %>\">\r\n\t\t\t\t<svg width=\"26\" height=\"22\" viewBox=\"0 0 26 22\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\" stroke-linejoin=\"round\" class=\"svg-stroke\"><path d=\"M13 22L25 1H1z\"/></g></svg>\r\n\t\t\t\t<div class=\"uploadcare-tab-effects--effect-button__caption\">Sharpen<!-- TODO Take word from locale --></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"uploadcare-tab-effects--effect-button <% if(appliedGrayscale) { %>uploadcare-tab-effects--effect-button_applied<% } %> <%= grayscaleBtnId %>\">\r\n\t\t\t\t<svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\" class=\"svg-stroke\"><path d=\"M10.616 20.034c5.311 0 9.616-4.26 9.616-9.517C20.232 5.261 15.927 1 10.616 1\" fill=\"#000\" class=\"svg-fill\"/><path d=\"M10.616 1C5.306 1 1 5.261 1 10.517c0 5.256 4.305 9.517 9.616 9.517\"/></g></svg>\r\n\t\t\t\t<div class=\"uploadcare-tab-effects--effect-button__caption\">Grayscale<!-- TODO Take word from locale --></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"uploadcare--button uploadcare--button_primary uploadcare--preview__done <%= doneBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Done<!-- TODO Take word from locale --></div>\r\n</div>\r\n"

/***/ },
/* 25 */
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
	
	var _cropAndRotate = __webpack_require__(26);
	
	var _cropAndRotate2 = _interopRequireDefault(_cropAndRotate);
	
	var _IdGenerator = __webpack_require__(27);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = uploadcare.jQuery;
	
	var CropAndRotateView = function () {
	  function CropAndRotateView(container, effectsModel) {
	    (0, _classCallCheck3.default)(this, CropAndRotateView);
	
	    this.container = container;
	    this.model = effectsModel;
	    this.cropApi = null;
	
	    this.CAR_APPLY_BTN_ID = "carApplyBtn" + _IdGenerator2.default.Generate();
	    this.CAR_CANCEL_BTN_ID = "carCancelBtn" + _IdGenerator2.default.Generate();
	
	    this.CAR_FREE_RATIO_BTN_ID = "carFreeRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_ORIG_RATIO_BTN_ID = "carOrigRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_ONE_TO_ONE_RATIO_BTN_ID = "carOneToOneRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_THREE_TO_FOUR_RATIO_BTN_ID = "carThreeToFourRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_FOUR_TO_THREE_RATIO_BTN_ID = "carFourToThreeRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID = "carSixteenToNineRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID = "carNineToSixteenRatioBtn" + _IdGenerator2.default.Generate();
	    this.CAR_ROTATE_LEFT_BTN = "carRotateLeftBtn" + _IdGenerator2.default.Generate();
	    this.CAR_ROTATE_RIGHT_BTN = "carRotateRightBtn" + _IdGenerator2.default.Generate();
	
	    this.cropPos = this.model.getCropPos();
	    this.cropSize = this.model.getCropSize();
	
	    this.freeCropFlag = this.cropPos.y ? true : false;
	
	    if (this.model.rotate) {
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
	    };
	  }
	
	  (0, _createClass3.default)(CropAndRotateView, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	
	      if (!this.viewDeferred || this.viewDeferred.state() === "resolved") {
	        this.viewDeferred = $.Deferred();
	      }
	
	      this.container = parentEl;
	
	      if (this.freeCropFlag) {
	        this.model.crop = undefined;
	      }
	
	      var cropRatio = this.getCropConst();
	
	      var renderData = {
	        previewUrl: this.model.getPreviewUrl(800, 382),
	        carApplyBtn: this.CAR_APPLY_BTN_ID,
	        carCancelBtn: this.CAR_CANCEL_BTN_ID,
	        carRotateLeftBtn: this.CAR_ROTATE_LEFT_BTN,
	        carRotateRightBtn: this.CAR_ROTATE_RIGHT_BTN,
	        rotateFlag: this.model.rotate ? true : false,
	        freeCropFlag: this.freeCropFlag,
	        carOrigRatioBtn: this.CAR_ORIG_RATIO_BTN_ID,
	        carOneToOneRatioBtn: this.CAR_ONE_TO_ONE_RATIO_BTN_ID,
	        carThreeToFourRatioBtn: this.CAR_THREE_TO_FOUR_RATIO_BTN_ID,
	        carFourToThreeRatioBtn: this.CAR_FOUR_TO_THREE_RATIO_BTN_ID,
	        carSixteenToNineRatioBtn: this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID,
	        carNineToSixteenRatioBtn: this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID,
	        carFreeRatioBtn: this.CAR_FREE_RATIO_BTN_ID,
	        cropRatio: cropRatio,
	        cropRatioConsts: this.cropConsts
	      };
	
	      var markupStr = _ejs2.default.render(_cropAndRotate2.default, renderData);
	      parentEl.html(markupStr);
	      this.crop_img = $(parentEl).find(".uploadcare--preview__image-container>img");
	
	      this.crop_img.on('load', function () {
	
	        if (_this.freeCropFlag) {
	
	          var trueSize = [_this.model.imgWidth, _this.model.imgHeight];
	          var curRotate = _this.model.rotate;
	          if (curRotate === 90 || curRotate === 270) {
	            trueSize = trueSize.reverse();
	          }
	
	          _this.cropApi = $.Jcrop(_this.crop_img, {
	            trueSize: trueSize,
	            onChange: function onChange(ev) {
	              var coords = ev;
	              var left = Math.round(Math.max(0, coords.x));
	              var top = Math.round(Math.max(0, coords.y));
	
	              var width = Math.round(Math.min(_this.model.imgWidth, coords.x2)) - left;
	              var height = Math.round(Math.min(_this.model.imgHeight, coords.y2)) - top;
	              var curRot = _this.model.rotate;
	
	              _this.cropPos.x = left;
	              _this.cropPos.y = top;
	              _this.cropSize.width = width;
	              _this.cropSize.height = height;
	            },
	            baseClass: 'uploadcare--jcrop',
	            addClass: 'uploadcare--crop-widget',
	            createHandles: ['nw', 'ne', 'se', 'sw'],
	            bgColor: 'transparent',
	            bgOpacity: .8
	          });
	
	          if (_this.cropPos.x && _this.cropPos.y) {
	            var rect = [_this.cropPos.x, _this.cropPos.y, _this.cropPos.x + _this.cropSize.width, _this.cropPos.y + _this.cropSize.height];
	            _this.cropApi.setSelect(rect);
	          }
	        } else {
	          _this.cropApi = undefined;
	        }
	      });
	
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      $(parentEl).find("." + this.CAR_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.carCancelClick(ev);
	      });
	      $(parentEl).find("." + this.CAR_FREE_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carFreeRatio();
	      });
	      $(parentEl).find("." + this.CAR_APPLY_BTN_ID).click(function (ev) {
	        return _this2.carApplyClick(ev);
	      });
	      $(parentEl).find("." + this.CAR_ROTATE_LEFT_BTN).click(function (ev) {
	        return _this2.carRotateClick(1); /* rotate left */
	      });
	      $(parentEl).find("." + this.CAR_ROTATE_RIGHT_BTN).click(function (ev) {
	        return _this2.carRotateClick(0); /* rotate right */
	      });
	      $(parentEl).find("." + this.CAR_ORIG_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(null);
	      });
	      $(parentEl).find("." + this.CAR_ONE_TO_ONE_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(1);
	      });
	      $(parentEl).find("." + this.CAR_THREE_TO_FOUR_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(3 / 4);
	      });
	      $(parentEl).find("." + this.CAR_FOUR_TO_THREE_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(4 / 3);
	      });
	      $(parentEl).find("." + this.CAR_SIXTEEN_TO_NINE_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(16 / 9);
	      });
	      $(parentEl).find("." + this.CAR_NINE_TO_SIXTEEN_RATIO_BTN_ID).click(function (ev) {
	        return _this2.carSetCropRatio(9 / 16);
	      });
	    }
	  }, {
	    key: 'carCancelClick',
	    value: function carCancelClick(ev) {
	      this.model.rotate = undefined;
	      this.model.crop = undefined;
	      this.freeCropFlag = false;
	
	      this.viewDeferred.resolve({
	        reason: "Cancel"
	      });
	    }
	  }, {
	    key: 'carApplyClick',
	    value: function carApplyClick(ev) {
	
	      if (this.freeCropFlag) {
	        this.model.setCropSize(this.cropSize.width, this.cropSize.height);
	        this.model.setCropPos(this.cropPos.x, this.cropPos.y);
	      }
	
	      this.viewDeferred.resolve({
	        reason: "Apply"
	      });
	    }
	  }, {
	    key: 'carRotateClick',
	    value: function carRotateClick(direction) {
	      var valArray = [undefined, 90, 180, 270];
	      var curVal = this.model.rotate;
	      var ind = valArray.findIndex(function (val, i, arr) {
	        return val === curVal;
	      });
	      if (direction) {
	        ind++;
	        if (ind >= valArray.length) {
	          ind = 0;
	        }
	      } else {
	        ind--;
	        if (ind < 0) {
	          ind = valArray.length - 1;
	        }
	      }
	      this.model.rotate = valArray[ind];
	      this.render();
	    }
	  }, {
	    key: 'carSetCropRatio',
	    value: function carSetCropRatio(ratio) {
	
	      this.freeCropFlag = false;
	      if (!ratio) {
	        this.model.crop = undefined;
	      } else if (ratio === 1) {
	        var squareSize = Math.min(this.model.imgWidth, this.model.imgHeight);
	        this.model.setCropSize(squareSize, squareSize);
	      } else {
	        var _squareSize = Math.min(this.model.imgWidth, this.model.imgHeight);
	        var curRatio = this.model.imgWidth / this.model.imgHeight;
	        if (curRatio > 1) {
	          if (ratio < curRatio) {
	            this.model.setCropSize(ratio * _squareSize, _squareSize);
	          } else {
	            this.model.setCropSize(_squareSize, 1 / ratio * _squareSize);
	          }
	        } else {
	          if (ratio > curRatio) {
	            this.model.setCropSize(_squareSize, 1 / ratio * _squareSize);
	          } else {
	            this.model.setCropSize(ratio * _squareSize, _squareSize);
	          }
	        }
	      }
	
	      this.render();
	    }
	  }, {
	    key: 'carFreeRatio',
	    value: function carFreeRatio() {
	      this.freeCropFlag = true;
	      this.model.crop = undefined;
	      this.render();
	    }
	  }, {
	    key: 'getCropConst',
	    value: function getCropConst() {
	
	      var cropSize = this.model.getCropSize();
	      var cropRate = Math.round(cropSize.width / cropSize.height * 100) / 100;
	      var threeToFourRate = Math.round(3 / 4 * 100) / 100;
	      var fourToThreeRate = Math.round(4 / 3 * 100) / 100;
	      var sixteenToNineRate = Math.round(16 / 9 * 100) / 100;
	      var nineToSixteenRate = Math.round(9 / 16 * 100) / 100;
	
	      if (this.freeCropFlag) {
	        return this.cropConsts.FREE_CROP;
	      } else if (!this.crop && !this.cropSize) {
	        return this.cropConsts.ORIG_RATIO;
	      } else if (cropRate === 1) {
	        return this.cropConsts.ONE_TO_ONE;
	      } else if (cropRate == fourToThreeRate) {
	        return this.cropConsts.FOUR_TO_THREE;
	      } else if (cropRate == threeToFourRate) {
	        return this.cropConsts.THREE_TO_FOUR;
	      } else if (cropRate == sixteenToNineRate) {
	        return this.cropConsts.SIXTEEN_TO_NINE;
	      } else if (cropRate == nineToSixteenRate) {
	        return this.cropConsts.NINE_TO_SIXTEEN;
	      } else {
	        return this.cropConsts.ORIG_RATIO;
	      }
	    }
	  }]);
	  return CropAndRotateView;
	}();
	
	exports.default = CropAndRotateView;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uploadcare--panel__header\">\r\n\t<div class=\"uploadcare--panel__title uploadcare--preview__title\">\r\n\t\tCrop & Rotate<!-- TODO Take word from locale -->\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__content\">\r\n\t<div class=\"uploadcare--preview__image-container\">\r\n\t\t<img src=\"<%= previewUrl %>\" alt=\"\" class=\"uploadcare--preview__image\"/>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__footer uploadcare--panel__footer_inverted\">\r\n\t<div class=\"uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back <%= carCancelBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Cancel<!-- TODO Take word from locale --></div>\r\n\r\n\t<div class=\"uploadcare--panel__footer-additions\">\r\n\t\t<div role=\"button\" class=\"uploadcare-tab-effects--rotate-button <%= carRotateLeftBtn %> <% if(rotateFlag) {%> uploadcare-tab-effects--rotate-button_current <%}%>\">\r\n\r\n\t\t\t<svg width=\"29\" height=\"25\" viewBox=\"0 0 29 25\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M5 12.5C5 6.149 10.149 1 16.5 1S28 6.149 28 12.5 22.851 24 16.5 24\"/><path d=\"M9 9l-4 4-4-4\"/></g></svg>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"uploadcare--crop-sizes\">\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carFreeRatioBtn %> <% if(cropRatio === cropRatioConsts.FREE_CROP) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"free\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon uploadcare--crop-sizes__icon_free\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carOrigRatioBtn %> <% if(cropRatio === cropRatioConsts.ORIG_RATIO) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"Orig\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carOneToOneRatioBtn %> <% if(cropRatio === cropRatioConsts.ONE_TO_ONE) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"1:1\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\" style=\"width: 30px; height: 30px;\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carThreeToFourRatioBtn %> <% if(cropRatio === cropRatioConsts.THREE_TO_FOUR) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"3:4\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\" style=\"width: 23px; height: 30px;\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carFourToThreeRatioBtn %> <% if(cropRatio === cropRatioConsts.FOUR_TO_THREE) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"4:3\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\" style=\"width: 30px; height: 23px;\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carSixteenToNineRatioBtn %> <% if(cropRatio === cropRatioConsts.SIXTEEN_TO_NINE) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"16:9\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\" style=\"width: 30px; height: 17px;\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"uploadcare--crop-sizes__item <%= carNineToSixteenRatioBtn %> <% if(cropRatio === cropRatioConsts.NINE_TO_SIXTEEN) {%>uploadcare--crop-sizes__item_current<%}%>\" data-caption=\"9:16\">\r\n\t\t\t\t<div class=\"uploadcare--crop-sizes__icon\" style=\"width: 20px; height: 30px;\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div role=\"button\" class=\"uploadcare-tab-effects--rotate-button <%= carRotateRightBtn %> <% if(rotateFlag) {%> uploadcare-tab-effects--rotate-button_current <%}%>\">\r\n\t\t\t<svg width=\"29\" height=\"25\" viewBox=\"0 0 29 25\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"#000\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M24 12.5C24 6.149 18.851 1 12.5 1S1 6.149 1 12.5 6.149 24 12.5 24\"/><path d=\"M20 9l4 4 4-4\"/></g></svg>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"uploadcare--button uploadcare--button_primary uploadcare--preview__done <%= carApplyBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Done<!-- TODO Take word from locale --></div>\r\n</div>\r\n"

/***/ },
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--rotate-button {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\r\n\theight: 60px;\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button svg g {\r\n\tstroke: #454545;\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button:hover svg g, .uploadcare-tab-effects--rotate-button:focus svg g {\r\n\tstroke: #282828;\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button:active svg g {\r\n\tstroke: #000;\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button_current {\r\n\tposition: relative\r\n}\r\n\r\n.uploadcare-tab-effects--rotate-button_current:before {\r\n\tcontent: '';\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\ttop: 100%;\r\n\tleft: 50%;\r\n\twidth: 6px;\r\n\theight: 6px;\r\n\tbackground: #3787ec;\r\n\tborder-radius: 50%;\r\n\t-webkit-transform: translateX(-50%);\r\n\ttransform: translateX(-50%);\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 30 */
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
/* 31 */
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
/* 32 */
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
	
	var _enhance = __webpack_require__(33);
	
	var _enhance2 = _interopRequireDefault(_enhance);
	
	var _slider = __webpack_require__(34);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(27);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(36);
	
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
	        enhanceCancelBtn: this.ENHANCE_CANCEL_BTN_ID
	      };
	      var markupStr = _ejs2.default.render(_enhance2.default, renderData);
	      parentEl.html(markupStr);
	
	      var sliderContainer = $(parentEl).find("." + this.SLIDER_ID);
	      this.slider.render(sliderContainer, this.model.enhance);
	
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      $(parentEl).find('.' + this.ENHANCE_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.enhanceCancelClick(ev);
	      });
	      $(parentEl).find('.' + this.ENHANCE_APPLY_BTN_ID).click(function (ev) {
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
	        _this3.container.find("." + _this3.PREVIEW_IMG_ID).attr("src", _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	  return EnhanceView;
	}();
	
	exports.default = EnhanceView;

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uploadcare--panel__header\">\r\n\t<div class=\"uploadcare--panel__title uploadcare--preview__title\">\r\n\t\tEnhance<!-- TODO Take word from locale -->\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__content\">\r\n\t<div class=\"uploadcare--preview__image-container\">\r\n\t\t<img src=\"<%= previewUrl %>\" alt=\"\" class=\"uploadcare--preview__image <%= previewImageId%>\"/>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__footer uploadcare--panel__footer_inverted\">\r\n\t<div class=\"uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back <%= enhanceCancelBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\" \r\n\t>Cancel<!-- TODO Take word from locale --></div>\r\n\r\n\t<div class=\"uploadcare--panel__footer-additions\">\r\n\t\t<div class=\"uploadcare-tab-effects--slider <%= sliderId %>\"></div>\r\n\t</div>\r\n\r\n\t<div class=\"uploadcare--button uploadcare--button_primary uploadcare--preview__done <%= enhanceApplyBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Done<!-- TODO Take word from locale --></div>\r\n</div>\r\n"

/***/ },
/* 34 */
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
	
	var _slider = __webpack_require__(35);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(27);
	
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
	    this.RANGE_ID = "range_" + _IdGenerator2.default.Generate();
	  }
	
	  (0, _createClass3.default)(Slider, [{
	    key: 'render',
	    value: function render() {
	      var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container;
	      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this.container = parentEl;
	      var markupStr = _ejs2.default.render(_slider2.default, {
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
	
	      this.$range = $(parentEl).find("." + this.RANGE_ID);
	
	      this.$range.on("change", function (ev) {
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
/* 35 */
/***/ function(module, exports) {

	module.exports = "<input type=\"range\" class=\"uploadcare--input-range <%= pointerId %>\" min=\"<%= min %>\" max=\"<%= max %>\" value=\"<%= value %>\"/>"

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--slider {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1;\r\n          flex: 1;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 38 */
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
	
	var _sharpen = __webpack_require__(39);
	
	var _sharpen2 = _interopRequireDefault(_sharpen);
	
	var _slider = __webpack_require__(34);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _IdGenerator = __webpack_require__(27);
	
	var _IdGenerator2 = _interopRequireDefault(_IdGenerator);
	
	__webpack_require__(36);
	
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
	        sharpenCancelBtn: this.SHARPEN_CANCEL_BTN_ID
	      };
	
	      var markupStr = _ejs2.default.render(_sharpen2.default, renderData);
	      parentEl.html(markupStr);
	
	      var sliderContainer = $(parentEl).find("." + this.SLIDER_ID);
	      this.slider.render(sliderContainer, this.model.sharp);
	
	      this.setupHandlers(parentEl);
	      return this.viewDeferred.promise();
	    }
	  }, {
	    key: 'setupHandlers',
	    value: function setupHandlers(parentEl) {
	      var _this2 = this;
	
	      $(parentEl).find('.' + this.SHARPEN_CANCEL_BTN_ID).click(function (ev) {
	        return _this2.sharpenCancelClick(ev);
	      });
	      $(parentEl).find('.' + this.SHARPEN_APPLY_BTN_ID).click(function (ev) {
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
	        _this3.container.find("." + _this3.PREVIEW_IMG_ID).attr("src", _this3.model.getPreviewUrl(800, 382));
	      }, 300);
	    }
	  }]);
	  return SharpenView;
	}();
	
	exports.default = SharpenView;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uploadcare--panel__header\">\r\n\t<div class=\"uploadcare--panel__title uploadcare--preview__title\">\r\n\t\tSharpen<!-- TODO Take word from locale -->\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__content\">\r\n\t<div class=\"uploadcare--preview__image-container\">\r\n\t\t<img src=\"<%= previewUrl %>\" alt=\"\" class=\"uploadcare--preview__image <%= previewImageId%>\"/>\r\n\t</div>\r\n</div>\r\n\r\n<div class=\"uploadcare--panel__footer uploadcare--panel__footer_inverted\">\r\n\t<div class=\"uploadcare--button uploadcare--button_outline-secondary uploadcare--preview__back <%= sharpenCancelBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Cancel<!-- TODO Take word from locale --></div>\r\n\r\n\t<div class=\"uploadcare--panel__footer-additions\">\r\n\t\t<div class=\"uploadcare-tab-effects--slider <%= sliderId %>\"></div>\r\n\t</div>\r\n\r\n\t<div class=\"uploadcare--button uploadcare--button_primary uploadcare--preview__done <%= sharpenApplyBtn %>\"\r\n\t\t\t tabindex=\"0\" role=\"button\"\r\n\t>Done<!-- TODO Take word from locale --></div>\r\n</div>\r\n"

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--effect-buttons {\r\n\t-webkit-box-flex: 1;\r\n\t    -ms-flex: 1;\r\n\t        flex: 1;\r\n\r\n\tdisplay: -webkit-box;\r\n\r\n\tdisplay: -ms-flexbox;\r\n\r\n\tdisplay: flex;\r\n\t-ms-flex-pack: distribute;\r\n\t    justify-content: space-around;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(43);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports
	
	
	// module
	exports.push([module.id, ".uploadcare-tab-effects--effect-button {\r\n\t-webkit-box-flex: 0;\r\n\t    -ms-flex: 0 1 auto;\r\n\t        flex: 0 1 auto;\r\n\r\n\tdisplay: -webkit-box;\r\n\r\n\tdisplay: -ms-flexbox;\r\n\r\n\tdisplay: flex;\r\n\t-webkit-box-orient: vertical;\r\n\t-webkit-box-direction: normal;\r\n\t    -ms-flex-direction: column;\r\n\t        flex-direction: column;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\t-webkit-box-pack: end;\r\n\t    -ms-flex-pack: end;\r\n\t        justify-content: flex-end;\r\n\r\n\theight: 45px;\r\n\r\n\tcolor: #454545;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button .svg-stroke {\r\n\tstroke: #454545;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button .svg-fill {\r\n\tfill: #454545;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:hover, .uploadcare-tab-effects--effect-button:focus {\r\n\tcolor: #282828;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:hover .svg-stroke, .uploadcare-tab-effects--effect-button:focus .svg-stroke {\r\n\tstroke: #282828;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:hover .svg-fill, .uploadcare-tab-effects--effect-button:focus .svg-fill {\r\n\tfill: #282828;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:active {\r\n\tcolor: #000;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:active .svg-stroke {\r\n\tstroke: #000;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button:active .svg-fill {\r\n\tfill: #000;\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button_applied {\r\n\tposition: relative\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button_applied:before {\r\n\tcontent: '';\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\ttop: calc(100% + 3px);\r\n\tleft: 50%;\r\n\twidth: 6px;\r\n\theight: 6px;\r\n\tbackground: #3787ec;\r\n\tborder-radius: 50%;\r\n\t-webkit-transform: translateX(-50%);\r\n\ttransform: translateX(-50%);\r\n}\r\n\r\n.uploadcare-tab-effects--effect-button__caption {\r\n\tfont-size: 13px;\r\n\tline-height: 15px;\r\n\r\n\ttext-transform: uppercase;\r\n\r\n\tmargin-top: 5px;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	exports.default = EffectsModel;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	function EffectsModel(cdn_url, imgWidth, imgHeight) {
	  this.cdn_url = cdn_url;
	  this.imgWidth = imgWidth;
	  this.imgHeight = imgHeight;
	  var cropPos = undefined;
	  var priorityArr = [];
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
	  (0, _defineProperty2.default)(this, CROP_EFFECT, definePropOptions(CROP_EFFECT));
	
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
	        } else {
	          if (propInd === -1) {
	            priorityArr.push(propertyName);
	          } else {
	            priorityArr.splice(propInd, 1);
	            priorityArr.push(propertyName);
	          }
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
	    var protocolAndIdArr = urlWithId.split(this.cdn_url);
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
	        this[formatArr[0]] = formatArr[1] ? parseInt(formatArr[1], 10) : null;
	      } catch (ex) {
	        this[formatArr[0]] = formatArr[1] ? formatArr[1] : null;
	      }
	    }
	
	    if (priorityArr.indexOf(formatArr[0]) === -1) {
	      priorityArr.push(formatArr[0]);
	    }
	  };
	
	  this.getFinalUrl = function () {
	    var baseUrl = this.protocol + '://' + this.cdn_url + this.imageId + '/';
	    uploadcare.jQuery.each(priorityArr, function (key, val) {
	      if (effectsData[val] !== undefined) {
	        baseUrl += '-/' + val + '/';
	        if (effectsData[val]) {
	          baseUrl += effectsData[val] + '/';
	        }
	      }
	
	      if (val === CROP_EFFECT && effectsData[val]) {
	        if (cropPos) {
	          baseUrl += cropPos + '/';
	        } else {
	          baseUrl += 'center/';
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
	
	  this.setCropSize = function (width, height) {
	    this[CROP_EFFECT] = Math.round(width) + 'x' + Math.round(height);
	    cropPos = undefined;
	  };
	
	  this.getCropSize = function () {
	    var sizeArr = this[CROP_EFFECT] ? this[CROP_EFFECT].split('x') : [];
	    return {
	      width: sizeArr[0] ? parseInt(sizeArr[0], 10) : null,
	      height: sizeArr[1] ? parseInt(sizeArr[1], 10) : null
	    };
	  };
	
	  this.setCropPosCenter = function () {
	    cropPos = "center";
	  };
	
	  this.setCropPos = function (posX, posY) {
	    cropPos = posX + ',' + posY;
	  };
	
	  this.getCropPos = function () {
	    var posArr = cropPos ? cropPos.split(',') : [];
	    return {
	      x: posArr[0] ? parseInt(posArr[0], 10) : null,
	      y: posArr[1] ? parseInt(posArr[1], 10) : null
	    };
	  };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=uploadcare.tab-effects.js.map
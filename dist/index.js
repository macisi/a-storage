/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DRIVERS = undefined;

	var _Storage = __webpack_require__(1);

	var _Storage2 = _interopRequireDefault(_Storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var StorageFactory = function StorageFactory(options) {
	  return new _Storage2.default(options);
	};

	exports.default = StorageFactory;
	exports.DRIVERS = _Storage.DRIVERS;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DRIVERS = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _Interface = __webpack_require__(3);

	var _Interface2 = _interopRequireDefault(_Interface);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STORAGE_DRIVERS = ['MEMORY', 'LOCALSTORAGE', 'SESSIONSTORAGE', 'DOMAINSTORAGE'];

	var DRIVERS = {
	  MEMORY: 'MEMORY',
	  LOCALSTORAGE: 'LOCALSTORAGE',
	  SESSIONSTORAGE: 'SESSIONSTORAGE',
	  // available under dingtalk env
	  DOMAINSTORAGE: 'DOMAINSTORAGE'
	};

	exports.DRIVERS = DRIVERS;


	var STORAGE_INTERFACE = {};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
	  for (var _iterator = STORAGE_DRIVERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	    var driver = _step.value;

	    switch (driver) {
	      case 'MEMORY':
	      default:
	        STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
	        break;
	      case 'LOCALSTORAGE':
	        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.localStorage) {
	          STORAGE_INTERFACE[driver] = window.localStorage;
	        } else {
	          STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
	        }
	        break;
	      case 'SESSIONSTORAGE':
	        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.sessionStorage) {
	          STORAGE_INTERFACE[driver] = window.sessionStorage;
	        } else {
	          STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
	        }
	        break;
	      case 'DOMAINSTORAGE':
	        try {
	          (function () {
	            var _storage = dd.biz.util.domainStorage;
	            (0, _objectAssign2.default)(_storage, {
	              clear: function clear() {
	                _storage.clearItems();
	              }
	            });
	            STORAGE_INTERFACE[driver] = _storage;
	          })();
	        } catch (e) {
	          STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
	        }
	        break;
	    }
	  }
	} catch (err) {
	  _didIteratorError = true;
	  _iteratorError = err;
	} finally {
	  try {
	    if (!_iteratorNormalCompletion && _iterator.return) {
	      _iterator.return();
	    }
	  } finally {
	    if (_didIteratorError) {
	      throw _iteratorError;
	    }
	  }
	}

	var defaultConfig = {
	  driver: DRIVERS.LOCALSTORAGE,
	  Promise: window.Promise
	};

	var Storage = function () {
	  function Storage() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Storage);

	    this.config = (0, _objectAssign2.default)(defaultConfig, options);
	    // set storage interface
	    this.interface = STORAGE_INTERFACE[this.config.driver];
	    this.Promise = this.config.Promise;
	  }

	  _createClass(Storage, [{
	    key: 'setItem',
	    value: function setItem(key, value) {
	      try {
	        this.interface.setItem(key, value);
	      } catch (error) {
	        return this.Promise.reject(error);
	      }
	      return this.Promise.resolve();
	    }
	  }, {
	    key: 'getItem',
	    value: function getItem(key) {
	      return this.Promise.resolve(this.interface.getItem(key));
	    }
	  }, {
	    key: 'removeItem',
	    value: function removeItem(key) {
	      this.interface.removeItem(key);
	      return this.Promise.resolve();
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.interface.clear();
	      return this.Promise.resolve();
	    }
	  }]);

	  return Storage;
	}();

	exports.default = Storage;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interface = function () {
	  function Interface(name) {
	    _classCallCheck(this, Interface);

	    this.__interface_name = name;
	    this.__store = {};
	  }

	  _createClass(Interface, [{
	    key: 'getItem',
	    value: function getItem(key) {
	      return this.__store[key];
	    }
	  }, {
	    key: 'setItem',
	    value: function setItem(key, value) {
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	        value = value.toString();
	      }
	      this.__store[key] = value;
	    }
	  }, {
	    key: 'removeItem',
	    value: function removeItem(key) {
	      delete this.__store[key];
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.__store = {};
	    }
	  }]);

	  return Interface;
	}();

	exports.default = Interface;
	;

/***/ }
/******/ ]);
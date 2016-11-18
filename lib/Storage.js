'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DRIVERS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Interface = require('./Interface');

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
//# sourceMappingURL=Storage.js.map
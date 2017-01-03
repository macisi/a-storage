'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DRIVERS = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Interface = require('./Interface');

var _Interface2 = _interopRequireDefault(_Interface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  for (var _iterator = (0, _getIterator3.default)(STORAGE_DRIVERS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var driver = _step.value;

    switch (driver) {
      case 'MEMORY':
      default:
        STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
        break;
      case 'LOCALSTORAGE':
        if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window.localStorage) {
          STORAGE_INTERFACE[driver] = window.localStorage;
        } else {
          STORAGE_INTERFACE[driver] = new _Interface2.default(driver);
        }
        break;
      case 'SESSIONSTORAGE':
        if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window.sessionStorage) {
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
    (0, _classCallCheck3.default)(this, Storage);

    this.config = (0, _objectAssign2.default)(defaultConfig, options);
    // set storage interface
    this.interface = STORAGE_INTERFACE[this.config.driver];
    this.Promise = this.config.Promise;
  }

  (0, _createClass3.default)(Storage, [{
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